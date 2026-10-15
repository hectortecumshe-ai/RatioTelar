"use strict";
/* =====================================================================
   1f. CALENDARIO DE ACTIVIDADES PRINCIPALES
   Cada paso tiene un tipo de evento y una ventana de fechas (día del año, 0–364).
   Maíz criollo: ventanas leídas de la Figura 4 (meses) o días después de la siembra (DDS);
   la fecha de siembra la elige el usuario (el artículo señala dos posibles, entre marzo y abril).
   ===================================================================== */
const EVENTOS = {
  suelo:      {n:E('Preparación del suelo','Soil preparation'), col:'#9a6a3a'},
  semilla:    {n:E('Semilla','Seed'), col:'#d9a441'},
  planeacion: {n:E('Planeación','Planning'), col:'#8a8f86'},
  siembra:    {n:E('Siembra','Sowing'), col:'#2f8f4a'},
  fertiliza:  {n:E('Fertilización','Fertilisation'), col:'#2f7d8a'},
  revision:   {n:E('Revisión del cultivo','Crop check'), col:'#7a4f9a'},
  deshierbe:  {n:E('Deshierbe y labores','Weeding and cultivation'), col:'#c27c0e'},
  poda:       {n:E('Poda','Pruning'), col:'#5a6b8a'},
  corte:      {n:E('Corte','Cutting'), col:'#b05434'},
  cosecha:    {n:E('Cosecha','Harvest'), col:'#c9302c'},
  forraje:    {n:E('Forraje','Fodder'), col:'#8a6d1f'},
  venta:      {n:E('Comercialización y balance','Sale and balance'), col:'#3b6aa0'},
  empadre:    {n:E('Empadre o monta','Mating'), col:'#b05434'},
  partos:     {n:E('Partos o nacimientos','Births'), col:'#e0a13c'},
  destete:    {n:E('Destete','Weaning'), col:'#5f9a4a'},
  sanidad:    {n:E('Vacunación y desparasitación','Vaccination and deworming'), col:'#3b6aa0'},
  esquila:    {n:E('Esquila u ordeña','Shearing or milking'), col:'#7d5a2c'},
  otro:       {n:E('Otra actividad','Other activity'), col:'#8a8f86'}
};
const EV_PRINCIPALES = ['siembra','deshierbe','corte','cosecha','poda','fertiliza'];
/* Tipo de evento de cada paso del maíz (lectura de Ratio Telar a partir del nombre del paso) */
const EV_PASO = {1:'suelo',2:'suelo',3:'suelo',4:'suelo',5:'suelo',6:'semilla',7:'semilla',8:'semilla',9:'planeacion',10:'planeacion',11:'planeacion',12:'planeacion',
  13:'fertiliza',14:'fertiliza',15:'fertiliza',16:'fertiliza',17:'planeacion',18:'siembra',19:'revision',20:'revision',21:'revision',22:'deshierbe',23:'fertiliza',
  24:'deshierbe',25:'revision',26:'revision',27:'deshierbe',28:'revision',29:'fertiliza',30:'revision',31:'corte',32:'suelo',33:'cosecha',34:'forraje',35:'semilla',
  36:'cosecha',37:'venta',38:'venta'};
const diaFecha = (d)=>{ const t=new Date(2026,0,1+Math.round(((d%365)+365)%365)); return t.toLocaleDateString(LOC(),{day:'numeric',month:'short'}); };
const isoDeDia = (d)=>{ const t=new Date(Date.UTC(2026,0,1+Math.round(((d%365)+365)%365))); return t.toISOString().slice(0,10); };
const diaDeIso = (s)=>{ const t=new Date(s+'T00:00:00Z'); return Math.round((t-Date.UTC(t.getUTCFullYear(),0,1))/864e5); };
/* Ventana por omisión de un paso del maíz */
function ventanaPaso(p){ const s=S.siembraDia;
  if((p.dds||p.n===18) && s==null) return {ini:null, fin:null, origen:'sin'};
  if(p.dds){ const a=s+p.dds[0], b=s+p.dds[p.dds.length-1]+(p.dds.length>1?0:6); return {ini:a%365, fin:b%365, origen:'dds'}; }
  if(p.n===18) return {ini:s, fin:(s+6)%365, origen:'siembra'};
  const v=p.v; return {ini:MES_DIA[v[0]-1], fin:(v[v.length-1]===12?364:MES_DIA[v[v.length-1]]-1), origen:'fig4'}; }
