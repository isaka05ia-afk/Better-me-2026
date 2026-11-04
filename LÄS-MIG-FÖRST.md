# Better Me – få din egen webblänk utan terminal

Det här paketet innehåller en React/Vite-app. Du ska INTE öppna index.html direkt eller ladda upp källkodsmappen till Netlify Drop. Netlify ska bygga appen enligt stegen nedan. Ingen installation behövs på din dator eller telefon.

Status: appens logik har kontrollerats med automatiska tester. Hela React-bygget och installation/offline på Android kunde inte verifieras i leveransmiljön eftersom hämtning av byggverktyg blockerades. Netlify behöver därför bygga projektet innan det kan användas.

## 1. Packa upp

Ladda ner ZIP-filen och välj Extrahera/Packa upp. En dator gör uppladdningen enklast, men ingen programmering behövs.

## 2. Lägg filerna på GitHub

1. Öppna https://github.com och skapa ett gratis konto eller logga in.
2. Klicka på + och New repository.
3. Skriv better-me som namn. Välj Private om du vill hålla din källkod privat. Appens egna uppgifter sparas bara i din webbläsare.
4. Klicka Create repository.
5. Klicka uploading an existing file på den nya sidan (eller Add file → Upload files).
6. Öppna den uppackade mappen better-me. Dra in INNEHÅLLET i mappen, inklusive mapparna src och public. Ladda inte upp ZIP-filen eller själva överordnade mappen. package.json, index.html, vite.config.js och netlify.toml ska ligga direkt i projektets rot.
7. Klicka Commit changes längst ner.

## 3. Låt Netlify skapa din webblänk

1. Öppna https://app.netlify.com och registrera dig/logga in med GitHub. Välj ett gratisalternativ; betalda tillägg behövs inte för appen. Leverantörens aktuella gratisgränser gäller.
2. Välj Add new project/Add new site → Import an existing project.
3. Välj GitHub och tillåt åtkomst till ditt better-me-projekt.
4. Välj better-me.
5. Kontrollera: Build command = npm run build. Publish directory = dist. Base directory lämnas tom.
6. Klicka Deploy/Publish. Vänta tills status är Published.
7. Klicka på adressen som slutar med .netlify.app. Det är din fungerande webblänk. Du kan ändra webbplatsens namn i Netlifys inställningar om namnet är ledigt.

Din webbplats kan öppnas utan inloggning. GitHub- och Netlify-kontona behövs bara för publiceringen. Varje besökare har sin egen lokala data. Publiceringsleverantören hanterar vanliga webbtrafikuppgifter; vanor och journal skickas inte av appen till någon server.

## 4. Installera på Android

1. Öppna din .netlify.app-adress i Chrome på Android (inte inuti en annan apps inbyggda webbläsare).
2. Låt sidan ladda klart. Under Profil ska det stå att offline-stödet är klart.
3. Tryck ⋮ i Chrome → Lägg till på startskärmen → Installera. Orden kan variera med Chrome-versionen. Du kan också använda knappen under Profil.
4. Öppna Better Me med den nya ikonen.
5. Testa offline: stäng appen, slå på flygplansläge och öppna den igen. Den ska öppnas och kunna spara vanor. Slå sedan av flygplansläget.

Ingen APK, Android Studio eller terminal behövs.

## 5. Snabbkontroll

- Markera en vana. Procent och XP ska öka. Ladda om sidan och kontrollera att markeringen finns kvar.
- Skapa/redigera en vana under Vanor. Valda veckodagar avgör när den visas. Veckomålet visar antal avklarade dagar den här veckan.
- Välj Jag känner ett sug på startsidan för en konkret strategi och journalföring. Journalen nås också via Öppna min reflektionsjournal.
- Under Profil: Exportera säkerhetskopia. Importera filen och bekräfta för att återställa data. Import ersätter nuvarande data.
- Ett återfall tar inte bort XP eller historik. Streak betyder dagar i rad med minst en registrerad avklarad vana; det är inte en automatiskt övervakad nykterhets-/avhållsamhetsmätare.

## Viktigt att känna till

- Påminnelser kräver notistillstånd och att appen är öppen. Inga bakgrundspåminnelser utlovas.
- Data finns bara på den enhet, i den webbläsare och på den webbadress där du använder appen. Rensad webbläsardata kan inte återskapas utan en exporterad kopia.
- Exportera innan du byter enhet eller webbplatsadress. Importera sedan på den nya adressen.
- Om bygget misslyckas: öppna Netlify → Deploys → senaste bygget → Deploy log. Kopiera feltexten och be om hjälp. Skicka aldrig din privata JSON-säkerhetskopia för att felsöka ett byggfel.

## Alternativ: Vercel

Öppna https://vercel.com → Add New Project → importera samma GitHub-projekt → Framework Vite → Build npm run build → Output dist → Deploy. Välj gratisalternativ om projektet omfattas av dess villkor. Använd den skapade HTTPS-adressen i Android-guiden.
