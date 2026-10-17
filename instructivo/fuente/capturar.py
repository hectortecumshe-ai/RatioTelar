"""Toma las capturas de los instructivos de Ratio Telar con Edge sin interfaz.
Requiere el servidor local de la app (python -m http.server 8773 --directory D:/CLAUDE/RatioTelar).
Uso:  python capturar.py              (todas, en español e inglés)
      python capturar.py inicio tablero   (solo esas)
Cada captura se guarda como PNG en ../img/png y luego convertir.ps1 la pasa a JPG (../img/<id>-<idioma>.jpg)."""
import os, subprocess, sys, time, urllib.parse

AQUI = os.path.dirname(os.path.abspath(__file__))
PNG = os.path.join(AQUI, '..', 'img', 'png'); os.makedirs(PNG, exist_ok=True)
EDGE = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
PERFIL = os.path.join(os.environ.get('TEMP', AQUI), 'telar_capturas_perfil')
BASE = 'http://localhost:8773/instructivo/fuente/captura.html?'

# id: parámetros de captura.html (b, v, h, sel, off, m, prep, js, q)
CAPTURAS = {
  'inicio':        dict(b='inicio', prep='vacio', m='.langsw:not(.modesw)|#modesw|#btnTema|#btnAyuda|#nav|#pill'),
  'ayuda':         dict(b='requerimientos', prep='ayuda', h=760),
  'vistas':        dict(b='tablero', v='cien', sel='.tablero .t12.sci', h=760),
  'catalogo':      dict(b='cultivo', prep='vacio', sel='.cat-grid', m='[data-cult="maiz"]|.tipo-tabs'),
  'variedad':      dict(b='cultivo', prep='vacio,mango', sel='#varIn', off=220, m='#varIn|.razas'),
  'maiz':          dict(b='cultivo', sel='#mRaza', off=260, m='[data-mtipo]|#mRaza'),
  'bovino':        dict(b='cultivo', prep='vacio,bovino', sel='[data-bprop]', off=200, m='.tipo-tabs [data-bprop="carne"]|label.opt.sel|.razas'),
  'apiario':       dict(b='cultivo', prep='vacio,abeja', sel='[data-cult="abeja"]', off=200),
  'nuevo':         dict(b='cultivo', prep='vacio,nuevo', sel='.cat-nuevo', off=360, m='.cat-nuevo|.sis-nuevo'),
  'propio':        dict(b='cultivo', prep='vacio,pitahaya', sel='.cat-usuario', off=260, m='.cat-usuario|#varIn'),
  'sistema':       dict(b='cultivo', sel='input[name=sis]', off=200, m='label.opt.sel|#tUP'),
  'region':        dict(b='region', m='.mapa,svg.mapa'),
  'localidad':     dict(b='region', sel='select', off=180),
  'req':           dict(b='requerimientos', sel='.card', off=150),
  'reqinn':        dict(b='requerimientos', prep='reqinn', sel='#reqT,#rT,[id^=req]', off=320),
  'manejo':        dict(b='manejo', m='#rSiem|.filtro5b'),
  'paso':          dict(b='manejo', prep='paso', sel='.pacc[open],details[open]', off=150),
  'ejemplo':       dict(b='manejo', prep='vacio,uva,ejemplo', h=860),
  'regen':         dict(b='regeneracion', sel='svg.medidor', off=230, m='svg.medidor|#rgBase'),
  'perillas':      dict(b='regeneracion', sel='.perillas', off=180, m='.perilla'),
  'regenbase':     dict(b='regeneracion', prep='regenbase', sel='svg.medidor', off=230),
  'riesgos':       dict(b='riesgos', sel='.kpis', off=160, m='.kpis .kpi|.matriz-r'),
  'perillasr':     dict(b='riesgos', sel='.riesgos-t', off=170, m='.riesgos-t tbody tr td:nth-child(3)|.riesgos-t tbody tr td:nth-child(4)|.riesgos-t tbody tr td:nth-child(5)|.riesgos-t tbody tr td:nth-child(6)'),
  'elementos':     dict(b='elementos', sel='.card', off=150),
  'elemrr':        dict(b='elementos', sel='.rr-card', off=150),
  'precios':       dict(b='precios', prep='precio_fin', sel='.tbl.val', off=260, m='[data-pcat="financieros"]|.tbl.val tbody tr:first-child'),
  'formulacion':   dict(b='formulacion', m='#bForm'),
  'tablero':       dict(b='tablero', prep='formulado', sel='.tablero', off=160),
  'red':           dict(b='tablero', prep='formulado', sel='.tablero .t8', off=150, m='.basesw|#sinPM'),
  'corr':          dict(b='tablero', prep='formulado', sel='#corrEl', off=200, m='#corrEl'),
  'clado':         dict(b='tablero', prep='formulado', sel='.clado', off=230, m='[data-clado="actinst"]'),
  'calendario':    dict(b='tablero', prep='formulado', sel='svg.calendario', off=180),
  'sostenible':    dict(b='sostenible', sel='.kpis', off=160),
  'sarandon':      dict(b='sostenible', sel='.medidor,.formula', off=260),
  'ods':           dict(b='sostenible', sel='.ods-grid', off=200),
  'prospectiva':   dict(b='prospectiva', sel='.kpis', off=160),
  'supuestos':     dict(b='prospectiva', sel='.prosp-sup', off=170, m='.prosp-sup tbody tr:first-child|#pReset'),
  'informe':       dict(b='informe', m='#iImp|#iGuar|#iCarg'),
  'teoria':        dict(b='teoria'),
  'validacion':    dict(b='validacion'),
  'blanco':        dict(b='inicio', prep='vacio', sel='.como-llenar', off=120, h=560),
  'avance':        dict(b='manejo', prep='vacio,parcial', h=420, m='#nav|.progress'),
  'modoej':        dict(b='tablero', prep='vacio,modoej', h=620, m='#franjaEj'),
  'vacio':         dict(b='tablero', prep='vacio', h=760),
  'respsn':        dict(b='manejo', prep='mixto', sel='.pacc[open] .actrow', off=200, h=560, m='.pacc[open] .actrow.resp-si .resp-sn|.pacc[open] .actrow.resp-no .resp-sn|.pacc[open] .actrow.resp-vacia .resp-sn'),
  'sugerido':      dict(b='regeneracion', prep='sinconf', sel='.perillas', off=180, m='.perilla.confirmada|.perilla.sin-confirmar [data-regen-ok]'),
  'oscuro':        dict(b='tablero', prep='formulado,oscuro', sel='.tablero', off=160),
}

def url(cid, lang):
    p = {k: str(v) for k, v in CAPTURAS[cid].items()}
    p.setdefault('v', 'prod'); p['l'] = lang
    return BASE + urllib.parse.urlencode(p)

def tomar(cid, lang):
    p = CAPTURAS[cid]; w, h = p.get('w', 1280), p.get('h', 860)
    out = os.path.join(PNG, f'{cid}-{lang}.png')
    if os.path.exists(out): os.remove(out)
    subprocess.run([EDGE, '--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars', f'--user-data-dir={PERFIL}',
                    f'--window-size={w},{h}', '--virtual-time-budget=9000', f'--screenshot={out}', url(cid, lang)],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120)
    for _ in range(80):
        if os.path.exists(out) and os.path.getsize(out) > 0: break
        time.sleep(0.25)
    return os.path.exists(out)

if __name__ == '__main__':
    ids = sys.argv[1:] or list(CAPTURAS)
    for cid in ids:
        for lang in ('es', 'en'):
            print(cid, lang, 'ok' if tomar(cid, lang) else 'FALLA', flush=True)
