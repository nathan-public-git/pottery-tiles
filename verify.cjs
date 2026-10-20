const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('app.js','utf8');
const seed=source.slice(0,source.indexOf('let data,editing='));
const data=vm.runInNewContext(seed+';initialData()');
assert.equal(data.tiles.length,60);
const counts={};for(const t of data.tiles)counts[t.method]=(counts[t.method]||0)+1;
assert.deepEqual(counts,{'Colour only':18,'White overlay':18,'White reference':3,'Side by side':6,'Heavy overlap':3,Unassigned:12});
for(let s=1;s<=3;s++)for(let g=0;g<6;g++){const a=data.tiles[(s-1)*15+g*2],b=data.tiles[(s-1)*15+g*2+1];assert.equal(a.series,s);assert.equal(a.glazes[0],['Lemon Zest','Cherry Bomb','Purple Crystal','Floating Lavender','Titanic Wave','Purple Haze'][g]);assert.equal(a.method,'Colour only');assert.equal(b.glazes[0],a.glazes[0]);assert.equal(b.method,'White overlay')}
assert.equal(data.underglazes.length,10);assert(data.underglazes.every(u=>!u.name));assert.equal(data.tiles[46].glazes.join(','),'Purple Haze,Cherry Bomb');assert(data.tiles.every(t=>t.photos.length===0));assert.equal(data.firings[0].date,'');
console.log('Passed: 60 records, exact standard matrix, experiment counts, 10 blank underglazes, and unknown firing data.');
const published=JSON.parse(fs.readFileSync('collection.json','utf8'));
const validateSource=source.slice(source.indexOf('function validate(d)'),source.indexOf("$('#importFile').onchange"));
vm.runInNewContext(validateSource+';validate(input)',{input:published});
assert.equal(published.tiles.filter(t=>t.photos.length).length,15);
for(let i=0;i<15;i++){const p=published.tiles[i].photos[0];assert.equal(p.id,`series-1-tile-${i+1}`);assert(fs.existsSync(p.original));assert(p.crop.x+p.crop.w<=1);assert(p.crop.y+p.crop.h<=1)}
console.log('Passed: 15 numbered photo regions, valid source references and region bounds.');
