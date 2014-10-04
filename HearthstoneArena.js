  //Serverside collection of cards with initial values. Immutable
  cards = new Mongo.Collection("mod");
  //Client side deck that will be used for reference
  deck = new Mongo.Collection("deck");
    //Client side card collection that will be altered

  local= new Mongo.Collection("local");
if (Meteor.isClient) {
  $(document).ready(function(){
    $("#result").hide();
    $("#finish").hide();
    deck.find().forEach( function(x){deck.remove(x._id)} );
    local.find().forEach( function(x){local.remove(x._id)} );
    Session.set("count",0);
    Session.set("one",3);
    Session.set("two",6);
    Session.set("three",5);
    Session.set("four",8);
    Session.set("five",4);
    Session.set("six",2);
    Session.set("seven",2);
    Session.set("done",3);
    Session.set("dtwo",6);
    Session.set("dthree",5);
    Session.set("dfour",8);
    Session.set("dfive",4);
    Session.set("dsix",2);
    Session.set("dseven",2);
  cards.find().forEach( function(x){local.insert(x)} );
  });


/**
* Template - search
*/
Template.submit.events = {
  'click button.inc': function(){
          var c1 = $("#searchBox1").val();
          var c2 = $("#searchBox2").val();
          var c3 = $("#searchBox3").val();
          $("#result").fadeIn();
          $("#finish").fadeIn();
          $(".inc").fadeOut();
          var card1 = local.findOne({name:c1});
          var card2 = local.findOne({name:c2});
          var card3 = local.findOne({name:c3});
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
          console.log(name);
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
  
  deck.insert({name: name1, cost: cost1});
  
  updateSession(deck.findOne({name:name1}));
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
          local.update(this._id,{$inc: {tier: 1}})
      });
  }
        break;
    case 3:
        Session.set("three",Session.get("three")-1);       
        if (Session.get("three")<1) {
          local.find({cost: 3}).forEach(function(a){
          local.update(this._id,{$inc: {tier: 1}})
      });
  }
        break;
    case 4:
        Session.set("four",Session.get("four")-1);
        if (Session.get("four")<1) {
          local.find({cost: 4}).forEach(function(a){
          local.update(this._id,{$inc: {tier: 1}})
      });
  }
        break;
    case 5:
        Session.set("five",Session.get("five")-1);
        if (Session.get("five")<1) {
          local.find({cost: 5}).forEach(function(a){
          local.update(this._id,{$inc: {tier: 1}})
      });
  }
        break;
    case 6:
        Session.set("six",Session.get("six")-1);    
        if (Session.get("six")<1) {
          local.find({cost: 6}).forEach(function(a){
          local.update(this._id,{$inc: {tier: 1}})
      });
  }
        break;
    case 7:
        Session.set("seven",Session.get("seven")-1);
        if (Session.get("seven")<1) {
          local.find({cost: 7}).forEach(function(a){
          local.update(this._id,{$inc: {tier: 1}})
      });
  }
        break;

}
  Session.set("count",Session.get("count")+1);
  if (Session.get("count")==10||Session.get("count")==20) {
      reprioritizeVals();
  }

  
}
function reprioritizeVals() {
        var one=Session.get("one");
        var two=Session.get("two");
        var three=Session.get("three");
        var four=Session.get("four");
        var five=Session.get("five");
        var six=Session.get("six");
        var seven=Session.get("seven");
        if (one>0) {
           local.find({cost: 1}).forEach(function(a){
          local.update(this._id,{$inc: {tier: -1}})
      });
        }else if (one<0) {
          local.find({cost: 1}).forEach(function(a){
          local.update(this._id,{$inc: {tier: 1}})
      });
          }
      if (two>0) {
           local.find({cost: 2}).forEach(function(a){
          local.update(this._id,{$inc: {tier: -1}})
      });
        }else if (two<0) {
          local.find({cost: 2}).forEach(function(a){
          local.update(this._id,{$inc: {tier: 1}})
      });
          }
      if (three>0) {
           local.find({cost: 3}).forEach(function(a){
          local.update(this._id,{$inc: {tier: -1}})
      });
        }else if (three<0) {
          local.find({cost: 3}).forEach(function(a){
          local.update(this._id,{$inc: {tier: 1}})
      });
          }
      if (four>0) {
           local.find({cost: 4}).forEach(function(a){
          local.update(this._id,{$inc: {tier: -1}})
      });
        }else if (four<0) {
          local.find({cost: 4}).forEach(function(a){
          local.update(this._id,{$inc: {tier: 1}})
      });
          }
      if (five>0) {
           local.find({cost: 5}).forEach(function(a){
          local.update(this._id,{$inc: {tier: -1}})
      });
        }else if (five<0) {
          local.find({cost: 5}).forEach(function(a){
          local.update(this._id,{$inc: {tier: 1}})
      });  
          }
      if (six>0) {
           local.find({cost: 6}).forEach(function(a){
          local.update(this._id,{$inc: {tier: -1}})
      });
        }else if (six<0) {
          local.find({cost: 6}).forEach(function(a){
          local.update(this._id,{$inc: {tier: 1}})
      });
          }
      if (seven>0) {
           local.find({cost: 7}).forEach(function(a){
          local.update(this._id,{$inc: {tier: -1}})
      });
        }else if (seven<0) {
          local.find({cost: 7}).forEach(function(a){
          local.update(this._id,{$inc: {tier: 1}})
      });
          }
}
Template.nextPick.events = {
  'click button#finish': function(){
          $("#searchBox1").val("");
          $("#searchBox2").val("");
          $("#searchBox3").val("");
          $("#result").fadeOut();
          $("#finish").fadeOut();
          $(".inc").fadeIn();
          
  }
}
Template.search1.rendered = function () {
  AutoCompletion.init("input#searchBox1");
}

