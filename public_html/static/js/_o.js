var _o = {};

/**
 * @function link_it
 * @description [join the [[Prototypes]] of the given Objects
 */
_o.link_it = function(p_objects_to_link)
{
   /**
    * @private
    * @property [object to link]
    * @description [The objects to chain their [[Prototypes]] ]
    */
   var _object_to_link               = p_objects_to_link
   /**
    * @private
    * @property [objects to link keys]
    * @description [The key array of the objetos to chain it's [[Prototypes]] ]
    */
   var _objects_to_link_keys         = Object.keys(_object_to_link)
   /**
    * @private
    * @property [length objects to link keys]
    * @description [The key size]
    */
   var _length_objects_to_link_keys  = _objects_to_link_keys.length - 1;
   /**
    * @description [Within the inverse loop we will save the last element to linked it to the previous element]
    * seq: 111, 11, 1
    * save to: 111 -> 11, 11 -> 1, and so on
    * The first element does not compute
    * 111 : __proto__ -> Object
    * 11  : __proto__ -> 111
    * 1   : __proto__ -> 11
    * @private
    * @property [last object]
    */
   var _last_object;
   
   /**
    * @private
    * @property [temp object]
    * @description [Will contain the properties of the object and the linked [[Prototype]] - INSIDE THE LOOP
    */
   var _temp_object;

   for(var idx = _length_objects_to_link_keys; idx >= 0 ; idx --)
   {
      var object_it_key    = _objects_to_link_keys[idx];
      var object_it        = _object_to_link[_objects_to_link_keys[idx]];
      
      // the last element does not compues, it [[Prototype]] is Object
      if(idx === _length_objects_to_link_keys){
         _last_object = object_it;
      }else{

         _temp_object = Object.create(_last_object);

         // with a mixin, transfer the properties to the object with the previously linked [[Prototype]]
         Object.keys(object_it).forEach(function(key,idx,keys){
            _temp_object[key] = object_it[key];
         });
            
         // save it for the next link   
         _last_object = _temp_object;
         
         // allow us to make public our linked objects
         // then the method Object.isPrototypeOf will work with our builded object
         _object_to_link[object_it_key] = _temp_object;
      }      
   }
}

// Use example

var m111 = {
   m_111 : 'm_111',
   m_222 : 'm_222',
};

var m11 = {
   m_11 : 'm_11',
   m_22 : 'm_22',
   // __proto__ : m111
};

var m1 = {
   m_1 : 'm_1',
   m_2 : 'm_2',
   // __proto__ : m11
};

var linked = {
   m1: m1,
   m11 : m11,
   m111 : m111
};

console.log(linked.m1);

// entry point
_o.link_it(linked);
var linked_m1 = linked.m1; 

console.log(linked_m1);
console.log(m1);

// verificar que linked_object (objeto base con toda la `chain prototype`)
// contiene los métodos de los otros objetos
console.log(m111.isPrototypeOf(linked_object)); // false
console.log(linked.m111.isPrototypeOf(linked_m1)); // true
