// =====================================================================
// 10_stack.js — Stack de Conocimiento Local (SCL) del maíz criollo, Calpan, Puebla
// Fuente única de este módulo:
//   Díaz-José O, Mojica-Zárate HT, Díaz-José J, Vilaboa-Arróniz J. 2026. El conocimiento agrícola
//   local: el stack del maíz criollo en Calpan, Puebla. Agricultura, Sociedad y Desarrollo 23(3).
//   https://doi.org/10.22231/asyd.v23i3.1822
// Todo valor numérico de aquí está publicado en el artículo (se indica la página).
// Lo que es lectura o agrupación de Ratio Telar se marca con  interp:true.
// =====================================================================

const ART = {
  doi: '10.22231/asyd.v23i3.1822',
  cita: 'Díaz-José O, Mojica-Zárate HT, Díaz-José J, Vilaboa-Arróniz J. 2026. El conocimiento agrícola local: el stack del maíz criollo en Calpan, Puebla. Agricultura, Sociedad y Desarrollo 23(3).',
  periodo: '2022–2024', informantes: 100, pasos: 38, actividades: 83, reglas: 5
};

// Las cinco reglas básicas (5B), p. 1 y pp. 9–10
const B5 = [
  {id:'tierra', es:'Buena tierra', en:'Good soil', col:'#9a6a3a',
   d:['Preparación del terreno en tiempo y forma; considera principalmente la captación y el manejo adecuado de la humedad.',
      'Timely land preparation, mainly to capture and manage soil moisture.']},
  {id:'semilla', es:'Buena semilla', en:'Good seed', col:'#d9a441',
   d:['Asegurar la genética adecuada a la zona: preservar los materiales criollos que soportan periodos largos sin agua en el suelo.',
      'Secure locally adapted genetics: preserve landraces that withstand long periods without soil water.']},
  {id:'siembra', es:'Buena siembra', en:'Good sowing', col:'#5f8f3e',
   d:['Establecimiento correcto: arreglos topológicos según la morfología del criollo y el propósito (solo grano o doble propósito), para disminuir la competencia intraespecífica, sobre todo por agua.',
      'Correct establishment: planting arrangements matched to landrace morphology and purpose (grain only or dual purpose) to reduce intraspecific competition, especially for water.']},
  {id:'alimentacion', es:'Buena alimentación', en:'Good nutrition', col:'#2f7d8a',
   d:['Fertilización granular y foliar en los momentos clave identificados por los productores, para una mayor asimilación de los nutrimentos.',
      'Granular and foliar fertilization at the key moments identified by farmers, for better nutrient uptake.']},
  {id:'vigilancia', es:'Buena vigilancia', en:'Good watchfulness', col:'#7a4f9a',
   d:['Seguimiento y monitoreo periódico: efectos visibles de la nutrición, plagas, enfermedades, malezas y humedad adecuada para el paso de arado.',
      'Periodic monitoring: visible nutrition effects, pests, diseases, weeds and adequate moisture for tillage.']},
  {id:'cosecha', es:'Cosecha, poscosecha y balance', en:'Harvest, post-harvest and balance', col:'#8a8f86', interp:true,
   d:['Pasos 31 a 38 de la Figura 4. El artículo no los asigna a una de las 5B; Ratio Telar los agrupa aparte.',
      'Steps 31–38 of Figure 4. The paper does not assign them to one of the 5B; Ratio Telar groups them separately.']}
];

