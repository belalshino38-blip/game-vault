const firebaseConfig = {
    apiKey: "AIzaSyAP2LzTvtVVb0_eTH_4kSwF6GtuBvZlFqA",
    authDomain: "game-vault1.firebaseapp.com",
    databaseURL: "https://game-vault1-default-rtdb.firebaseio.com",
    projectId: "game-vault1",
    storageBucket: "game-vault1.firebasestorage.app",
    messagingSenderId: "23799161276",
    appId: "1:23799161276:web:4427b209cae7422d0d4bb9",
    measurementId: "G-K21DZ70JQM"
};
const ADMIN_UID = "YOUR_ADMIN_UID_HERE";

function isConfigValid() {
    return firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("YOUR") &&
        firebaseConfig.authDomain && !firebaseConfig.authDomain.includes("YOUR") &&
        firebaseConfig.projectId && !firebaseConfig.projectId.includes("YOUR") &&
        firebaseConfig.appId && !firebaseConfig.appId.includes("YOUR");
}

function autoParseConfig() {
    const paste = document.getElementById("configPaste").value;
    const errorEl = document.getElementById("setupError");
    try {
        const extract = (k) => { const m = paste.match(new RegExp(k + '\\s*:\\s*["\']([^"\']+)["\']', 'i')); return m ? m[1].trim() : ""; };
        const apiKey = extract("apiKey"), authDomain = extract("authDomain"), databaseURL = extract("databaseURL"), projectId = extract("projectId"), storageBucket = extract("storageBucket"), messagingSenderId = extract("messagingSenderId"), appId = extract("appId"), measurementId = extract("measurementId");
        if (!apiKey || !authDomain || !projectId) { errorEl.textContent = "Could not parse config."; errorEl.style.display = "block"; return; }
        document.getElementById("cfgApiKey").value = apiKey;
        document.getElementById("cfgAuthDomain").value = authDomain;
        document.getElementById("cfgDatabaseURL").value = databaseURL;
        document.getElementById("cfgProjectId").value = projectId;
        document.getElementById("cfgStorageBucket").value = storageBucket;
        document.getElementById("cfgMessagingSenderId").value = messagingSenderId;
        document.getElementById("cfgAppId").value = appId;
        document.getElementById("cfgMeasurementId").value = measurementId;
        errorEl.textContent = "All fields auto-filled! Click 'Save & Launch App' below.";
        errorEl.style.color = "var(--success)";
        errorEl.style.display = "block";
    } catch (e) { errorEl.textContent = "Parse error: " + e.message; errorEl.style.display = "block"; }
}

function saveConfig() {
    const apiKey = document.getElementById("cfgApiKey").value.trim();
    const authDomain = document.getElementById("cfgAuthDomain").value.trim();
    const databaseURL = document.getElementById("cfgDatabaseURL").value.trim();
    const projectId = document.getElementById("cfgProjectId").value.trim();
    const storageBucket = document.getElementById("cfgStorageBucket").value.trim();
    const messagingSenderId = document.getElementById("cfgMessagingSenderId").value.trim();
    const appId = document.getElementById("cfgAppId").value.trim();
    const measurementId = document.getElementById("cfgMeasurementId").value.trim();
    const errorEl = document.getElementById("setupError");
    if (!apiKey || !authDomain || !databaseURL || !projectId || !storageBucket || !messagingSenderId || !appId || !measurementId) {
        errorEl.textContent = "Please fill in all 8 fields.";
        errorEl.style.display = "block";
        return;
    }
    localStorage.setItem("gameVault_firebaseConfig", JSON.stringify({ apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId, measurementId }));
    location.reload();
}

const savedCfg = localStorage.getItem("gameVault_firebaseConfig");
if (savedCfg) { try { Object.assign(firebaseConfig, JSON.parse(savedCfg)); } catch (e) { console.error(e); } }

