  //Serverside collection of cards with initial values. Immutable
  cards = new Mongo.Collection("mod");

if (Meteor.isClient) {

        local = new Mongo.Collection(null);

      //Client side card collection that will be altered
    
    Meteor.startup(function(){
    reset();

  });
  $(document).ready(function(){
        reset();

  });
  function copyshit(){
     local.find().forEach(function(x){
      local.remove(x._id);
          
      });
      cards.find().forEach( function(x){
        
        local.insert(x);
        } ); 
  }
  function reset() {
    $("#result").hide();
    $("#finish").hide();
    $('#body').hide();
    Session.set("count",0.00);
    Session.set("one",3.00);
    Session.set("two",6.00);
    Session.set("three",5.00);
    Session.set("four",8.00);
    Session.set("five",4.00);
    Session.set("six",2.00);
    Session.set("seven",2.00);
    Session.set("done",3.00);
    Session.set("dtwo",6.00);
    Session.set("dthree",5.00);
    Session.set("dfour",8.00);
    Session.set("dfive",4.00);
    Session.set("dsix",2.00);
    Session.set("dseven",2.00);
    Session.set("init",false);
    Session.set("enable",true);

  }
Template.submit.events = {
  
  'click button.inc': function(){

        if (!Session.get("init")) {
          //copyshit();
          
          Session.set("init",true);
        }
          var c1="";
          var c2="";
          var c3="";
          c1 = $("#searchBox1").val();
          c2 = $("#searchBox2").val();
          c3 = $("#searchBox3").val();
          if (c1=== ""||c2=== ""||c3=== "") {
          }else{
           }
          var card1 = local.findOne({name:c1});
          var card2 = local.findOne({name:c2});
          var card3 = local.findOne({name:c3});
          if (typeof card1 === 'undefined' ||typeof card2 === 'undefined' || typeof card3 === 'undefined' ) {
          }else{
                      $(".inp").prop("disabled", true);

          }
          var m1 = card1.cost;
          var m2 = card2.cost;
          var m3 = card3.cost;
          
          var t1 = card1.tier;
          var t2 = card2.tier;
          var t3 = card3.tier;
          if (t1<t2&&t1<t3) {
            var c = card1;
            addCard(c);
    
          }else
           if (t2<t1&&t2<t3) {
            var c = card2;
            addCard(c);
;
          }else
           if (t3<t2&&t3<t1) {
            var c = card3;        
            addCard(c);

          }else if(t1==t2&&t1!=t3){
            var c = compareCurveForTwo(card1,card2);
            addCard(c);
          }else if(t2==t3&&t2!=t1){
            var c = compareCurveForTwo(card3,card2);
            addCard(c);            
          }else if (t3==t1&&t3!=t2) {
            var c = compareCurveForTwo(card1,card3);
            addCard(c);
          }else{
            var c = compareCurveForThree(card1,card2,card3);
          }
          var name = c.name;
          var d = c.degrade;
          if (d!=undefined) {
          if (d==1) {
            local.update(c._id,{$inc: {tier: 1}})
          }else{
            local.update(c._id,{$inc: {degrade: -1}})
          }
          }
          $( "p" ).text( "Pick "+c.name );
            $("#result").fadeIn();
          $("#finish").fadeIn();
          $(".inc").fadeOut();
           var c1="";
          var c2="";
          var c3="";
          if (Session.get("count")>=30) {
          window.alert("Draft complete, reseting data");
          Session.set("count",0);
          reset();
          }
  }
  
}
function compareCurveForThree(c1,c2,c3){
  var diff1;
  var diff2;
  var diff3;
   switch(c1.cost) {
    case 1:
        diff1=Session.get("done")-Session.get("one");
        break;
    case 2:
        diff1=Session.get("dtwo")-Session.get("two");
        break;
   case 3:
        diff1=Session.get("dthree")-Session.get("three");
        break;
    case 4:
        diff1=Session.get("dfour")-Session.get("four");    
        break;
    case 5:
        diff1=Session.get("dfive")-Session.get("five");
        break;
    case 6:
        diff1=Session.get("dsix")-Session.get("six");    
        break;
    case 7:
        diff1=Session.get("dseven")-Session.get("seven");
        break;
}
   switch(c2.cost) {
    case 1:
        diff2=Session.get("done")-Session.get("one");
        break;
    case 2:
        diff2=Session.get("dtwo")-Session.get("two");
        break;
   case 3:
        diff2=Session.get("dthree")-Session.get("three");    
        break;
    case 4:
        diff2=Session.get("dfour")-Session.get("four");   
        break;
    case 5:
        diff2=Session.get("dfive")-Session.get("five");    
        break;
    case 6:
        diff2=Session.get("dsix")-Session.get("six");
        break;
    case 7:
        diff2=Session.get("dseven")-Session.get("seven");
        break;
}
switch(c3.cost) {
    case 1:
        diff3=Session.get("done")-Session.get("one");
        break;
    case 2:
        diff3=Session.get("dtwo")-Session.get("two");
        break;
   case 3:
        diff3=Session.get("dthree")-Session.get("three");
        break;
    case 4:
        diff3=Session.get("dfour")-Session.get("four");    
        break;
    case 5:
        diff3=Session.get("dfive")-Session.get("five");
        break;
    case 6:
        diff3=Session.get("dsix")-Session.get("six");    
        break;
    case 7:
        diff3=Session.get("dseven")-Session.get("seven");
        break;
}
if (diff1>diff2&&diff1>diff3) {
  return c1;
}else if(diff2>diff1&&diff2>diff3){
  return c2;
}else if (diff3>diff1&&diff3>diff2) {
return c3;
}else if (diff1==diff2&&diff2==diff3) {
  return c2;
}else if (diff1==diff2) {
  return c1;
}else if (diff2==diff3) {
return c3;
}else{
  return c1;
}
}
function compareCurveForTwo(c1,c2){
  var diff1;
  var diff2;
   switch(c1.cost) {
    case 1:
        diff1=Session.get("done")-Session.get("one");
        break;
    case 2:
        diff1=Session.get("dtwo")-Session.get("two");
        break;
   case 3:
        diff1=Session.get("dthree")-Session.get("three");
        break;
    case 4:
        diff1=Session.get("dfour")-Session.get("four");    
        break;
    case 5:
        diff1=Session.get("dfive")-Session.get("five");
        break;
    case 6:
        diff1=Session.get("dsix")-Session.get("six");    
        break;
    case 7:
        diff1=Session.get("dseven")-Session.get("seven");
        break;
}
   switch(c2.cost) {
    case 1:
        diff2=Session.get("done")-Session.get("one");
        break;
    case 2:
        diff2=Session.get("dtwo")-Session.get("two");
        break;
   case 3:
        diff2=Session.get("dthree")-Session.get("three");    
        break;
    case 4:
        diff2=Session.get("dfour")-Session.get("four");   
        break;
    case 5:
        diff2=Session.get("dfive")-Session.get("five");    
        break;
    case 6:
        diff2=Session.get("dsix")-Session.get("six");
        break;
    case 7:
        diff2=Session.get("dseven")-Session.get("seven");
        break;
}
if (diff1>diff2) {
  return c1;
}else{
  return c2;
}
}
function addCard(card){
  var name1 = card.name;
  var cost1 = card.cost;
  var tier1 = card.tier;
  updateSession(card);
}

function updateSession(card){
  //Decrement our  curve counter,if it goes below 0(optimal value) start decreasing the tier of all cards of that mana cost
   switch(card.cost) {
    case 1:
        Session.set("one",Session.get("one")-1);
        if (Session.get("one")<1) {
          local.find({cost: 1}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
      });
  }
        break;
    case 2:
        Session.set("two",Session.get("two")-1);
        if (Session.get("two")<1) {
          local.find({cost: 2}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
      });
  }
        break;
    case 3:
        Session.set("three",Session.get("three")-1);       
        if (Session.get("three")<1) {
          local.find({cost: 3}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
      });
  }
        break;
    case 4:
        Session.set("four",Session.get("four")-1);
        if (Session.get("four")<1) {
          local.find({cost: 4}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
      });
  }
        break;
    case 5:
        Session.set("five",Session.get("five")-1);
        if (Session.get("five")<1) {
          local.find({cost: 5}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
      });
  }
        break;
    case 6:
        Session.set("six",Session.get("six")-1);    
        if (Session.get("six")<1) {
          local.find({cost: 6}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
      });
  }
        break;
    case 7:
        Session.set("seven",Session.get("seven")-1);
        if (Session.get("seven")<1) {
          local.find({cost: 7}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
      });
  }
        break;

}
  Session.set("count",Session.get("count")+1);
  if (Session.get("count")==10) {
          console.log("Re evaluating Curve");
//For Card #X, submit (30-X)/30
      reprioritizeVals(2/3);
      
  }else if (Session.get("count")==17) {
          console.log("Re evaluating Curve");

      reprioritizeVals(13/30);
  }else if (Session.get("count")==23) {
          console.log("Re evaluating Curve");

      reprioritizeVals(7/30);
  }else{
    
     var one=Session.get("one")/Session.get("done");
        var two=Session.get("two")/Session.get("dtwo");
        var three=Session.get("three")/Session.get("dthree");
        var four=Session.get("four")/Session.get("dfour");
        var five=Session.get("five")/Session.get("dfive");
        var six=Session.get("six")/Session.get("dsix");
        var seven=Session.get("seven")/Session.get("dseven");
        console.log("current values one through seven: "+one+" "+two+" "+three+" "+four+" "+five+" "+six+" "+seven+" ");
        console.log("Current Percent through draft: "+Session.get("count")/30);
  }
  
  }

  