Template.search1.events = {
  'keyup #searchBox1': function () {
    AutoCompletion.autocomplete({
      element: '#searchBox1',       // DOM identifier for the element
      collection: local,              // MeteorJS collection object
      field: 'name',                    // Document field name to search for
      });              // Sort object to filter results with
      //filter: { 'gender': 'female' }}); // Additional filtering
  }
}
  

Template.search2.rendered = function () {
  AutoCompletion.init("input#searchBox2");
}

Template.search2.events = {
  'keyup input#searchBox2': function () {
    AutoCompletion.autocomplete({
      element: 'input#searchBox2',       // DOM identifier for the element
      collection: local,              // MeteorJS collection object
      field: 'name',                    // Document field name to search for
      });              // Sort object to filter results with
      //filter: { 'gender': 'female' }}); // Additional filtering
  }
}
  

Template.search3.rendered = function () {
  AutoCompletion.init("input#searchBox3");
}

Template.search3.events = {
  'keyup input#searchBox3': function () {
    AutoCompletion.autocomplete({
      element: 'input#searchBox3',       // DOM identifier for the element
      collection: local,              // MeteorJS collection object
      field: 'name',                    // Document field name to search for
      });              // Sort object to filter results with
      //filter: { 'gender': 'female' }}); // Additional filtering
  }
}
  
}
if (Meteor.isServer) {
  Meteor.startup(function () {
      if (cards.find().count() === 0) {
cards.insert({name: "chillwind yeti", cost: 4, tier: 1});

cards.insert({name: "acidic swamp ooze", cost: 2, tier: 1});

cards.insert({name: "faerie dragon", cost: 2, tier: 3});

cards.insert({name: "dire wolf alpha", cost: 2, tier: 4});

cards.insert({name: "fen creeper", cost: 5, tier: 4});

cards.insert({name: "lord of the arena", cost: 6, tier: 6});

cards.insert({name: "core hound", cost: 7, tier: 8});

cards.insert({name: "azure drake", cost: 5, tier: 0});

cards.insert({name: "stampeding kodo", cost: 5, tier: 1});

cards.insert({name: "mind control tech", cost: 3, tier: 2});

cards.insert({name: "injured blademaster", cost: 3, tier: 3});

cards.insert({name: "ravenholdt assassin", cost: 7, tier: 4});

cards.insert({name: "mana wraith", cost: 2, tier: 6});

cards.insert({name: "angry chicken", cost: 1, tier: 8});

cards.insert({name: "faceless manipulator", cost: 5, tier: 1});

cards.insert({name: "big game hunter", cost: 3, tier: 2});

cards.insert({name: "doomsayer", cost: 2, tier: 5});

cards.insert({name: "cairne bloodhoof", cost: 6, tier: 0});

cards.insert({name: "gruul", cost: 8, tier: 2});

cards.insert({name: "worgen infiltrator", cost: 1, tier: 2});



      }
          

});
}