function generateGames() {
    const known = ["The Witcher 3", "Red Dead Redemption 2", "Elden Ring", "God of War", "The Last of Us", "Cyberpunk 2077", "Breath of the Wild", "Super Mario Odyssey", "Hollow Knight", "Hades", "Dark Souls 3", "Sekiro", "Bloodborne", "Horizon Zero Dawn", "Ghost of Tsushima", "Spider-Man", "Uncharted 4", "Metal Gear Solid V", "Skyrim", "Fallout 4", "Mass Effect 2", "Dragon Age Inquisition", "Baldur's Gate 3", "Divinity Original Sin 2", "Stardew Valley", "Terraria", "Minecraft", "Portal 2", "Half-Life 2", "Doom Eternal", "Wolfenstein II", "BioShock Infinite", "Borderlands 3", "Destiny 2", "Halo Infinite", "Gears 5", "Forza Horizon 5", "Gran Turismo 7", "FIFA 23", "NBA 2K23", "Madden NFL 23", "Rocket League", "Fortnite", "Apex Legends", "Valorant", "Counter-Strike 2", "Overwatch 2", "League of Legends", "Dota 2", "World of Warcraft", "Final Fantasy XIV", "Genshin Impact", "Honkai Star Rail", "Persona 5", "Final Fantasy VII Remake", "Resident Evil 4", "Dead Space", "Alan Wake 2", "Control", "Dishonored 2", "Prey", "Deus Ex Mankind Divided", "Hitman 3", "Assassin's Creed Valhalla", "Far Cry 6", "Watch Dogs Legion", "Rainbow Six Siege", "The Division 2", "Ghost Recon Breakpoint", "Monster Hunter World", "NieR Automata", "Bayonetta 3", "Devil May Cry 5", "Street Fighter 6", "Tekken 8", "Mortal Kombat 1", "Guilty Gear Strive", "Super Smash Bros Ultimate", "Mario Kart 8 Deluxe", "Splatoon 3", "Animal Crossing New Horizons", "Pokemon Scarlet", "Fire Emblem Three Houses", "Xenoblade Chronicles 3", "Metroid Dread", "Castlevania Symphony of the Night", "Shovel Knight", "Cuphead", "Undertale", "Deltarune", "OMORI", "Disco Elysium", "Pentiment", "Outer Wilds", "Subnautica", "No Man's Sky", "Starfield", "Kerbal Space Program", "Factorio", "Satisfactory", "Oxygen Not Included", "RimWorld", "Cities Skylines", "Planet Coaster", "Two Point Hospital", "Frostpunk", "Surviving Mars", "Crusader Kings 3", "Europa Universalis IV", "Total War Warhammer 3", "Civilization VI", "Age of Empires IV", "Company of Heroes 3", "Iron Harvest", "The Riftbreaker", "Dyson Sphere Program", "Slay the Spire", "Monster Train", "Griftlands", "Inscryption", "Wildfrost", "Darkest Dungeon 2", "Gloomhaven", "Dicey Dungeons", "Fights in Tight Spaces", "Dead Cells", "Hades 2", "Curse of the Dead Gods", "Skul", "Vampire Survivors", "Brotato", "20 Minutes Till Dawn", "Soulstone Survivors", "Rogue Legacy 2", "Spelunky 2", "Risk of Rain 2", "Returnal", "Deathloop", "Prey Mooncrash", "Wolfenstein New Order", "The Evil Within 2", "Alien Isolation", "Soma", "Amnesia Rebirth", "Outlast 2", "Resident Evil Village", "The Quarry", "Until Dawn", "Little Nightmares 2", "Inside", "Limbo", "Gris", "Journey", "Florence", "Tell Me Why", "Life is Strange True Colors", "A Plague Tale Requiem", "Hellblade Senua's Sacrifice", "Senua's Saga Hellblade 2", "Stray", "Solar Ash", "Cocoon", "Planet of Lana", "FAR Changing Tides", "Somerville", "Scorn", "Moonscars", "Ender Lilies", "The Hunter Call of the Wild", "Fishing Sim World", "Goat Simulator 3", "Untitled Goose Game", "Moving Out", "Overcooked 2", "Tools Up", "The Sims 4", "SimCity", "Cities Skylines 2", "Parkitect", "Rollercoaster Tycoon", "Planet Zoo", "Jurassic World Evolution 2", "Prehistoric Kingdom", "Anno 1800", "Transport Fever 2", "Railroad Empire", "Train Sim World", "Flight Simulator 2024", "War Thunder", "World of Warships", "World of Tanks", "Warhammer 40k Darktide", "Vermintide 2", "Space Marine 2", "Boltgun", "Warhammer 40k Gladius", "Battlefleet Gothic Armada 2", "Dawn of War 3", "Company of Heroes", "Sudden Strike 4", "Steel Division 2", "Hearts of Iron IV", "Commandos 2", "Shadow Tactics", "Desperados 3", "Mutant Year Zero", "Phoenix Point", "XCOM 2", "Gears Tactics", "Wasteland 3", "Atom RPG", "Encased", "Colony Ship", "Roadwarden", "Citizen Sleeper", "Norco", "Cloudpunk", "Road 96", "As Dusk Falls", "Lake", "Firewatch", "What Remains of Edith Finch", "Gone Home", "Dear Esther", "The Vanishing of Ethan Carter", "Everybody's Gone to the Rapture", "The Unfinished Swan", "The Last Guardian", "Shadow of the Colossus", "Ico", "The Legend of Zelda", "Link's Awakening", "Skyward Sword", "Twilight Princess", "Wind Waker", "Ocarina of Time", "Majora's Mask", "A Link Between Worlds", "A Link to the Past", "The Minish Cap", "Four Swords", "Tri Force Heroes", "Tears of the Kingdom", "Age of Calamity", "Hyrule Warriors", "Cadence of Hyrule", "Mario + Rabbids", "Kingdom Battle", "Sparks of Hope", "Yoshi's Crafted World", "Kirby and the Forgotten Land", "Paper Mario", "Luigi's Mansion 3", "Pikmin 4", "Metroid Prime Remastered", "Metroid Fusion", "Metroid Zero Mission", "Super Metroid", "Metroid Samus Returns", "Advance Wars 1+2 Re-Boot Camp", "Wargroove", "Tiny Metal", "Into the Breach", "Invisible Inc.", "Shadowrun Returns", "Battletech", "MechWarrior 5", "Front Mission 1st", "Front Mission 2", "Front Mission 3", "Front Mission 4", "Steel Battalion", "Zone of the Enders", "Armored Core 6", "Armored Core V", "Chromehounds", "Strike Suit Zero", "Strike Suit Infinity", "House of the Dying Sun", "Star Wars Squadrons", "Star Wars Jedi Fallen Order", "Jedi Survivor", "Star Wars Battlefront 2", "Star Wars Republic Commando", "Star Wars Empire at War", "Lego Star Wars The Skywalker Saga", "Lego DC Super-Villains", "Lego Marvel Super Heroes 2", "Lego City Undercover", "Lego The Hobbit", "Lego The Lord of the Rings", "Lego Jurassic World", "Lego Indiana Jones", "Lego Batman 3", "Lego Worlds", "Scribblenauts Unlimited", "Scribblenauts Unmasked", "Scribblenauts Showdown", "The Adventure Pals", "Mighty Switch Force", "Shantae Half-Genie Hero", "Shantae and the Pirate's Curse", "The Messenger", "Cyber Shadow", "Blasphemous 2", "The Last Faith", "Morbid The Seven Acolytes", "Death's Gambit", "Salt and Sacrifice", "Ender Lillies", "Deedlit in Wonder Labyrinth", "Castlevania Advanced Collection", "Castlevania Anniversary Collection", "Castlevania Requiem", "Bloodstained Ritual of the Night", "Bloodstained Curse of the Moon", "Bloodstained Curse of the Moon 2", "Record of Lodoss War Deedlit", "Touhou Luna Nights", "Momodora Reverie Under the Moonlight", "Momodora Moonlit Farewell", "Gato Roboto", "Islets", "Cave Story", "Knytt Underground", "Dandara", "Axiom Verge 2", "Axiom Verge", "Environmental Station Alpha", "Rabi-Ribi", "Iconoclasts", "The Vagrant", "Chained Echoes", "CrossCode", "Unsighted", "Hyper Light Drifter", "Furi", "The Red Strings Club", "Read Only Memories", "2064 Read Only Memories", "Neo Cab", "Coffee Talk", "VA-11 Hall-A", "Necrobarista", "Jack Move", "Anno Mutationem", "The Last Night", "Dex", "Machi Koro", "Griftlands", "Slay the Spire", "Monster Train", "Vault of the Void", "Tainted Grail", "Across the Obelisk", "Dice Legacy", "Roguebook", "Floppy Knights", "Fights in Tight Spaces", "Shapez", "Dorfromantik", "Townscaper", "Islanders", "Kingdoms and Castles", "Foundation", "Dawn of Man", "Ancient Cities", "Hammerhelm", "Gedonia", "Outward", "ELEX", "Gothic", "Risen", "Two Worlds", "Venetica", "Kingdoms of Amalur", "Fable Anniversary", "Fable 2", "Fable 3", "The Bard's Tale", "Diablo 3", "Diablo 2 Resurrected", "Diablo 4", "Torchlight 2", "Torchlight 3", "Victor Vran", "Wolcen", "Last Epoch", "Warhammer 40k Inquisitor Martyr", "Warhammer 40k Chaos Gate Daemonhunters", "Warhammer 40k Mechanicus", "Warhammer 40k Battlesector", "Warhammer 40k Battlefleet Gothic Armada", "Warhammer 40k Space Marine", "The Outer Worlds", "The Outer Worlds 2", "Avowed", "Fable", "Perfect Dark", "Killer Instinct", "Gears of War", "Halo", "Forza Motorsport", "State of Decay", "Psychonauts", "Psychonauts 2", "Crackdown", "Quantum Break", "Sunset Overdrive", "Ryse Son of Rome", "Dead Rising", "Dead Rising 2", "Dead Rising 3", "Dead Rising 4", "Dragon's Dogma", "Dragon's Dogma 2", "Lost Planet", "Resident Evil", "Resident Evil 0", "Resident Evil 2", "Resident Evil 3", "Resident Evil 4", "Resident Evil 5", "Resident Evil 6", "Resident Evil 7", "Resident Evil Village", "Resident Evil Revelations", "Resident Evil Revelations 2", "Dino Crisis", "Onimusha", "Devil May Cry", "Devil May Cry 2", "Devil May Cry 3", "Devil May Cry 4", "Devil May Cry 5", "DmC Devil May Cry", "Bayonetta", "Bayonetta 2", "Bayonetta 3", "Vanquish", "Metal Gear Rising", "Metal Gear Solid", "Metal Gear Solid 2", "Metal Gear Solid 3", "Metal Gear Solid 4", "Metal Gear Solid V", "Metal Gear Survive", "Zone of the Enders", "Zone of the Enders 2", "Ace Combat", "Ace Combat 7", "Project Wingman", "Tom Clancy's Ghost Recon", "Ghost Recon Wildlands", "Ghost Recon Breakpoint", "Rainbow Six", "Rainbow Six Siege", "Rainbow Six Extraction", "The Division", "The Division 2", "Watch Dogs", "Watch Dogs 2", "Watch Dogs Legion", "Far Cry", "Far Cry 2", "Far Cry 3", "Far Cry 4", "Far Cry 5", "Far Cry 6", "Far Cry Primal", "Far Cry New Dawn", "Assassin's Creed", "Assassin's Creed II", "Assassin's Creed Brotherhood", "Assassin's Creed Revelations", "Assassin's Creed III", "Assassin's Creed IV Black Flag", "Assassin's Creed Rogue", "Assassin's Creed Unity", "Assassin's Creed Syndicate", "Assassin's Creed Origins", "Assassin's Creed Odyssey", "Assassin's Creed Valhalla", "Assassin's Creed Mirage", "Splinter Cell", "Splinter Cell Pandora Tomorrow", "Splinter Cell Chaos Theory", "Splinter Cell Double Agent", "Splinter Cell Conviction", "Splinter Cell Blacklist", "Prince of Persia", "Prince of Persia The Sands of Time", "Prince of Persia Warrior Within", "Prince of Persia The Two Thrones", "Prince of Persia 2008", "The Forgotten Sands", "Beyond Good and Evil", "Beyond Good and Evil 2", "Rayman", "Rayman 2", "Rayman 3", "Rayman Legends", "Rayman Origins", "Baldur's Gate", "Baldur's Gate 2", "Baldur's Gate 3", "Icewind Dale", "Planescape Torment", "Neverwinter Nights", "Neverwinter Nights 2", "Pillars of Eternity", "Pillars of Eternity 2", "Tyranny", "Torment Tides of Numenera", "Wasteland", "Wasteland 2", "Wasteland 3", "Atom RPG", "Encased", "Colony Ship", "UnderRail", "Expeditions Rome", "Expeditions Viking", "Expeditions Conquistador", "GreedFall", "Steelrising", "Thymesia", "Lords of the Fallen", "The Surge", "The Surge 2", "Code Vein", "God Eater", "God Eater 2", "God Eater 3", "Tales of Berseria", "Tales of Zestiria", "Tales of Arise", "Ni no Kuni", "Ni no Kuni 2", "Rise of the Tomb Raider", "Shadow of the Tomb Raider", "Tomb Raider 2013", "Mirror's Edge", "Mirror's Edge Catalyst", "Need for Speed", "Need for Speed Heat", "Need for Speed Unbound", "Need for Speed Most Wanted", "Need for Speed Underground", "Need for Speed Carbon", "Burnout Paradise", "Burnout Revenge", "The Crew", "The Crew 2", "The Crew Motorfest", "Trackmania", "Trackmania Turbo", "Wreckfest", "DiRT Rally", "DiRT Rally 2.0", "DiRT 5", "Project CARS", "Project CARS 2", "Project CARS 3", "Assetto Corsa", "Assetto Corsa Competizione", "iRacing", "RaceRoom", "Automobilista", "F1 2023", "F1 2024", "F1 Manager 2023", "F1 Manager 2024", "Football Manager 2024", "Football Manager 2023", "Guild Wars 2", "Final Fantasy XIV", "Final Fantasy XI", "Elder Scrolls Online", "The Old Republic", "Dungeons & Dragons Online", "Lord of the Rings Online", "EverQuest", "EverQuest 2", "Rift", "TERA", "ArcheAge", "Black Desert", "Albion Online", "Lost Ark", "New World", "Tower of Fantasy", "Zenless Zone Zero", "Wuthering Waves", "Honkai Impact 3rd", "Genshin Impact", "Star Rail", "Honkai Star Rail", "Arknights", "Girls Frontline", "Azur Lane", "Blue Archive", "NIKKE", "Figure Fantasy", "Memento Mori", "CounterSide", "Neural Cloud", "Path to Nowhere", "Limbus Company", "Reverse: 1999", "Revue Starlight", "Shining Nikki", "Love Nikki", "Mr Love Queens Choice", "The Legend of Neverland", "Dragon Raja", "Eternal City", "Sdorica", "Soul Tide", "The Tale of Food", "Food Fantasy", "Alchemy Stars", "Arknights: Endfield", "Snowbreak", "GFL2", "Project Neural Cloud", "Dolls Frontline", "Divine World"];
    const result = [];
    const genres = ["Action", "RPG", "Adventure", "Shooter", "Strategy", "Sports", "Racing", "Simulation", "Puzzle", "Fighting", "MMO", "MOBA", "Battle Royale", "Survival", "Horror"];
    const years = Array.from({ length: 30 }, (_, i) => 1994 + i);
    let id = 1;
    for (let title of known) {
        if (id > 1000) break;
        const genre = genres[id % genres.length];
        const year = years[id % years.length];
        const multiplayer = id % 3 === 0 || id % 5 === 0;
        let steamId = null;
        if (id < 500 && Math.random() > 0.4) { steamId = Math.floor(Math.random() * 999999) + 100000; }
        result.push({ id: id++, title: title, genre: genre, year: year, steamId: steamId, multiplayer: multiplayer });
    }
    while (result.length < 1000) {
        result.push({ id: result.length + 1, title: `Game ${result.length + 1}`, genre: genres[result.length % genres.length], year: years[result.length % years.length], steamId: null, multiplayer: result.length % 3 === 0 });
    }
    return result;
}

const games = generateGames();
let auth, db;
let currentUser = null;
let userProfile = null;
let myCompletions = [];
let myPlaying = [];
let myLooking = [];
let myLFG = [];
let mySaves = {};
let friendsList = [];
let friendRequests = [];
let currentGame = null;
let posts = [];
let editingPostId = null;
let friendPosts = [];