function reprioritizeVals(percent){
        var one=Session.get("one")/Session.get("done");
        var two=Session.get("two")/Session.get("dtwo");
        var three=Session.get("three")/Session.get("dthree");
        var four=Session.get("four")/Session.get("dfour");
        var five=Session.get("five")/Session.get("dfive");
        var six=Session.get("six")/Session.get("dsix");
        var seven=Session.get("seven")/Session.get("dseven");
      
        if (one>percent) {
           local.find({cost: 1}).forEach(function(a){
          local.update(a._id,{$inc: {tier: -1}})
                console.log("One drop priority inc");

      });
        }else if (one<percent) {
          local.find({cost: 1}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
                console.log("One drop priority dec");

      });
          }
      if (two>percent) {
           local.find({cost: 2}).forEach(function(a){
          local.update(a._id,{$inc: {tier: -1}})
         console.log("Two drop priority inc"); 
      });
        }else if (two<percent) {
          local.find({cost: 2}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
          console.log("Two drop priority dec");
      });
          }
      if (three>percent) {
           local.find({cost: 3}).forEach(function(a){
          local.update(a._id,{$inc: {tier: -1}})
          console.log("three drop priority inc");
      });
        }else if (three<percent) {
          local.find({cost: 3}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
          console.log("three drop priority dec");
      });
          }
      if (four>percent) {
           local.find({cost: 4}).forEach(function(a){
          local.update(a._id,{$inc: {tier: -1}})
          console.log("four drop priority inc");
      });
        }else if (four<percent) {
          local.find({cost: 4}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
          console.log("four drop priority dec");
      });
          }
      if (five>percent) {
           local.find({cost: 5}).forEach(function(a){
          local.update(a._id,{$inc: {tier: -1}})
          console.log("five drop priority inc");
      });
        }else if (five<percent) {
          local.find({cost: 5}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
          console.log("five drop priority dec");
      });  
          }
      if (six>percent) {
           local.find({cost: 6}).forEach(function(a){
          local.update(a._id,{$inc: {tier: -1}})
          console.log("six drop priority inc");
      });
        }else if (six<percent) {
          local.find({cost: 6}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
          console.log("six drop priority dec");
      });
          }
      if (seven>percent) {
           local.find({cost: 7}).forEach(function(a){
          local.update(a._id,{$inc: {tier: -1}})
          console.log("seven drop priority inc");
      });
        }else if (seven<percent) {
          local.find({cost: 7}).forEach(function(a){
          local.update(a._id,{$inc: {tier: 1}})
          console.log("seven drop priority dec");
      });
          }
}
Template.nextPick.events = {
  'click button#finish': function(){
        var count = Session.get("count")+1;

        $(".inp").prop("disabled", false);
        
        $("h5").text("Card #"+count);

          $("#searchBox1").val("");
          $("#searchBox2").val("");
          $("#searchBox3").val("");
          $("#result").fadeOut();
          $("#finish").fadeOut();
          $(".inc").fadeIn();
          
  }
}
Template.reset.events = {
  'click button#reset': function(){
            $("h5").text("Card #1");
   $("#searchBox1").val("");
          $("#searchBox2").val("");
          $("#searchBox3").val("");
             $("#result").fadeOut();
          $("#finish").fadeOut();
          $(".inc").fadeIn();
    reset();
  }
}