/* Fechas efectivas de todos los pasos (con las ediciones del usuario) */
function calendarioPasos(){ const out=[];
  if(conStack()) PASOS.forEach(p=>{ const f=S.fechas[p.n]||{}, w=ventanaPaso(p), m=manejoDe(p.n);
    if(!p.a.some(a=>m.resp[a[0]]==='si') && !(m.inn||[]).length) return;           // paso sin actividades practicadas
    if(f.ini==null && (w.ini==null || (w.origen==='fig4' && !EJ))) return;           // sin fecha propia (la ventana de Calpan solo en el ejemplo)
    out.push({n:p.n, nombre:E(p.es,p.en), b:p.b, ev:f.ev||EV_PASO[p.n]||'otro', ini:f.ini!=null?f.ini:w.ini, fin:f.fin!=null?f.fin:w.fin, origen:f.ini!=null?'usuario':w.origen,
      inn:(manejoDe(p.n).inn||[]).length}); });
  else Object.entries(S.manejo).forEach(([n,m])=>{ const f=S.fechas[n]||{}; if(f.ini==null) return; out.push({n:+n, nombre:E(m.nombre||'',m.nombre||''), b:'', ev:f.ev||'otro', ini:f.ini, fin:f.fin!=null?f.fin:f.ini, origen:'usuario', inn:(m.inn||[]).length}); });
  return out; }