function init() {
    if (!isConfigValid()) {
        document.getElementById("setupWizard").classList.add("active");
        document.getElementById("authModal").style.display = "none";
        document.getElementById("appContainer").style.display = "none";
        console.warn("Firebase config is invalid. Please set up config.");
        return;
    }
    try {
        if (firebase.apps.length) { console.log("Firebase already initialized"); } else { firebase.initializeApp(firebaseConfig); console.log("Firebase initialized successfully"); }
    } catch (err) {
        console.error("Firebase init failed:", err);
        alert("Firebase config is invalid. Error: " + err.message + "\n\nClick the gear icon in your profile to re-enter config.");
        document.getElementById("setupWizard").classList.add("active");
        document.getElementById("authModal").style.display = "none";
        document.getElementById("appContainer").style.display = "none";
        return;
    }
    auth = firebase.auth();
    db = firebase.firestore();
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    auth.onAuthStateChanged(user => {
        if (user) {
            currentUser = user;
            document.getElementById("authModal").style.display = "none";
            document.getElementById("appContainer").style.display = "block";
            if (user.uid === ADMIN_UID) { document.getElementById("adminGear").style.display = "inline-block"; }
            loadUserProfile();
            loadMyData();
            loadFriends();
            loadRequests();
            loadPosts();
            renderGames();
            setupGameCombobox();
            document.getElementById("userDropdownBtn").addEventListener("click", toggleUserDropdown);
        } else {
            document.getElementById("authModal").style.display = "flex";
            document.getElementById("appContainer").style.display = "none";
        }
    });
}

function toggleUserDropdown(e) { e.stopPropagation(); document.getElementById("userDropdownMenu").classList.toggle("show"); }
function closeUserDropdown() { document.getElementById("userDropdownMenu").classList.remove("show"); }
document.addEventListener("click", closeUserDropdown);
function openSetupWizard() { document.getElementById("setupWizard").classList.toggle("active"); }

function switchAuthTab(tab) {
    document.getElementById("tabLogin").classList.toggle("active", tab === "login");
    document.getElementById("tabRegister").classList.toggle("active", tab === "register");
    document.getElementById("loginForm").style.display = tab === "login" ? "flex" : "none";
    document.getElementById("registerForm").style.display = tab === "register" ? "flex" : "none";
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value, password = document.getElementById("loginPassword").value, errorEl = document.getElementById("loginError");
    try { await auth.signInWithEmailAndPassword(email, password); } catch (err) { errorEl.textContent = err.message; errorEl.style.display = "block"; }
}

