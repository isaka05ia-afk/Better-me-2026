import {dailyXP} from './daily.js';
const forms=[
 ['Ett litet ägg','En liten början, tryggt i boet.'],
 ['Nykläckt äventyrare','Ett nyfiket litet ansikte kikar fram ur skalet.'],
 ['Ung drakkompis','De första små vingarna börjar bära.'],
 ['Modig följeslagare','Små horn och fenor växer fram.'],
 ['Legendarisk drake','En välbekant form från din första resa.'],
 ['Mossrygg','Mjuka löv och skogens färger följer med dig.'],
 ['Lykttändare','En egen liten lykta lyser upp nästa steg.'],
 ['Bäckväktare','Vattenpärlor dansar kring svansen.'],
 ['Skogsflygare','Större vingar öppnar nya vägar.'],
 ['Bärnstensvinge','Varm bärnsten glimmar i svanstippen.'],
 ['Månspanare','En liten månskära visar vägen genom kvällen.'],
 ['Norrskensdrake','Ett eget norrsken följer vingarnas rörelser.'],
 ['Kristallväktare','Lila kristaller växer längs ryggen.'],
 ['Glödvävare','En varm glöd lyser i bröstet.'],
 ['Stormhjärta','Blixtmönster pryder de starka vingarna.'],
 ['Stjärnseglare','Små stjärnor kretsar kring din följeslagare.'],
 ['Solväktare','En gyllene solkrans lyser bakom draken.'],
 ['Nebulosavandrare','Vingarna bär mönster från en hel natthimmel.'],
 ['Tidväktare','En stjärnklocka berättar om alla steg ni tagit.'],
 ['Evighetsdrake','En skimrande krona av stjärnljus kröner resan.']
];
export const dragonStages=forms.map(([name,hint],i)=>({name,hint,level:1+i*(i+1)/2,min:(i*(i+1)/2)*200}));
export function migrateDragon(data){if(data.dragonEvolutionVersion===2)return data;const completed=new Set((data.questRuns||[]).filter(r=>r.completedAt).map(r=>r.questId)).size;const raw=Math.max(data.dragonBestScore||0,Object.values(data.checks).reduce((n,a)=>n+a.length*20,0)+dailyXP(data)+completed*40);let legacy=0;[0,20,200,1000,5000].forEach((v,i)=>{if(raw>=v)legacy=i});return {...data,dragonEvolutionVersion:2,dragonBestScore:Math.max(raw,dragonStages[legacy].min)}}
export function dragonInfo(data){const completed=[...new Map((data.questRuns||[]).filter(r=>r.completedAt).map(r=>[r.questId,r])).values()];const xp=Object.values(data.checks).reduce((n,a)=>n+a.length*20,0)+dailyXP(data);const score=Math.max(data.dragonBestScore||0,xp+completed.length*40);let stage=0;dragonStages.forEach((s,i)=>{if(score>=s.min)stage=i});const sins=new Set(completed.filter(r=>r.questId.startsWith('sin-')).map(r=>r.questId.split('-')[1]));const rewards=[{id:'none',name:'Bara draken',icon:'🐉',unlocked:true,rule:'Din följeslagare från början'},{id:'scarf',name:'Äventyrshalsduk',icon:'🧣',unlocked:completed.length>=1,rule:'Klara ett uppdrag'},{id:'backpack',name:'Upptäckarryggsäck',icon:'🎒',unlocked:completed.length>=3,rule:'Klara tre olika uppdrag'},{id:'star',name:'Stjärnmedalj',icon:'⭐',unlocked:completed.length>=7,rule:'Klara sju olika uppdrag'},{id:'helmet',name:'Bosshjälm',icon:'🛡️',unlocked:completed.some(r=>r.questId.startsWith('impossible-')),rule:'Klara ett The 10 Impossible-uppdrag'},{id:'halo',name:'Sju bossars gloria',icon:'✨',unlocked:sins.size>=7,rule:'Klara en nivå för var och en av de sju Sins-bossarna'},{id:'brush',name:'Kreatörspensel',icon:'🖌️',unlocked:completed.filter(r=>r.questId.startsWith('creative-')).length>=5,rule:'Klara fem olika Creative Lab-uppdrag'},{id:'crown',name:'Legendkrona',icon:'👑',unlocked:completed.some(r=>r.questId.startsWith('legend-')),rule:'Klara ett Legend-uppdrag'}];const selected=rewards.find(r=>r.id===data.dragonAccessory&&r.unlocked)?.id||'none';return {xp,score,stage,level:Math.floor(score/200)+1,next:dragonStages[stage+1],current:dragonStages[stage],rewards,selected,completed:completed.length}}
