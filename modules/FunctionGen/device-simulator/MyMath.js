/*****************************************************************************
Copyright (c) 2016 IBM Corporation and other Contributors.


Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.


Contributors:

Marcus Kamieth - Initial Contribution
*****************************************************************************/
var MyMath = {
  sawTooth : function(x){
    return x - Math.floor(x);
  },
  sawToothBack : function(x){
    return Math.floor(x) - x + 1;
  },
  triangle : function(x){
     return 1 - Math.abs(x%2 - 1);
  },
  booleanFunc : function(x){
    return (x%1 <= 0.5)? true : false;
  },
  stringFunc : function(x){
    var strings = ["Very slow", "Slow", "Average", "Fast", "Very fast"];
    var index = Math.floor( Math.random() * strings.length);
    return strings[index];
  }
}
module.exports = MyMath;
