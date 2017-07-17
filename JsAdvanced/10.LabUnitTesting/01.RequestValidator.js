function solve(ob){
   let method = ob.method;
   let pattern = /\*|([a-zA-Z0-9.]+)/g;
  let ver = ob.version;
  let msgPattern = /[^<>\&,'"\r\n]+/g;

   if(method !== 'GET' && method !== 'POST' && method !== 'DELETE' &&
       method !== 'CONNECT'){
       throw new Error('Invalid request header: Invalid Method');
       //\*|([a-zA-Z0-9.]+)
   } else if(!pattern.test(ob.uri)){
        throw new Error('Invalid request header: Invalid Uri');
   } else if(ver !== 'HTTP/0.9' &&
        ver !== 'HTTP/1.0' &&
        ver !== 'HTTP/1.1' && ver !== 'HTTP/2.0'){
       throw new Error('Invalid request header: Invalid Version')
   } else if(!msgPattern.test(ob.message) && ob.message !== ''){
       throw new Error('Invalid request header: Invalid Message');
   } else if(!ob.message){

       throw new Error('Invalid request header: Invalid Message');

   } else {

       return ob;
   }


}
//
// console.log(solve({
//                         method: 'GET',
//                         uri: 'svn.public.catalog',
//                         version: 'HTTP/1.1',
//                         message: ''
//
//
// }));
//
// console.log(solve({
//     method: 'POST',
//     uri: 'home.bash',
//     message: 'rm -rf /*'
//
//
// }));

console.log(solve({
    method: 'POST',
    uri: 'home.bash',
    version: 'HTTP/2.0'

}));