// Los 38 pasos y sus actividades (Figura 4, p. 11), transcritos.
// b: regla 5B (lectura de Ratio Telar a partir de las definiciones; interp)
// v: ventana del calendario leída de la Figura 4 (meses 1–12) o dds: días después de la siembra impresos en la figura
// c: clúster del dendrograma (Figura 3, p. 10), C1…C5 en el orden en que aparecen de izquierda a derecha
// iic: Índice de Intensidad de Conocimiento publicado (p. 10 y p. 12); solo existen 11 valores publicados
const PASOS = [
 {n:1, es:'Evaluación inicial de la parcela', en:'Initial plot assessment', b:'tierra', v:[12], c:3, iic:54.3,
  a:[['A','Inspección visual','Visual inspection'],['B','Colecta de información en campo','Field data collection'],['C','Toma de decisiones (desvaradora o rastra de discos)','Decision (stalk shredder or disc harrow)']]},
 {n:2, es:'Determinación de prácticas de preparación de suelo', en:'Choosing soil-preparation practices', b:'tierra', v:[12], c:4,
  a:[['D','Análisis de información (presencia de malezas y rastrojo) e interpretación de la información','Analysis of information (weeds and stubble) and interpretation']]},
 {n:3, es:'Primer paso de arado', en:'First tillage pass', b:'tierra', v:[12], c:3,
  a:[['E','Trabajo con arado subsoleador','Subsoiler work']]},
 {n:4, es:'Segundo paso de arado', en:'Second tillage pass', b:'tierra', v:[1,2], c:3,
  a:[['F','Trabajo con arado reversible o de discos','Reversible or disc plough work']]},
 {n:5, es:'Tercer paso de arado', en:'Third tillage pass', b:'tierra', v:[2,3], c:3,
  a:[['G','Rastra de discos y vigado','Disc harrowing and levelling']]},
 {n:6, es:'Selección de semilla', en:'Seed selection', b:'semilla', v:[2,3], c:2,
  a:[['H','Elección de mazorca y desgranado','Ear choice and shelling']]},
 {n:7, es:'Tratamiento a la semilla', en:'Seed treatment', b:'semilla', v:[2,3], c:4,
  a:[['I','Adquisición de insumos, bioinsumos, insecticidas, hormonas y microelementos, mezcla de productos, aplicación del tratamiento','Purchase of inputs, bio-inputs, insecticides, hormones and micronutrients; mixing; treatment application']]},
 {n:8, es:'Almacenamiento de semilla', en:'Seed storage', b:'semilla', v:[2,3], c:1, iic:60.0,
  a:[['J','Envasado','Packing'],['K','Etiquetado','Labelling'],['L','Conservación','Preservation']]},
 {n:9, es:'Preparación de la sembradora', en:'Planter preparation', b:'siembra', v:[2,3], c:2,
  a:[['M','Revisión','Inspection'],['N','Limpieza','Cleaning'],['Ñ','Lubricación','Lubrication'],['O','Calibración','Calibration']]},
 {n:10, es:'Determinación de la densidad de siembra', en:'Setting sowing density', b:'siembra', v:[3], c:5, iic:94.3,
  a:[['P','Identificación de objetivos productivos','Defining production goals'],['Q','Arreglos topológicos','Planting arrangements']]},
 {n:11, es:'Estudio previo del clima', en:'Prior weather study', b:'siembra', v:[3], c:4,
  a:[['R','Revisión de pronóstico del tiempo','Checking the weather forecast'],['S','Análisis de fenómenos meteorológicos','Analysis of weather phenomena']]},
 {n:12, es:'Estudio previo de la fase lunar', en:'Prior moon-phase study', b:'siembra', v:[3], c:3,
  a:[['T','Revisar el calendario lunar','Checking the lunar calendar'],['W','Identificar el periodo de siembra','Identifying the sowing period']]},
 {n:13, es:'Análisis de suelo', en:'Soil analysis', b:'alimentacion', v:[2,3], c:2,
  a:[['X','Toma de muestras','Sampling'],['Y','Envío','Shipping'],['Z','Verificación de resultados en plataforma','Checking results online']]},
 {n:14, es:'Elaboración del programa de nutrición del cultivo', en:'Crop nutrition plan', b:'alimentacion', v:[3], c:4,
  a:[['ZA','Determinación de fórmula de fertilización','Fertilizer formula'],['ZB','Fuentes y mezclas a emplearse','Sources and blends to use']]},
 {n:15, es:'Adquisición de fertilizantes', en:'Fertilizer purchase', b:'alimentacion', v:[3], c:5,
  a:[['ZC','Búsqueda de proveedor por calidad y precio','Supplier search by quality and price'],['ZD','Prueba de acidez y humedad','Acidity and moisture test']]},
 {n:16, es:'Realizar la mezcla de fertilizantes', en:'Blending fertilizers', b:'alimentacion', v:[3], c:3,
  a:[['ZE','Mezcla de granulado, evitar presencia de terrones y contaminantes','Granular blend free of clods and contaminants']]},
 {n:17, es:'Determinación de la forma de siembra in situ', en:'Choosing sowing layout in the field', b:'siembra', v:[3], c:5, iic:94.3,
  a:[['ZF','Verificar profundidad de la humedad','Checking moisture depth'],['ZG','Medir en suelo (surcos o líneas)','Measuring in the soil (furrows or rows)']]},
 {n:18, es:'Siembra', en:'Sowing', b:'siembra', v:[3,4], c:5, iic:100, nota:true,
  a:[['ZH','Control de velocidad','Speed control'],['ZI','Verificación visual del funcionamiento correcto de mecanismos y abastecimiento correcto de semillas','Visual check of mechanisms and seed supply']]},
 {n:19, es:'Primera revisión del cultivo', en:'First crop check', b:'vigilancia', dds:[8,15], c:4,
  a:[['ZJ','Determinar porcentaje de germinación','Germination percentage'],['ZK','Evaluación de la calidad de la siembra, despegue del cultivo y presencia de malezas','Sowing quality, crop emergence and weeds']]},
 {n:20, es:'Segunda revisión del cultivo', en:'Second crop check', b:'vigilancia', dds:[20], c:4, iic:80.0,
  a:[['ZL','Evaluar la presencia de plagas y enfermedades','Pests and diseases'],['ZM','Deficiencias nutrimentales','Nutrient deficiencies']]},
 {n:21, es:'Tercera revisión del cultivo', en:'Third crop check', b:'vigilancia', dds:[30], c:4, iic:80.0,
  a:[['ZN','Presencia de maleza, determinación de humedad','Weeds and moisture'],['ZO','Determinación de fecha para el paso de cultivadora','Date for the cultivator pass']]},
 {n:22, es:'Paso de cultivadora', en:'Cultivator pass', b:'vigilancia', dds:[40], c:1,
  a:[['ZP','Revisar uniformidad del cultivo','Crop uniformity'],['ZQ','Profundidad y distancia','Depth and spacing']]},
 {n:23, es:'Fertilización foliar para desarrollo vegetativo (V3–V4)', en:'Foliar feeding for vegetative growth (V3–V4)', b:'alimentacion', dds:[45], c:4, iic:82.9,
  a:[['ZR','Mezclado de productos','Mixing products'],['ZS','pH del agua y coadyuvantes','Water pH and adjuvants']]},
 {n:24, es:'Cajón o escarda', en:'Hilling (escarda)', b:'vigilancia', dds:[50], c:1,
  a:[['ZT','Cuidar la altura del cultivo','Crop height'],['ZU','Altura del implemento','Implement height'],['ZV','Centrado de las rejas, velocidad del trabajo','Share centring, working speed'],['ZW','Elaboración de azacuales','Making azacuales']]},
 {n:25, es:'Cuarta revisión del cultivo', en:'Fourth crop check', b:'vigilancia', dds:[60], c:3, iic:62.9,
  a:[['ZX','Efecto de la fertilización','Fertilization effect'],['ZY','Verificación de la humedad','Moisture check'],['ZZ','Inspección de sanidad del cultivo','Crop health inspection']]},
 {n:26, es:'Quinta revisión del cultivo', en:'Fifth crop check', b:'vigilancia', dds:[75,85], c:4,
  a:[['YA','Inspección del desarrollo de la maleza','Weed development'],['YB','Presencia de plagas y enfermedades','Pests and diseases']]},
 {n:27, es:'Control de malezas', en:'Weed control', b:'vigilancia', dds:[80], c:4,
  a:[['YC','Adquisición, mezcla','Purchase, mixing'],['YD','Aplicación de herbicidas','Herbicide application']]},
 {n:28, es:'Sexta revisión del cultivo', en:'Sixth crop check', b:'vigilancia', dds:[80], c:4,
  a:[['XX','Revisión de la efectividad del herbicida','Herbicide efficacy'],['XY','Valoración de una segunda aplicación','Need for a second application']]},
 {n:29, es:'Fertilización foliar para el llenado de grano', en:'Foliar feeding for grain filling', b:'alimentacion', v:[8,9], c:4,
  a:[['YE','Adquisición','Purchase'],['YF','Mezclado','Mixing'],['YG','Aspersión de micronutrientes','Micronutrient spraying']]},
 {n:30, es:'Séptima revisión del cultivo', en:'Seventh crop check', b:'vigilancia', v:[9], c:2, nota30:true,
  a:[['YH','Valoración del efecto de la aplicación de micronutrientes','Effect of micronutrient application']]},
 {n:31, es:'Corte y amogotamiento', en:'Cutting and stooking', b:'cosecha', v:[10], c:1,
  a:[['YI','Derribo de plantas y arreglo para su secado','Felling plants and arranging them to dry'],['YJ','Conservación de la mazorca en campo','Keeping ears in the field']]},
 {n:32, es:'Cuarto paso de arado', en:'Fourth tillage pass', b:'tierra', v:[10], c:1, iic:60.0,
  a:[['YK','Rastreo para la incorporación de M.O. a la parcela y captación de humedad','Harrowing to incorporate organic matter and capture moisture']]},
 {n:33, es:'Pizca de la mazorca en campo', en:'Hand-picking ears in the field', b:'cosecha', v:[10,11], c:1,
  a:[['YL','Extracción','Extraction'],['YM','Encostalado','Bagging'],['YN','Transporte','Transport']]},
 {n:34, es:'Obtención de forraje', en:'Fodder production', b:'cosecha', v:[11], c:1,
  a:[['YÑ','Molienda','Grinding'],['YO','Encostalado','Bagging'],['YP','Cocido','Cooking'],['YQ','Almacenamiento','Storage'],['YR','Empacado','Baling'],['YS','Transporte','Transport']]},
 {n:35, es:'Selección de mazorcas para semilla', en:'Selecting ears for seed', b:'semilla', v:[11], c:2,
  a:[['YT','Valoración visual','Visual assessment'],['YU','Separación','Separation'],['YV','Desgranado','Shelling'],['YW','Almacenaje','Storage']]},
 {n:36, es:'Obtención del grano', en:'Grain production', b:'cosecha', v:[11], c:1, iic:62.9,
  a:[['YX','Desgranado','Shelling'],['YY','Encostalado','Bagging'],['YZ','Tratamiento','Treatment'],['XA','Almacenaje','Storage']]},
 {n:37, es:'Comercialización de grano y forraje', en:'Selling grain and fodder', b:'cosecha', v:[11], c:5,
  a:[['XB','Determinación de fecha de venta','Choosing the sale date'],['XC','Pesado','Weighing'],['XD','Transporte','Transport']]},
 {n:38, es:'Balance de resultados', en:'Results balance', b:'cosecha', v:[11], c:5,
  a:[['XE','Cuantificación de ingresos netos, costos de producción e identificación de áreas de oportunidad y mejora','Net income, production costs and areas for improvement']]}
];
// Dendrograma (Figura 3): hojas por clúster, de izquierda a derecha
const CLUSTERS = [
  {id:1, hojas:[33,31,36,24,22,34,8,32], col:'#c0504d'},
  {id:2, hojas:[9,30,6,13,35], col:'#c9b03a'},
  {id:3, hojas:[5,16,1,25,12,3,4], col:'#5a9a4a'},
  {id:4, hojas:[7,14,21,2,19,11,29,20,23,27,26,28], col:'#3f6fb0'},
  {id:5, hojas:[18,10,17,38,15,37], col:'#8a5aa8'}
];
// Cinco grupos de conocimiento (pp. 12–13). El artículo no dice qué color del dendrograma corresponde a cada grupo.
const GRUPOS = [
  {es:'Gestión tradicional y prácticas manuales', en:'Traditional management and manual practices',
   d:['Conocimiento cultural y tácito, transmitido por la experiencia y la tradición familiar; baja intervención tecnológica y fuerte vínculo con la memoria agrícola del territorio.','Cultural, tacit knowledge passed on through experience and family tradition; low technological intervention and strong ties to the area\'s farming memory.']},
  {es:'Alta estandarización y planeación', en:'High standardization and planning',
   d:['Conocimiento explícito (investigación, capacitación, innovación): planificación de siembras, calendarios, adopción de insumos y criterios técnicos.','Explicit knowledge (research, training, innovation): sowing plans, calendars, input adoption and technical criteria.']},
  {es:'Operación técnica repetitiva', en:'Repetitive technical operation',
   d:['Tareas recurrentes estandarizadas cuya buena ejecución depende de la habilidad práctica y del conocimiento tácito de parcela.','Recurrent standardized tasks whose execution depends on practical skill and tacit field knowledge.']},
  {es:'Manejo del cultivo', en:'Crop management',
   d:['Conocimiento ambiental y social: monitoreo del cultivo, observación del clima, plagas y enfermedades, decisiones con experiencia colectiva.','Environmental and social knowledge: crop monitoring, weather observation, pests and diseases, decisions based on shared experience.']},
  {es:'Innovación y estrategia', en:'Innovation and strategy',
   d:['El componente más dinámico: productividad y eficiencia con conocimientos técnicos, datos y recomendaciones de investigación, extensionismo o proveedores.','The most dynamic component: productivity and efficiency through technical knowledge, data and advice from research, extension or suppliers.']}
];
// Tipos/capas de conocimiento mencionados (p. 1 y p. 5)
const CAPAS = [['tácito','tacit'],['cultural','cultural'],['técnico','technical'],['ambiental','environmental']];

