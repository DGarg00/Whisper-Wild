/* ============================================================
   WILDLINE — a generative nature soundscape
   Every sound below is synthesized live with the Web Audio API.
   Nothing is a sample or a loop that "restarts" — it's continuous
   generative audio, so it plays forever with zero seams, and any
   number of blocks can run together.
   ============================================================ */

/* ---------------- 1. DATA ---------------- */

const SECTIONS = [
  { id:'water', title:'Water', icon:'🌊', hue:'196 68% 48%',
    sounds:['Flowing river','Babbling brook / stream','Waterfall','Gentle waves','Ocean waves crashing','Sea shore / beach water','Lake water lapping','Rainfall','Light drizzle','Heavy rain','Rain on leaves','Rain on roof','Rain on window','Water dripping','Cave water drops','Fountain','Rapids','Tidal waves','Ice cracking / melting','Underwater bubbling'] },
  { id:'wind', title:'Wind & Air', icon:'🌬️', hue:'175 30% 55%',
    sounds:['Gentle breeze','Strong wind','Howling wind','Wind through trees','Wind through grass','Wind through bamboo','Wind through leaves','Mountain wind','Desert wind','Wind through a valley','Whistling wind','Gusts of wind','Wind against a window','Wind blowing through an open field'] },
  { id:'fire', title:'Fire', icon:'🔥', hue:'23 85% 54%',
    sounds:['Campfire crackling','Wood burning','Logs popping','Fireplace crackling','Small flame','Large bonfire','Firewood snapping','Embers glowing / crackling','Leaves burning','Forest fire ambience'] },
  { id:'storms', title:'Weather & Storms', icon:'⛈️', hue:'228 30% 45%',
    sounds:['Thunder','Distant thunder','Lightning storm ambience','Heavy storm','Rainstorm','Hail','Snowfall ambience','Blizzard wind','Tropical storm','Monsoon rain','Distant storm','Rain + thunder','Wind + rain'] },
  { id:'forest', title:'Forest & Trees', icon:'🌲', hue:'150 35% 32%',
    sounds:['Leaves rustling','Trees swaying','Branches creaking','Falling leaves','Pine trees moving in wind','Bamboo rustling','Grass moving in breeze','Acorns / fruit falling','Twigs snapping','Forest floor crunching','Trees cracking in a storm','Distant forest ambience'] },
  { id:'birds', title:'Birds', icon:'🐦', hue:'205 62% 58%',
    sounds:['Birds chirping','Birds singing','Dawn chorus','Night birds','Owl hooting','Eagle cry','Hawk call','Crow cawing','Raven call','Woodpecker tapping','Songbirds','Seagulls','Ducks','Geese','Pigeons','Tropical birds','Jungle birds'] },
  { id:'insects', title:'Insects', icon:'🦗', hue:'75 35% 42%',
    sounds:['Crickets','Cicadas','Grasshoppers','Bees buzzing','Flies buzzing','Mosquitoes','Fireflies / nighttime insect ambience','Dragonflies','Beetles','Ants / insect movement','Night forest insects'] },
  { id:'amphibians', title:'Amphibians & Small Animals', icon:'🐸', hue:'100 28% 38%',
    sounds:['Frogs croaking','Frog chorus','Toads','Crickets + frogs','Lizards moving through leaves','Snakes moving through grass','Small rodents in vegetation'] },
  { id:'wild', title:'Wild Animals', icon:'🐺', hue:'22 30% 40%',
    sounds:['Wolves howling','Fox calls','Deer sounds','Bears','Big cats growling / roaring','Elephants trumpeting','Monkeys calling','Wild dogs','Hyenas','Distant animal calls','Jungle animal ambience'] },
  { id:'farm', title:'Farm & Rural Nature', icon:'🐄', hue:'38 45% 52%',
    sounds:['Cows mooing','Calves calling','Sheep bleating','Goats bleating','Horses neighing','Chickens clucking','Roosters crowing','Ducks quacking','Farm birds','Animals moving through grass'] },
  { id:'ground', title:'Grass, Leaves & Ground', icon:'🌿', hue:'92 32% 40%',
    sounds:['Grass rustling','Dry grass movement','Wet grass footsteps','Leaves crunching underfoot','Dry leaves blowing','Twigs breaking','Pine needles underfoot','Walking through forest','Walking through tall grass','Walking on dirt','Walking on gravel','Walking through mud'] },
  { id:'mountain', title:'Mountain & Wilderness', icon:'🏔️', hue:'205 15% 48%',
    sounds:['Mountain wind','Distant waterfall','Mountain stream','Echoing birds','Snow crunching','Avalanche rumble','Rocks falling','Distant thunder in mountains','Wind through a mountain pass','Valley ambience','Cave ambience','Echoes in a canyon'] },
  { id:'desert', title:'Desert', icon:'🏜️', hue:'35 55% 55%',
    sounds:['Desert wind','Sand blowing','Sandstorm','Sand shifting','Distant animal calls','Desert night ambience','Dry grass rustling','Rocks / pebbles shifting'] },
  { id:'ocean', title:'Ocean & Coastal', icon:'🌊', hue:'201 70% 38%',
    sounds:['Calm ocean','Waves breaking','Waves crashing on rocks','Small beach waves','Distant surf','Seagulls','Ocean wind','Underwater ambience','Bubbling underwater','Whale calls','Dolphin sounds','Iceberg / sea ice cracking'] },
  { id:'night', title:'Night Nature', icon:'🌙', hue:'245 35% 45%',
    sounds:['Night forest','Crickets at night','Owls','Frogs','Night insects','Distant animal calls','Wind through trees','Gentle river at night','Waves at night','Campfire + night forest','Rain + night insects'] },
  { id:'timeofday', title:'Time-of-Day Ambience', icon:'🌅', hue:'18 55% 58%',
    sounds:['Dawn / sunrise ambience','Morning birds','Midday forest','Afternoon breeze','Sunset ambience','Evening insects','Twilight forest','Midnight forest','Pre-dawn silence'] },
  { id:'geo', title:'Earth & Geological', icon:'🌋', hue:'8 45% 38%',
    sounds:['Volcano rumbling','Lava bubbling','Earthquake rumble','Rockfall','Landslide','Glacier cracking','Iceberg cracking','Geyser eruption','Hot spring bubbling','Cave rumbling','Underground water'] },
];