Template.search1.rendered = function () {
  
  AutoCompletion.init("input#searchBox1");
}

Template.search1.events = {
  'keyup #searchBox1': function () {
    AutoCompletion.autocomplete({
      element: '#searchBox1',       
      collection: cards,              
      field: 'name',
      limit: 10

      });              
      
  }
}
  

Template.search2.rendered = function () {
  AutoCompletion.init("input#searchBox2");
  
}

Template.search2.events = {
  'keyup input#searchBox2': function () {
    AutoCompletion.autocomplete({
      element: 'input#searchBox2',       
      collection: cards,             
      field: 'name',
      limit: 10
      });              

  }
}
  
function initialize() {
  copyshit();
  switch (Session.get("class")) {
    case 1:
      //Run Druid List Updates
      break;
     case 2:
      //Run hunter List Updates
      break;
     case 3:
      //Run mage List Updates
      break;
     case 4:
      //Run paladin List Updates
      break;
     case 5:
      //Run priest List Updates
      break;
     case 6:
      //Run rogue List Updates
      break;
     case 7:
      //Run shmaan List Updates
      break;
     case 8:
      //Run warlock List Updates
      break;
     case 19:
      //Run warrior List Updates
      break;
  }
  $('#class').fadeOut("fast");
  $('#body').fadeIn();
}
Template.search3.rendered = function () {
  AutoCompletion.init("input#searchBox3");
}
Template.druid.events ={
  'click button': function(){
    console.log("Pshed druid calss button");
    Session.set("class",1);
    initialize();
  }
  
}
Template.hunter.events ={
  'click button': function(){
    console.log("Pshed hunter calss button");
    Session.set("class",2);
    initialize();
  }
  
}
Template.mage.events ={
  'click button': function(){
    console.log("Pshed mage calss button");
    Session.set("class",3);
    initialize();
  }
  
}
Template.paladin.events ={
  'click button': function(){
    console.log("Pshed paladin calss button");
    Session.set("class",4);
    initialize();
  }
  
}
Template.priest.events ={
  'click button': function(){
    console.log("Pshed priest calss button");
    Session.set("class",5);
    initialize();
  }
  
}
Template.rogue.events ={
  'click button': function(){
    console.log("Pshed rogue calss button");
    Session.set("class",6);
    initialize();
  }
  
}
Template.shaman.events ={
  'click button': function(){
    console.log("Pshed shaman calss button");
    Session.set("class",7);
    initialize();
  }
  
}
Template.warlock.events ={
  'click button': function(){
    console.log("Pshed warlock calss button");
    Session.set("class",8);
    initialize();
  }
  
}
Template.warrior.events ={
  'click button': function(){
    console.log("Pshed warrior calss button");
    Session.set("class",9);
    initialize();
  }
  
}
Template.search3.events = {
  'keyup input#searchBox3': function () {
    AutoCompletion.autocomplete({
      element: 'input#searchBox3',       
      collection: cards,              
      field: 'name',
      limit: 10
      });             
  }
}
  
}
if (Meteor.isServer) {

    
  Meteor.startup(function () {
      if (cards.find().count() === 0) {
	 	 	 	
cards.insert({name:"Chillwind Yeti", cost:4, tier:1})
cards.insert({name:"Dark Iron Dwarf", cost:4, tier:1})
cards.insert({name:"Harvest Golem", cost:3, tier:1})
cards.insert({name:"Shattered Sun Cleric", cost:3, tier:1, degrade: 2})
cards.insert({name:"Acidic Swamp Ooze", cost:2, tier:1, degrade: 2})
cards.insert({name:"Silver Hand Knight", cost:5, tier:1})
cards.insert({name:"Venture Co. Mercenary", cost:5, tier:1, degrade: 2})
cards.insert({name:"Scarlet Crusader", cost:3, tier:2})
cards.insert({name:"Boulderfist Ogre", cost:6, tier:2})
cards.insert({name:"Gnomish Inventor", cost:4, tier:2})
cards.insert({name:"Earthen Ring Farseer", cost:3, tier:2, degrade: 2})
cards.insert({name:"Sen'jin Shieldmasta", cost:4, tier:2})
cards.insert({name:"Cult Master", cost:4, tier:2, degrade: 1})
cards.insert({name:"Stormwind Champion", cost:7, tier:2})
cards.insert({name:"Worgen Infiltrator", cost:1, tier:2, degrade: 2})
cards.insert({name:"Loot Hoarder", cost:2, tier:3, degrade: 2})
cards.insert({name:"Mad Bomber", cost:2, tier:3, degrade: 2})
cards.insert({name:"Spellbreaker", cost:4, tier:3, degrade: 2})
cards.insert({name:"Frostwolf Warlord", cost:5, tier:3, degrade: 1})
cards.insert({name:"Faerie Dragon", cost:2, tier:3})
cards.insert({name:"Youthful Brewmaster", cost:2, tier:3, degrade: 2})
cards.insert({name:"Bloodfen Raptor", cost:2, tier:3})
cards.insert({name:"Stranglethorn Tiger", cost:5, tier:3})
cards.insert({name:"Raging Worgen", cost:3, tier:3})
cards.insert({name:"Stormwind Knight", cost:4, tier:4})
cards.insert({name:"Jungle Panther", cost:3, tier:4})
cards.insert({name:"Dire Wolf Alpha", cost:2, tier:4})
cards.insert({name:"Ancient Brewmaster", cost:4, tier:4})
cards.insert({name:"Fen Creeper", cost:5, tier:4})
cards.insert({name:"Stormpike Commando", cost:5, tier:4})
cards.insert({name:"Darkscale Healer", cost:5, tier:4})
cards.insert({name:"Bluegill Warrior", cost:2, tier:4})
cards.insert({name:"Wolfrider", cost:3, tier:4})
cards.insert({name:"Spiteful Smith", cost:5, tier:5})
cards.insert({name:"Flesheating Ghoul", cost:3, tier:5})
cards.insert({name:"Frost Elemental", cost:6, tier:5})
cards.insert({name:"Oasis Snapjaw", cost:4, tier:5})
cards.insert({name:"Silvermoon Guardian", cost:4, tier:5})
cards.insert({name:"War Golem", cost:7, tier:5})
cards.insert({name:"Ironfur Grizzly", cost:3, tier:5})
cards.insert({name:"Razorfen Hunter", cost:3, tier:5})
cards.insert({name:"Amani Berserker", cost:2, tier:5})
cards.insert({name:"Acolyte of Pain", cost:3, tier:5})
cards.insert({name:"Archmage", cost:6, tier:6})
cards.insert({name:"Gurubashi Berserker", cost:5, tier:6})
cards.insert({name:"Lord of the Arena", cost:6, tier:6})
cards.insert({name:"Elven Archer", cost:1, tier:6})
cards.insert({name:"Dragonling Mechanic", cost:4, tier:6})
cards.insert({name:"Novice Engineer", cost:2, tier:6})
cards.insert({name:"Bloodsail Raider", cost:2, tier:6})
cards.insert({name:"River Crocolisk", cost:2, tier:6})
cards.insert({name:"Abusive Sergeant", cost:1, tier:6})
cards.insert({name:"Ironforge Rifleman", cost:3, tier:7})
cards.insert({name:"Ogre Magi", cost:4, tier:6})
cards.insert({name:"Priestess of Elune", cost:6, tier:7})
cards.insert({name:"Reckless Rocketeer", cost:6, tier:7})
cards.insert({name:"Booty Bay Bodyguard", cost:5, tier:7})
cards.insert({name:"Ironbeak Owl", cost:2, tier:7, degrade: 1})
cards.insert({name:"Kobold Geomancer", cost:2, tier:7})
cards.insert({name:"Argent Squire", cost:1, tier:7})
cards.insert({name:"Murloc Tidehunter", cost:2, tier:8})
cards.insert({name:"Core Hound", cost:7, tier:8})
cards.insert({name:"Raid Leader", cost:3, tier:8})
cards.insert({name:"Leper Gnome", cost:1, tier:8})
cards.insert({name:"Thrallmar Farseer", cost:3, tier:8})
cards.insert({name:"Windfury Harpy", cost:6, tier:8})
cards.insert({name:"Nightblade", cost:5, tier:8})
cards.insert({name:"Frostwolf Grunt", cost:2, tier:8})
cards.insert({name:"Mogu'shan Warden", cost:4, tier:8})
cards.insert({name:"Dread Corsair", cost:4, tier:8})
cards.insert({name:"Tauren Warrior", cost:3, tier:8})
cards.insert({name:"Magma Rager", cost:3, tier:8})
cards.insert({name:"Dalaran Mage", cost:3, tier:9})
cards.insert({name:"Voodoo Doctor", cost:1, tier:9})
cards.insert({name:"Silverback Patriarch", cost:3, tier:9})
cards.insert({name:"Southsea Deckhand", cost:1, tier:9})
cards.insert({name:"Goldshire Footman", cost:1, tier:9})
cards.insert({name:"Shieldbearer", cost:1, tier:9})
cards.insert({name:"Stonetusk Boar", cost:1, tier:9})
cards.insert({name:"Murloc Raider", cost:1, tier:9})
cards.insert({name:"Young Dragonhawk", cost:1, tier:9})
cards.insert({name:"Wisp", cost:0, tier:9})
cards.insert({name:"Grimscale Oracle", cost:1, tier:9})


	 	 	 	
cards.insert({name:"Azure Drake", cost:5, tier:0})
cards.insert({name:"Argent Commander", cost:6, tier:1})
cards.insert({name:"Stampeding Kodo", cost:5, tier:1})
cards.insert({name:"Knife Juggler", cost:2, tier:1})
cards.insert({name:"Twilight Drake", cost:4, tier:1})
cards.insert({name:"Sunwalker", cost:6, tier:1})
cards.insert({name:"Mind Control Tech", cost:3, tier:2, degrade: 1})
cards.insert({name:"Defender of Argus", cost:4, tier:2, degrade: 2})
cards.insert({name:"Imp Master", cost:3, tier:2})
cards.insert({name:"Emperor Cobra", cost:3, tier:2})
cards.insert({name:"Wild Pyromancer", cost:2, tier:3})
cards.insert({name:"Injured Blademaster", cost:3, tier:3})
cards.insert({name:"Violet Teacher", cost:4, tier:3})
cards.insert({name:"Abomination", cost:5, tier:3})
cards.insert({name:"Ravenholdt Assassin", cost:7, tier:4})
cards.insert({name:"Gadgetzan Auctioneer", cost:5, tier:4})
cards.insert({name:"Sunfury Protector", cost:2, tier:4})
cards.insert({name:"Demolisher", cost:3, tier:4})
cards.insert({name:"Questing Adventurer", cost:3, tier:5})
cards.insert({name:"Crazed Alchemist", cost:2, tier:5})
cards.insert({name:"Arcane Golem", cost:3, tier:5})
cards.insert({name:"Pint-Sized Summoner", cost:2, tier:6})
cards.insert({name:"Master Swordsmith", cost:2, tier:6})
cards.insert({name:"Mana Wraith", cost:2, tier:6})
cards.insert({name:"Young Priestess", cost:1, tier:6})
cards.insert({name:"Bloodsail Corsair", cost:1, tier:7})
cards.insert({name:"Ancient Mage", cost:4, tier:7})
cards.insert({name:"Mana Addict", cost:2, tier:7})
cards.insert({name:"Coldlight Oracle", cost:3, tier:7})
cards.insert({name:"Coldlight Seer", cost:3, tier:7})
cards.insert({name:"Secretkeeper", cost:1, tier:7})
cards.insert({name:"Alarm-o-Bot", cost:3, tier:8})
cards.insert({name:"Lightwarden", cost:1, tier:8})
cards.insert({name:"Ancient Watcher", cost:2, tier:8})
cards.insert({name:"Murloc Tidecaller", cost:1, tier:8})
cards.insert({name:"Angry Chicken", cost:1, tier:8})

cards.insert({name:"Sea Giant", cost:7, tier:1})
cards.insert({name:"Faceless Manipulator", cost:5, tier:1})
cards.insert({name:"Blood Knight", cost:3, tier:1, degrade: 1})
cards.insert({name:"Big Game Hunter", cost:3, tier:2, degrade: 1})
cards.insert({name:"Southsea Captain", cost:3, tier:3})
cards.insert({name:"Murloc Warleader", cost:3, tier:3})
cards.insert({name:"Molten Giant", cost:7, tier:4})
cards.insert({name:"Mountain Giant", cost:7, tier:5})
cards.insert({name:"Hungry Crab", cost:1, tier:5})
cards.insert({name:"Doomsayer", cost:2, tier:5, degrade: 1})
	 	 	 	
cards.insert({name:"Cairne Bloodhoof", cost:6, tier:1})
cards.insert({name:"Ragnaros the Firelord", cost:7, tier:1})
cards.insert({name:"Ysera", cost:7, tier:1})
cards.insert({name:"Sylvanas Windrunner", cost:6, tier:2})
cards.insert({name:"Onyxia", cost:7, tier:2})
cards.insert({name:"The Black Knight", cost:6, tier:3})
cards.insert({name:"Baron Geddon", cost:7, tier:3})
cards.insert({name:"Gruul", cost:7, tier:4})
cards.insert({name:"Harrison Jones", cost:5, tier:5})
cards.insert({name:"Illidan Stormrage", cost:6, tier:6})
cards.insert({name:"Hogger", cost:6, tier:5})
cards.insert({name:"Deathwing", cost:7, tier:5})
cards.insert({name:"The Beast", cost:6, tier:5})
cards.insert({name:"Alexstraza", cost:7, tier:6})
cards.insert({name:"Bloodmage Thalnos", cost:2, tier:6})
cards.insert({name:"King Mukla", cost:3, tier:6})
cards.insert({name:"Leeroy Jenkins", cost:5, tier:7})
cards.insert({name:"Captain Greenskin*", cost:5, tier:7})
cards.insert({name:"Malygos", cost:7, tier:7})
cards.insert({name:"Millhouse Manastorm", cost:2, tier:7})
cards.insert({name:"Nat Pagle", cost:2, tier:8})
cards.insert({name:"Tinkmaster Overspark", cost:3, tier:8})
cards.insert({name:"Nozdormu", cost:7, tier:8})
cards.insert({name:"Lorewalker Cho", cost:2, tier:8})

	 	 	 	
cards.insert({name:"Innervate", cost:1, tier:4})
cards.insert({name:"Moonfire", cost:1, tier:9})
cards.insert({name:"Claw", cost:1, tier:2})
cards.insert({name:"Naturalize", cost:1, tier:8})
cards.insert({name:"Savagery", cost:1, tier:8})
cards.insert({name:"Mark of the Wild", cost:2, tier:4})
cards.insert({name:"Power of the Wild", cost:2, tier:1})
cards.insert({name:"Wild Growth", cost:2, tier:7})
cards.insert({name:"Wrath", cost:2, tier:2})
cards.insert({name:"Healing Touch", cost:3, tier:9})
cards.insert({name:"Mark of Nature", cost:3, tier:6})
cards.insert({name:"Savage Roar", cost:3, tier:7,degrade: 1})
cards.insert({name:"Bite", cost:4, tier:4})
cards.insert({name:"Keeper of the Grove", cost:4, tier:1})
cards.insert({name:"Poison Seeds", cost:4, tier:3})
cards.insert({name:"Soul of the Forest", cost:4, tier:7})
cards.insert({name:"Swipe", cost:4, tier:0})
cards.insert({name:"Druid of the Claw", cost:5, tier:1})
cards.insert({name:"Nourish", cost:5, tier:2})
cards.insert({name:"Starfall", cost:5, tier:1})
cards.insert({name:"Force of Nature", cost:6, tier:1})
cards.insert({name:"Starfire", cost:6, tier:2})
cards.insert({name:"Ancient of Lore", cost:7, tier:0})
cards.insert({name:"Ancient of War", cost:7, tier:0})
cards.insert({name:"Ironbark Protector", cost:8, tier:1})
cards.insert({name:"Cenarius", cost:9, tier:2})
	 	 	 	
cards.insert({name:"Hunter's Mark", cost:1, tier:3})
cards.insert({name:"Arcane Shot", cost:1, tier:3})
cards.insert({name:"Bestial Wrath", cost:1, tier:5})
cards.insert({name:"Flare", cost:1, tier:3})
cards.insert({name:"Timber Wolf", cost:1, tier:5})
cards.insert({name:"Tracking", cost:1, tier:5})
cards.insert({name:"Webspinner", cost:1, tier:3})
cards.insert({name:"Explosive Trap", cost:2, tier:2})
cards.insert({name:"Freezing Trap", cost:2, tier:5})
cards.insert({name:"Misdirection", cost:2, tier:3})
cards.insert({name:"Scavenging Hyena", cost:2, tier:3})
cards.insert({name:"Snake Trap", cost:2, tier:5})
cards.insert({name:"Snipe", cost:2, tier:8})
cards.insert({name:"Animal Companion", cost:3, tier:1})
cards.insert({name:"Deadly Shot", cost:3, tier:2})
cards.insert({name:"Eaglehorn Bow", cost:3, tier:1})
cards.insert({name:"Kill Command", cost:3, tier:1})
cards.insert({name:"Unleash the Hounds", cost:3, tier:1})
cards.insert({name:"Houndmaster", cost:4, tier:3})
cards.insert({name:"Multi-Shot", cost:4, tier:2, degrade: 1})
cards.insert({name:"Explosive Shot", cost:5, tier:1})
cards.insert({name:"Starving Buzzard", cost:5, tier:8})
cards.insert({name:"Tundra Rhino", cost:5, tier:5})
cards.insert({name:"Savannah Highmane", cost:6, tier:2})
cards.insert({name:"Gladiator's Longbow", cost:7, tier:1})
cards.insert({name:"King Krush", cost:9, tier:1})

	 	 	 	
cards.insert({name:"Arcane Missiles", cost:1, tier:3})
cards.insert({name:"Ice Lance", cost:1, tier:9})
cards.insert({name:"Mana Wyrm", cost:1, tier:3})
cards.insert({name:"Mirror Image", cost:1, tier:8})
cards.insert({name:"Arcane Explosion", cost:2, tier:6})
cards.insert({name:"Frostbolt", cost:2, tier:1})
cards.insert({name:"Sorcerer's Apprentice", cost:2, tier:3})
cards.insert({name:"Arcane Intellect", cost:3, tier:4})
cards.insert({name:"Counterspell", cost:3, tier:5})
cards.insert({name:"Duplicate", cost:3, tier:3})
cards.insert({name:"Frost Nova", cost:3, tier:8})
cards.insert({name:"Ice Barrier", cost:3, tier:8})
cards.insert({name:"Ice Block", cost:3, tier:5})
cards.insert({name:"Kirin Tor Mage", cost:3, tier:3, degrade: 1})
cards.insert({name:"Mirror Entity", cost:3, tier:6})
cards.insert({name:"Spellbender", cost:3, tier:4})
cards.insert({name:"Vaporize", cost:3, tier:6})
cards.insert({name:"Cone of Cold", cost:4, tier:7})
cards.insert({name:"Ethereal Arcanist", cost:4, tier:6})
cards.insert({name:"Fireball", cost:4, tier:0})
cards.insert({name:"Polymorph", cost:4, tier:2})
cards.insert({name:"Water Elemental", cost:4, tier:0})
cards.insert({name:"Blizzard", cost:6, tier:3})
cards.insert({name:"Archmage Antonidas", cost:7, tier:4})
cards.insert({name:"Flamestrike", cost:7, tier:0, degrade: 2})
cards.insert({name:"Pyroblast", cost:10, tier:2, degrade: 1})

	 	 	 	
cards.insert({name:"Avenge", cost:1, tier:3})
cards.insert({name:"Blessing of Might", cost:1, tier:6,degrade: 1})
cards.insert({name:"Blessing of Wisdom", cost:1, tier:3,degrade: 1})
cards.insert({name:"Eye for an Eye", cost:1, tier:9})
cards.insert({name:"Hand of Protection", cost:1, tier:7})
cards.insert({name:"Humility", cost:1, tier:8})
cards.insert({name:"Light's Justice", cost:1, tier:8})
cards.insert({name:"Noble Sacrifice", cost:1, tier:9})
cards.insert({name:"Redemption", cost:1, tier:9})
cards.insert({name:"Repentance", cost:1, tier:9})
cards.insert({name:"Argent Protector", cost:2, tier:1})
cards.insert({name:"Divine Favor", cost:2, tier:7})
cards.insert({name:"Equality", cost:2, tier:2, degrade: 1})
cards.insert({name:"Holy Light", cost:2, tier:9})
cards.insert({name:"Aldor Peacekeeper", cost:3, tier:1})
cards.insert({name:"Sword of Justice", cost:3, tier:1})
cards.insert({name:"Blessing of Kings", cost:4, tier:1,degrade: 1})
cards.insert({name:"Consecration", cost:4, tier:0, degrade: 2})
cards.insert({name:"Hammer of Wrath", cost:4, tier:1})
cards.insert({name:"Truesilver Champion", cost:4, tier:0, degrade: 2})
cards.insert({name:"Blessed Champion", cost:5, tier:7})
cards.insert({name:"Holy Wrath", cost:5, tier:5})
cards.insert({name:"Avenging Wrath", cost:6, tier:1})
cards.insert({name:"Guardian of Kings", cost:7, tier:4})
cards.insert({name:"Lay on Hands", cost:8, tier:2, degrade: 1})
cards.insert({name:"Tirion Fordring", cost:8, tier:1})
	 	 	 	
cards.insert({name:"Circle of Healing", cost:0, tier:8})
cards.insert({name:"Silence", cost:0, tier:9})
cards.insert({name:"Holy Smite", cost:1, tier:2})
cards.insert({name:"Inner Fire", cost:1, tier:9})
cards.insert({name:"Mind Vision", cost:1, tier:4})
cards.insert({name:"Northshire Cleric", cost:1, tier:2})
cards.insert({name:"Power Word: Shield", cost:1, tier:1})
cards.insert({name:"Divine Spirit", cost:2, tier:6})
cards.insert({name:"Lightwell", cost:2, tier:8})
cards.insert({name:"Mind Blast", cost:2, tier:9})
cards.insert({name:"Shadow Word: Pain", cost:2, tier:2, degrade: 2})

cards.insert({name:"Dark Cultist", cost:3, tier: 2})
cards.insert({name:"Shadow Word: Death", cost:3, tier:2, degrade: 2})
cards.insert({name:"Shadowform", cost:3, tier:2})
cards.insert({name:"Thoughtsteal", cost:3, tier:4})
cards.insert({name:"Auchenai Soulpriest", cost:4, tier:1})
cards.insert({name:"Lightspawn", cost:4, tier:1})
cards.insert({name:"Mass Dispel", cost:4, tier:4})
cards.insert({name:"Mindgames", cost:4, tier:4})
cards.insert({name:"Shadow Madness", cost:4, tier:1})
cards.insert({name:"Holy Nova", cost:5, tier:1})
cards.insert({name:"Cabal Shadow Priest", cost:6, tier:0})
cards.insert({name:"Holy Fire", cost:6, tier:2})
cards.insert({name:"Temple Enforcer", cost:6, tier:0})
cards.insert({name:"Prophet Velen", cost:7, tier:4})
cards.insert({name:"Mind Control", cost:10, tier:3})

	 	 	 	
cards.insert({name:"Backstab", cost:1, tier:1})
cards.insert({name:"Preparation", cost:1, tier:5})
cards.insert({name:"Shadowstep", cost:1, tier:7})
cards.insert({name:"Cold Blood", cost:1, tier:4,degrade: 1})
cards.insert({name:"Conceal", cost:1, tier:9})
cards.insert({name:"Deadly Poison", cost:1, tier:1, degrade: 2})
cards.insert({name:"Sinister Strike", cost:1, tier:9})
cards.insert({name:"Betrayal", cost:2, tier:3, degrade: 1})
cards.insert({name:"Blade Flurry", cost:2, tier:6})
cards.insert({name:"Defias Ringleader", cost:2, tier:4, degrade: 2})
cards.insert({name:"Eviscerate", cost:2, tier:1,degrade: 2})
cards.insert({name:"Patient Assassin", cost:2, tier:2})
cards.insert({name:"Sap", cost:2, tier:8})
cards.insert({name:"Shiv", cost:2, tier:6})
cards.insert({name:"Edwin VanCleef", cost:3, tier:5})
cards.insert({name:"Fan of Knives", cost:3, tier:5})
cards.insert({name:"Headcrack", cost:3, tier:6})
cards.insert({name:"Perdition's Blade", cost:3, tier:1})
cards.insert({name:"SI:7 Agent", cost:3, tier:0, degrade: 2})
cards.insert({name:"Anub'ar Ambusher", cost:4, tier:3})
cards.insert({name:"Master of Disguise", cost:4, tier:5})
cards.insert({name:"Assassin's Blade", cost:5, tier:2, degrade: 1})
cards.insert({name:"Assassinate", cost:5, tier:1, degrade: 1})
cards.insert({name:"Kidnapper", cost:6, tier:5})
cards.insert({name:"Vanish", cost:6, tier:8})
cards.insert({name:"Sprint", cost:7, tier:4, degrade: 2})
	 	 	 	
cards.insert({name:"Ancestral Healing", cost:0, tier:8})
cards.insert({name:"Totemic Might", cost:0, tier:9})
cards.insert({name:"Dust Devil", cost:1, tier:9})
cards.insert({name:"Earth Shock", cost:1, tier:6})
cards.insert({name:"Forked Lightning", cost:1, tier:3, degrade: 1})
cards.insert({name:"Frost Shock", cost:1, tier:8})
cards.insert({name:"Lightning Bolt", cost:1, tier:3})
cards.insert({name:"Rockbiter Weapon", cost:1, tier:3})
cards.insert({name:"Ancestral Spirit", cost:2, tier:3})
cards.insert({name: "Flametongue Totem", cost:2, tier:1})
cards.insert({name:"Reincarnate", cost:2, tier: 4})
cards.insert({name:"Stormforged Axe", cost:2, tier:0, degrade: 2})
cards.insert({name:"Windfury", cost:2, tier:6})
cards.insert({name:"Far Sight", cost:3, tier:4})
cards.insert({name:"Feral Spirit", cost:3, tier:0})
cards.insert({name:"Hex", cost:3, tier:0})
cards.insert({name:"Lava Burst", cost:3, tier:3})
cards.insert({name:"Lightning Storm", cost:3, tier:0, degrade: 2})
cards.insert({name:"Mana Tide Totem", cost:3, tier:3})
cards.insert({name:"Unbound Elemental", cost:3, tier:1})
cards.insert({name:"Windspeaker", cost:4, tier:4})
cards.insert({name:"Bloodlust", cost:5, tier:3, degrade: 1})
cards.insert({name:"Doomhammer", cost:5, tier:1})
cards.insert({name:"Earth Elemental", cost:5, tier:0})
cards.insert({name:"Fire Elemental", cost:6, tier:0})
cards.insert({name:"Al'Akir the Windlord", cost:8, tier:3})

cards.insert({name:"Inner Rage", cost:0, tier:7})
cards.insert({name:"Execute", cost:1, tier:3})
cards.insert({name:"Shield Slam", cost:1, tier:2})
cards.insert({name:"Upgrade!", cost:1, tier:3})
cards.insert({name:"Whirlwind", cost:1, tier:7})
cards.insert({name:"Armorsmith", cost:2, tier:6})
cards.insert({name:"Battle Rage", cost:2, tier:6})
cards.insert({name:"Cleave", cost:2, tier:2, degrade: 1})
cards.insert({name:"Commanding Shout", cost:2, tier:3})
cards.insert({name:"Cruel Taskmaster", cost:2, tier:3})
cards.insert({name:"Fiery War Axe", cost:2, tier:0})
cards.insert({name:"Heroic Strike", cost:2, tier:3})
cards.insert({name:"Rampage", cost:2, tier:8})
cards.insert({name:"Slam", cost:2, tier:2})
cards.insert({name:"Charge", cost:3, tier:8})
cards.insert({name:"Frothing Berserker", cost:3, tier:0})
cards.insert({name:"Shield Block", cost:3, tier:4})
cards.insert({name:"Warsong Commander", cost:3, tier:4})
cards.insert({name:"Arathi Weaponsmith", cost:4, tier:0})
cards.insert({name:"Death's Bite", cost:4, tier:1})
cards.insert({name:"Kor'Kron Elite", cost:4, tier:2})
cards.insert({name:"Mortal Strike", cost:4, tier:4})
cards.insert({name:"Arcanite Reaper", cost:5, tier:1})
cards.insert({name:"Brawl", cost:5, tier:2, degrade: 1})
cards.insert({name:"Gorehowl", cost:7, tier:0})
cards.insert({name:"Grommash Hellscream", cost:8, tier:3})

cards.insert({name:"Sacrificial Pact", cost:0, tier:8})
cards.insert({name:"Soulfire", cost:0, tier:1})
cards.insert({name:"Blood Imp", cost:1, tier:5, degrade: 2})
cards.insert({name:"Corruption", cost:1, tier:9})
cards.insert({name:"Flame Imp", cost:1, tier:0})
cards.insert({name:"Mortal Coil", cost:1, tier:3})
cards.insert({name:"Power Overwhelming", cost:1, tier:6})
cards.insert({name:"Voidwalker", cost:1, tier:7})
cards.insert({name:"Demonfire", cost:2, tier:4})
cards.insert({name:"Succubus", cost:2, tier:8})
cards.insert({name:"Drain Life", cost:3, tier:6})
cards.insert({name:"Felguard", cost:3, tier:6, degrade: 1})
cards.insert({name:"Sense Demons", cost:3, tier:9})
cards.insert({name:"Shadow Bolt", cost:3, tier:2})
cards.insert({name:"Void Terror", cost:3, tier:7})
cards.insert({name:"Hellfire", cost:4, tier:2})
cards.insert({name:"Pit Lord", cost:4, tier:1, degrade: 1})
cards.insert({name:"Shadowflame", cost:4, tier:3})
cards.insert({name:"Summoning Portal", cost:4, tier:9})
cards.insert({name:"Voidcaller", cost:4, tier:3})
cards.insert({name:"Bane of Doom", cost:5, tier:2})
cards.insert({name:"Doomguard", cost:5, tier:1, degrade: 1})
cards.insert({name:"Dread Infernal", cost:6, tier:1})
cards.insert({name:"Siphon Soul", cost:6, tier:3})
cards.insert({name:"Twisting Nether", cost:8, tier:4})
cards.insert({name:"Lord Jaraxxus", cost:9, tier:3, degrade: 1})

cards.insert({name:"Undertaker", cost:1, tier:7, degrade: 1})
cards.insert({name:"Zombie Chow", cost:1, tier:2})
cards.insert({name:"Echoing Ooze", cost:2, tier:5})
cards.insert({name:"Haunted Creeper", cost:2, tier:4})
cards.insert({name:"Mad Scientist", cost:2, tier:4, degrade: 1})
cards.insert({name:"Nerub'ar Weblord", cost:2, tier:4})
cards.insert({name:"Nerubian Egg", cost:2, tier:3, degrade: 1})
cards.insert({name:"Unstable Ghoul", cost:2, tier:3})
cards.insert({name:"Dancing Swords", cost:3, tier:3})
cards.insert({name:"Deathlord", cost:3, tier:5})
cards.insert({name:"Shade of Naxxramas", cost:3, tier:3})
cards.insert({name:"Stoneskin Gargoyle", cost:3, tier:6})
cards.insert({name:"Baron Rivendare", cost:4, tier:4})
cards.insert({name:"Wailing Soul", cost:4, tier:3})
cards.insert({name:"Feugan", cost:5, tier:1})
cards.insert({name:"Loatheb", cost:5, tier:1})
cards.insert({name:"Sludge Belcher", cost:5, tier:2})
cards.insert({name:"Spectral Knight", cost:5, tier:2})
cards.insert({name:"Stalagg", cost:5, tier:2})
cards.insert({name:"Maexxna", cost:6, tier:2})
cards.insert({name:"Kel'thuzad", cost:8, tier:1})


      }
          

});
}
