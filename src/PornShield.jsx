import React,{useEffect,useState} from 'react';
const messages=[
'Du kan känna sug och ändå välja något annat. Nästa lilla handling är din.',
'Du behöver inte lösa hela framtiden nu. Ta hand om de närmaste två minuterna.',
'Ett svårt ögonblick säger inget om ditt värde. Behandla dig själv med respekt.',
'Om det inte gick som du ville kan du stanna här. Ett avsteg behöver inte fortsätta.',
'Det är okej att be någon om sällskap. Du behöver inte bära det här ensam.',
'Du får lämna skärmen även om suget fortfarande finns kvar.'
];
const tasks=[
'Stäng sidan eller appen med porr. Lägg telefonen utom räckhåll och gå till ett annat rum i två minuter.',
'Res dig upp, fyll ett glas vatten och drick det någon annanstans än vid skärmen.',
'Gå utanför dörren eller till ett fönster. Lägg märke till fem saker du kan se.',
'Gör en liten praktisk uppgift: bädda sängen, diska en kopp eller plocka undan fem saker.',
'Skriv till någon du litar på: ”Har du tid att prata en stund?” Du väljer själv vad du vill berätta.',
'Lägg undan skärmen och sträck på kroppen försiktigt i två minuter. Välj en rörelse som känns bra för dig.'
];
const pick=items=>items[Math.floor(Math.random()*items.length)];
export default function PornShield({onJournal}){const [message,setMessage]=useState(()=>pick(messages)),[task,setTask]=useState(()=>pick(tasks)),[remaining,setRemaining]=useState(90),[running,setRunning]=useState(false),[reason,setReason]=useState(()=>{try{return localStorage.getItem('better-me-reason')||''}catch{return ''}}),[storageError,setStorageError]=useState('');
useEffect(()=>{if(!running)return;const end=Date.now()+remaining*1000;const t=setInterval(()=>{const r=Math.max(0,Math.ceil((end-Date.now())/1000));setRemaining(r);if(!r)setRunning(false)},250);return()=>clearInterval(t)},[running]);
return <div className="porn-shield"><span className="eyebrow green">SUGSKYDD · PORR</span><h2>Du behöver inte agera på suget.</h2><p>Välj det stöd som passar just nu. Inget av alternativen kräver att du känner dig motiverad.</p><section><h3>1. En röst av stöd</h3><blockquote>{message}</blockquote><p className="muted">Egenskriven stödtext – inte ett autentiskt vittnesmål.</p><button className="secondary" onClick={()=>setMessage(pick(messages))}>En annan stödtext</button></section><section><h3>2. Gör något konkret</h3><p className="shield-task">{task}</p><button className="primary" onClick={()=>setTask(pick(tasks))}>Ge mig ett annat alternativ</button></section><section><h3>3. Ta en paus</h3><p>Andas lugnt i din egen takt. Lägg märke till känslan utan att behöva följa den. Timern är en paus, inget löfte om att suget försvinner.</p><div className="pause-timer" role="timer" aria-label={`${remaining} sekunder kvar`}>{Math.floor(remaining/60)}:{String(remaining%60).padStart(2,'0')}</div><button className="secondary" onClick={()=>{if(!remaining)setRemaining(90);setRunning(!running)}}>{running?'Pausa':remaining?'Starta paus':'Ta en ny paus'}</button><p className="muted">Du får lämna skärmen direkt. Du behöver inte vänta på timern.</p></section><section><h3>4. Kom ihåg ditt varför</h3><label>Vad vill du ge mer plats åt?<textarea maxLength={500} placeholder="Till exempel sömn, närvaro eller tid för något jag tycker om…" value={reason} onChange={e=>{setReason(e.target.value);try{localStorage.setItem('better-me-reason',e.target.value);setStorageError('')}catch{setStorageError('Texten kunde inte sparas på enheten.')}}}/></label><p className="muted">{storageError||'Sparas bara på din enhet. Detta fält ingår inte i appens JSON-säkerhetskopia.'}</p></section><button className="primary full" onClick={onJournal}>Registrera sug eller reflektera</button><p>Om det blev ett återfall: stäng innehållet, byt miljö och börja om med en liten handling. Tidigare framsteg finns kvar.</p></div>}