const COMBOS = {
  title:'Combinations', icon:'🎧', hue:'40 70% 55%',
  items:[
    { title:'Rain + thunder + distant birds', icon:'🌧️', layers:['Heavy rain','Distant thunder','Birds chirping'] },
    { title:'Forest + gentle wind + birds', icon:'🌲', layers:['Distant forest ambience','Gentle breeze','Songbirds'] },
    { title:'Ocean waves + seagulls + coastal wind', icon:'🌊', layers:['Waves breaking','Seagulls','Ocean wind'] },
    { title:'Campfire + crickets + gentle wind', icon:'🔥', layers:['Campfire crackling','Crickets','Gentle breeze'] },
    { title:'River + birds + forest ambience', icon:'🏞️', layers:['Flowing river','Birds singing','Distant forest ambience'] },
    { title:'Waterfall + birds + leaves', icon:'💧', layers:['Waterfall','Songbirds','Leaves rustling'] },
    { title:'Rain + fireplace + wind', icon:'🌧️', layers:['Rain on window','Fireplace crackling','Strong wind'] },
    { title:'Night forest + crickets + owl', icon:'🌙', layers:['Night forest','Crickets at night','Owl hooting'] },
    { title:'Mountain stream + wind + distant birds', icon:'🏔️', layers:['Mountain stream','Mountain wind','Echoing birds'] },
    { title:'Meadow + gentle breeze + insects', icon:'🌾', layers:['Grass moving in breeze','Gentle breeze','Grasshoppers'] },
    { title:'Tropical forest + rain + birds', icon:'🌴', layers:['Tropical birds','Light drizzle','Jungle birds'] },
    { title:'Campfire + river + night insects', icon:'🏕️', layers:['Campfire crackling','Flowing river','Night forest insects'] },
    { title:'Beach + waves + wind + distant gulls', icon:'🌊', layers:['Small beach waves','Ocean wind','Seagulls'] },
  ]
};

/* ---------------- 2. deterministic per-sound "personality" ---------------- */

/* filename convention: sounds/<slug>.mp3, e.g. "Flowing river" -> sounds/flowing-river.mp3 */
function slugify(s){
  return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
}

const HAS_AUDIO = new Set([
  'afternoon-breeze','animals-moving-through-grass','avalanche-rumble','babbling-brook-stream','bears','beetles',
  'big-cats-growling-roaring','birds-chirping','birds-singing','blizzard-wind','bubbling-underwater','calm-ocean',
  'campfire-crackling','cave-ambience','cave-water-drops','cicadas','crickets','crickets-at-night',
  'crickets-frogs','dawn-chorus','dawn-sunrise-ambience','deer-sounds','desert-night-ambience','desert-wind',
  'distant-animal-calls','distant-forest-ambience','distant-storm','distant-surf','distant-thunder','distant-thunder-in-mountains',
  'distant-waterfall','dragonflies','dry-grass-movement','dry-grass-rustling','eagle-cry','earthquake-rumble',
  'echoes-in-a-canyon','echoing-birds','embers-glowing-crackling','evening-insects','farm-birds','fireflies-nighttime-insect-ambience',
  'fireplace-crackling','firewood-snapping','flies-buzzing','flowing-river','forest-fire-ambience','fountain',
  'frog-chorus','frogs','frogs-croaking','gentle-breeze','gentle-river-at-night','gentle-waves',
  'grass-moving-in-breeze','grass-rustling','grasshoppers','gusts-of-wind','heavy-storm','hot-spring-bubbling',
  'howling-wind','jungle-animal-ambience','jungle-birds','lake-water-lapping','large-bonfire','leaves-burning',
  'lightning-storm-ambience','logs-popping','midday-forest','midnight-forest','monkeys-calling','monsoon-rain',
  'morning-birds','mountain-stream','mountain-wind','night-birds','night-forest','night-forest-insects',
  'night-insects','ocean-waves-crashing','ocean-wind','owl-hooting','owls','pine-trees-moving-in-wind',
  'pre-dawn-silence','rain-thunder','rainfall','rainstorm','rapids','roosters-crowing',
  'sand-blowing','sand-shifting','sandstorm','sea-shore-beach-water','seagulls','small-beach-waves',
  'small-flame','snowfall-ambience','songbirds','strong-wind','sunset-ambience','thunder',
  'tidal-waves','trees-swaying','tropical-birds','tropical-storm','twilight-forest','underground-water',
  'underwater-bubbling','valley-ambience','walking-on-gravel','walking-through-forest','walking-through-mud','walking-through-tall-grass',
  'water-dripping','waterfall','waves-at-night','waves-breaking','waves-crashing-on-rocks','wet-grass-footsteps',
  'whistling-wind','wind-against-a-window','wind-blowing-through-an-open-field','wind-rain','wind-through-a-mountain-pass','wind-through-a-valley',
  'wind-through-grass','wind-through-leaves','wind-through-trees','wolves-howling','wood-burning',
]);