// Red de actores clave (pp. 8–9, Figura 2). Solo métricas publicadas.
const ACTORES = [
  {id:'PM', es:'Productores de maíz criollo', en:'Landrace maize farmers', cent:[11,14]},
  {id:'PI', es:'Proveedores de insumos', en:'Input suppliers', cent:[11,14]},
  {id:'AT', es:'Asesores técnicos', en:'Technical advisers', cent:[11,14], inter:5.33},
  {id:'IAC', es:'Investigadores académicos', en:'Academic researchers', cent:[11,14]},
  {id:'AL', es:'Academia local (CBTA 255)', en:'Local academia (CBTA 255)', cent:[16,16], inter:12.33}
];
const RED_PUB = {cercania:[0.50,0.95], leverage:'>1 en algunos PM, PI y AT'};
// Participantes por ciclo (Cuadro 1, p. 7)
const CUADRO1 = [
  {ciclo:'2022–2023', PM:10, PI:3, IAC:4, AT:4, rec:{siembra:3, veg:6, rep:4, cos:2}},
  {ciclo:'2023–2024', PM:15, PI:5, IAC:7, AT:5, rec:{siembra:4, veg:5, rep:3, cos:3}},
  {ciclo:'2024',      PM:30, PI:7, IAC:5, AT:5, rec:{siembra:5, veg:10, rep:4, cos:3}}
];

