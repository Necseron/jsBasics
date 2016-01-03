/*
Task manager using OLOO
@author: Víctor Collado
 */

'use strict';

var Logger = {
   separator : '=================================',
   out : function out(p_out)
   {
      // console.log(this.separator);
      // console.log(p_out);
   }
   /*
   get in(){
      return this._in_;
   },
   set in(val){
      this._in_ = val * 12;
   }
   */
};

// console.log(Logger);

/*
Object.defineProperty(Logger,'in',{
   set : function(){
      return 'hi :333';
   },
   get : function(){
      return 555;
   }
});
var logger = Object.create(Logger);
logger.in = 11;

console.log(logger);
*/

var Task = {
   init : function init(){
      this.creation_date = new Date(); 
   },
   set_name : function set_name(p_name){
      this.name = p_name;   
   },
   set_flag : function set_flag(p_flag){
      this.flag = p_flag;
   }
};

var Task_runner = Object.create(Task);

Task_runner.setup = function(p_name)
{
   this.init();
   this.set_name(p_name);
   Logger.out('new task added -> ' 
               +  this.name 
               + '\nat -> ' 
               +  this.creation_date);
};

Task_runner.run = function(p_flag)
{
   this.set_flag(p_flag);
   Logger.out('runing task ->'
               + this.name
               +'\nwith flag   ->' 
               + this.flag);
};

// console.log(Task_runner);

var Task_manager = {
   version : 0.1,
   // tasks dictionary
   tasks : Object.create(null),
   init : function init()
   {
      Logger.out('Welcome to Task manager v.'+this.version);
   },
   add_task : function add_task(p_task_name)
   {
      var _task_runner = Object.create(Task_runner);

      // inicializa la tarea
      _task_runner.setup(p_task_name);

      // añade al buffer de tareas
      this.tasks[p_task_name] = _task_runner;
   },
   run_task : function run_task(p_obj,p_on_end)
   {
      var _task_name = p_obj[0];
      var _flag_name = p_obj[1];

      var _task = this.tasks[_task_name];

      _task.run(_flag_name);

      if(typeof p_on_end === 'function')
      {
         Logger.out('Running after task...')
         p_on_end.call(this);
      }
   }
}; 


var my_task_manager = Object.create(Task_manager);

my_task_manager.init();
my_task_manager.add_task('tarea 1');
my_task_manager.add_task('tarea 2');

my_task_manager.run_task([
   'tarea 1',
   '25e'
]);