async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim(), email = document.getElementById("regEmail").value, password = document.getElementById("regPassword").value, errorEl = document.getElementById("registerError");
    try {
        const cred = await auth.createUserWithEmailAndPassword(email, password);
        await db.collection("users").doc(cred.user.uid).set({ displayName: name, email: email, searchName: name.toLowerCase(), avatarColor: "#8b5cf6", nameColor: "#f1f5f9", photoData: "", discord: "", reddit: "", createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        await cred.user.updateProfile({ displayName: name });
    } catch (err) { errorEl.textContent = err.message; errorEl.style.display = "block"; }
}

async function logout() { await auth.signOut(); location.reload(); }

function resetConfig() { localStorage.removeItem("gameVault_firebaseConfig"); location.reload(); }

async function loadUserProfile() {
    const doc = await db.collection("users").doc(currentUser.uid).get();
    if (doc.exists) {
        userProfile = doc.data();
        document.getElementById("headerName").textContent = userProfile.displayName;
        document.getElementById("headerName").style.color = userProfile.nameColor || "#f1f5f9";
        const avatar = document.getElementById("headerAvatar");
        setAvatarElement(avatar, userProfile);
        document.getElementById("settingsName").value = userProfile.displayName || "";
        document.getElementById("settingsNameColor").value = userProfile.nameColor || "#f1f5f9";
        document.getElementById("settingsAvatarColor").value = userProfile.avatarColor || "#8b5cf6";
        document.getElementById("settingsDiscord").value = userProfile.discord || "";
        document.getElementById("settingsReddit").value = userProfile.reddit || "";
    }
}

function setAvatarElement(el, profile) {
    if (profile.photoData && profile.photoData.length > 50) {
        el.style.backgroundImage = `url(${profile.photoData})`;
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
        el.textContent = "";
    } else {
        el.style.backgroundImage = "none";
        el.style.background = profile.avatarColor || "#8b5cf6";
        el.textContent = getInitials(profile.displayName);
    }
}

async function loadMyData() {
    try {
        const compSnap = await db.collection("users").doc(currentUser.uid).collection("completions").get();
        myCompletions = compSnap.docs.map(d => parseInt(d.id));
        const playingSnap = await db.collection("users").doc(currentUser.uid).collection("gameStatus").where("status", "==", "playing").get();
        myPlaying = playingSnap.docs.map(d => parseInt(d.id));
        const lookingSnap = await db.collection("users").doc(currentUser.uid).collection("gameStatus").where("status", "==", "looking").get();
        myLooking = lookingSnap.docs.map(d => parseInt(d.id));
        const lfgSnap = await db.collection("users").doc(currentUser.uid).collection("gameStatus").where("status", "==", "lfg").get();
        myLFG = lfgSnap.docs.map(d => parseInt(d.id));
        mySaves = {};
        const savesSnap = await db.collection("users").doc(currentUser.uid).collection("saveFiles").get();
        savesSnap.docs.forEach(d => { const data = d.data(), gid = data.gameId; if (!mySaves[gid]) mySaves[gid] = []; mySaves[gid].push({ id: d.id, ...data }); });
        updateStats();
    } catch (err) { console.error("loadMyData error:", err); showToast("Failed to load your data: " + err.message, true); }
}

function getInitials(title) {
    const words = title.split(/[ \t:]+/).filter(w => w.length > 0 && !w.match(/^[0-9]$/));
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return title.substring(0, 2).toUpperCase();
}

function getColor(id) {
    const colors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#6366f1", "#14b8a6", "#f97316", "#84cc16"];
    return colors[(id - 1) % colors.length];
}

function renderGames(filter = "") {
    const grid = document.getElementById("gamesGrid");
    grid.innerHTML = "";
    const filtered = games.filter(g => g.title.toLowerCase().includes(filter.toLowerCase()));
    document.getElementById("resultsCount").textContent = filter ? `Found ${filtered.length} games` : "Showing all games";
    filtered.forEach(game => {
        const isCompleted = myCompletions.includes(game.id);
        const isPlaying = myPlaying.includes(game.id);
        const isLooking = myLooking.includes(game.id);
        const isLFG = myLFG.includes(game.id);
        const card = document.createElement("div");
        let cls = "game-card";
        if (isCompleted) cls += " completed";
        if (isPlaying) cls += " playing";
        if (isLooking) cls += " looking_for_players";
        if (isLFG) cls += " lfg";
        card.className = cls;
        card.onclick = () => openGameModal(game);
        const color = getColor(game.id);
        let coverHtml;
        if (game.steamId) {
            coverHtml = `<img src="https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/library_600x900_2x.jpg" alt="${game.title}" style="width:100%;height:100%;object-fit:cover;" onerror="this.onerror=null;this.src='https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/library_600x900.jpg';this.onerror=function(){this.style.display='none';this.parentElement.innerHTML='<div class="placeholder" style="background:linear-gradient(135deg, ${color}80, ${color});">${game.title}</div>';}">`;
        } else {
            coverHtml = `<div class="placeholder" style="background:linear-gradient(135deg, ${color}80, ${color});">${game.title}</div>`;
        }
        let badge = "";
        if (isCompleted) badge = `<span class="game-status-badge" style="background:rgba(16,185,129,0.2);color:var(--success);">Completed</span>`;
        else if (isPlaying) badge = `<span class="game-status-badge" style="background:rgba(59,130,246,0.2);color:var(--info);">Playing</span>`;
        else if (isLooking) badge = `<span class="game-status-badge" style="background:rgba(245,158,11,0.2);color:var(--warning);">Looking</span>`;
        else if (isLFG) badge = `<span class="game-status-badge" style="background:rgba(239,68,68,0.2);color:var(--danger);">LFG</span>`;
        card.innerHTML = `<div class="cover" style="background: linear-gradient(135deg, ${color}15 0%, ${color}30 100%);">${coverHtml}</div><div class="game-info"><div class="game-title">${game.title}</div><div class="game-meta">${game.genre} • ${game.year}</div>${badge}</div>`;
        grid.appendChild(card);
    });
}

function filterGames() { renderGames(document.getElementById("searchInput").value); }

async function openGameModal(game) {
    currentGame = game;
    document.getElementById("modalTitle").textContent = game.title;
    document.getElementById("modalBadge").textContent = `${game.genre} • ${game.year}`;
    document.getElementById("modalDesc").textContent = game.desc || `${game.title} is a ${game.genre} game released in ${game.year}.`;
    const cover = document.getElementById("modalCover");
    const color = getColor(game.id);
    if (game.steamId) {
        cover.innerHTML = `<img src="https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/library_600x900_2x.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:0.75rem;" onerror="this.src='https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/library_600x900.jpg';this.onerror=function(){this.style.display='none';this.parentElement.innerHTML='<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:linear-gradient(135deg, ${color}80, ${color});color:#fff;font-weight:900;font-size:1.5rem;text-align:center;padding:1rem;word-break:break-word;border-radius:0.75rem;">${game.title}</div>';}">`;
        cover.style.background = "none";
    } else {
        cover.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:linear-gradient(135deg, ${color}80, ${color});color:#fff;font-weight:900;font-size:1.5rem;text-align:center;padding:1rem;word-break:break-word;border-radius:0.75rem;">${game.title}</div>`;
    }
    const completeLabel = document.getElementById("completeLabel");
    if (game.multiplayer) { completeLabel.style.display = "none"; document.getElementById("completeCheckbox").checked = false; } else { completeLabel.style.display = "flex"; }
    document.getElementById("lfgLabel").style.display = game.multiplayer ? "flex" : "none";
    document.getElementById("completeCheckbox").checked = myCompletions.includes(game.id);
    document.getElementById("playingCheckbox").checked = myPlaying.includes(game.id);
    document.getElementById("lookingCheckbox").checked = myLooking.includes(game.id);
    document.getElementById("lfgCheckbox").checked = myLFG.includes(game.id);
    updateStatusLabels();
    renderModalSaves();
    await loadFriendSavesForGame(game.id);
    document.getElementById("gameModal").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeGameModal(e) {
    if (!e || e.target === document.getElementById("gameModal")) {
        document.getElementById("gameModal").classList.remove("active");
        document.body.style.overflow = "";
        currentGame = null;
    }
}

function updateStatusLabels() {
    document.getElementById("completeLabel").classList.toggle("checked", document.getElementById("completeCheckbox").checked);
    document.getElementById("playingLabel").classList.toggle("playing-checked", document.getElementById("playingCheckbox").checked);
    document.getElementById("lookingLabel").classList.toggle("looking-checked", document.getElementById("lookingCheckbox").checked);
    document.getElementById("lfgLabel").classList.toggle("lfg-checked", document.getElementById("lfgCheckbox").checked);
}

async function toggleComplete() {
    if (!currentGame) return;
    if (currentGame.multiplayer) { showToast("Cannot mark multiplayer games as completed", true); document.getElementById("completeCheckbox").checked = false; return; }
    const cb = document.getElementById("completeCheckbox"), gameId = currentGame.id.toString(), ref = db.collection("users").doc(currentUser.uid).collection("completions").doc(gameId);
    try {
        if (cb.checked) { await ref.set({ completedAt: firebase.firestore.FieldValue.serverTimestamp() }); if (!myCompletions.includes(currentGame.id)) myCompletions.push(currentGame.id); } else { await ref.delete(); myCompletions = myCompletions.filter(id => id !== currentGame.id); }
        updateStatusLabels(); renderGames(document.getElementById("searchInput").value); updateStats(); showToast(cb.checked ? "Game marked as completed!" : "Unmarked");
    } catch (err) { showToast("Error: " + err.message, true); cb.checked = !cb.checked; }
}

async function togglePlaying() {
    if (!currentGame) return;
    const cb = document.getElementById("playingCheckbox"), gameId = currentGame.id.toString(), ref = db.collection("users").doc(currentUser.uid).collection("gameStatus").doc(gameId);
    try {
        if (cb.checked) {
            await ref.set({ status: "playing", updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
            if (!myPlaying.includes(currentGame.id)) myPlaying.push(currentGame.id);
            if (myLooking.includes(currentGame.id)) { await db.collection("users").doc(currentUser.uid).collection("gameStatus").doc(gameId).set({ status: "playing", updatedAt: firebase.firestore.FieldValue.serverTimestamp() }); myLooking = myLooking.filter(id => id !== currentGame.id); document.getElementById("lookingCheckbox").checked = false; }
            if (myLFG.includes(currentGame.id)) { await db.collection("users").doc(currentUser.uid).collection("gameStatus").doc(gameId).set({ status: "playing", updatedAt: firebase.firestore.FieldValue.serverTimestamp() }); myLFG = myLFG.filter(id => id !== currentGame.id); document.getElementById("lfgCheckbox").checked = false; }
        } else { await ref.delete(); myPlaying = myPlaying.filter(id => id !== currentGame.id); }
        updateStatusLabels(); renderGames(document.getElementById("searchInput").value); updateStats(); showToast(cb.checked ? "Marked as playing!" : "Removed from playing");
    } catch (err) { showToast("Error: " + err.message, true); cb.checked = !cb.checked; }
}

async function toggleLooking() {
    if (!currentGame) return;
    const cb = document.getElementById("lookingCheckbox"), gameId = currentGame.id.toString(), ref = db.collection("users").doc(currentUser.uid).collection("gameStatus").doc(gameId);
    try {
        if (cb.checked) {
            await ref.set({ status: "looking", updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
            if (!myLooking.includes(currentGame.id)) myLooking.push(currentGame.id);
            if (myPlaying.includes(currentGame.id)) { await db.collection("users").doc(currentUser.uid).collection("gameStatus").doc(gameId).set({ status: "looking", updatedAt: firebase.firestore.FieldValue.serverTimestamp() }); myPlaying = myPlaying.filter(id => id !== currentGame.id); document.getElementById("playingCheckbox").checked = false; }
            if (myLFG.includes(currentGame.id)) { await db.collection("users").doc(currentUser.uid).collection("gameStatus").doc(gameId).set({ status: "looking", updatedAt: firebase.firestore.FieldValue.serverTimestamp() }); myLFG = myLFG.filter(id => id !== currentGame.id); document.getElementById("lfgCheckbox").checked = false; }
        } else { await ref.delete(); myLooking = myLooking.filter(id => id !== currentGame.id); }
        updateStatusLabels(); renderGames(document.getElementById("searchInput").value); updateStats(); showToast(cb.checked ? "Looking for players!" : "Removed from looking");
    } catch (err) { showToast("Error: " + err.message, true); cb.checked = !cb.checked; }
}

async function toggleLFG() {
    if (!currentGame) return;
    if (!currentGame.multiplayer) { showToast("This game doesn't support multiplayer!", true); document.getElementById("lfgCheckbox").checked = false; return; }
    const cb = document.getElementById("lfgCheckbox"), gameId = currentGame.id.toString(), ref = db.collection("users").doc(currentUser.uid).collection("gameStatus").doc(gameId);
    try {
        if (cb.checked) {
            await ref.set({ status: "lfg", updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
            if (!myLFG.includes(currentGame.id)) myLFG.push(currentGame.id);
            if (myPlaying.includes(currentGame.id)) { await db.collection("users").doc(currentUser.uid).collection("gameStatus").doc(gameId).set({ status: "lfg", updatedAt: firebase.firestore.FieldValue.serverTimestamp() }); myPlaying = myPlaying.filter(id => id !== currentGame.id); document.getElementById("playingCheckbox").checked = false; }
            if (myLooking.includes(currentGame.id)) { await db.collection("users").doc(currentUser.uid).collection("gameStatus").doc(gameId).set({ status: "lfg", updatedAt: firebase.firestore.FieldValue.serverTimestamp() }); myLooking = myLooking.filter(id => id !== currentGame.id); document.getElementById("lookingCheckbox").checked = false; }
        } else { await ref.delete(); myLFG = myLFG.filter(id => id !== currentGame.id); }
        updateStatusLabels(); renderGames(document.getElementById("searchInput").value); updateStats(); showToast(cb.checked ? "Looking for group!" : "Removed from LFG");
    } catch (err) { showToast("Error: " + err.message, true); cb.checked = !cb.checked; }
}

function allowDrop(e) { e.preventDefault(); document.getElementById("uploadArea").classList.add("dragover"); }
function leaveDrop(e) { document.getElementById("uploadArea").classList.remove("dragover"); }
function dropSave(e) { e.preventDefault(); document.getElementById("uploadArea").classList.remove("dragover"); if (e.dataTransfer.files.length) processFile(e.dataTransfer.files[0]); }
function handleFileSelect(e) { if (e.target.files.length) processFile(e.target.files[0]); }

async function processFile(file) {
    if (!currentGame) return;
    if (file.size > 500 * 1024) { showToast("File too large (max 500KB)", true); return; }
    const gameId = currentGame.id;
    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            showToast("Uploading save...");
            const base64 = e.target.result.split(",")[1];
            const fileDoc = await db.collection("users").doc(currentUser.uid).collection("saveFiles").add({ gameId, name: file.name, data: base64, size: formatSize(file.size), uploadedAt: firebase.firestore.FieldValue.serverTimestamp() });
            if (!mySaves[gameId]) mySaves[gameId] = [];
            mySaves[gameId].push({ id: fileDoc.id, gameId, name: file.name, data: base64, size: formatSize(file.size) });
            renderModalSaves(); updateStats(); showToast("Save uploaded!");
        } catch (err) { showToast("Upload failed: " + err.message, true); }
    };
    reader.readAsDataURL(file);
}

function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function renderModalSaves() {
    const container = document.getElementById("modalSaves");
    const saves = mySaves[currentGame?.id] || [];
    if (!saves.length) { container.innerHTML = '<p style="color:var(--text-muted);margin-top:0.5rem;font-size:0.9rem;">No save files uploaded yet</p>'; return; }
    container.innerHTML = saves.map(save => `<div class="save-item"><div><div class="save-name">${save.name}</div><div class="save-meta">${save.size}</div></div><button class="btn-secondary btn-small" onclick="downloadSaveFromData('${save.data}','${save.name}')">Download</button></div>`).join("");
}

function downloadSaveFromData(base64Data, name) {
    try {
        const byteString = atob(base64Data), ab = new ArrayBuffer(byteString.length), ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
        const blob = new Blob([ab]), url = URL.createObjectURL(blob), a = document.createElement("a");
        a.href = url; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        showToast("Download started!");
    } catch (err) { showToast("Error downloading: " + err.message, true); }
}

async function loadFriendSavesForGame(gameId) {
    const section = document.getElementById("friendSavesSection"), list = document.getElementById("friendSavesList");
    if (!friendsList.length) { section.style.display = "none"; return; }
    let has = false, html = "";
    for (const friend of friendsList) {
        try {
            const snap = await db.collection("users").doc(friend.uid).collection("saveFiles").where("gameId", "==", gameId).get();
            if (!snap.empty) {
                has = true;
                snap.docs.forEach(d => {
                    const save = d.data();
                    html += `<div class="friend-save-row"><div class="friend-save-avatar" style="background:${friend.avatarColor};${friend.photoData ? `background-image:url(${friend.photoData});background-size:cover;` : ''}">${friend.photoData ? '' : getInitials(friend.displayName)}</div><div style="flex:1;"><div class="save-name">${save.name}</div><div class="save-meta">${friend.displayName} • ${save.size}</div></div><button class="btn-secondary btn-small" onclick="downloadSaveFromData('${save.data}','${save.name}')">Download</button></div>`;
                });
            }
        } catch (err) { console.error(err); }
    }
    if (has) { section.style.display = "block"; list.innerHTML = html; } else section.style.display = "none";
}

async function loadPosts() {
    try {
        const snap = await db.collection("posts").orderBy("createdAt", "desc").get();
        const newPosts = [];
        for (const doc of snap.docs) {
            const data = doc.data();
            const userDoc = await db.collection("users").doc(data.userId).get();
            if (userDoc.exists) {
                let userVote = 0;
                if (currentUser) {
                    try { const voteDoc = await db.collection("posts").doc(doc.id).collection("votes").doc(currentUser.uid).get(); if (voteDoc.exists) userVote = voteDoc.data().vote; } catch (e) {}
                }
                newPosts.push({ id: doc.id, ...data, user: userDoc.data(), userVote: userVote });
            }
        }
        const seen = new Set();
        posts = newPosts.filter(post => { if (seen.has(post.id)) return false; seen.add(post.id); return true; });
        renderPosts();
    } catch (err) { console.error("loadPosts error:", err); }
}

function renderPosts(filter = "", sort = "hot", tagFilter = "all") {
    const seen = new Set();
    posts = posts.filter(post => { if (seen.has(post.id)) return false; seen.add(post.id); return true; });
    let filtered = posts.filter(p => p.gameTitle.toLowerCase().includes(filter.toLowerCase()) || (p.user && p.user.displayName.toLowerCase().includes(filter.toLowerCase())));
    if (tagFilter !== "all") { filtered = filtered.filter(p => p.tag === tagFilter); }
    switch (sort) {
        case "new": filtered.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0)); break;
        case "top": filtered.sort((a, b) => (b.score || 0) - (a.score || 0)); break;
        case "hot":
        default: filtered.sort((a, b) => { const scoreA = (a.score || 0) + (a.chatCount || 0) * 0.1; const scoreB = (b.score || 0) + (b.chatCount || 0) * 0.1; return scoreB - scoreA; }); break;
    }
    const grid = document.getElementById("postsGrid");
    if (!filtered.length) { grid.innerHTML = '<div class="empty-state">No posts yet. Be the first to create one!</div>'; return; }
    grid.innerHTML = filtered.map(post => {
        const isAuthor = post.userId === currentUser.uid;
        const tagLabel = getTagLabel(post.tag);
        const tagClass = getTagClass(post.tag);
        const chatCount = post.chatCount || 0;
        const isChatOpen = post._chatOpen || false;
        const score = post.score || 0;
        const upvoteClass = post.userVote === 1 ? 'active' : '';
        const downvoteClass = post.userVote === -1 ? 'active' : '';
        return `<div class="post-card" data-postid="${post.id}">
            <div class="post-vote-area">
                <button class="vote-btn upvote ${upvoteClass}" onclick="votePost('${post.id}',1)" title="Upvote">▲</button>
                <span class="score">${score}</span>
                <button class="vote-btn downvote ${downvoteClass}" onclick="votePost('${post.id}',-1)" title="Downvote">▼</button>
            </div>
            <div class="post-content">
                <div class="post-header">
                    <div class="post-avatar" style="background:${post.user.avatarColor || '#8b5cf6'};${post.user.photoData ? `background-image:url(${post.user.photoData});background-size:cover;` : ''}">${post.user.photoData ? '' : getInitials(post.user.displayName)}</div>
                    <span class="post-user" style="color:${post.user.nameColor || '#f1f5f9'}">${post.user.displayName}</span>
                    <span class="post-meta">${new Date(post.createdAt?.toMillis()).toLocaleString()}</span>
                    <span class="post-tag ${tagClass}">${tagLabel}</span>
                </div>
                <div class="post-title">${post.title || 'Looking for players'}</div>
                <div class="post-game">🎮 ${post.gameTitle}</div>
                <div class="post-message">${post.message || ""}</div>
                <div class="post-actions">
                    ${isAuthor ? `<button class="action-btn" onclick="editPost('${post.id}')">Edit</button>` : ''}
                    ${isAuthor ? `<button class="action-btn" onclick="deletePost('${post.id}')">Delete</button>` : ''}
                    ${!isAuthor ? `<button class="action-btn" onclick="addFriendFromPost('${post.userId}')">Add Friend</button>` : ''}
                    <button class="post-chat-toggle action-btn" onclick="toggleChat('${post.id}')">💬 <span id="chatCount_${post.id}">${chatCount}</span> <span class="arrow ${isChatOpen ? 'open' : ''}" id="chatArrow_${post.id}">▼</span></button>
                </div>
                <div class="post-chat-container ${isChatOpen ? 'open' : ''}" id="chatContainer_${post.id}">
                    <div class="post-chat-title">💬 Chat</div>
                    <div id="chatMessages_${post.id}">${post.chatMessages ? post.chatMessages.map(m => `<div class="chat-message" data-msgid="${m.id}" data-postid="${post.id}" data-userid="${m.userId}"><div class="chat-msg-avatar" style="background:${m.avatarColor || '#8b5cf6'};${m.photoData ? `background-image:url(${m.photoData});background-size:cover;` : ''}">${m.photoData ? '' : getInitials(m.displayName)}</div><div class="chat-msg-body"><span class="chat-msg-user" style="color:${m.nameColor || '#f1f5f9'}">${m.displayName}</span><span class="chat-msg-time">${new Date(m.timestamp).toLocaleString()}</span><div class="chat-msg-text">${m.message}</div></div></div>`).join('') : '<p style="color:var(--text-muted);font-size:0.8rem;">No messages yet</p>'}</div>
                    <div class="chat-input-row"><input type="text" id="chatInput_${post.id}" placeholder="Type a message..." onkeypress="if(event.key==='Enter')sendChatMessage('${post.id}')"><button class="btn-small" onclick="sendChatMessage('${post.id}')">Send</button></div>
                </div>
            </div>
        </div>`;
    }).join("");
    document.querySelectorAll('.chat-message').forEach(el => { el.addEventListener('contextmenu', showContextMenu); });
}

function filterPosts() {
    const search = document.getElementById("postSearchInput").value;
    const sort = document.getElementById("postSortFilter").value;
    const tag = document.getElementById("postTagFilter").value;
    renderPosts(search, sort, tag);
}

function getTagLabel(tag) {
    const map = { "lfg": "LFG", "player": "Looking", "tip": "Tip", "help": "Help", "rate": "Rate" };
    return map[tag] || tag;
}

function getTagClass(tag) {
    const map = { "lfg": "tag-lfg", "player": "tag-player", "tip": "tag-tip", "help": "tag-help", "rate": "tag-rate" };
    return map[tag] || "";
}

function toggleChat(postId) {
    const container = document.getElementById(`chatContainer_${postId}`);
    const arrow = document.getElementById(`chatArrow_${postId}`);
    if (container) {
        container.classList.toggle('open');
        if (arrow) arrow.classList.toggle('open');
        const post = posts.find(p => p.id === postId);
        if (post) post._chatOpen = container.classList.contains('open');
    }
}

async function votePost(postId, newVote) {
    if (!currentUser) { showToast("Please login first", true); return; }
    newVote = parseInt(newVote);
    const postRef = db.collection("posts").doc(postId);
    const voteRef = db.collection("posts").doc(postId).collection("votes").doc(currentUser.uid);
    try {
        await db.runTransaction(async (transaction) => {
            const postDoc = await transaction.get(postRef);
            const voteDoc = await transaction.get(voteRef);
            if (!postDoc.exists) throw new Error("Post does not exist");
            const currentVote = voteDoc.exists ? voteDoc.data().vote : 0;
            let finalVote = newVote;
            if (newVote === currentVote) finalVote = 0;
            let upvoteInc = 0, downvoteInc = 0, scoreInc = 0;
            if (currentVote === 1) upvoteInc -= 1; else if (currentVote === -1) downvoteInc -= 1;
            scoreInc -= currentVote;
            if (finalVote === 1) upvoteInc += 1; else if (finalVote === -1) downvoteInc += 1;
            scoreInc += finalVote;
            if (finalVote === 0) { transaction.delete(voteRef); } else { transaction.set(voteRef, { vote: finalVote }); }
            transaction.update(postRef, { score: firebase.firestore.FieldValue.increment(scoreInc), upvotes: firebase.firestore.FieldValue.increment(upvoteInc), downvotes: firebase.firestore.FieldValue.increment(downvoteInc) });
            const post = posts.find(p => p.id === postId);
            if (post) { post.score += scoreInc; post.upvotes += upvoteInc; post.downvotes += downvoteInc; post.userVote = finalVote; }
        });
        filterPosts();
        showToast("Vote updated!");
    } catch (err) { console.error("Error voting:", err); showToast("Error voting: " + err.message, true); }
}

function setupGameCombobox() {
    const input = document.getElementById("postGameSearch");
    const dropdown = document.getElementById("gameDropdown");
    const hidden = document.getElementById("postGameId");
    input.addEventListener("focus", showGameDropdown);
    input.addEventListener("blur", () => setTimeout(() => { dropdown.classList.remove("show"); }, 200));
    dropdown.addEventListener("click", (e) => {
        const item = e.target.closest(".dropdown-item");
        if (item) {
            const gameId = parseInt(item.dataset.id);
            const title = item.textContent;
            input.value = title;
            hidden.value = gameId;
            dropdown.classList.remove("show");
        }
    });
    filterGameOptions();
}

function showGameDropdown() { document.getElementById("gameDropdown").classList.add("show"); }

function filterGameOptions() {
    const input = document.getElementById("postGameSearch");
    const dropdown = document.getElementById("gameDropdown");
    const query = input.value.toLowerCase().trim();
    const filtered = games.filter(g => g.title.toLowerCase().includes(query));
    if (!filtered.length) { dropdown.innerHTML = '<div class="dropdown-item" style="color:var(--text-muted);cursor:default;">No games found</div>'; } else { dropdown.innerHTML = filtered.map(g => `<div class="dropdown-item" data-id="${g.id}">${g.title}</div>`).join(""); }
    dropdown.classList.add("show");
}

function openPostModal() {
    editingPostId = null;
    document.getElementById("postModalTitle").textContent = "Create Post";
    document.getElementById("postSubmitBtn").textContent = "Create Post";
    document.getElementById("postEditId").value = "";
    document.getElementById("postTitle").value = "";
    document.getElementById("postMessage").value = "";
    document.getElementById("postGameSearch").value = "";
    document.getElementById("postGameId").value = "";
    document.getElementById("postTagSelect").value = "lfg";
    document.getElementById("gameDropdown").classList.remove("show");
    document.getElementById("postModal").classList.add("active");
}

function closePostModal(e) {
    if (!e || e.target === document.getElementById("postModal")) { document.getElementById("postModal").classList.remove("active"); }
}

async function submitPost() {
    const title = document.getElementById("postTitle").value.trim();
    const gameId = parseInt(document.getElementById("postGameId").value);
    const message = document.getElementById("postMessage").value.trim();
    const tag = document.getElementById("postTagSelect").value;
    const editId = document.getElementById("postEditId").value;
    if (!title) { showToast("Please enter a title", true); return; }
    if (!gameId) { showToast("Please select a game", true); return; }
    const game = games.find(g => g.id === gameId);
    if (!game) { showToast("Game not found", true); return; }
    try {
        if (editId) {
            await db.collection("posts").doc(editId).update({ title: title, gameId: gameId, gameTitle: game.title, message: message || "", tag: tag, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
            showToast("Post updated successfully!"); closePostModal(); loadPosts();
        } else {
            await db.collection("posts").add({ userId: currentUser.uid, title: title, gameId: gameId, gameTitle: game.title, message: message || "", tag: tag, chatMessages: [], chatCount: 0, score: 0, upvotes: 0, downvotes: 0, voters: {}, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
            showToast("Post created!"); closePostModal(); loadPosts();
        }
    } catch (err) { console.error("Submit post error:", err); showToast("Error: " + err.message, true); }
}

function editPost(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) { showToast("Post not found", true); return; }
    editingPostId = postId;
    document.getElementById("postModalTitle").textContent = "Edit Post";
    document.getElementById("postSubmitBtn").textContent = "Update Post";
    document.getElementById("postEditId").value = postId;
    document.getElementById("postTitle").value = post.title || "";
    document.getElementById("postMessage").value = post.message || "";
    document.getElementById("postGameSearch").value = post.gameTitle;
    document.getElementById("postGameId").value = post.gameId;
    document.getElementById("postTagSelect").value = post.tag || "lfg";
    document.getElementById("gameDropdown").classList.remove("show");
    document.getElementById("postModal").classList.add("active");
}

async function deletePost(postId) {
    if (!confirm("Delete this post?")) return;
    try { await db.collection("posts").doc(postId).delete(); loadPosts(); showToast("Post deleted"); } catch (err) { showToast("Error: " + err.message, true); }
}

async function sendChatMessage(postId) {
    const input = document.getElementById(`chatInput_${postId}`);
    const msg = input.value.trim();
    if (!msg) return;
    input.value = "";
    try {
        const postRef = db.collection("posts").doc(postId);
        const postDoc = await postRef.get();
        const data = postDoc.data();
        const messages = data.chatMessages || [];
        const newMsg = { id: Date.now().toString(), userId: currentUser.uid, displayName: userProfile.displayName, nameColor: userProfile.nameColor || "#f1f5f9", avatarColor: userProfile.avatarColor || "#8b5cf6", photoData: userProfile.photoData || "", message: msg, timestamp: Date.now() };
        messages.push(newMsg);
        await postRef.update({ chatMessages: messages, chatCount: messages.length });
        const post = posts.find(p => p.id === postId);
        if (post) {
            if (!post.chatMessages) post.chatMessages = [];
            post.chatMessages.push(newMsg);
            post.chatCount = messages.length;
            renderPosts(document.getElementById("postSearchInput").value, document.getElementById("postSortFilter").value, document.getElementById("postTagFilter").value);
            const container = document.getElementById(`chatContainer_${postId}`);
            if (container) container.classList.add('open');
            const arrow = document.getElementById(`chatArrow_${postId}`);
            if (arrow) arrow.classList.add('open');
            if (post) post._chatOpen = true;
        }
    } catch (err) { console.error("Chat error:", err); showToast("Error sending message: " + err.message, true); }
}

let contextTarget = null;
function showContextMenu(e) {
    e.preventDefault();
    const msgEl = e.currentTarget;
    const msgId = msgEl.dataset.msgid;
    const postId = msgEl.dataset.postid;
    const userId = msgEl.dataset.userid;
    const isOwn = userId === currentUser.uid;
    contextTarget = { msgId, postId, element: msgEl };
    const menu = document.getElementById("contextMenu");
    const editItem = document.getElementById("ctxEdit");
    const deleteItem = document.getElementById("ctxDelete");
    editItem.style.display = isOwn ? "block" : "none";
    deleteItem.style.display = isOwn ? "block" : "block";
    menu.style.left = Math.min(e.pageX, window.innerWidth - 150) + "px";
    menu.style.top = Math.min(e.pageY, window.innerHeight - 100) + "px";
    menu.style.display = "block";
    editItem.onclick = () => { editChatMessage(contextTarget.postId, contextTarget.msgId); hideContextMenu(); };
    deleteItem.onclick = () => { deleteChatMessage(contextTarget.postId, contextTarget.msgId); hideContextMenu(); };
}
function hideContextMenu() { document.getElementById("contextMenu").style.display = "none"; }
document.addEventListener("click", hideContextMenu);

async function editChatMessage(postId, msgId) {
    const newMsg = prompt("Edit your message:");
    if (newMsg === null || newMsg.trim() === "") return;
    try {
        const postRef = db.collection("posts").doc(postId);
        const postDoc = await postRef.get();
        const data = postDoc.data();
        let messages = data.chatMessages || [];
        const idx = messages.findIndex(m => m.id === msgId);
        if (idx === -1) { showToast("Message not found", true); return; }
        messages[idx].message = newMsg.trim();
        await postRef.update({ chatMessages: messages });
        const post = posts.find(p => p.id === postId);
        if (post) { const m = post.chatMessages.find(m => m.id === msgId); if (m) m.message = newMsg.trim(); renderPosts(document.getElementById("postSearchInput").value, document.getElementById("postSortFilter").value, document.getElementById("postTagFilter").value); }
        showToast("Message updated");
    } catch (err) { showToast("Error: " + err.message, true); }
}

async function deleteChatMessage(postId, msgId) {
    if (!confirm("Delete this message?")) return;
    try {
        const postRef = db.collection("posts").doc(postId);
        const postDoc = await postRef.get();
        const data = postDoc.data();
        let messages = data.chatMessages || [];
        messages = messages.filter(m => m.id !== msgId);
        await postRef.update({ chatMessages: messages, chatCount: messages.length });
        const post = posts.find(p => p.id === postId);
        if (post) { post.chatMessages = messages; post.chatCount = messages.length; renderPosts(document.getElementById("postSearchInput").value, document.getElementById("postSortFilter").value, document.getElementById("postTagFilter").value); }
        showToast("Message deleted");
    } catch (err) { showToast("Error: " + err.message, true); }
}

async function addFriendFromPost(userId) {
    if (userId === currentUser.uid) { showToast("That's you!", true); return; }
    try {
        const friendDoc = await db.collection("users").doc(currentUser.uid).collection("friends").doc(userId).get();
        if (friendDoc.exists) { showToast("Already friends!", true); return; }
        const reqSnap = await db.collection("users").doc(userId).collection("requests").where("from", "==", currentUser.uid).get();
        if (!reqSnap.empty) { showToast("Request already sent!", true); return; }
        await db.collection("users").doc(userId).collection("requests").add({ from: currentUser.uid, status: "pending", createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        showToast("Friend request sent!");
    } catch (err) { showToast("Error: " + err.message, true); }
}

function showPosts() { document.getElementById("gamesView").style.display = "none"; document.getElementById("profileView").classList.remove("active"); document.getElementById("friendsView").classList.remove("active"); document.getElementById("postsView").style.display = "block"; loadPosts(); }

function updateStats() {
    const count = myCompletions.length;
    const playingCount = myPlaying.length;
    const lookingCount = myLooking.length;
    const lfgCount = myLFG.length;
    const totalSaves = Object.values(mySaves).reduce((acc, arr) => acc + arr.length, 0);
    document.getElementById("completedCount").textContent = count;
    document.getElementById("playingCount").textContent = playingCount;
    document.getElementById("lookingCount").textContent = lookingCount;
    document.getElementById("lfgCount").textContent = lfgCount;
    document.getElementById("savesCount").textContent = totalSaves;
    document.getElementById("friendsCount").textContent = friendsList.length;
    document.getElementById("totalGames").textContent = games.length;
}

function showGames() { document.getElementById("gamesView").style.display = "block"; document.getElementById("profileView").classList.remove("active"); document.getElementById("friendsView").classList.remove("active"); document.getElementById("postsView").style.display = "none"; }
function showProfile() { document.getElementById("gamesView").style.display = "none"; document.getElementById("profileView").classList.add("active"); document.getElementById("friendsView").classList.remove("active"); document.getElementById("postsView").style.display = "none"; renderProfile(); closeUserDropdown(); }
function showFriends() { document.getElementById("gamesView").style.display = "none"; document.getElementById("profileView").classList.remove("active"); document.getElementById("friendsView").classList.add("active"); document.getElementById("postsView").style.display = "none"; renderFriends(); }

function renderProfile() {
    if (!userProfile) return;
    const count = myCompletions.length, playingCount = myPlaying.length, lookingCount = myLooking.length, lfgCount = myLFG.length, totalSaves = Object.values(mySaves).reduce((acc, arr) => acc + arr.length, 0);
    const avatar = document.getElementById("profileAvatar");
    setAvatarElement(avatar, userProfile);
    document.getElementById("profileName").textContent = userProfile.displayName;
    document.getElementById("profileName").style.color = userProfile.nameColor || "#f1f5f9";
    document.getElementById("profileEmail").textContent = currentUser.email;
    document.getElementById("profileCompleted").textContent = count;
    document.getElementById("profilePlaying").textContent = playingCount;
    document.getElementById("profileLooking").textContent = lookingCount;
    document.getElementById("profileLFG").textContent = lfgCount;
    document.getElementById("profileSaves").textContent = totalSaves;
    document.getElementById("profileFriends").textContent = friendsList.length;
    const grid = document.getElementById("completedGamesGrid");
    grid.innerHTML = "";
    if (!myCompletions.length) { grid.innerHTML = '<div class="empty-state">No completed games yet. Start your journey!</div>'; } else { myCompletions.forEach(id => { const game = games.find(g => g.id === id); if (!game) return; const div = document.createElement("div"); div.className = "game-card completed"; div.style.cursor = "default"; const color = getColor(game.id); const coverHtml = game.steamId ? `<img src="https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/library_600x900_2x.jpg" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>';">` : `<span style="font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>`; div.innerHTML = `<div class="cover" style="background: linear-gradient(135deg, ${color}15 0%, ${color}30 100%); height: 140px;">${coverHtml}</div><div class="game-info"><div class="game-title">${game.title}</div><div class="game-meta">${game.genre}</div></div>`; grid.appendChild(div); }); }
    const playingGrid = document.getElementById("playingGamesGrid");
    playingGrid.innerHTML = "";
    if (!myPlaying.length) { playingGrid.innerHTML = '<div class="empty-state">Not playing any games right now</div>'; } else { myPlaying.forEach(id => { const game = games.find(g => g.id === id); if (!game) return; const div = document.createElement("div"); div.className = "game-card playing"; div.style.cursor = "default"; const color = getColor(game.id); const coverHtml = game.steamId ? `<img src="https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/library_600x900_2x.jpg" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>';">` : `<span style="font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>`; div.innerHTML = `<div class="cover" style="background: linear-gradient(135deg, ${color}15 0%, ${color}30 100%); height: 140px;">${coverHtml}</div><div class="game-info"><div class="game-title">${game.title}</div><div class="game-meta">${game.genre}</div></div>`; playingGrid.appendChild(div); }); }
    const lookingGrid = document.getElementById("lookingGamesGrid");
    lookingGrid.innerHTML = "";
    if (!myLooking.length) { lookingGrid.innerHTML = '<div class="empty-state">Not looking for players right now</div>'; } else { myLooking.forEach(id => { const game = games.find(g => g.id === id); if (!game) return; const div = document.createElement("div"); div.className = "game-card looking_for_players"; div.style.cursor = "default"; const color = getColor(game.id); const coverHtml = game.steamId ? `<img src="https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/library_600x900_2x.jpg" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>';">` : `<span style="font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>`; div.innerHTML = `<div class="cover" style="background: linear-gradient(135deg, ${color}15 0%, ${color}30 100%); height: 140px;">${coverHtml}</div><div class="game-info"><div class="game-title">${game.title}</div><div class="game-meta">${game.genre}</div></div>`; lookingGrid.appendChild(div); }); }
    const lfgGrid = document.getElementById("lfgGamesGrid");
    lfgGrid.innerHTML = "";
    if (!myLFG.length) { lfgGrid.innerHTML = '<div class="empty-state">Not looking for group right now</div>'; } else { myLFG.forEach(id => { const game = games.find(g => g.id === id); if (!game) return; const div = document.createElement("div"); div.className = "game-card lfg"; div.style.cursor = "default"; const color = getColor(game.id); const coverHtml = game.steamId ? `<img src="https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/library_600x900_2x.jpg" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>';">` : `<span style="font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>`; div.innerHTML = `<div class="cover" style="background: linear-gradient(135deg, ${color}15 0%, ${color}30 100%); height: 140px;">${coverHtml}</div><div class="game-info"><div class="game-title">${game.title}</div><div class="game-meta">${game.genre}</div></div>`; lfgGrid.appendChild(div); }); }
    const savesList = document.getElementById("profileSavesList");
    const allSaves = [];
    Object.keys(mySaves).forEach(gameId => { const game = games.find(g => g.id == gameId); if (game) { mySaves[gameId].forEach(save => { allSaves.push({ ...save, gameTitle: game.title }); }); } });
    if (!allSaves.length) { savesList.innerHTML = '<div class="empty-state">No save files uploaded yet.</div>'; } else { savesList.innerHTML = allSaves.map(save => `<div class="save-item" style="margin-bottom:0.5rem;"><div><div class="save-name">${save.gameTitle}</div><div class="save-meta">${save.name} • ${save.size}</div></div><button class="btn-secondary btn-small" onclick="downloadSaveFromData('${save.data}','${save.name}')">Download</button></div>`).join(""); }
}

async function updateProfileName() {
    const name = document.getElementById("settingsName").value.trim();
    if (!name) { showToast("Please enter a name", true); return; }
    try { await db.collection("users").doc(currentUser.uid).update({ displayName: name, searchName: name.toLowerCase() }); userProfile.displayName = name; document.getElementById("headerName").textContent = name; document.getElementById("profileName").textContent = name; showToast("Name updated!"); } catch (err) { showToast("Error: " + err.message, true); }
}
async function updateNameColor() {
    const color = document.getElementById("settingsNameColor").value;
    try { await db.collection("users").doc(currentUser.uid).update({ nameColor: color }); userProfile.nameColor = color; document.getElementById("headerName").style.color = color; document.getElementById("profileName").style.color = color; showToast("Name color updated!"); } catch (err) { showToast("Error: " + err.message, true); }
}
async function updateAvatarColor() {
    const color = document.getElementById("settingsAvatarColor").value;
    try { await db.collection("users").doc(currentUser.uid).update({ avatarColor: color }); userProfile.avatarColor = color; const headerAvatar = document.getElementById("headerAvatar"); const profileAvatar = document.getElementById("profileAvatar"); if (!userProfile.photoData) { headerAvatar.style.background = color; headerAvatar.style.backgroundImage = "none"; headerAvatar.textContent = getInitials(userProfile.displayName); profileAvatar.style.background = color; profileAvatar.style.backgroundImage = "none"; profileAvatar.textContent = getInitials(userProfile.displayName); } showToast("Avatar color updated!"); } catch (err) { showToast("Error: " + err.message, true); }
}
async function uploadProfilePhoto() {
    const fileInput = document.getElementById("settingsPhotoFile");
    const file = fileInput.files[0];
    if (!file) { showToast("Please select an image", true); return; }
    if (file.size > 500 * 1024) { showToast("Image too large (max 500KB)", true); return; }
    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const base64 = e.target.result;
            await db.collection("users").doc(currentUser.uid).update({ photoData: base64 });
            userProfile.photoData = base64;
            const headerAvatar = document.getElementById("headerAvatar");
            const profileAvatar = document.getElementById("profileAvatar");
            headerAvatar.style.backgroundImage = `url(${base64})`; headerAvatar.style.backgroundSize = "cover"; headerAvatar.style.backgroundPosition = "center"; headerAvatar.textContent = "";
            profileAvatar.style.backgroundImage = `url(${base64})`; profileAvatar.style.backgroundSize = "cover"; profileAvatar.style.backgroundPosition = "center"; profileAvatar.textContent = "";
            showToast("Profile photo uploaded!");
        } catch (err) { showToast("Upload failed: " + err.message, true); }
    };
    reader.readAsDataURL(file);
}
async function updateSocial(type) {
    const val = document.getElementById(type === "discord" ? "settingsDiscord" : "settingsReddit").value.trim();
    try { await db.collection("users").doc(currentUser.uid).update({ [type]: val }); userProfile[type] = val; showToast(`${type.charAt(0).toUpperCase()+type.slice(1)} updated!`); } catch (err) { showToast("Error: " + err.message, true); }
}

async function loadFriends() {
    try {
        const snap = await db.collection("users").doc(currentUser.uid).collection("friends").get();
        friendsList = [];
        for (const doc of snap.docs) { try { const userDoc = await db.collection("users").doc(doc.id).get(); if (userDoc.exists) friendsList.push({ uid: doc.id, ...userDoc.data() }); } catch (e) { console.error(e); } }
        updateStats();
    } catch (err) { console.error("loadFriends error:", err); }
}

async function loadRequests() {
    try {
        const snap = await db.collection("users").doc(currentUser.uid).collection("requests").get();
        friendRequests = [];
        for (const doc of snap.docs) {
            const data = doc.data();
            if (data.status === "pending") { try { const userDoc = await db.collection("users").doc(data.from).get(); if (userDoc.exists) friendRequests.push({ id: doc.id, from: data.from, ...userDoc.data() }); } catch (e) { console.error(e); } }
        }
        const badge = document.getElementById("requestBadge");
        if (friendRequests.length) { badge.textContent = friendRequests.length; badge.style.display = "inline-flex"; } else badge.style.display = "none";
    } catch (err) { console.error("loadRequests error:", err); }
}

function renderFriends() {
    const grid = document.getElementById("friendsGrid");
    if (!friendsList.length) { grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;">No friends yet. Click "Find Players" to add friends!</div>'; return; }
    grid.innerHTML = friendsList.map(f => `<div class="friend-card" onclick="openFriendProfile('${f.uid}')"><div class="friend-avatar" style="background:${f.avatarColor};${f.photoData ? `background-image:url(${f.photoData});background-size:cover;` : ''}">${f.photoData ? '' : getInitials(f.displayName)}</div><div class="friend-info"><div class="friend-name" style="color:${f.nameColor || '#f1f5f9'}">${f.displayName}</div><div class="friend-meta">${f.email}</div></div></div>`).join("");
}

function switchFriendsTab(tab) {
    document.getElementById("tabAll").classList.toggle("active", tab === "all");
    document.getElementById("tabRequests").classList.toggle("active", tab === "requests");
    document.getElementById("friendsListContainer").style.display = tab === "all" ? "block" : "none";
    document.getElementById("requestsContainer").style.display = tab === "requests" ? "block" : "none";
    if (tab === "requests") renderRequests();
}

function renderRequests() {
    const list = document.getElementById("requestsList");
    if (!friendRequests.length) { list.innerHTML = '<div class="empty-state">No pending friend requests</div>'; return; }
    list.innerHTML = friendRequests.map(req => `<div class="user-result"><div class="user-result-avatar" style="background:${req.avatarColor};${req.photoData ? `background-image:url(${req.photoData});background-size:cover;` : ''}">${req.photoData ? '' : getInitials(req.displayName)}</div><div class="user-result-info"><div class="user-result-name" style="color:${req.nameColor || '#f1f5f9'}">${req.displayName}</div><div class="user-result-email">${req.email}</div></div><div class="request-actions"><button class="btn-success btn-small" onclick="acceptRequest('${req.id}','${req.from}')">Accept</button><button class="btn-danger btn-small" onclick="declineRequest('${req.id}')">Decline</button></div></div>`).join("");
}

async function sendFriendRequest(targetUid) {
    try {
        const friendDoc = await db.collection("users").doc(currentUser.uid).collection("friends").doc(targetUid).get();
        if (friendDoc.exists) { showToast("Already friends!", true); return; }
        const reqSnap = await db.collection("users").doc(targetUid).collection("requests").where("from", "==", currentUser.uid).get();
        if (!reqSnap.empty) { showToast("Request already sent!", true); return; }
        await db.collection("users").doc(targetUid).collection("requests").add({ from: currentUser.uid, status: "pending", createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        showToast("Friend request sent!");
    } catch (err) { showToast("Error: " + err.message, true); }
}

async function acceptRequest(requestId, fromUid) {
    try {
        const batch = db.batch();
        batch.set(db.collection("users").doc(currentUser.uid).collection("friends").doc(fromUid), { since: firebase.firestore.FieldValue.serverTimestamp() });
        batch.set(db.collection("users").doc(fromUid).collection("friends").doc(currentUser.uid), { since: firebase.firestore.FieldValue.serverTimestamp() });
        batch.delete(db.collection("users").doc(currentUser.uid).collection("requests").doc(requestId));
        await batch.commit();
        await loadFriends(); await loadRequests(); renderFriends(); updateStats(); showToast("Friend added!");
    } catch (err) { showToast("Error: " + err.message, true); }
}

async function declineRequest(requestId) {
    try { await db.collection("users").doc(currentUser.uid).collection("requests").doc(requestId).delete(); await loadRequests(); renderRequests(); showToast("Request declined"); } catch (err) { showToast("Error: " + err.message, true); }
}

function openSearchModal() {
    document.getElementById("searchModal").classList.add("active");
    document.getElementById("userSearchInput").value = "";
    document.getElementById("searchResults").innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Type at least 2 characters</p>';
    document.getElementById("userSearchInput").focus();
}
function closeSearchModal(e) {
    if (!e || e.target === document.getElementById("searchModal")) { document.getElementById("searchModal").classList.remove("active"); }
}
let searchTimeout;

async function searchUsers() {
    const term = document.getElementById("userSearchInput").value.trim().toLowerCase();
    const resultsEl = document.getElementById("searchResults"), loadingEl = document.getElementById("searchLoading");
    if (term.length < 2) { resultsEl.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Type at least 2 characters</p>'; return; }
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        loadingEl.style.display = "block";
        resultsEl.innerHTML = "";
        try {
            const nameSnap = await db.collection("users").where("searchName", ">=", term).where("searchName", "<=", term + "\uf8ff").limit(20).get();
            let users = [];
            nameSnap.docs.forEach(d => { if (d.id !== currentUser.uid) users.push({ uid: d.id, ...d.data() }); });
            const emailSnap = await db.collection("users").where("email", ">=", term).where("email", "<=", term + "\uf8ff").limit(20).get();
            emailSnap.docs.forEach(d => { if (d.id !== currentUser.uid && !users.find(u => u.uid === d.id)) users.push({ uid: d.id, ...d.data() }); });
            if (!users.length) { resultsEl.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">No players found</p>'; } else { resultsEl.innerHTML = users.map(u => `<div class="user-result"><div class="user-result-avatar" style="background:${u.avatarColor};${u.photoData ? `background-image:url(${u.photoData});background-size:cover;` : ''}">${u.photoData ? '' : getInitials(u.displayName)}</div><div class="user-result-info"><div class="user-result-name" style="color:${u.nameColor || '#f1f5f9'}">${u.displayName}</div><div class="user-result-email">${u.email}</div></div><button class="btn-success btn-small" onclick="sendFriendRequest('${u.uid}')">Add Friend</button></div>`).join(""); }
        } catch (err) { resultsEl.innerHTML = `<p style="color:var(--danger);text-align:center;padding:2rem;">Error: ${err.message}</p>`; }
        loadingEl.style.display = "none";
    }, 300);
}

async function openFriendProfile(friendUid) {
    const userDoc = await db.collection("users").doc(friendUid).get();
    if (!userDoc.exists) { showToast("User not found", true); return; }
    const profile = userDoc.data();
    const compSnap = await db.collection("users").doc(friendUid).collection("completions").get();
    const friendCompletions = compSnap.docs.map(d => parseInt(d.id));
    const playingSnap = await db.collection("users").doc(friendUid).collection("gameStatus").where("status", "==", "playing").get();
    const friendPlaying = playingSnap.docs.map(d => parseInt(d.id));
    const lookingSnap = await db.collection("users").doc(friendUid).collection("gameStatus").where("status", "==", "looking").get();
    const friendLooking = lookingSnap.docs.map(d => parseInt(d.id));
    const lfgSnap = await db.collection("users").doc(friendUid).collection("gameStatus").where("status", "==", "lfg").get();
    const friendLFG = lfgSnap.docs.map(d => parseInt(d.id));
    const savesSnap = await db.collection("users").doc(friendUid).collection("saveFiles").get();
    const friendSaves = {};
    let totalFriendSaves = 0;
    savesSnap.docs.forEach(d => { const data = d.data(), gid = data.gameId; if (!friendSaves[gid]) friendSaves[gid] = []; friendSaves[gid].push(data); totalFriendSaves++; });
    const postSnap = await db.collection("posts").where("userId", "==", friendUid).get();
    friendPosts = [];
    postSnap.docs.forEach(d => { friendPosts.push({ id: d.id, ...d.data() }); });
    const avatar = document.getElementById("friendProfileAvatar");
    if (profile.photoData) { avatar.style.backgroundImage = `url(${profile.photoData})`; avatar.style.backgroundSize = "cover"; avatar.style.backgroundPosition = "center"; avatar.textContent = ""; } else { avatar.style.backgroundImage = "none"; avatar.style.background = profile.avatarColor; avatar.textContent = getInitials(profile.displayName); }
    document.getElementById("friendProfileName").textContent = profile.displayName;
    document.getElementById("friendProfileName").style.color = profile.nameColor || "#f1f5f9";
    document.getElementById("friendProfileEmail").textContent = profile.email;
    document.getElementById("friendCompleted").textContent = friendCompletions.length;
    document.getElementById("friendPlaying").textContent = friendPlaying.length;
    document.getElementById("friendLooking").textContent = friendLooking.length;
    document.getElementById("friendLFG").textContent = friendLFG.length;
    document.getElementById("friendSavesCount").textContent = totalFriendSaves;
    const socialDiv = document.getElementById("friendSocialLinks");
    socialDiv.innerHTML = "";
    if (profile.discord) socialDiv.innerHTML += `<span class="badge badge-info">Discord: ${profile.discord}</span>`;
    if (profile.reddit) socialDiv.innerHTML += `<span class="badge badge-warning">Reddit: ${profile.reddit}</span>`;
    if (!profile.discord && !profile.reddit) socialDiv.innerHTML = '<span style="color:var(--text-muted);font-size:0.8rem;">No social links</span>';
    const postsSection = document.getElementById("friendPostsSection");
    const postsList = document.getElementById("friendPostsList");
    if (friendPosts.length) {
        postsSection.style.display = "block";
        postsList.innerHTML = friendPosts.map(p => `<div style="padding:0.5rem 0;border-bottom:1px solid #2d2d44;display:flex;justify-content:space-between;align-items:center;"><div><span class="post-tag ${getTagClass(p.tag)}" style="font-size:0.6rem;">${getTagLabel(p.tag)}</span><strong style="color:var(--accent);margin-left:0.5rem;">${p.gameTitle}</strong><div style="font-size:0.85rem;color:var(--text-muted);">${p.message || ''}</div></div><button class="btn-success btn-small" onclick="addFriendFromPost('${p.userId}')">Add Friend</button></div>`).join("");
    } else { postsSection.style.display = "none"; }
    const grid = document.getElementById("friendCompletedGrid");
    grid.innerHTML = "";
    if (!friendCompletions.length) { grid.innerHTML = '<div class="empty-state">No completed games yet</div>'; } else { friendCompletions.forEach(id => { const game = games.find(g => g.id === id); if (!game) return; const div = document.createElement("div"); div.className = "game-card completed"; div.style.cursor = "default"; const color = getColor(game.id); const coverHtml = game.steamId ? `<img src="https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/library_600x900_2x.jpg" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>';">` : `<span style="font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>`; div.innerHTML = `<div class="cover" style="background: linear-gradient(135deg, ${color}15 0%, ${color}30 100%); height: 140px;">${coverHtml}</div><div class="game-info"><div class="game-title">${game.title}</div><div class="game-meta">${game.genre}</div></div>`; grid.appendChild(div); }); }
    const playingGrid = document.getElementById("friendPlayingGrid");
    playingGrid.innerHTML = "";
    if (!friendPlaying.length) { playingGrid.innerHTML = '<div class="empty-state">Not playing any games</div>'; } else { friendPlaying.forEach(id => { const game = games.find(g => g.id === id); if (!game) return; const div = document.createElement("div"); div.className = "game-card playing"; div.style.cursor = "default"; const color = getColor(game.id); const coverHtml = game.steamId ? `<img src="https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/library_600x900_2x.jpg" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>';">` : `<span style="font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>`; div.innerHTML = `<div class="cover" style="background: linear-gradient(135deg, ${color}15 0%, ${color}30 100%); height: 140px;">${coverHtml}</div><div class="game-info"><div class="game-title">${game.title}</div><div class="game-meta">${game.genre}</div></div>`; playingGrid.appendChild(div); }); }
    const lookingGrid = document.getElementById("friendLookingGrid");
    lookingGrid.innerHTML = "";
    if (!friendLooking.length) { lookingGrid.innerHTML = '<div class="empty-state">Not looking for players</div>'; } else { friendLooking.forEach(id => { const game = games.find(g => g.id === id); if (!game) return; const div = document.createElement("div"); div.className = "game-card looking_for_players"; div.style.cursor = "default"; const color = getColor(game.id); const coverHtml = game.steamId ? `<img src="https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/library_600x900_2x.jpg" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>';">` : `<span style="font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>`; div.innerHTML = `<div class="cover" style="background: linear-gradient(135deg, ${color}15 0%, ${color}30 100%); height: 140px;">${coverHtml}</div><div class="game-info"><div class="game-title">${game.title}</div><div class="game-meta">${game.genre}</div></div>`; lookingGrid.appendChild(div); }); }
    const lfgGrid = document.getElementById("friendLFGGrid");
    lfgGrid.innerHTML = "";
    if (!friendLFG.length) { lfgGrid.innerHTML = '<div class="empty-state">Not looking for group</div>'; } else { friendLFG.forEach(id => { const game = games.find(g => g.id === id); if (!game) return; const div = document.createElement("div"); div.className = "game-card lfg"; div.style.cursor = "default"; const color = getColor(game.id); const coverHtml = game.steamId ? `<img src="https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/library_600x900_2x.jpg" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>';">` : `<span style="font-size:2rem;font-weight:900;color:${color};">${getInitials(game.title)}</span>`; div.innerHTML = `<div class="cover" style="background: linear-gradient(135deg, ${color}15 0%, ${color}30 100%); height: 140px;">${coverHtml}</div><div class="game-info"><div class="game-title">${game.title}</div><div class="game-meta">${game.genre}</div></div>`; lfgGrid.appendChild(div); }); }
    const savesContainer = document.getElementById("friendSavesContainer");
    const allSaves = [];
    Object.keys(friendSaves).forEach(gameId => { const game = games.find(g => g.id == gameId); if (game) { friendSaves[gameId].forEach(save => { allSaves.push({ ...save, gameTitle: game.title }); }); } });
    if (!allSaves.length) { savesContainer.innerHTML = '<div class="empty-state">No save files shared yet</div>'; } else { savesContainer.innerHTML = allSaves.map(save => `<div class="save-item" style="margin-bottom:0.5rem;"><div><div class="save-name">${save.gameTitle}</div><div class="save-meta">${save.name} • ${save.size}</div></div><button class="btn-secondary btn-small" onclick="downloadSaveFromData('${save.data}','${save.name}')">Download</button></div>`).join(""); }
    document.getElementById("friendProfileModal").classList.add("active");
}

function closeFriendProfile(e) {
    if (!e || e.target === document.getElementById("friendProfileModal")) { document.getElementById("friendProfileModal").classList.remove("active"); }
}

function showToast(msg, isError) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.className = "toast" + (isError ? " error" : "");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeGameModal(); closeSearchModal(); closeFriendProfile(); closePostModal(); }
});

init();