/* Calendario circular interactivo */
function calendarioCircular(opt={}){ const W=opt.w||620, C=W/2, R1=W/2-58; const eventos=calendarioPasos().filter(x=>!opt.filtro||x.ev===opt.filtro);
  const tipos=[...new Set(calendarioPasos().map(x=>x.ev))].sort((a,b)=>Object.keys(EVENTOS).indexOf(a)-Object.keys(EVENTOS).indexOf(b));
  const nAn=Math.max(1,tipos.length), dR=Math.min(26,(R1-90)/nAn), ang=(d)=>(d/365)*2*Math.PI-Math.PI/2;
  const p=(d,r)=>[C+r*Math.cos(ang(d)), C+r*Math.sin(ang(d))];
  const arco=(a,b,r0,r1)=>{ let L=((b-a)%365+365)%365; if(L<3) L=3; const e=a+L, g=L>182?1:0; const [x0,y0]=p(a,r1),[x1,y1]=p(e,r1),[x2,y2]=p(e,r0),[x3,y3]=p(a,r0);
    return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r1},${r1} 0 ${g} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} A${r0},${r0} 0 ${g} 0 ${x3.toFixed(1)},${y3.toFixed(1)}Z`; };
  let s=`<svg class="chart calendario" viewBox="0 0 ${W} ${W}" role="img" aria-label="${T('Calendario circular de actividades','Circular activity calendar')}">`;
  // estaciones del año (fondo)
  s+=`<circle cx="${C}" cy="${C}" r="${R1+6}" fill="var(--bg-soft)"/><circle cx="${C}" cy="${C}" r="84" fill="var(--card)" stroke="var(--border)"/>`;
  MESES().forEach((m,i)=>{ const d=MES_DIA[i]; const [x1,y1]=p(d,86), [x2,y2]=p(d,R1+6); s+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--border)"/>`;
    const [tx_,ty]=p(d+15,R1+24); s+=`<text x="${tx_}" y="${ty}" text-anchor="middle" dominant-baseline="middle" font-size="14" font-weight="700" class="m">${m}</text>`; });
  tipos.forEach((t,k)=>{ const r=92+k*dR; s+=`<circle cx="${C}" cy="${C}" r="${r+dR/2}" fill="none" stroke="${EVENTOS[t].col}" stroke-opacity=".10" stroke-width="${dR-2}"/>`; });
  eventos.forEach((x,i)=>{ const k=tipos.indexOf(x.ev), r0=92+k*dR+2, r1=r0+dR-4, col=EVENTOS[x.ev].col, princ=EV_PRINCIPALES.includes(x.ev);
    const t=`<b>${x.n}. ${esc(tx(x.nombre))}</b><br>${esc(tx(EVENTOS[x.ev].n))}<br>${diaFecha(x.ini)} – ${diaFecha(x.fin)}${x.inn?'<br>✦ '+x.inn+' '+T('innovadas','innovated'):''}<br><span class="nota">${x.origen==='usuario'?T('fecha capturada','entered date'):x.origen==='dds'?T('días después de la siembra (Fig. 4)','days after sowing (Fig. 4)'):x.origen==='siembra'?T('fecha de siembra elegida','chosen sowing date'):T('ventana aproximada de la Fig. 4','approximate Fig. 4 window')}</span>`;
    s+=`<path class="evarco ${princ?'princ':''}" d="${arco(x.ini,x.fin,r0,r1)}" fill="${col}" fill-opacity="${princ?.95:.6}" stroke="${x.inn?'var(--accent)':'var(--card)'}" stroke-width="${x.inn?2.5:1}" data-tip="${esc(t)}" data-evpaso="${x.n}" style="animation-delay:${i*25}ms"/>`; });
  // hoy
  const hoy=Math.round((Date.now()-new Date(new Date().getFullYear(),0,1))/864e5); const [hx,hy]=p(hoy,R1+8);
  const [ax,ay]=p(hoy,88); s+=`<line x1="${ax}" y1="${ay}" x2="${hx}" y2="${hy}" stroke="var(--accent)" stroke-width="2.5" stroke-dasharray="4 4" class="aguja"/><circle cx="${hx}" cy="${hy}" r="6" fill="var(--accent)"/>`;
  const sig=eventos.filter(x=>x.ev!=='planeacion').map(x=>({...x, falta:((x.ini-hoy)%365+365)%365})).sort((a,b)=>a.falta-b.falta)[0];
  s+=`<text x="${C}" y="${C-22}" text-anchor="middle" font-size="12.5" class="m">${T('Hoy','Today')} · ${diaFecha(hoy)}</text>`;
  if(sig) s+=`<text x="${C}" y="${C+2}" text-anchor="middle" font-size="14" font-weight="700" style="fill:${EVENTOS[sig.ev].col}">${esc(tx(EVENTOS[sig.ev].n))}</text><text x="${C}" y="${C+22}" text-anchor="middle" font-size="12.5">${T('en','in')} ${sig.falta} ${T('días','days')}</text>`;
  s+=`<text x="${C}" y="${C+44}" text-anchor="middle" font-size="11" class="m">${eventos.length} ${T('pasos','steps')}</text>`;
  return s+'</svg>'; }
function leyendaEventos(filtro){ const tipos=[...new Set(calendarioPasos().map(x=>x.ev))];
  return `<div class="legend-cat">${tipos.map(t=>`<span data-evf="${t}" class="${filtro===t?'on':''}" style="${filtro===t?'border-color:'+EVENTOS[t].col:''}"><i style="background:${EVENTOS[t].col}"></i>${esc(tx(EVENTOS[t].n))}${EV_PRINCIPALES.includes(t)?' ★':''}</span>`).join('')}${filtro?`<span data-evf="">✕ ${T('todos','all')}</span>`:''}</div>`; }
function tablaFechas(){ const l=calendarioPasos().filter(x=>EV_PRINCIPALES.includes(x.ev)).sort((a,b)=>a.ini-b.ini);
  return l.length?`<table class="tbl"><thead><tr><th>${T('Actividad principal','Main activity')}</th><th>${T('Paso','Step')}</th><th>${T('Desde','From')}</th><th>${T('Hasta','To')}</th></tr></thead><tbody>${l.map(x=>`<tr><td><i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${EVENTOS[x.ev].col}"></i> ${esc(tx(EVENTOS[x.ev].n))}</td><td>${x.n}. ${esc(tx(x.nombre))}</td><td>${diaFecha(x.ini)}</td><td>${diaFecha(x.fin)}</td></tr>`).join('')}</tbody></table>`:`<p class="sindato">${T('Sin fechas de actividades principales.','No main-activity dates.')}</p>`; }