// Calpan, Puebla (p. 6) + INEGI 2020 (catálogo)
const CALPAN = {
  cve:'21026', coord:'19°06′14.08″ N, 98°27′28.66″ O',
  limites:{N:['Huejotzingo','Domingo Arenas'], S:['Nealtican'], E:['San Pedro Cholula','San Andrés Cholula'], O:['San Nicolás de los Ranchos']},
  pobArt:16000, mujeres:52, hombres:48, cabecera:72, juntas:28,
  comunidades:[['Calpan (cabecera municipal)', 72],['San Mateo Ozolco (junta auxiliar)', null],['San Lucas Atzala (junta auxiliar)', null]],
  pea:4882, peaPrim:50, peaTransf:15, peaServ:35,
  sistemas:[['Milpa (maíz–frijol–calabaza)','Milpa (maize–bean–squash)'],['MIAF (maíz intercalado con árboles frutales)','MIAF (maize intercropped with fruit trees)']],
  frutales:[['Tejocote','Crataegus mexicana'],['Pera lechera','Pyrus communis'],['Nuez de castilla','Juglans regia'],['Manzana panochera','Malus domestica'],['Durazno','Prunus persica'],['Capulín','Prunus serotina']],
  up:'< 5 ha', rend:[5,6],
  parcelas:[['El Llano',1.8],['Contigua',1.5],['«Los Tejocotes», ejido Calpan',null],['Demostrativa San Nicolás de los Ranchos',null]],
  clima:['El Niño y La Niña','temporada de ciclones del Atlántico','Oscilación Madden-Julian','Oscilación Ártica']
};
// Contexto nacional citado en el artículo (pp. 1–2)
const CONTEXTO = {razas:[59,64], razasPuebla:22, estadosDiversos:['Puebla','Oaxaca','Chiapas','Jalisco','Guerrero'], upMenores5:72,
  ods:[2,15], programas:['Sembrando Vida','Producción para el Bienestar'], extensible:['frijol','chile','cacao','maguey','aguacate']};
