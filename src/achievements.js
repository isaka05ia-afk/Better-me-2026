import {key,dateAgo} from './model.js';
const habit=(key,name,description,mode='build',starter=null)=>({key,name,description,mode,starter});
export const templates={
 porn:habit('porn','Undvika porr','Bekräfta själv att du hållit ditt mål idag.','avoid','start-3'),
 scroll:habit('scroll','Undvika doomscrolling','Håll din egen valda gräns för scrollande.','avoid','start-2'),
 nonut:habit('nonut','Mitt mål att avstå från onani','Ett frivilligt personligt mål, separat från porrfrihet.','avoid'),
 train:habit('train','Träna','Ett pass eller en rörelseaktivitet som passar dig.','build','start-0'),
 read:habit('read','Läsa eller lyssna','Läs eller lyssna en stund.','build','start-1'),
 water:habit('water','Dricka tillräckligt med vatten','Drick efter dina behov under dagen.','build','start-4'),
 focus:habit('focus','Göra något produktivt','Gör en meningsfull uppgift.','build','start-5'),
 walk:habit('walk','Ta en promenad','En kort promenad eller ett tillgängligt alternativ.'),
 sleep:habit('sleep','Min kvällsrutin','Varva ner vid en tid du själv väljer.'),
 social:habit('social','Ha kontakt med någon','Ett samtal, ett meddelande eller tid tillsammans.'),
 tidy:habit('tidy','Ordna min plats','Plocka undan en liten yta.'),
 create:habit('create','Skapa något','Skriv, rita, spela musik eller skapa på ditt sätt.'),
 reflect:habit('reflect','Reflektera över dagen','Skriv eller tänk på en sak som hjälpte dig.'),
 screen:habit('screen','En skärmfri stund','Välj en stund utan skärm.'),
 learn:habit('learn','Lära mig något','Ägna en stund åt något du vill förstå.'),
 stretch:habit('stretch','En lugn rörelsepaus','Rör dig mjukt på ett sätt som passar din kropp.')
};
export const paths=[
 ['freedom','Freedom Fighter','Porrfrihet','🛡️',['porn'],'Bekräftade dagar utan porr.'],
 ['doom','Doomscroll Defender','Digital balans','📵',['scroll'],'Dagar då du höll din egen scrollgräns.'],
 ['nonut','No Nut','Personligt val','👑',['nonut'],'Frivilligt mål att avstå från onani. Inga hälsofördelar utlovas.'],
 ['body','Body Builder','Rörelse','💪',['train'],'Dagar med träning på din nivå. Vila får ta plats mellan dagarna.'],
 ['reader','Easy Peasy Explorer','Läsning','📖',['read'],'Dagar med läsning eller lyssnande.'],
 ['water','Water Guardian','Vardag','💧',['water'],'Dagar då du fyllde ditt eget vattenmål.'],
 ['focus','Focus Knight','Fokus','⚔️',['focus'],'Dagar med en meningsfull uppgift.'],
 ['outside','Outside Adventurer','Utomhus','🌿',['walk'],'Dagar med en promenad eller ditt alternativ.'],
 ['night','Night Guardian','Återhämtning','🌙',['sleep'],'Dagar då du följde din kvällsrutin.'],
 ['friend','Connection Keeper','Relationer','🤝',['social'],'Dagar med en liten social kontakt.'],
 ['space','Space Keeper','Hem','🏡',['tidy'],'Dagar med lite ordning omkring dig.'],
 ['maker','Creative Mage','Skapande','🎨',['create'],'Dagar då du gav plats åt skapande.'],
 ['mind','Mindful Hero','Reflektion','🧭',['reflect'],'Dagar med en egen reflektion.'],
 ['balance','Digital Freedom','Kombination','🦅',['porn','scroll','screen'],'Samma dag: ditt porrmål, scrollmål och en skärmfri stund.'],
 ['growth','Growth Adventurer','Kombination','🌱',['learn','focus'],'Samma dag: lärande och en meningsfull uppgift.'],
 ['restore','Recovery Ranger','Kombination','☀️',['sleep','stretch','reflect'],'Samma dag: kvällsrutin, lugn rörelse och reflektion.']
].map(([id,name,category,icon,required,description])=>({id,name,category,icon,required,description}));
export const tiers=[{days:7,label:'En vecka'},{days:14,label:'Två veckor'},{days:30,label:'En månad'},{days:60,label:'Två månader'},{days:90,label:'Tre månader'},{days:180,label:'Ett halvår'},{days:365,label:'Ett år'},{days:730,label:'Två år'}];
export const achievements=paths.flatMap(p=>tiers.map(t=>({...p,id:`${p.id}-${t.days}`,pathId:p.id,days:t.days,title:p.id==='nonut'&&t.days===365?'No Nut Year':p.id==='nonut'&&t.days===730?'No Nut Legend – två år':`${p.name} · ${t.label}`})));
export function matchingHabit(data,k){const t=templates[k];return data.habits.find(h=>!h.archived&&(h.challengeKey===k||(t.starter&&h.id===t.starter)||h.name.trim().toLocaleLowerCase('sv')===t.name.toLocaleLowerCase('sv')))}
export function enroll(data,a,today=key(new Date())){let habits=[...data.habits];for(const k of a.required){const t=templates[k],found=matchingHabit({...data,habits},k);if(found){habits=habits.map(h=>h.id===found.id?{...h,challengeKey:k,mode:t.mode}:h)}else habits.push({id:crypto.randomUUID(),name:t.name,description:t.description,mode:t.mode,challengeKey:k,icon:a.icon,color:'#b9ef79',days:[0,1,2,3,4,5,6],target:7,reminder:'',created:today,archived:false})}return {...data,habits}}
export function pathProgress(data,path,today=key(new Date())){const hs=path.required.map(k=>matchingHabit(data,k));if(hs.some(h=>!h))return {count:0,missing:true};const dates=new Set([...Object.keys(data.checks),...Object.keys(data.confirmations||{})]);let n=0;for(const d of dates){if(d>today)continue;const good=hs.every(h=>{if(d<h.created)return false;if(h.mode==='avoid'){return !!data.confirmations?.[d]?.includes(h.id)&&!data.events.some(e=>e.type==='relapse'&&e.habit===h.name&&key(new Date(e.time))===d)}return !!data.checks[d]?.includes(h.id)});if(good)n++}return {count:n,missing:false}}
export function awardNew(data,today=key(new Date())){const awards={...data.awards};let changed=false;for(const path of paths){const progress=pathProgress(data,path,today).count;for(const t of tiers){const id=`${path.id}-${t.days}`;if(progress>=t.days&&!awards[id]){awards[id]=today;changed=true}}}return changed?{...data,awards}:data}