function hashStr(s){ let h=2166136261; for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619);} return h>>>0; }
function mulberry32(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function rngFor(name){ return mulberry32(hashStr(name)); }
function pick(rng,min,max){ return min + rng()*(max-min); }

/* ---------------- 3. classification: sound name -> synth recipe ---------------- */

function has(n,...words){ return words.some(w=>n.includes(w)); }

function classify(rawName){
  const n = rawName.toLowerCase();
  const rng = rngFor(rawName);
  const jitter = (base,amt)=> base * pick(rng,1-amt,1+amt);

  // --- named animal / bird calls (most specific first) ---
  if (has(n,'owl')) return {family:'call', wave:'sine', f0:jitter(420,.1), f1:jitter(260,.1), dur:.55, attack:.05, decay:.5, gap:[2.5,6], double:true, bed:'forestQuiet'};
  if (has(n,'eagle','hawk')) return {family:'call', wave:'sawtooth', f0:jitter(2600,.1), f1:jitter(1800,.15), dur:.5, attack:.02, decay:.4, gap:[3,8], noiseMix:.35, bed:'skyQuiet'};
  if (has(n,'crow','raven')) return {family:'call', wave:'square', f0:jitter(500,.15), f1:jitter(320,.1), dur:.3, attack:.01, decay:.25, gap:[1.5,4.5], noiseMix:.5, bed:'forestQuiet'};
  if (has(n,'woodpecker')) return {family:'peck', rate:jitter(14,.2), burst:[4,9], gap:[1.5,5], band:jitter(1400,.2)};
  if (has(n,'seagull','gull')) return {family:'call', wave:'sawtooth', f0:jitter(1600,.1), f1:jitter(2200,.15), dur:.35, attack:.02, decay:.3, gap:[1,3], noiseMix:.3, bed:'coastQuiet'};
  if (has(n,'duck','goose','geese')) return {family:'call', wave:'square', f0:jitter(340,.1), f1:jitter(300,.1), dur:.22, attack:.01, decay:.18, gap:[.8,2.4], noiseMix:.25, bed:'farmQuiet'};
  if (has(n,'pigeon')) return {family:'call', wave:'sine', f0:jitter(280,.08), f1:jitter(240,.08), dur:.4, attack:.05, decay:.3, gap:[1.2,3], bed:'forestQuiet'};
  if (has(n,'chicken','cluck')) return {family:'call', wave:'square', f0:jitter(500,.15), f1:jitter(420,.1), dur:.18, attack:.01, decay:.14, gap:[1,3], noiseMix:.3, bed:'farmQuiet'};
  if (has(n,'rooster')) return {family:'call', wave:'sawtooth', f0:jitter(500,.1), f1:jitter(950,.15), dur:1.1, attack:.05, decay:.9, gap:[6,14], noiseMix:.2, bed:'farmQuiet'};
  if (has(n,'cow','moo','calv')) return {family:'call', wave:'sawtooth', f0:jitter(150,.1), f1:jitter(110,.1), dur:1.4, attack:.15, decay:1.1, gap:[5,11], noiseMix:.15, bed:'farmQuiet'};
  if (has(n,'sheep','goat','bleat')) return {family:'call', wave:'sawtooth', f0:jitter(340,.15), f1:jitter(420,.15), dur:.6, attack:.05, decay:.5, gap:[3,7], noiseMix:.2, bed:'farmQuiet'};
  if (has(n,'horse','neigh')) return {family:'call', wave:'square', f0:jitter(300,.1), f1:jitter(500,.2), dur:.8, attack:.03, decay:.6, gap:[5,12], noiseMix:.3, bed:'farmQuiet'};
  if (has(n,'wolves','wolf','howl')) return {family:'call', wave:'sine', f0:jitter(280,.1), f1:jitter(520,.15), dur:2.2, attack:.5, decay:1.5, gap:[6,14], vibrato:5, bed:'nightQuiet'};
  if (has(n,'fox')) return {family:'call', wave:'square', f0:jitter(900,.15), f1:jitter(650,.15), dur:.35, attack:.02, decay:.28, gap:[4,10], noiseMix:.3, bed:'nightQuiet'};
  if (has(n,'deer')) return {family:'call', wave:'square', f0:jitter(700,.1), f1:jitter(500,.1), dur:.3, attack:.02, decay:.25, gap:[6,14], noiseMix:.25, bed:'forestQuiet'};
  if (has(n,'bear')) return {family:'call', wave:'sawtooth', f0:jitter(120,.1), f1:jitter(80,.1), dur:1.1, attack:.1, decay:.9, gap:[7,16], noiseMix:.4, bed:'forestQuiet'};
  if (has(n,'big cat','roar','growl')) return {family:'call', wave:'sawtooth', f0:jitter(140,.12), f1:jitter(90,.12), dur:1.8, attack:.3, decay:1.3, gap:[7,15], noiseMix:.45, bed:'forestQuiet'};
  if (has(n,'elephant')) return {family:'call', wave:'sawtooth', f0:jitter(220,.1), f1:jitter(600,.2), dur:1.6, attack:.1, decay:1.2, gap:[8,18], noiseMix:.2, bed:'forestQuiet'};
  if (has(n,'monkey')) return {family:'call', wave:'square', f0:jitter(700,.2), f1:jitter(1000,.2), dur:.25, attack:.01, decay:.2, gap:[2,5], noiseMix:.3, bed:'forestQuiet'};
  if (has(n,'wild dog','hyena')) return {family:'call', wave:'square', f0:jitter(600,.2), f1:jitter(900,.2), dur:.4, attack:.02, decay:.3, gap:[3,8], noiseMix:.35, bed:'nightQuiet'};
  if (has(n,'whale')) return {family:'call', wave:'sine', f0:jitter(120,.1), f1:jitter(200,.15), dur:3, attack:.8, decay:2, gap:[8,18], bed:'oceanDeep'};
  if (has(n,'dolphin')) return {family:'call', wave:'sine', f0:jitter(2200,.15), f1:jitter(3200,.2), dur:.3, attack:.01, decay:.25, gap:[2,5], bed:'oceanDeep'};
  if (has(n,'lizard','snake','rodent')) return {family:'rustle', band:jitter(2200,.2), rate:jitter(2,.4), sparse:true, bedGain:.02};

  // --- birds generic ---
  if (has(n,'bird','chorus','songbird','tropical','jungle bird')) return {family:'call', wave:'sine', f0:jitter(3200,.2), f1:jitter(4200,.2), dur:.18, attack:.005, decay:.15, gap:[.5,2.2], trill:true, bed: n.includes('night')?'nightQuiet':'forestQuiet'};

  // --- insects ---
  if (has(n,'cricket')) return {family:'pulse', band:jitter(4200,.1), rate:jitter(9,.25), gap:[.15,.4], bed:'nightQuiet'};
  if (has(n,'cicada')) return {family:'tremolo', freq:jitter(4600,.1), tremRate:jitter(28,.2), phrase:[2,5]};
  if (has(n,'grasshopper')) return {family:'pulse', band:jitter(5200,.1), rate:jitter(14,.2), gap:[.1,.3]};
  if (has(n,'bee','fly','mosquito')) return {family:'buzz', freq:jitter(n.includes('mosquito')?450:180,.2), wobble:jitter(5,.3)};
  if (has(n,'dragonfl','beetle','ant','firefl')) return {family:'pulse', band:jitter(3000,.2), rate:jitter(3,.3), gap:[.3,1], quiet:true};
  if (has(n,'insect')) return {family:'tremolo', freq:jitter(4000,.15), tremRate:jitter(20,.2), phrase:[2,6]};

  // --- frogs ---
  if (has(n,'frog','toad')) return {family:'pulse', band:jitter(300,.2), rate:jitter(1.6,.3), gap:[.4,1.1], low:true, bed:'nightQuiet'};

  // --- forest structural sounds (checked before the broad "storm" rain fallback below) ---
  if (has(n,'creaking') || has(n,'cracking in a storm')) return {family:'creak', gap:[2,6]};

  // --- thunder / storms ---
  if (has(n,'thunder')) return {family:'thunder', gap: n.includes('distant')?[10,22]:[6,14], distant:n.includes('distant')};
  if (has(n,'hail')) return {family:'rain', bright:jitter(4500,.1), density:.8, drops:true};
  if (has(n,'snow') || has(n,'blizzard')) return {family:'wind', cutoff:jitter(700,.15), sweep:250, rate:jitter(.08,.3), soft:true};

  // --- rain family ---
  if (has(n,'drizzle')) return {family:'rain', bright:jitter(3200,.1), density:.35};
  if (has(n,'rain on roof')) return {family:'rain', bright:jitter(2600,.1), density:.6, drops:true, dropBand:900};
  if (has(n,'rain on leaves')) return {family:'rain', bright:jitter(3600,.1), density:.6, drops:true, dropBand:2200};
  if (has(n,'rain on window')) return {family:'rain', bright:jitter(2400,.1), density:.5, drops:true, dropBand:1400};
  if (has(n,'monsoon','rainstorm','tropical storm','heavy storm','heavy rain','rain + thunder')) return {family:'rain', bright:jitter(3400,.1), density:1, drops:true, dropBand:1600, thunder:has(n,'thunder')};
  if (has(n,'rain','storm')) return {family:'rain', bright:jitter(3000,.1), density:.55, drops:n.includes('wind + rain')?false:true};

  // --- water flow ---
  if (has(n,'drip','cave water drop')) return {family:'drip', pitch:jitter(700,.2), gap:[.6,2.2]};
  if (has(n,'underwater','bubbl')) return {family:'bubble', band:jitter(500,.2), rate:jitter(4,.3)};
  if (has(n,'ice crack','iceberg','glacier')) return {family:'icecrack', gap:[3,9]};
  if (has(n,'fountain')) return {family:'water', cutoff:jitter(1400,.1), q:1.2, lfoRate:.3, lfoDepth:250, sparkle:true};
  if (has(n,'rapids','tidal')) return {family:'water', cutoff:jitter(1100,.1), q:1, lfoRate:.5, lfoDepth:400, gain:1.1};
  if (has(n,'waterfall')) return {family:'water', cutoff:jitter(1600,.1), q:.7, lfoRate:.15, lfoDepth:150, gain:1.15, wash:true};
  if (has(n,'river','brook','stream')) return {family:'water', cutoff:jitter(900,.15), q:1.1, lfoRate:.2, lfoDepth:200};
  if (has(n,'wave','surf','tide','shore','beach','ocean','sea','lake')) return {family:'water', cutoff:jitter(500,.15), q:.8, lfoRate:.12, lfoDepth:180, wash:true, gain:1.05};

  // --- geological ---
  if (has(n,'volcano','lava','geyser','hot spring')) return {family:'geo', freq:jitter(35,.15), gap:[6,14], bubble:has(n,'lava','hot spring')};
  if (has(n,'earthquake','avalanche','landslide','rockfall','rocks falling','rocks / pebbles')) return {family:'geo', freq:jitter(28,.15), gap:[10,24], swell:true};
  if (has(n,'cave rumbling')) return {family:'geo', freq:jitter(40,.1), gap:[14,28], swell:false};
  if (has(n,'underground water')) return {family:'water', cutoff:jitter(600,.1), q:1, lfoRate:.1, lfoDepth:100, gain:.7};

  // --- fire ---
  if (has(n,'fire','campfire','wood burning','logs','ember','bonfire','flame','fireplace')) return {family:'fire', crackleRate:jitter(n.includes('small')?2.5:n.includes('large')||n.includes('bonfire')?7:4.5,.2), bed:jitter(350,.15)};

  // --- desert / sand ---
  if (has(n,'sand','desert')) return {family:'sand', cutoff:jitter(2600,.15), gain:has(n,'storm')?1.2:.7};

  // --- wind ---
  if (has(n,'wind','breeze','gust','whistling','valley','bamboo')) {
    return {family:'wind', cutoff: jitter(has(n,'strong','howling','gust')?900:500,.15),
      sweep: has(n,'howling')?500:200, rate: jitter(.06,.3),
      whistle: has(n,'whistling','howling')};
  }

  // --- forest / leaves / ground (footsteps, rustle) ---
  if (has(n,'walking','footstep')) return {family:'steps', band:jitter(1800,.2), rate:jitter(1.8,.2)};
  if (has(n,'crunch','snow crunching')) return {family:'steps', band:jitter(2400,.2), rate:jitter(1,.3), sparse:true};
  if (has(n,'leaves','grass','twig','pine needles','acorn','fruit falling','forest floor','snapping','breaking')) return {family:'rustle', band:jitter(2200,.2), rate:jitter(1.4,.3)};
  if (has(n,'trees swaying','forest','pines','pine trees')) return {family:'wind', cutoff:jitter(650,.15), sweep:150, rate:jitter(.09,.2)};

  // --- silence / ambience fallback ---
  if (has(n,'silence','pre-dawn')) return {family:'ambient', level:.06};
  if (has(n,'valley ambience','cave ambience','canyon')) return {family:'wind', cutoff:jitter(400,.1), sweep:100, rate:.05, echo:true};
  if (has(n,'distant animal','distant storm','jungle animal ambience')) return {family:'ambient', level:.12, occasional:true};

  // absolute fallback: soft generic nature bed
  return {family:'ambient', level:.15};
}

/* ---------------- 4. audio engine ---------------- */

class Engine {
  constructor(){ this.ctx=null; this.master=null; this.noiseBuf=null; }
  ensure(){
    if (this.ctx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = .9;
    this.master.connect(this.ctx.destination);
    this.noiseBuf = this._makeNoise(4);
  }
  _makeNoise(sec){
    const len = Math.floor(this.ctx.sampleRate*sec);
    const buf = this.ctx.createBuffer(1,len,this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i=0;i<len;i++) d[i]=Math.random()*2-1;
    return buf;
  }
  noiseSrc(){ const s=this.ctx.createBufferSource(); s.buffer=this.noiseBuf; s.loop=true; s.start(); return s; }

  /* Try to load sounds/<slug>.mp3. Cached per slug for the session. */
  loadBuffer(slug){
    if (!this._bufCache) this._bufCache = new Map();
    if (this._bufCache.has(slug)) return this._bufCache.get(slug);
    const p = fetch(`sounds/${slug}.mp3`, {cache:'force-cache'})
      .then(res=>{ if(!res.ok) throw new Error('no file'); return res.arrayBuffer(); })
      .then(ab=> this.ctx.decodeAudioData(ab));
    this._bufCache.set(slug, p);
    return p;
  }

  /* Public entry point: real audio file if present, else the generative fallback.
     Returns a Promise<{out, stop, analyser, placeholder}> */
  async build(name){
    this.ensure();
    const slug = slugify(name);
    try{
      const buffer = await this.loadBuffer(slug);
      return this._buildFromBuffer(buffer);
    }catch(err){
      const inst = this.buildSynth(name);
      inst.placeholder = true;
      return inst;
    }
  }

  _buildFromBuffer(buffer){
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = buffer; src.loop = true; src.start();
    const out = ctx.createGain(); out.gain.value = 0;
    const analyser = ctx.createAnalyser(); analyser.fftSize = 256;
    src.connect(out); out.connect(analyser); analyser.connect(this.master);
    const now = ()=>ctx.currentTime;
    out.gain.setValueAtTime(0, now());
    out.gain.linearRampToValueAtTime(1, now()+0.9);
    const stop = ()=>{
      const t = now();
      out.gain.cancelScheduledValues(t);
      out.gain.setValueAtTime(out.gain.value, t);
      out.gain.linearRampToValueAtTime(0, t+0.7);
      setTimeout(()=>{ try{src.stop();}catch(e){} try{out.disconnect();}catch(e){} try{analyser.disconnect();}catch(e){} }, 900);
    };
    return { out, stop, analyser, placeholder:false };
  }

  /* generative fallback used only when sounds/<slug>.mp3 isn't present yet.
     Returns {out, stop, analyser} synchronously. */
  buildSynth(name){
    this.ensure();
    const ctx = this.ctx;
    const recipe = classify(name);
    const rng = rngFor(name);
    const out = ctx.createGain(); out.gain.value = 0;
    const analyser = ctx.createAnalyser(); analyser.fftSize = 256;
    out.connect(analyser); analyser.connect(this.master);
    const cleanup = [];
    const now = ()=>ctx.currentTime;
    const timers = [];
    const setT = (fn,ms)=>{ const id=setTimeout(fn,ms); timers.push(id); return id; };
    let alive = true;

    const addBed = (cutoffType,freq,q,gain)=>{
      const src = this.noiseSrc();
      const filt = ctx.createBiquadFilter(); filt.type=cutoffType; filt.frequency.value=freq; filt.Q.value=q;
      const g = ctx.createGain(); g.gain.value=gain;
      src.connect(filt); filt.connect(g); g.connect(out);
      cleanup.push(()=>{ try{src.stop();}catch(e){} });
      return {filt,g,src};
    };
    const lfo = (rate,depth,target,base)=>{
      const o = ctx.createOscillator(); o.frequency.value=rate;
      const g = ctx.createGain(); g.gain.value=depth;
      o.connect(g); g.connect(target); o.start();
      if (base!==undefined) target.value = base;
      cleanup.push(()=>{ try{o.stop();}catch(e){} });
      return o;
    };
    const ping = (freq,dur,gainVal,dest,wave='sine')=>{
      const o=ctx.createOscillator(); o.type=wave; o.frequency.value=freq;
      const g=ctx.createGain(); g.gain.setValueAtTime(0,now());
      g.gain.linearRampToValueAtTime(gainVal, now()+Math.min(.02,dur*.2));
      g.gain.exponentialRampToValueAtTime(.0001, now()+dur);
      o.connect(g); g.connect(dest||out);
      o.start(); o.stop(now()+dur+.05);
    };
    const noiseBurst = (dur,gainVal,bandFreq,q,dest)=>{
      const src=this.noiseSrc();
      const filt=ctx.createBiquadFilter(); filt.type='bandpass'; filt.frequency.value=bandFreq; filt.Q.value=q||2;
      const g=ctx.createGain(); g.gain.setValueAtTime(0,now());
      g.gain.linearRampToValueAtTime(gainVal, now()+Math.min(.015,dur*.2));
      g.gain.exponentialRampToValueAtTime(.0001, now()+dur);
      src.connect(filt); filt.connect(g); g.connect(dest||out);
      setT(()=>{ try{src.stop();}catch(e){} }, (dur+.1)*1000);
    };

    const schedule = (fn, minS,maxS)=>{
      const step = ()=>{ if(!alive) return; fn(); setT(step, pick(rng,minS,maxS)*1000); };
      setT(step, pick(rng,minS*.3,maxS*.5)*1000);
    };

    /* ---- families ---- */
    switch(recipe.family){

      case 'water': {
        const b = addBed('bandpass', recipe.cutoff, recipe.q, .5*(recipe.gain||1));
        lfo(recipe.lfoRate, recipe.lfoDepth, b.filt.frequency, recipe.cutoff);
        const hi = addBed('highpass', 3500, .7, .05);
        if (recipe.wash) lfo(recipe.lfoRate*.5, .12, b.g.gain, .5*(recipe.gain||1));
        if (recipe.sparkle) schedule(()=>noiseBurst(.15,.12,pick(rng,3000,6000),4), .3,1);
        break;
      }
      case 'rain': {
        addBed('highpass', recipe.bright, .7, .35*recipe.density);
        addBed('bandpass', recipe.bright*.4, .8, .12*recipe.density);
        if (recipe.drops) schedule(()=>noiseBurst(pick(rng,.03,.08),.1,recipe.dropBand||1500,6), .04,.18/Math.max(recipe.density,.2));
        if (recipe.thunder) schedule(()=>{
          const b=ctx.createGain(); b.connect(this.master); noiseBurst(pick(rng,1.5,3),.5,pick(rng,40,120),.6,b);
        }, 8,16);
        break;
      }
      case 'wind': {
        const b = addBed('lowpass', recipe.cutoff, recipe.whistle?8:2.5, .55);
        lfo(recipe.rate, recipe.sweep, b.filt.frequency, recipe.cutoff);
        lfo(recipe.rate*1.7, .1, b.g.gain, .55);
        if (recipe.echo){ addBed('lowpass',recipe.cutoff*.6,1,.15); }
        break;
      }
      case 'fire': {
        addBed('lowpass', recipe.bed, 1, .22);
        schedule(()=>noiseBurst(pick(rng,.02,.07), pick(rng,.08,.22), pick(rng,1500,5000), pick(rng,3,8)), .5/recipe.crackleRate, 2/recipe.crackleRate);
        break;
      }
      case 'thunder': {
        addBed('lowpass', 90, .8, recipe.distant?.03:.05);
        schedule(()=>{
          const dur=pick(rng,1.8,3.6);
          noiseBurst(dur, recipe.distant?.28:.55, pick(rng,45,140), .6);
        }, recipe.gap[0], recipe.gap[1]);
        break;
      }
      case 'geo': {
        addBed('lowpass', recipe.freq, 1, .16);
        schedule(()=>{
          const dur = recipe.swell? pick(rng,3,6): pick(rng,1.2,2.5);
          noiseBurst(dur, recipe.swell?.3:.18, pick(rng,30,90), .5);
        }, recipe.gap[0], recipe.gap[1]);
        if (recipe.bubble) schedule(()=>noiseBurst(.2,.1,pick(rng,300,700),3), .3,1);
        break;
      }
      case 'sand': {
        addBed('highpass', recipe.cutoff, .6, .25*recipe.gain);
        schedule(()=>noiseBurst(pick(rng,.1,.3),.06,pick(rng,1800,3200),2), .3,1.2);
        break;
      }
      case 'creak': {
        addBed('lowpass', 800, .6, .04);
        schedule(()=>{
          const o=ctx.createOscillator(); o.type='sawtooth';
          const f0=pick(rng,180,260), f1=f0*pick(rng,.6,.85);
          o.frequency.setValueAtTime(f0,now()); o.frequency.linearRampToValueAtTime(f1, now()+pick(rng,.4,.9));
          const filt=ctx.createBiquadFilter(); filt.type='bandpass'; filt.frequency.value=f0; filt.Q.value=6;
          const g=ctx.createGain(); g.gain.setValueAtTime(0,now()); g.gain.linearRampToValueAtTime(.1,now()+.1); g.gain.exponentialRampToValueAtTime(.0001,now()+pick(rng,.5,1));
          o.connect(filt); filt.connect(g); g.connect(out); o.start(); o.stop(now()+1.1);
        }, recipe.gap[0], recipe.gap[1]);
        break;
      }
      case 'steps': {
        addBed('lowpass', 500, .6, .02);
        schedule(()=>{
          const n2 = recipe.sparse? 1 : Math.floor(pick(rng,1,3));
          for(let i=0;i<n2;i++) setT(()=>noiseBurst(pick(rng,.05,.12),.14,recipe.band,3), i*140);
        }, recipe.sparse? 1.5 : 0.5/recipe.rate, recipe.sparse? 4 : 1.4/recipe.rate);
        break;
      }
      case 'rustle': {
        addBed('lowpass', 600, .6, recipe.bedGain!==undefined?recipe.bedGain:.05);
        schedule(()=>noiseBurst(pick(rng,.15,.4),.09,recipe.band,2.5), recipe.sparse?1.5:0.6/recipe.rate, recipe.sparse?5:2/recipe.rate);
        break;
      }
      case 'peck': {
        schedule(()=>{
          const bursts = Math.floor(pick(rng,recipe.burst[0],recipe.burst[1]));
          for(let i=0;i<bursts;i++) setT(()=>noiseBurst(.02,.18,recipe.band,8), i*(1000/recipe.rate));
        }, recipe.gap[0], recipe.gap[1]);
        break;
      }
      case 'drip': {
        addBed('lowpass', 800, .5, .01);
        schedule(()=>{
          ping(recipe.pitch, .5, .13, out, 'sine');
          setT(()=>ping(recipe.pitch*1.5, .3, .05, out, 'sine'), 60);
        }, recipe.gap[0], recipe.gap[1]);
        break;
      }
      case 'bubble': {
        addBed('bandpass', recipe.band, 1, .1);
        schedule(()=>ping(pick(rng,300,900),.18,.08,out,'sine'), .8/recipe.rate, 2.2/recipe.rate);
        break;
      }
      case 'icecrack': {
        addBed('lowpass', 300, .6, .02);
        schedule(()=>noiseBurst(pick(rng,.05,.15),.22,pick(rng,800,2600),5), recipe.gap[0], recipe.gap[1]);
        break;
      }
      case 'call': {
        this._addQuietBed(recipe.bed, addBed, lfo);
        schedule(()=>{
          const dur=recipe.dur, f0=recipe.f0, f1=recipe.f1!==undefined?recipe.f1:recipe.f0;
          const play=()=>{
            const o=ctx.createOscillator(); o.type=recipe.wave;
            o.frequency.setValueAtTime(f0,now());
            o.frequency.linearRampToValueAtTime(f1, now()+dur);
            if (recipe.vibrato){ lfoQuick(o.frequency,recipe.vibrato,f0*.04); }
            const g=ctx.createGain(); g.gain.setValueAtTime(0,now());
            g.gain.linearRampToValueAtTime(.16, now()+recipe.attack);
            g.gain.exponentialRampToValueAtTime(.0001, now()+recipe.attack+recipe.decay);
            o.connect(g);
            if (recipe.noiseMix){
              const ng=ctx.createGain(); ng.gain.value=recipe.noiseMix*.14;
              const filt=ctx.createBiquadFilter(); filt.type='bandpass'; filt.frequency.value=f0; filt.Q.value=3;
              const src=this.noiseSrc(); src.connect(filt); filt.connect(ng); ng.connect(out);
              setT(()=>{try{src.stop();}catch(e){}}, (dur+.3)*1000);
            }
            g.connect(out); o.start(); o.stop(now()+dur+recipe.attack+.1);
          };
          function lfoQuick(param,rate,depth){}
          play();
          if (recipe.double) setT(play, (dur+.3)*1000);
          if (recipe.trill){ for(let i=1;i<pick(rng,2,4);i++) setT(play, i*(dur*1000+40)); }
        }, recipe.gap[0], recipe.gap[1]);
        break;
      }
      case 'pulse': {
        this._addQuietBed(recipe.bed, addBed, lfo);
        schedule(()=>noiseBurst(recipe.low?.25:.06, recipe.quiet?.05:.13, recipe.band, recipe.low?2:6), recipe.gap[0], recipe.gap[1]);
        break;
      }
      case 'tremolo': {
        const o=ctx.createOscillator(); o.type='sine'; o.frequency.value=recipe.freq;
        const g=ctx.createGain(); g.gain.value=0;
        const trem=ctx.createOscillator(); trem.frequency.value=recipe.tremRate;
        const tg=ctx.createGain(); tg.gain.value=.08;
        trem.connect(tg); tg.connect(g.gain);
        o.connect(g); g.connect(out); o.start(); trem.start();
        cleanup.push(()=>{try{o.stop();}catch(e){} try{trem.stop();}catch(e){}});
        schedule(()=>{
          g.gain.cancelScheduledValues(now());
          g.gain.setValueAtTime(g.gain.value, now());
          g.gain.linearRampToValueAtTime(.09, now()+.4);
          setT(()=>{ g.gain.linearRampToValueAtTime(.0, now()+1); }, pick(rng,recipe.phrase[0],recipe.phrase[1])*1000*.6);
        }, recipe.phrase[0], recipe.phrase[1]);
        break;
      }
      case 'buzz': {
        const o=ctx.createOscillator(); o.type='sawtooth'; o.frequency.value=recipe.freq;
        const filt=ctx.createBiquadFilter(); filt.type='lowpass'; filt.frequency.value=recipe.freq*3;
        const g=ctx.createGain(); g.gain.value=.05;
        lfo(recipe.wobble,.015,g.gain,.05);
        o.connect(filt); filt.connect(g); g.connect(out); o.start();
        cleanup.push(()=>{try{o.stop();}catch(e){}});
        break;
      }
      case 'ambient': {
        addBed('lowpass', 1200, .6, recipe.level*.5);
        addBed('bandpass', 2500, .8, recipe.level*.15);
        if (recipe.occasional) schedule(()=>noiseBurst(pick(rng,.3,.8),.06,pick(rng,300,900),2), 3,8);
        break;
      }
      default: {
        addBed('lowpass', 1000, .6, .15);
      }
    }

    out.gain.cancelScheduledValues(now());
    out.gain.setValueAtTime(0, now());
    out.gain.linearRampToValueAtTime(1, now()+0.9);

    const stop = ()=>{
      alive = false;
      timers.forEach(clearTimeout);
      const t=now();
      out.gain.cancelScheduledValues(t);
      out.gain.setValueAtTime(out.gain.value, t);
      out.gain.linearRampToValueAtTime(0, t+0.7);
      setTimeout(()=>{ cleanup.forEach(fn=>fn()); try{out.disconnect();}catch(e){} try{analyser.disconnect();}catch(e){} }, 900);
    };
    return { out, stop, analyser };
  }

  _addQuietBed(bedType, addBed, lfo){
    if (!bedType) return;
    const beds = {
      forestQuiet: ()=>addBed('lowpass',700,.6,.025),
      nightQuiet: ()=>addBed('lowpass',500,.6,.02),
      skyQuiet: ()=>addBed('highpass',1200,.5,.01),
      coastQuiet: ()=>addBed('bandpass',500,.8,.06),
      farmQuiet: ()=>addBed('lowpass',900,.5,.015),
      oceanDeep: ()=>addBed('bandpass',300,.8,.05),
    };
    (beds[bedType]||(()=>{}))();
  }
}

const engine = new Engine();

/* ---------------- 5. UI ---------------- */

const state = { active: new Map(), loading: new Set() }; // name -> {out, stop, analyser, els:[]}
const pendingToken = new Map();

async function toggleSound(name, cardEls){
  if (state.active.has(name)){
    const inst = state.active.get(name);
    inst.stop();
    state.active.delete(name);
    cardEls.forEach(el=>el.classList.remove('is-active','is-placeholder'));
    renderNowPlaying();
    return;
  }
  if (state.loading.has(name)){
    // second click while still loading = cancel the request
    pendingToken.set(name, (pendingToken.get(name)||0)+1);
    state.loading.delete(name);
    cardEls.forEach(el=>el.classList.remove('is-loading'));
    return;
  }
  state.loading.add(name);
  const token = (pendingToken.get(name)||0)+1;
  pendingToken.set(name, token);
  cardEls.forEach(el=>el.classList.add('is-loading'));

  const inst = await engine.build(name);

  state.loading.delete(name);
  cardEls.forEach(el=>el.classList.remove('is-loading'));
  if (pendingToken.get(name) !== token){ inst.stop(); return; } // cancelled mid-load

  inst.els = cardEls;
  state.active.set(name, inst);
  cardEls.forEach(el=>{ el.classList.add('is-active'); el.classList.toggle('is-placeholder', !!inst.placeholder); });
  renderNowPlaying();
}

function stopAll(){
  state.active.forEach(inst=>{ inst.stop(); inst.els.forEach(el=>el.classList.remove('is-active','is-placeholder')); });
  state.active.clear();
  pendingToken.forEach((v,k)=>pendingToken.set(k, v+1));
  document.querySelectorAll('.is-loading').forEach(el=>el.classList.remove('is-loading'));
  state.loading.clear();
  renderNowPlaying();
}

function cardHTML(name, icon){
  return `<span class="card__icon">${icon}</span><span class="card__label">${name}</span><span class="card__eq"><i></i><i></i><i></i><i></i></span>`;
}

function pickIcon(sectionIcon,name){
  const n = name.toLowerCase();
  const map = [
    [['owl'],'🦉'],[['eagle','hawk'],'🦅'],[['crow','raven'],'🐦‍⬛'],[['woodpecker'],'🪵'],
    [['seagull','gull'],'🕊️'],[['duck'],'🦆'],[['goose','geese'],'🪿'],[['pigeon'],'🕊️'],
    [['chicken'],'🐔'],[['rooster'],'🐓'],[['cow','calv'],'🐄'],[['sheep'],'🐑'],[['goat'],'🐐'],
    [['horse'],'🐴'],[['wolf','wolves'],'🐺'],[['fox'],'🦊'],[['deer'],'🦌'],[['bear'],'🐻'],
    [['big cat'],'🐅'],[['elephant'],'🐘'],[['monkey'],'🐒'],[['hyena','wild dog'],'🐕'],
    [['whale'],'🐋'],[['dolphin'],'🐬'],[['frog','toad'],'🐸'],[['snake'],'🐍'],[['lizard'],'🦎'],
    [['cricket'],'🦗'],[['cicada'],'🦗'],[['bee'],'🐝'],[['mosquito','fly'],'🪰'],[['firefl'],'✨'],
    [['dragonfl'],'🌾'],[['thunder'],'⚡'],[['hail'],'🧊'],[['snow','blizzard'],'❄️'],
    [['fire','campfire','ember','flame','bonfire','wood burning','logs'],'🔥'],
    [['rain','drizzle','monsoon'],'🌧️'],[['wave','surf','ocean','sea','beach','tide'],'🌊'],
    [['river','brook','stream','waterfall','rapids','fountain'],'💧'],[['drip'],'💧'],
    [['wind','breeze','gust'],'🌬️'],[['sand','desert'],'🏜️'],[['volcano','lava'],'🌋'],
    [['cave'],'🕳️'],[['mountain'],'⛰️'],[['leaf','leaves'],'🍃'],[['grass'],'🌾'],[['tree','forest','pine','bamboo'],'🌲'],
    [['moon','night','dusk','twilight','midnight'],'🌙'],[['sun','dawn','morning','sunrise','sunset','afternoon','midday'],'🌅'],
    [['walk','step','gravel','dirt','mud'],'🥾'],[['ice','glacier','iceberg'],'🧊'],[['earthquake','rockfall','landslide','avalanche'],'🪨'],
  ];
  for (const [keys,icon] of map) if (keys.some(k=>n.includes(k))) return icon;
  return sectionIcon;
}

function buildUI(){
  const root = document.getElementById('sections');
  const nameToEls = new Map();

  SECTIONS.forEach(sec=>{
    const sounds = sec.sounds.filter(name => HAS_AUDIO.has(slugify(name)));
    if (!sounds.length) return;
    const wrap = document.createElement('section');
    wrap.className = 'section';
    wrap.style.setProperty('--hue', sec.hue);
    wrap.innerHTML = `
      <div class="section__head">
        <span class="section__icon">${sec.icon}</span>
        <h2 class="section__title">${sec.title}</h2>
        <span class="section__count">${sec.sounds.length}</span>
      </div>
      <div class="grid"></div>`;
    const grid = wrap.querySelector('.grid');
    sec.sounds.forEach(name=>{
      const btn = document.createElement('button');
      btn.className='card'; btn.type='button';
      btn.innerHTML = cardHTML(name, pickIcon(sec.icon,name));
      btn.addEventListener('click', ()=>toggleSound(name,[btn]));
      grid.appendChild(btn);
      if (!nameToEls.has(name)) nameToEls.set(name,[]);
      nameToEls.get(name).push(btn);
    });
    root.appendChild(wrap);
  });

  // combinations
  const wrap = document.createElement('section');
  wrap.className = 'section section--combo';
  wrap.style.setProperty('--hue', COMBOS.hue);
  wrap.innerHTML = `
    <div class="section__head">
      <span class="section__icon">${COMBOS.icon}</span>
      <h2 class="section__title">${COMBOS.title}</h2>
      <span class="section__count">${COMBOS.items.length}</span>
    </div>
    <p class="section__sub">One click layers several sounds together.</p>
    <div class="grid grid--combo"></div>`;
  const grid = wrap.querySelector('.grid');
  const combosAvailable = COMBOS.items.filter(combo => combo.layers.every(l => HAS_AUDIO.has(slugify(l))));
combosAvailable.forEach(combo=>{
    const btn = document.createElement('button');
    btn.className='card card--combo'; btn.type='button';
    btn.innerHTML = cardHTML(combo.title, combo.icon) + `<span class="card__layers">${combo.layers.join(' · ')}</span>`;
    let comboOn = false, comboToken = 0;
    btn.addEventListener('click', async ()=>{
      comboOn = !comboOn;
      const token = ++comboToken;
      if (!comboOn){
        combo.layers.forEach(layerName=>{
          const key = layerName+'::'+combo.title;
          if (state.active.has(key)){ state.active.get(key).stop(); state.active.delete(key); }
        });
        btn.classList.remove('is-active','is-loading','is-placeholder');
        renderNowPlaying();
        return;
      }
      btn.classList.add('is-loading');
      const insts = await Promise.all(combo.layers.map(layerName=>engine.build(layerName)));
      btn.classList.remove('is-loading');
      if (token !== comboToken || !comboOn){ insts.forEach(i=>i.stop()); return; } // toggled off mid-load
      let anyPlaceholder = false;
      combo.layers.forEach((layerName,i)=>{
        const inst = insts[i]; inst.els=[btn];
        if (inst.placeholder) anyPlaceholder = true;
        state.active.set(layerName+'::'+combo.title, inst);
      });
      btn.classList.add('is-active');
      btn.classList.toggle('is-placeholder', anyPlaceholder);
      renderNowPlaying();
    });
    grid.appendChild(btn);
  });
  root.appendChild(wrap);

  return nameToEls;
}

function renderNowPlaying(){
  const bar = document.getElementById('nowplaying');
  const count = state.active.size;
  document.getElementById('npCount').textContent = count;
  bar.classList.toggle('is-visible', count>0);
}

/* master waveform visual */
function drawViz(){
  const canvas = document.getElementById('viz');
  const ctx2 = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio||1,2);
  function resize(){ canvas.width=canvas.clientWidth*dpr; canvas.height=canvas.clientHeight*dpr; }
  resize(); window.addEventListener('resize',resize);

  function frame(){
    requestAnimationFrame(frame);
    const w=canvas.width, h=canvas.height;
    ctx2.clearRect(0,0,w,h);
    if (!state.active.size){ return; }
    const insts = Array.from(state.active.values());
    const buffers = insts.map(inst=>{
      const arr = new Uint8Array(inst.analyser.frequencyBinCount);
      inst.analyser.getByteTimeDomainData(arr);
      return arr;
    });
    ctx2.lineWidth = 2*dpr;
    ctx2.strokeStyle = 'rgba(79,209,197,0.9)';
    ctx2.beginPath();
    const len = buffers[0]?buffers[0].length:0;
    for (let i=0;i<len;i++){
      let sum=0;
      for (const b of buffers) sum += (b[i]-128)/128;
      const v = sum/buffers.length;
      const x = (i/len)*w;
      const y = h/2 + v*h*0.42;
      i===0?ctx2.moveTo(x,y):ctx2.lineTo(x,y);
    }
    ctx2.stroke();
  }
  requestAnimationFrame(frame);
}

document.addEventListener('DOMContentLoaded', ()=>{
  buildUI();
  drawViz();
  document.getElementById('stopAll').addEventListener('click', stopAll);
  document.getElementById('year').textContent = new Date().getFullYear();

  // search filter
  const search = document.getElementById('search');
  search.addEventListener('input', ()=>{
    const q = search.value.trim().toLowerCase();
    document.querySelectorAll('.card').forEach(card=>{
      const label = card.querySelector('.card__label').textContent.toLowerCase();
      card.style.display = !q || label.includes(q) ? '' : 'none';
    });
    document.querySelectorAll('.section').forEach(sec=>{
      const anyVisible = Array.from(sec.querySelectorAll('.card')).some(c=>c.style.display!=='none');
      sec.style.display = anyVisible ? '' : 'none';
    });
  });
});
