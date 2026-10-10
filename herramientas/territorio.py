"""Genera src/11_territorio.js a partir del catálogo oficial del INEGI (Marco Geoestadístico, población del Censo 2020)
descargado en fuentes/datos/mgem/*.json y fuentes/datos/inegi_mgee.json.
Regiones: Banco de México, Reporte sobre las Economías Regionales (norte, centro norte, centro, sur)."""
import json, glob, os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(R, 'fuentes', 'datos')
REG = {'N': ['02','05','08','19','26','28'],
       'CN': ['01','03','06','10','14','16','18','24','25','32'],
       'C': ['09','11','13','15','17','21','22','29'],
       'S': ['04','07','12','20','23','27','30','31']}
reg = {e: k for k, v in REG.items() for e in v}
est = json.load(open(os.path.join(D, 'inegi_mgee.json'), encoding='utf-8'))['datos']
assert len(est) == 32 and len(reg) == 32
E = [[e['cve_ent'], e['nomgeo'], e['nom_abrev'], reg[e['cve_ent']], int(e['pob_total'])] for e in est]
M = {}
n = 0
for f in sorted(glob.glob(os.path.join(D, 'mgem', '*.json'))):
    for m in json.load(open(f, encoding='utf-8'))['datos']:
        p = m.get('pob_total'); v = m.get('total_viviendas_habitadas')
        M.setdefault(m['cve_ent'], []).append([m['cve_mun'], m['nomgeo'], int(p) if p else None, int(v) if v else None])
        n += 1
js = ('// Generado por herramientas/territorio.py — NO editar a mano.\n'
      '// Fuente: INEGI, Catálogo Único de Claves Geoestadísticas (servicio wscatgeo v2), población y viviendas del Censo de Población y Vivienda 2020.\n'
      '// Regiones: Banco de México, Reporte sobre las Economías Regionales.\n'
      'const TERR = ' + json.dumps({'estados': E, 'municipios': M}, ensure_ascii=False, separators=(',', ':')) + ';\n')
open(os.path.join(R, 'src', '11_territorio.js'), 'w', encoding='utf-8', newline='\n').write(js)
print('estados', len(E), 'municipios', n, 'KB', len(js.encode()) // 1024)
