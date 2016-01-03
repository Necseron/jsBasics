var _o = {};

_o.link_it = function(p_objects_to_link)
{

   var _object_to_link               = p_objects_to_link

   var _objects_to_link_keys         = Object.keys(_object_to_link)

   var _length_objects_to_link_keys  = _objects_to_link_keys.length - 1;

   var _last_object;
   
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
