"use strict";
/* =====================================================================
   1e. ELEMENTOS DEL SISTEMA COMPLEJO ADAPTATIVO (Bloque 7)
   Elementos del caso maíz criollo de Calpan, tomados del texto del artículo
   (Díaz-José et al., 2026): actores (pp. 7–9), instituciones (pp. 7–8), insumos,
   equipo y productos (Figura 4), conocimientos (pp. 1–5, Fig. 4), perturbaciones
   (nota de la Fig. 4) y programas (p. 16). i:true = inferido de la actividad (no nombrado
   como tal en el artículo); se marca «Lectura de Ratio Telar».
   ===================================================================== */
const CATS = {
  actores:      {n:E('Actores','Actors'),                     col:'#b05434', sym:'◆'},
  instituciones:{n:E('Instituciones','Institutions'),         col:'#3b6aa0', sym:'▲'},
  insumos:      {n:E('Insumos','Inputs'),                     col:'#c27c0e', sym:'●'},
  equipo:       {n:E('Equipo e infraestructura','Equipment and infrastructure'), col:'#7d5a2c', sym:'■'},
  naturales:    {n:E('Recursos naturales','Natural resources'),col:'#2f7d4a', sym:'✿'},
  financieros:  {n:E('Recursos financieros','Financial resources'), col:'#8a6d1f', sym:'$'},
  conocimientos:{n:E('Conocimientos','Knowledge'),            col:'#7a4f9a', sym:'✦'},
  politicas:    {n:E('Políticas y programas','Policies and programmes'), col:'#5a6b8a', sym:'§'},
  perturbaciones:{n:E('Perturbaciones del entorno','Environmental disturbances'), col:'#c43a2f', sym:'≈'},
  productos:    {n:E('Productos','Products'),                 col:'#d9a441', sym:'★'}
};
const ELEM = [
  // actores (pp. 7–9)
  {id:'PM', cat:'actores', n:E('Productores de maíz criollo','Landrace maize farmers')},
  {id:'PI', cat:'actores', n:E('Proveedores de insumos','Input suppliers')},
  {id:'AT', cat:'actores', n:E('Asesores técnicos y extensionistas','Technical advisers and extension agents')},
  {id:'IAC', cat:'actores', n:E('Investigadores académicos','Academic researchers')},
  {id:'AL', cat:'actores', n:E('Academia local (CBTA 255)','Local academia (CBTA 255)')},
  {id:'FAM', cat:'actores', n:E('Familia y comunidad (transmisión entre generaciones)','Family and community (intergenerational transfer)')},
  {id:'COMP', cat:'actores', n:E('Compradores de grano y forraje','Grain and fodder buyers'), i:true},
  // instituciones (pp. 7–8)
  {id:'UACH', cat:'instituciones', n:E('Universidad Autónoma Chapingo','Chapingo Autonomous University')},
  {id:'COLPOS', cat:'instituciones', n:E('Colegio de Postgraduados','Colegio de Postgraduados')},
  {id:'BUAP', cat:'instituciones', n:E('Benemérita Universidad Autónoma de Puebla','Autonomous University of Puebla')},
  {id:'DGTEYCM', cat:'instituciones', n:E('DGTEyCM','DGTEyCM')},
  {id:'SDR', cat:'instituciones', n:E('Secretaría de Desarrollo Rural de Puebla','Puebla Rural Development Secretariat')},
  {id:'STP', cat:'instituciones', n:E('Secretaría del Trabajo del Estado de Puebla','Puebla Labour Secretariat')},
  {id:'CESV', cat:'instituciones', n:E('Comité Estatal de Sanidad Vegetal','State Plant Health Committee')},
  {id:'CIMMYT', cat:'instituciones', n:E('CIMMYT','CIMMYT')},
  // insumos (Fig. 4)
  {id:'SEM', cat:'insumos', n:E('Semilla criolla','Landrace seed')},
  {id:'BIOI', cat:'insumos', n:E('Bioinsumos','Bio-inputs')},
  {id:'INSEC', cat:'insumos', n:E('Insecticidas','Insecticides')},
  {id:'HORM', cat:'insumos', n:E('Hormonas y microelementos','Hormones and micronutrients')},
  {id:'FERTG', cat:'insumos', n:E('Fertilizante granulado','Granular fertilizer')},
  {id:'FOLIAR', cat:'insumos', n:E('Fertilizante foliar y micronutrientes','Foliar fertilizer and micronutrients')},
  {id:'COAD', cat:'insumos', n:E('Coadyuvantes','Adjuvants')},
  {id:'HERB', cat:'insumos', n:E('Herbicidas','Herbicides')},
  {id:'COMB', cat:'insumos', n:E('Combustible de la maquinaria','Machinery fuel'), i:true},
  {id:'COST', cat:'insumos', n:E('Costales y envases','Sacks and containers')},
  // equipo (Fig. 4)
  {id:'DESV', cat:'equipo', n:E('Desvaradora','Stalk shredder')},
  {id:'SUBS', cat:'equipo', n:E('Arado subsoleador','Subsoiler')},
  {id:'ARADO', cat:'equipo', n:E('Arado reversible o de discos','Reversible or disc plough')},
  {id:'RASTRA', cat:'equipo', n:E('Rastra de discos','Disc harrow')},
  {id:'SEMB', cat:'equipo', n:E('Sembradora','Planter')},
  {id:'CULT', cat:'equipo', n:E('Cultivadora y cajón de escarda','Cultivator and hilling share')},
  {id:'ASP', cat:'equipo', n:E('Aspersora','Sprayer'), i:true},
  {id:'MOL', cat:'equipo', n:E('Molino y empacadora de forraje','Fodder mill and baler')},
  {id:'ALM', cat:'equipo', n:E('Almacén','Storage')},
  {id:'TRANS', cat:'equipo', n:E('Transporte','Transport')},
  {id:'BASC', cat:'equipo', n:E('Báscula','Scale')},
  {id:'LAB', cat:'equipo', n:E('Laboratorio de suelos (resultados en plataforma)','Soil laboratory (online results)')},
  // recursos naturales
  {id:'HUM', cat:'naturales', n:E('Humedad del suelo y lluvia','Soil moisture and rain')},
  {id:'SUELO', cat:'naturales', n:E('Suelo','Soil')},
  {id:'RAST', cat:'naturales', n:E('Rastrojo y materia orgánica','Stover and organic matter')},
  {id:'ARV', cat:'naturales', n:E('Malezas (vegetación arvense)','Weeds (arable flora)')},
  {id:'PLAGA', cat:'naturales', n:E('Plagas y enfermedades','Pests and diseases')},
  {id:'CLIMA', cat:'naturales', n:E('Temperatura y precipitación','Temperature and rainfall')},
  {id:'AGUAP', cat:'naturales', n:E('Agua para aspersión','Spray water')},
  // financieros (pasos 15, 37, 38)
  {id:'COSTOS', cat:'financieros', n:E('Costos de producción','Production costs')},
  {id:'INGR', cat:'financieros', n:E('Ingresos netos','Net income')},
  {id:'PRECIO', cat:'financieros', n:E('Precio y fecha de venta','Price and sale date')},
  // conocimientos (capas del Stack y fuentes de información)
  {id:'KTAC', cat:'conocimientos', n:E('Conocimiento tácito','Tacit knowledge')},
  {id:'KCUL', cat:'conocimientos', n:E('Conocimiento cultural','Cultural knowledge')},
  {id:'KTEC', cat:'conocimientos', n:E('Conocimiento técnico','Technical knowledge')},
  {id:'KAMB', cat:'conocimientos', n:E('Conocimiento ambiental','Environmental knowledge')},
  {id:'LUNA', cat:'conocimientos', n:E('Calendario lunar','Lunar calendar')},
  {id:'PRON', cat:'conocimientos', n:E('Pronóstico del tiempo','Weather forecast')},
  // políticas (p. 16)
  {id:'SV', cat:'politicas', n:E('Sembrando Vida','Sembrando Vida')},
  {id:'PPB', cat:'politicas', n:E('Producción para el Bienestar','Producción para el Bienestar')},
  // perturbaciones (nota de la Fig. 4)
  {id:'ENSO', cat:'perturbaciones', n:E('El Niño y La Niña','El Niño and La Niña')},
  {id:'CICL', cat:'perturbaciones', n:E('Temporada de ciclones del Atlántico','Atlantic hurricane season')},
  {id:'MJO', cat:'perturbaciones', n:E('Oscilación Madden-Julian','Madden-Julian Oscillation')},
  {id:'AO', cat:'perturbaciones', n:E('Oscilación Ártica','Arctic Oscillation')},
  // productos
  {id:'GRANO', cat:'productos', n:E('Grano','Grain')},
  {id:'FORR', cat:'productos', n:E('Forraje','Fodder')},
  {id:'MAZ', cat:'productos', n:E('Mazorca','Ear')},
  {id:'SEMS', cat:'productos', n:E('Semilla seleccionada para el siguiente ciclo','Seed selected for the next cycle')}
];
/* Elementos que intervienen en cada actividad (código de la Figura 4). Lectura de Ratio Telar del texto de cada actividad. */
const ACT_EL = {
  A:'PM SUELO RAST ARV KTAC', B:'PM AT KTEC KTAC', C:'PM DESV RASTRA RAST', D:'PM AT ARV RAST KTEC',
  E:'PM SUBS SUELO HUM COMB', F:'PM ARADO SUELO COMB', G:'PM RASTRA SUELO COMB',
  H:'PM FAM SEM MAZ KTAC KCUL', I:'PM PI SEM BIOI INSEC HORM COSTOS', J:'PM SEM COST', K:'PM SEM', L:'PM SEM ALM KTAC',
  M:'PM SEMB', N:'PM SEMB', 'Ñ':'PM SEMB', O:'PM SEMB KTEC',
  P:'PM GRANO FORR KTEC', Q:'PM SEM HUM KTEC KTAC', R:'PM PRON CLIMA', S:'PM ENSO CICL MJO AO CLIMA KAMB',
  T:'PM FAM LUNA KCUL', W:'PM LUNA KCUL CLIMA', X:'PM AT SUELO', Y:'PM LAB', Z:'PM AT LAB KTEC',
  ZA:'AT PM FERTG KTEC', ZB:'AT PM FERTG KTEC', ZC:'PM PI FERTG COSTOS', ZD:'PM FERTG KTEC', ZE:'PM FERTG',
  ZF:'PM HUM SUELO KTAC', ZG:'PM SUELO SEMB', ZH:'PM SEMB COMB', ZI:'PM SEMB SEM',
  ZJ:'PM SEM KTAC', ZK:'PM ARV KTAC', ZL:'PM AT PLAGA KAMB', ZM:'PM AT SUELO KTEC', ZN:'PM ARV HUM', ZO:'PM CULT',
  ZP:'PM CULT COMB', ZQ:'PM CULT SUELO', ZR:'PM FOLIAR ASP', ZS:'PM AGUAP COAD KTEC',
  ZT:'PM CULT KTAC', ZU:'PM CULT', ZV:'PM CULT COMB', ZW:'PM SUELO HUM KTAC',
  ZX:'PM AT FERTG', ZY:'PM HUM', ZZ:'PM AT PLAGA', YA:'PM ARV', YB:'PM PLAGA KAMB',
  YC:'PM PI HERB COSTOS', YD:'PM HERB ARV ASP', XX:'PM HERB ARV', XY:'PM HERB AT',
  YE:'PM PI FOLIAR COSTOS', YF:'PM FOLIAR', YG:'PM FOLIAR ASP', YH:'PM AT FOLIAR',
  YI:'PM MAZ RAST CLIMA', YJ:'PM MAZ', YK:'PM RASTRA RAST SUELO HUM COMB',
  YL:'PM MAZ', YM:'PM MAZ COST', YN:'PM MAZ TRANS',
  'YÑ':'PM RAST FORR MOL', YO:'PM FORR COST', YP:'PM FORR', YQ:'PM FORR ALM', YR:'PM FORR MOL', YS:'PM FORR TRANS',
  YT:'PM FAM MAZ SEMS KTAC KCUL', YU:'PM SEMS', YV:'PM SEMS', YW:'PM SEMS ALM',
  YX:'PM GRANO', YY:'PM GRANO COST', YZ:'PM GRANO', XA:'PM GRANO ALM',
  XB:'PM COMP PRECIO GRANO FORR', XC:'PM COMP BASC GRANO', XD:'PM COMP TRANS GRANO FORR', XE:'PM COSTOS INGR KTEC'
};
/* Vínculos estructurales documentados (no ligados a una actividad) */
const LAZOS = [
  // la academia local se vincula con la totalidad de los actores (p. 8)
  ['AL','PM'],['AL','PI'],['AL','AT'],['AL','IAC'],
  // pertenencia institucional de investigadores y extensionistas (pp. 7–8)
  ['IAC','UACH'],['IAC','COLPOS'],['IAC','BUAP'],['IAC','DGTEYCM'],['AT','SDR'],['AT','STP'],['AT','CESV'],['AT','CIMMYT'],
  // retroalimentaciones del ciclo (Fig. 4): la semilla seleccionada vuelve a ser semilla; el rastrojo incorporado vuelve al suelo
  ['SEMS','SEM'],['RAST','SUELO'],['INGR','COSTOS']
];
/* Perfil de impacto de cada elemento sobre cinco compartimentos [suelo, agua, atmósfera, vegetación, fauna], escala −2…+2.
   Lectura de Ratio Telar con su justificación; editable por actividad en el Bloque 4. */
const COMP = [E('Suelo','Soil'),E('Agua','Water'),E('Atmósfera','Atmosphere'),E('Vegetación','Vegetation'),E('Fauna','Fauna')];
const COMP_COL = ['#9a6a3a','#2d78b0','#8a8f86','#5f8f3e','#7a4f9a'];
const IMPACTO = {
  COMB:{v:[0,0,-1,0,0], r:E('Quema de combustible fósil: emisiones de CO₂.','Fossil fuel combustion: CO₂ emissions.')},
  ARADO:{v:[-1,0,0,0,0], r:E('Laboreo de inversión: deja el suelo descubierto y expuesto a erosión.','Inversion tillage leaves soil bare and exposed to erosion.')},
  FERTG:{v:[0,-1,-1,0,0], r:E('Nitrógeno que se lixivia y emite óxido nitroso (IPCC, 2019).','Nitrogen leaching and nitrous oxide emissions (IPCC, 2019).')},
  HERB:{v:[0,-1,0,-1,-1], r:E('Residuos en agua y pérdida de flora asociada y de su fauna.','Residues in water; loss of associated flora and fauna.')},
  INSEC:{v:[0,-1,0,0,-2], r:E('Afecta insectos benéficos y polinizadores.','Harms beneficial insects and pollinators.')},
  RAST:{v:[2,1,1,0,1], r:E('Materia orgánica: estructura, retención de humedad y carbono en el suelo.','Organic matter: structure, moisture retention and soil carbon.')},
  SEM:{v:[0,0,0,2,0], r:E('Conservar la semilla criolla mantiene la agrobiodiversidad.','Conserving landrace seed maintains agrobiodiversity.')},
  SEMS:{v:[0,0,0,2,0], r:E('La selección local renueva y adapta la semilla criolla.','Local selection renews and adapts landrace seed.')},
  HUM:{v:[0,1,0,0,0], r:E('Captar y conservar la humedad aprovecha la lluvia.','Capturing and conserving moisture makes use of rainfall.')},
  LAB:{v:[1,1,0,0,0], r:E('Fertilizar según el análisis de suelo evita excesos.','Fertilising by soil analysis avoids excess.')},
  FORR:{v:[-1,0,0,0,0], r:E('Retirar el rastrojo como forraje deja menos cobertura al suelo.','Removing stover as fodder leaves less soil cover.')}
};
/* Relación compartimento / indicador → ODS para el Bloque 11 (relación propuesta por Ratio Telar). */
const ODS_COMP = {2:[0,3], 6:[1], 13:[2], 15:[0,3,4]};
