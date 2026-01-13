// import React, { useState, useRef, useEffect } from 'react';
// import JavaScriptObfuscator from 'javascript-obfuscator';
// import prettier from 'prettier/standalone';
// import parserBabel from 'prettier/parser-babel';

// type Mode = 'obfuscate' | 'deobfuscate';

// const JavaScriptObfuscatorTool: React.FC = () => {
//   const [inputCode, setInputCode] = useState<string>('');
//   const [outputCode, setOutputCode] = useState<string>('');
//   const [mode, setMode] = useState<Mode>('obfuscate');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [copied, setCopied] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [stats, setStats] = useState<{inputSize: number; outputSize: number; inputLines: number; outputLines: number; obfuscationScore: number;} | null>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);

//   const createCompactObfuscated = (code: string) => {
//     const keyArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('');
//     function b64d(e){let t='',n=0,r=0;for(let o=0;o<e.length;o++){const a=keyArray.indexOf(e[o]);if(-1===a)continue;n=n<<6|a,r+=6;if(8<=r){r-=8;t+=String.fromCharCode(n>>r&255);n&=(1<<r)-1;}}return t;}
//     function x(e,t){let n='';for(let o=0;o<e.length;o++)n+=String.fromCharCode(e.charCodeAt(o)^t.charCodeAt(o%t.length));return n;}
//     function u(e){return encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,(t,n)=>'%'+n.toLowerCase());}
//     function o(e){let t='';for(let n=0;n<e.length;n++)t+=String.fromCharCode(e.charCodeAt(n)+(n%5));return t;}
//     function d(e){let t='';for(let n=0;n<e.length;n++)t+=String.fromCharCode(e.charCodeAt(n)-(n%5));return t;}
//     const c={encrypt:function(e,t){const n=o(e),a=x(n,t);return btoa(a);},decrypt:function(e,t){const n=atob(e),a=x(n,t);return d(a);},urlEncrypt:function(e,t){return u(this.encrypt(e,t));}};
//     const k='ToolVerseKey2026',m='This is a longer encrypted message example for testing purposes in 2026!';
//     const e=c.encrypt(m,k),r=c.decrypt(e,k),l=c.urlEncrypt(m,k);
//     console.log('Original:',m);console.log('Encrypted:',e);console.log('Decrypted:',r);console.log('URL Safe Encoded:',l);
//   };

//   const obfuscateCode = (code: string) => {
//     try {
//       setError(null);
//       const optimizedOptions = {
//         compact: true,
//         controlFlowFlattening: false,
//         deadCodeInjection: false,
//         debugProtection: false,
//         identifierNamesGenerator: 'hexadecimal',
//         numbersToExpressions: false,
//         renameGlobals: false,
//         selfDefending: false,
//         splitStrings: false,
//         splitStringsChunkLength: 10,
//         stringArray: true,
//         stringArrayEncoding: ['base64'],
//         stringArrayThreshold: 0.8,
//         unicodeEscapeSequence: false,
//         simplify: true,
//         target: 'browser',
//         sourceMap: false,
//         log: false
//       };
//       const obfuscated = JavaScriptObfuscator.obfuscate(code, optimizedOptions);
//       const result = obfuscated.getObfuscatedCode();
//       const lines = result.split('\n');
//       if (lines.length > 50) {
//         return lines.slice(0, 50).join('\n');
//       }
//       return result.replace(/\n\s*\n/g,'\n').replace(/;\s*;/g,';').replace(/\s+/g,' ').trim();
//     } catch (err) {
//       throw new Error(`Obfuscation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
//     }
//   };

//   const deobfuscateCode = async (code: string) => {
//     try {
//       setError(null);
//       let cleanedCode = code;
//       cleanedCode = cleanedCode.replace(/\\x([0-9a-fA-F]{2})/g,(m,h)=>String.fromCharCode(parseInt(h,16)));
//       cleanedCode = cleanedCode.replace(/\\u([0-9a-fA-F]{4})/g,(m,h)=>String.fromCharCode(parseInt(h,16)));
//       const b=cleanedCode.match(/atob\s*\(\s*["']([A-Za-z0-9+/=]+)["']\s*\)/g);
//       if(b){b.forEach(m=>{try{const h=m.match(/["']([A-Za-z0-9+/=]+)["']/)?.[1];if(h){const d=atob(h);cleanedCode=cleanedCode.replace(m,`"${d.replace(/"/g,'\\"')}"`);}}catch(e){}});}
//       cleanedCode=cleanedCode.replace(/_0x[a-fA-F0-9]+/g,'obfVar');
//       cleanedCode=cleanedCode.replace(/var\s+[a-fA-F0-9]+\s*=/g,'var obfVar =');
//       cleanedCode=cleanedCode.replace(/let\s+[a-fA-F0-9]+\s*=/g,'let obfVar =');
//       cleanedCode=cleanedCode.replace(/const\s+[a-fA-F0-9]+\s*=/g,'const obfVar =');
//       cleanedCode=cleanedCode.replace(/eval\s*\(.*?\)/g,'');
//       cleanedCode=cleanedCode.replace(/setInterval\s*\([^)]*debugger[^)]*\)/g,'');
//       cleanedCode=cleanedCode.replace(/debugger\s*;/g,'');
//       try{const f=await prettier.format(cleanedCode,{parser:'babel',plugins:[parserBabel],semi:true,singleQuote:true,trailingComma:'none',printWidth:80,tabWidth:2,useTabs:false});
//       let c=f;if(c.startsWith('(function')){c=c.replace(/^\(\s*function\s*\([^)]*\)\s*\{/,'').replace(/\}\s*\)\s*\(\s*\)\s*;\s*$/,'').trim();}
//       c=c.replace(/function\s+\w+\s*\(\s*\)\s*\{\s*\}\s*/g,'').replace(/\n\s*\n\s*\n/g,'\n\n');
//       const l=c.split('\n');let i=0;const n=[];for(const r of l){const s=r.trim();if(!s){n.push('');continue;}
//       if(s.startsWith('}')||s.startsWith(']')||s.startsWith(')'))i=Math.max(0,i-1);n.push('  '.repeat(i)+s);
//       if(s.endsWith('{')||s.endsWith('[')||s.endsWith('('))i++;if(s.includes('function')&&s.endsWith('{'))i++;}
//       return n.join('\n');}catch(e){return cleanedCode.replace(/;/g,';\n').replace(/{/g,'{\n').replace(/}/g,'\n}\n').replace(/\n\s*\n/g,'\n').trim();}
//     } catch (err) {
//       throw new Error(`Deobfuscation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
//     }
//   };

//   const processCode = async () => {
//     if (!inputCode.trim()) {
//       setError('Please enter JavaScript code');
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setOutputCode('');
//     try {
//       let result = '';
//       if (mode === 'obfuscate') {
//         result = obfuscateCode(inputCode);
//       } else {
//         result = await deobfuscateCode(inputCode);
//       }
//       setOutputCode(result);
//       const inputSize = new Blob([inputCode]).size;
//       const outputSize = new Blob([result]).size;
//       setStats({inputSize,outputSize,inputLines:inputCode.split('\n').length,outputLines:result.split('\n').length,obfuscationScore:mode==='obfuscate'?calculateObfuscationScore(result):0});
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Processing failed');
//       setOutputCode('');
//       setStats(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const calculateObfuscationScore = (code: string): number => {
//     let score = 0;
//     const lengthRatio = code.length / Math.max(inputCode.length, 1);
//     if (lengthRatio < 1.5) score += 40;
//     else if (lengthRatio < 2) score += 30;
//     else if (lengthRatio < 3) score += 20;
//     else score += 10;
//     const patterns = [
//       { pattern: /_0x[a-fA-F0-9]+/g, weight: 10 },
//       { pattern: /\\u[0-9a-fA-F]{4}/g, weight: 8 },
//       { pattern: /\\x[0-9a-fA-F]{2}/g, weight: 6 },
//       { pattern: /atob\(/g, weight: 5 },
//       { pattern: /String\.fromCharCode/g, weight: 4 },
//       { pattern: /eval\(/g, weight: 3 },
//       { pattern: /function\s+\w+\s*\([^)]*\)\s*\{[^}]*\}/g, weight: -5 },
//     ];
//     patterns.forEach(indicator => {
//       const matches = code.match(indicator.pattern);
//       if (matches) score += matches.length * indicator.weight;
//     });
//     return Math.min(Math.max(Math.round(score), 0), 100);
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   const clearAll = () => {
//     setInputCode('');
//     setOutputCode('');
//     setError(null);
//     setStats(null);
//     if (inputRef.current) inputRef.current.focus();
//   };

//   const loadSampleCode = () => {
//     const samples = {
//       obfuscate: `(function() {
//   const keyArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('');
//   function base64Decode(str) {
//     let output = ''; let buffer = 0, bits = 0;
//     for (let i = 0; i < str.length; i++) {
//       const val = keyArray.indexOf(str[i]);
//       if (val === -1) continue;
//       buffer = (buffer << 6) | val; bits += 6;
//       if (bits >= 8) {
//         bits -= 8;
//         output += String.fromCharCode((buffer >> bits) & 0xFF);
//         buffer &= (1 << bits) - 1;
//       }
//     }
//     return output;
//   }
//   function xorEncrypt(str, key) {
//     let result = '';
//     for (let i = 0; i < str.length; i++) {
//       result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
//     }
//     return result;
//   }
//   function urlSafeEncode(str) {
//     return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, hex) => {
//       return '%' + hex.toLowerCase();
//     });
//   }
//   function obfuscateString(str) {
//     let obf = '';
//     for (let i = 0; i < str.length; i++) {
//       obf += String.fromCharCode(str.charCodeAt(i) + (i % 5));
//     }
//     return obf;
//   }
//   function deobfuscateString(str) {
//     let deobf = '';
//     for (let i = 0; i < str.length; i++) {
//       deobf += String.fromCharCode(str.charCodeAt(i) - (i % 5));
//     }
//     return deobf;
//   }
//   const cipher = {
//     encrypt: function(str, key) {
//       const obf = obfuscateString(str);
//       const xor = xorEncrypt(obf, key);
//       return btoa(xor);
//     },
//     decrypt: function(str, key) {
//       const decoded = atob(str);
//       const xor = xorEncrypt(decoded, key);
//       return deobfuscateString(xor);
//     },
//     urlEncrypt: function(str, key) {
//       return urlSafeEncode(this.encrypt(str, key));
//     }
//   };
//   const secretKey = 'ToolVerseKey2026';
//   const message = 'This is a longer encrypted message example for testing purposes in 2026!';
//   const encrypted = cipher.encrypt(message, secretKey);
//   const decrypted = cipher.decrypt(encrypted, secretKey);
//   const urlEncoded = cipher.urlEncrypt(message, secretKey);
//   console.log('Original:', message);
//   console.log('Encrypted:', encrypted);
//   console.log('Decrypted:', decrypted);
//   console.log('URL Safe Encoded:', urlEncoded);
// })();`,
//       deobfuscate: `function func0(){const _0x44827f=['WPtcRxVdMrGN','WQPZW6KQAJNcTY8qpa','dmo/W77dJh5CcSk2F8krhmkK','uXpcMSosWOGEwmkbWOddHq','iSknn8kKWOBdTsCwWPtcVq','idNcNmk0zW','W5LfA8k6nSoOWQWGymke','W59lBCkGhmoTWQmPtmkE','WRLZWQLzumoGWR4SnfW','W4/dSxxdLmo0','WPxdKmo7W7XaWOr2wa/cIGFcUa','WOnrWPOaWOzmp8oMW5RdVG','WRizxZZcQXFcQq','bXuRWQ5I','grhdRwldGSkTpW','W6BcTJhdMCowrmoCW5PvfW','ySowuW','W4rpWPuOW6NdQq','wrRdMCkqW4LC','W69pbxBdPvxcP8kuWO/cR8kQWOa','ceBcOX7cJG','WO1+p8oawHJcRbxdU8kVWObWiZm','WOKtomoRzSk2WQKPtmkOF8kX','W7edjSo+sW','e1Sgi8kRWOxdKHlcOG','tNBdQSkkzG','WRtcNSo0WOrjWRjjnwZdV8kfW77cKG','W6NdJSkTW5alW68','dLRdNCksW45CsSksWRVdTCo+Fa','Fd9SpmoxtMbvrdyiW4rwxa','W694WQrPumorWRS','W5OsnCoTsuxcVCkzWOe','umkrh8kYW6VdNq','W5OeWO5FW5akCCo3W77dJ17dSW','W68Eo8kUzSofW7ldJmkQW4q','mqFdO1ddIq','WPW7CqdcNtFcJmkOWQNcTW','W5mRWQGlwaHxDCkAW7u','W5lcKmkVWOaAW55OvJdcVW','WRhcHCk2W7CPlLNdUdi','sWCoW6NcHG','W6tdKmoHW6eemfq','Cw3cRSk0WRO','W4ytaSkiCa','WPKBW495WQZcTSoJW7Xpt8k2zSoX','x8o4WQn8iSoNWOFcH8oQysTJ','WOr3i8oEuW','FYawW6XSB0JcNSkUrG','W6NcNHW4gq','x8oPkMTx','W6Hmy8k+cCoNWRu/AmkH','oYWf','WPpdPhDVwmotnLqNaa','W7yipCo4y0tcUmkqW7RdHq','WPxcRSofW6HSW7tdKc/dRCoK','WQxcLSoXW4jmW57dHq','aWb3gCk4','ACkJWOhcSqG','W5vzW57dISox','msGvWRLk','ywhcH8k0WQn9h8kB','eJ/dP0ZdVW','W5FcOZG','srpcV8oiWQi','W6NcRGRcVmkM','W75+W6hdPSoqWOm','wmk/WQNcMaKnb8kZC8k/','zmkiWQNcNWm','tSoudNP5','W6THWR/cSmkwW5JcSmkfnSoW','WQL5WRqktCo8W6T9Cae','cqFcImoJWO8Pxq','W40jn8kXxmoDW6FdM8knWPe','W6yqmmoJva','WPGXW63dQCkWmcCtWPdcQq','cbPcimkuacKwrSkG'];func0=function(){return _0x44827f;};return func0();}`
//     };
//     setInputCode(samples[mode]);
//     setError(null);
//     setStats(null);
//     setOutputCode('');
//   };

//   const downloadCode = () => {
//     if (!outputCode) return;
//     const blob = new Blob([outputCode], { type: 'application/javascript' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `javascript-${mode}-${Date.now()}.js`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//             </svg>
//           </div>
//           <h1 className="text-3xl font-bold mb-2">JavaScript Obfuscator & Deobfuscator</h1>
//           <p className="text-gray-400">Professional code protection and analysis tool</p>
//         </div>
//         {error && (
//           <div className="mb-6 bg-red-900/30 border border-red-700 rounded-lg p-4">
//             <div className="flex items-center gap-3">
//               <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <p className="text-red-300">{error}</p>
//             </div>
//           </div>
//         )}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="space-y-6">
//             <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">Input JavaScript</h2>
//                 <div className="flex gap-2">
//                   <button onClick={loadSampleCode} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm flex items-center gap-2">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//                     </svg>
//                     Load Sample
//                   </button>
//                   <button onClick={clearAll} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm flex items-center gap-2">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                     Clear
//                   </button>
//                 </div>
//               </div>
//               <div className="relative">
//                 <textarea ref={inputRef} value={inputCode} onChange={(e) => setInputCode(e.target.value)} placeholder="// Paste your JavaScript code here..." className="w-full h-64 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none" spellCheck="false" />
//                 <div className="absolute bottom-2 right-2 text-xs text-gray-500">{inputCode.length} chars</div>
//               </div>
//             </div>
//             <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
//               <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                 </svg>
//                 Processing Controls
//               </h2>
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-300 mb-3">Operation Mode</h3>
//                   <div className="grid grid-cols-2 gap-3">
//                     {(['obfuscate', 'deobfuscate'] as Mode[]).map((m) => (
//                       <button key={m} onClick={() => setMode(m)} className={`p-4 rounded-lg text-center transition-all ${mode === m ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-700 hover:bg-gray-600'}`}>
//                         <div className="font-bold">{m === 'obfuscate' ? 'Obfuscator' : 'Deobfuscator'}</div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 <button onClick={processCode} disabled={isLoading || !inputCode.trim()} className="w-full px-4 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
//                   {isLoading ? (
//                     <>
//                       <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                       </svg>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       {mode === 'obfuscate' ? 'Obfuscate Code' : 'Deobfuscate Code'}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="space-y-6">
//             <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">{mode === 'obfuscate' ? 'Obfuscated Code' : 'Deobfuscated Code'}</h2>
//                 <div className="flex gap-2">
//                   <button onClick={() => copyToClipboard(outputCode)} disabled={!outputCode} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm flex items-center gap-2 disabled:opacity-50">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                     </svg>
//                     {copied ? 'Copied!' : 'Copy'}
//                   </button>
//                   <button onClick={downloadCode} disabled={!outputCode} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm flex items-center gap-2 disabled:opacity-50">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                     </svg>
//                     Download
//                   </button>
//                 </div>
//               </div>
//               <div className="rounded-lg border border-gray-600 bg-gray-900">
//                 {outputCode ? (
//                   <div className="p-4 h-72 overflow-auto">
//                     <pre className="whitespace-pre-wrap break-words font-mono text-sm">{outputCode}</pre>
//                   </div>
//                 ) : (
//                   <div className="p-8 text-center">
//                     <div className="w-14 h-14 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4">
//                       <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//                       </svg>
//                     </div>
//                     <p className="text-gray-400">
//                       {mode === 'obfuscate' ? 'Enter JavaScript code and click "Obfuscate Code"' : 'Enter obfuscated code and click "Deobfuscate Code"'}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {stats && (
//               <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
//                 <h2 className="text-xl font-bold mb-6">Statistics</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                   <div className="bg-gray-900 p-3 rounded-lg">
//                     <div className="text-xs text-gray-400 mb-1">Input Size</div>
//                     <div className="font-bold">{stats.inputSize > 1024 ? `${(stats.inputSize / 1024).toFixed(1)} KB` : `${stats.inputSize} B`}</div>
//                   </div>
//                   <div className="bg-gray-900 p-3 rounded-lg">
//                     <div className="text-xs text-gray-400 mb-1">Output Size</div>
//                     <div className="font-bold">{stats.outputSize > 1024 ? `${(stats.outputSize / 1024).toFixed(1)} KB` : `${stats.outputSize} B`}</div>
//                   </div>
//                   <div className="bg-gray-900 p-3 rounded-lg">
//                     <div className="text-xs text-gray-400 mb-1">Input Lines</div>
//                     <div className="font-bold">{stats.inputLines}</div>
//                   </div>
//                   <div className="bg-gray-900 p-3 rounded-lg">
//                     <div className="text-xs text-gray-400 mb-1">Output Lines</div>
//                     <div className="font-bold">{stats.outputLines}</div>
//                   </div>
//                   {mode === 'obfuscate' && (
//                     <div className="bg-blue-900/20 p-4 rounded-lg col-span-2 sm:col-span-4">
//                       <div className="text-sm text-gray-400 mb-1">Obfuscation Score</div>
//                       <div className="font-bold text-2xl">{stats.obfuscationScore}/100</div>
//                       <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${stats.obfuscationScore}%` }} />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//             <div className="bg-blue-900/20 rounded-lg p-5 border border-blue-800/30">
//               <h3 className="text-lg font-bold text-blue-300 mb-3">Features</h3>
//               <ul className="text-blue-200 space-y-2 text-sm">
//                 <li>• Compact obfuscation with minimal size increase</li>
//                 <li>• Intelligent deobfuscation that restores original formatting</li>
//                 <li>• Professional-grade security</li>
//                 <li>• Clean, readable output from obfuscated code</li>
//                 <li>• 50-line compact output format</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JavaScriptObfuscatorTool;



// import React, { useState, useRef, useEffect } from 'react';
// import JavaScriptObfuscator from 'javascript-obfuscator';
// import prettier from 'prettier/standalone';
// import parserBabel from 'prettier/parser-babel';

// type Mode = 'obfuscate' | 'deobfuscate';

// const JavaScriptObfuscatorTool: React.FC = () => {
//   const [inputCode, setInputCode] = useState<string>('');
//   const [outputCode, setOutputCode] = useState<string>('');
//   const [mode, setMode] = useState<Mode>('obfuscate');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [copied, setCopied] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [stats, setStats] = useState<{inputSize: number; outputSize: number; inputLines: number; outputLines: number; obfuscationScore: number;} | null>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);

//   const createCompactObfuscated = (code: string) => {
//     const keyArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('');
//     function b64d(e){let t='',n=0,r=0;for(let o=0;o<e.length;o++){const a=keyArray.indexOf(e[o]);if(-1===a)continue;n=n<<6|a,r+=6;if(8<=r){r-=8;t+=String.fromCharCode(n>>r&255);n&=(1<<r)-1;}}return t;}
//     function x(e,t){let n='';for(let o=0;o<e.length;o++)n+=String.fromCharCode(e.charCodeAt(o)^t.charCodeAt(o%t.length));return n;}
//     function u(e){return encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,(t,n)=>'%'+n.toLowerCase());}
//     function o(e){let t='';for(let n=0;n<e.length;n++)t+=String.fromCharCode(e.charCodeAt(n)+(n%5));return t;}
//     function d(e){let t='';for(let n=0;n<e.length;n++)t+=String.fromCharCode(e.charCodeAt(n)-(n%5));return t;}
//     const c={encrypt:function(e,t){const n=o(e),a=x(n,t);return btoa(a);},decrypt:function(e,t){const n=atob(e),a=x(n,t);return d(a);},urlEncrypt:function(e,t){return u(this.encrypt(e,t));}};
//     const k='ToolVerseKey2026',m='This is a longer encrypted message example for testing purposes in 2026!';
//     const e=c.encrypt(m,k),r=c.decrypt(e,k),l=c.urlEncrypt(m,k);
//     console.log('Original:',m);console.log('Encrypted:',e);console.log('Decrypted:',r);console.log('URL Safe Encoded:',l);
//   };

//   const obfuscateCode = (code: string) => {
//     try {
//       setError(null);
//       const optimizedOptions = {
//         compact: true,
//         controlFlowFlattening: false,
//         deadCodeInjection: false,
//         debugProtection: false,
//         identifierNamesGenerator: 'hexadecimal',
//         numbersToExpressions: false,
//         renameGlobals: false,
//         selfDefending: false,
//         splitStrings: false,
//         splitStringsChunkLength: 10,
//         stringArray: true,
//         stringArrayEncoding: ['base64'],
//         stringArrayThreshold: 0.8,
//         unicodeEscapeSequence: false,
//         simplify: true,
//         target: 'browser',
//         sourceMap: false,
//         log: false
//       };
//       const obfuscated = JavaScriptObfuscator.obfuscate(code, optimizedOptions);
//       const result = obfuscated.getObfuscatedCode();
//       const lines = result.split('\n');
//       if (lines.length > 50) {
//         return lines.slice(0, 50).join('\n');
//       }
//       return result.replace(/\n\s*\n/g,'\n').replace(/;\s*;/g,';').replace(/\s+/g,' ').trim();
//     } catch (err) {
//       throw new Error(`Obfuscation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
//     }
//   };

//   const deobfuscateCode = async (code: string) => {
//     try {
//       setError(null);
//       let cleanedCode = code;
//       cleanedCode = cleanedCode.replace(/\\x([0-9a-fA-F]{2})/g,(m,h)=>String.fromCharCode(parseInt(h,16)));
//       cleanedCode = cleanedCode.replace(/\\u([0-9a-fA-F]{4})/g,(m,h)=>String.fromCharCode(parseInt(h,16)));
//       const b=cleanedCode.match(/atob\s*\(\s*["']([A-Za-z0-9+/=]+)["']\s*\)/g);
//       if(b){b.forEach(m=>{try{const h=m.match(/["']([A-Za-z0-9+/=]+)["']/)?.[1];if(h){const d=atob(h);cleanedCode=cleanedCode.replace(m,`"${d.replace(/"/g,'\\"')}"`);}}catch(e){}});}
//       cleanedCode=cleanedCode.replace(/_0x[a-fA-F0-9]+/g,'obfVar');
//       cleanedCode=cleanedCode.replace(/var\s+[a-fA-F0-9]+\s*=/g,'var obfVar =');
//       cleanedCode=cleanedCode.replace(/let\s+[a-fA-F0-9]+\s*=/g,'let obfVar =');
//       cleanedCode=cleanedCode.replace(/const\s+[a-fA-F0-9]+\s*=/g,'const obfVar =');
//       cleanedCode=cleanedCode.replace(/eval\s*\(.*?\)/g,'');
//       cleanedCode=cleanedCode.replace(/setInterval\s*\([^)]*debugger[^)]*\)/g,'');
//       cleanedCode=cleanedCode.replace(/debugger\s*;/g,'');
//       try{const f=await prettier.format(cleanedCode,{parser:'babel',plugins:[parserBabel],semi:true,singleQuote:true,trailingComma:'none',printWidth:80,tabWidth:2,useTabs:false});
//       let c=f;if(c.startsWith('(function')){c=c.replace(/^\(\s*function\s*\([^)]*\)\s*\{/,'').replace(/\}\s*\)\s*\(\s*\)\s*;\s*$/,'').trim();}
//       c=c.replace(/function\s+\w+\s*\(\s*\)\s*\{\s*\}\s*/g,'').replace(/\n\s*\n\s*\n/g,'\n\n');
//       const l=c.split('\n');let i=0;const n=[];for(const r of l){const s=r.trim();if(!s){n.push('');continue;}
//       if(s.startsWith('}')||s.startsWith(']')||s.startsWith(')'))i=Math.max(0,i-1);n.push('  '.repeat(i)+s);
//       if(s.endsWith('{')||s.endsWith('[')||s.endsWith('('))i++;if(s.includes('function')&&s.endsWith('{'))i++;}
//       return n.join('\n');}catch(e){return cleanedCode.replace(/;/g,';\n').replace(/{/g,'{\n').replace(/}/g,'\n}\n').replace(/\n\s*\n/g,'\n').trim();}
//     } catch (err) {
//       throw new Error(`Deobfuscation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
//     }
//   };

//   const processCode = async () => {
//     if (!inputCode.trim()) {
//       setError('Please enter JavaScript code');
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setOutputCode('');
//     try {
//       let result = '';
//       if (mode === 'obfuscate') {
//         result = obfuscateCode(inputCode);
//       } else {
//         result = await deobfuscateCode(inputCode);
//       }
//       setOutputCode(result);
//       const inputSize = new Blob([inputCode]).size;
//       const outputSize = new Blob([result]).size;
//       setStats({inputSize,outputSize,inputLines:inputCode.split('\n').length,outputLines:result.split('\n').length,obfuscationScore:mode==='obfuscate'?calculateObfuscationScore(result):0});
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Processing failed');
//       setOutputCode('');
//       setStats(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const calculateObfuscationScore = (code: string): number => {
//     let score = 0;
//     const lengthRatio = code.length / Math.max(inputCode.length, 1);
//     if (lengthRatio < 1.5) score += 40;
//     else if (lengthRatio < 2) score += 30;
//     else if (lengthRatio < 3) score += 20;
//     else score += 10;
//     const patterns = [
//       { pattern: /_0x[a-fA-F0-9]+/g, weight: 10 },
//       { pattern: /\\u[0-9a-fA-F]{4}/g, weight: 8 },
//       { pattern: /\\x[0-9a-fA-F]{2}/g, weight: 6 },
//       { pattern: /atob\(/g, weight: 5 },
//       { pattern: /String\.fromCharCode/g, weight: 4 },
//       { pattern: /eval\(/g, weight: 3 },
//       { pattern: /function\s+\w+\s*\([^)]*\)\s*\{[^}]*\}/g, weight: -5 },
//     ];
//     patterns.forEach(indicator => {
//       const matches = code.match(indicator.pattern);
//       if (matches) score += matches.length * indicator.weight;
//     });
//     return Math.min(Math.max(Math.round(score), 0), 100);
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   const clearAll = () => {
//     setInputCode('');
//     setOutputCode('');
//     setError(null);
//     setStats(null);
//     if (inputRef.current) inputRef.current.focus();
//   };

//   const loadSampleCode = () => {
//     const samples = {
//       obfuscate: `(function() {
//   const keyArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('');
//   function base64Decode(str) {
//     let output = ''; let buffer = 0, bits = 0;
//     for (let i = 0; i < str.length; i++) {
//       const val = keyArray.indexOf(str[i]);
//       if (val === -1) continue;
//       buffer = (buffer << 6) | val; bits += 6;
//       if (bits >= 8) {
//         bits -= 8;
//         output += String.fromCharCode((buffer >> bits) & 0xFF);
//         buffer &= (1 << bits) - 1;
//       }
//     }
//     return output;
//   }
//   function xorEncrypt(str, key) {
//     let result = '';
//     for (let i = 0; i < str.length; i++) {
//       result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
//     }
//     return result;
//   }
//   function urlSafeEncode(str) {
//     return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, hex) => {
//       return '%' + hex.toLowerCase();
//     });
//   }
//   function obfuscateString(str) {
//     let obf = '';
//     for (let i = 0; i < str.length; i++) {
//       obf += String.fromCharCode(str.charCodeAt(i) + (i % 5));
//     }
//     return obf;
//   }
//   function deobfuscateString(str) {
//     let deobf = '';
//     for (let i = 0; i < str.length; i++) {
//       deobf += String.fromCharCode(str.charCodeAt(i) - (i % 5));
//     }
//     return deobf;
//   }
//   const cipher = {
//     encrypt: function(str, key) {
//       const obf = obfuscateString(str);
//       const xor = xorEncrypt(obf, key);
//       return btoa(xor);
//     },
//     decrypt: function(str, key) {
//       const decoded = atob(str);
//       const xor = xorEncrypt(decoded, key);
//       return deobfuscateString(xor);
//     },
//     urlEncrypt: function(str, key) {
//       return urlSafeEncode(this.encrypt(str, key));
//     }
//   };
//   const secretKey = 'ToolVerseKey2026';
//   const message = 'This is a longer encrypted message example for testing purposes in 2026!';
//   const encrypted = cipher.encrypt(message, secretKey);
//   const decrypted = cipher.decrypt(encrypted, secretKey);
//   const urlEncoded = cipher.urlEncrypt(message, secretKey);
//   console.log('Original:', message);
//   console.log('Encrypted:', encrypted);
//   console.log('Decrypted:', decrypted);
//   console.log('URL Safe Encoded:', urlEncoded);
// })();`,
//       deobfuscate: `function func0(){const _0x44827f=['WPtcRxVdMrGN','WQPZW6KQAJNcTY8qpa','dmo/W77dJh5CcSk2F8krhmkK','uXpcMSosWOGEwmkbWOddHq','iSknn8kKWOBdTsCwWPtcVq','idNcNmk0zW','W5LfA8k6nSoOWQWGymke','W59lBCkGhmoTWQmPtmkE','WRLZWQLzumoGWR4SnfW','W4/dSxxdLmo0','WPxdKmo7W7XaWOr2wa/cIGFcUa','WOnrWPOaWOzmp8oMW5RdVG','WRizxZZcQXFcQq','bXuRWQ5I','grhdRwldGSkTpW','W6BcTJhdMCowrmoCW5PvfW','ySowuW','W4rpWPuOW6NdQq','wrRdMCkqW4LC','W69pbxBdPvxcP8kuWO/cR8kQWOa','ceBcOX7cJG','WO1+p8oawHJcRbxdU8kVWObWiZm','WOKtomoRzSk2WQKPtmkOF8kX','W7edjSo+sW','e1Sgi8kRWOxdKHlcOG','tNBdQSkkzG','WRtcNSo0WOrjWRjjnwZdV8kfW77cKG','W6NdJSkTW5alW68','dLRdNCksW45CsSksWRVdTCo+Fa','Fd9SpmoxtMbvrdyiW4rwxa','W694WQrPumorWRS','W5OsnCoTsuxcVCkzWOe','umkrh8kYW6VdNq','W5OeWO5FW5akCCo3W77dJ17dSW','W68Eo8kUzSofW7ldJmkQW4q','mqFdO1ddIq','WPW7CqdcNtFcJmkOWQNcTW','W5mRWQGlwaHxDCkAW7u','W5lcKmkVWOaAW55OvJdcVW','WRhcHCk2W7CPlLNdUdi','sWCoW6NcHG','W6tdKmoHW6eemfq','Cw3cRSk0WRO','W4ytaSkiCa','WPKBW495WQZcTSoJW7Xpt8k2zSoX','x8o4WQn8iSoNWOFcH8oQysTJ','WOr3i8oEuW','FYawW6XSB0JcNSkUrG','W6NcNHW4gq','x8oPkMTx','W6Hmy8k+cCoNWRu/AmkH','oYWf','WPpdPhDVwmotnLqNaa','W7yipCo4y0tcUmkqW7RdHq','WPxcRSofW6HSW7tdKc/dRCoK','WQxcLSoXW4jmW57dHq','aWb3gCk4','ACkJWOhcSqG','W5vzW57dISox','msGvWRLk','ywhcH8k0WQn9h8kB','eJ/dP0ZdVW','W5FcOZG','srpcV8oiWQi','W6NcRGRcVmkM','W75+W6hdPSoqWOm','wmk/WQNcMaKnb8kZC8k/','zmkiWQNcNWm','tSoudNP5','W6THWR/cSmkwW5JcSmkfnSoW','WQL5WRqktCo8W6T9Cae','cqFcImoJWO8Pxq','W40jn8kXxmoDW6FdM8knWPe','W6yqmmoJva','WPGXW63dQCkWmcCtWPdcQq','cbPcimkuacKwrSkG'];func0=function(){return _0x44827f;};return func0();}`
//     };
//     setInputCode(samples[mode]);
//     setError(null);
//     setStats(null);
//     setOutputCode('');
//   };

//   const downloadCode = () => {
//     if (!outputCode) return;
//     const blob = new Blob([outputCode], { type: 'application/javascript' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `javascript-${mode}-${Date.now()}.js`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800 p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-xl mb-4">
//             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//             </svg>
//           </div>
//           <h1 className="text-3xl font-bold mb-2 text-gray-900">JavaScript Obfuscator & Deobfuscator</h1>
//           <p className="text-gray-600">Professional code protection and analysis tool</p>
//         </div>
//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
//             <div className="flex items-center gap-3">
//               <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <p className="text-red-700">{error}</p>
//             </div>
//           </div>
//         )}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="space-y-6">
//             <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold text-gray-900">Input JavaScript</h2>
//                 <div className="flex gap-2">
//                   <button onClick={loadSampleCode} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm flex items-center gap-2 transition-colors">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//                     </svg>
//                     Load Sample
//                   </button>
//                   <button onClick={clearAll} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm flex items-center gap-2 transition-colors">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                     Clear
//                   </button>
//                 </div>
//               </div>
//               <div className="relative">
//                 <textarea ref={inputRef} value={inputCode} onChange={(e) => setInputCode(e.target.value)} placeholder="// Paste your JavaScript code here..." className="w-full h-64 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none" spellCheck="false" />
//                 <div className="absolute bottom-2 right-2 text-xs text-gray-500">{inputCode.length} chars</div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
//               <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
//                 <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                 </svg>
//                 Processing Controls
//               </h2>
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-700 mb-3">Operation Mode</h3>
//                   <div className="grid grid-cols-2 gap-3">
//                     {(['obfuscate', 'deobfuscate'] as Mode[]).map((m) => (
//                       <button key={m} onClick={() => setMode(m)} className={`p-4 rounded-lg text-center transition-all ${mode === m ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}>
//                         <div className="font-bold">{m === 'obfuscate' ? 'Obfuscator' : 'Deobfuscator'}</div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 <button onClick={processCode} disabled={isLoading || !inputCode.trim()} className="w-full px-4 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
//                   {isLoading ? (
//                     <>
//                       <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                       </svg>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       {mode === 'obfuscate' ? 'Obfuscate Code' : 'Deobfuscate Code'}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="space-y-6">
//             <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold text-gray-900">{mode === 'obfuscate' ? 'Obfuscated Code' : 'Deobfuscated Code'}</h2>
//                 <div className="flex gap-2">
//                   <button onClick={() => copyToClipboard(outputCode)} disabled={!outputCode} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm flex items-center gap-2 disabled:opacity-50 transition-colors">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                     </svg>
//                     {copied ? 'Copied!' : 'Copy'}
//                   </button>
//                   <button onClick={downloadCode} disabled={!outputCode} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 disabled:opacity-50 transition-colors">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                     </svg>
//                     Download
//                   </button>
//                 </div>
//               </div>
//               <div className="rounded-lg border border-gray-300 bg-gray-50">
//                 {outputCode ? (
//                   <div className="p-4 h-72 overflow-auto">
//                     <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-800">{outputCode}</pre>
//                   </div>
//                 ) : (
//                   <div className="p-8 text-center">
//                     <div className="w-14 h-14 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                       <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//                       </svg>
//                     </div>
//                     <p className="text-gray-500">
//                       {mode === 'obfuscate' ? 'Enter JavaScript code and click "Obfuscate Code"' : 'Enter obfuscated code and click "Deobfuscate Code"'}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {stats && (
//               <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
//                 <h2 className="text-xl font-bold mb-6 text-gray-900">Statistics</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                   <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                     <div className="text-xs text-gray-600 mb-1">Input Size</div>
//                     <div className="font-bold text-gray-900">{stats.inputSize > 1024 ? `${(stats.inputSize / 1024).toFixed(1)} KB` : `${stats.inputSize} B`}</div>
//                   </div>
//                   <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                     <div className="text-xs text-gray-600 mb-1">Output Size</div>
//                     <div className="font-bold text-gray-900">{stats.outputSize > 1024 ? `${(stats.outputSize / 1024).toFixed(1)} KB` : `${stats.outputSize} B`}</div>
//                   </div>
//                   <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                     <div className="text-xs text-gray-600 mb-1">Input Lines</div>
//                     <div className="font-bold text-gray-900">{stats.inputLines}</div>
//                   </div>
//                   <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                     <div className="text-xs text-gray-600 mb-1">Output Lines</div>
//                     <div className="font-bold text-gray-900">{stats.outputLines}</div>
//                   </div>
//                   {mode === 'obfuscate' && (
//                     <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 col-span-2 sm:col-span-4">
//                       <div className="text-sm text-gray-700 mb-1">Obfuscation Score</div>
//                       <div className="font-bold text-2xl text-gray-900">{stats.obfuscationScore}/100</div>
//                       <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${stats.obfuscationScore}%` }} />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//             <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
//               <h3 className="text-lg font-bold text-blue-800 mb-3">Features</h3>
//               <ul className="text-blue-700 space-y-2 text-sm">
//                 <li>• Compact obfuscation with minimal size increase</li>
//                 <li>• Intelligent deobfuscation that restores original formatting</li>
//                 <li>• Professional-grade security</li>
//                 <li>• Clean, readable output from obfuscated code</li>
//                 <li>• 50-line compact output format</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JavaScriptObfuscatorTool;


import React, { useState, useRef, useEffect } from 'react';
import JavaScriptObfuscator from 'javascript-obfuscator';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

type Mode = 'obfuscate' | 'deobfuscate';

const JavaScriptObfuscatorTool: React.FC = () => {
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [mode, setMode] = useState<Mode>('obfuscate');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{inputSize: number; outputSize: number; inputLines: number; outputLines: number; obfuscationScore: number;} | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const createCompactObfuscated = (code: string) => {
    const keyArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('');
    function b64d(e){let t='',n=0,r=0;for(let o=0;o<e.length;o++){const a=keyArray.indexOf(e[o]);if(-1===a)continue;n=n<<6|a,r+=6;if(8<=r){r-=8;t+=String.fromCharCode(n>>r&255);n&=(1<<r)-1;}}return t;}
    function x(e,t){let n='';for(let o=0;o<e.length;o++)n+=String.fromCharCode(e.charCodeAt(o)^t.charCodeAt(o%t.length));return n;}
    function u(e){return encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,(t,n)=>'%'+n.toLowerCase());}
    function o(e){let t='';for(let n=0;n<e.length;n++)t+=String.fromCharCode(e.charCodeAt(n)+(n%5));return t;}
    function d(e){let t='';for(let n=0;n<e.length;n++)t+=String.fromCharCode(e.charCodeAt(n)-(n%5));return t;}
    const c={encrypt:function(e,t){const n=o(e),a=x(n,t);return btoa(a);},decrypt:function(e,t){const n=atob(e),a=x(n,t);return d(a);},urlEncrypt:function(e,t){return u(this.encrypt(e,t));}};
    const k='ToolVerseKey2026',m='This is a longer encrypted message example for testing purposes in 2026!';
    const e=c.encrypt(m,k),r=c.decrypt(e,k),l=c.urlEncrypt(m,k);
    console.log('Original:',m);console.log('Encrypted:',e);console.log('Decrypted:',r);console.log('URL Safe Encoded:',l);
  };

  const obfuscateCode = (code: string) => {
    try {
      setError(null);
      const optimizedOptions = {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        identifierNamesGenerator: 'hexadecimal',
        numbersToExpressions: false,
        renameGlobals: false,
        selfDefending: false,
        splitStrings: false,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.8,
        unicodeEscapeSequence: false,
        simplify: true,
        target: 'browser',
        sourceMap: false,
        log: false
      };
      const obfuscated = JavaScriptObfuscator.obfuscate(code, optimizedOptions);
      const result = obfuscated.getObfuscatedCode();
      const lines = result.split('\n');
      if (lines.length > 50) {
        return lines.slice(0, 50).join('\n');
      }
      return result.replace(/\n\s*\n/g,'\n').replace(/;\s*;/g,';').replace(/\s+/g,' ').trim();
    } catch (err) {
      throw new Error(`Obfuscation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const deobfuscateCode = async (code: string) => {
    try {
      setError(null);
      let cleanedCode = code;
      cleanedCode = cleanedCode.replace(/\\x([0-9a-fA-F]{2})/g,(m,h)=>String.fromCharCode(parseInt(h,16)));
      cleanedCode = cleanedCode.replace(/\\u([0-9a-fA-F]{4})/g,(m,h)=>String.fromCharCode(parseInt(h,16)));
      const b=cleanedCode.match(/atob\s*\(\s*["']([A-Za-z0-9+/=]+)["']\s*\)/g);
      if(b){b.forEach(m=>{try{const h=m.match(/["']([A-Za-z0-9+/=]+)["']/)?.[1];if(h){const d=atob(h);cleanedCode=cleanedCode.replace(m,`"${d.replace(/"/g,'\\"')}"`);}}catch(e){}});}
      cleanedCode=cleanedCode.replace(/_0x[a-fA-F0-9]+/g,'obfVar');
      cleanedCode=cleanedCode.replace(/var\s+[a-fA-F0-9]+\s*=/g,'var obfVar =');
      cleanedCode=cleanedCode.replace(/let\s+[a-fA-F0-9]+\s*=/g,'let obfVar =');
      cleanedCode=cleanedCode.replace(/const\s+[a-fA-F0-9]+\s*=/g,'const obfVar =');
      cleanedCode=cleanedCode.replace(/eval\s*\(.*?\)/g,'');
      cleanedCode=cleanedCode.replace(/setInterval\s*\([^)]*debugger[^)]*\)/g,'');
      cleanedCode=cleanedCode.replace(/debugger\s*;/g,'');
      try{const f=await prettier.format(cleanedCode,{parser:'babel',plugins:[parserBabel],semi:true,singleQuote:true,trailingComma:'none',printWidth:80,tabWidth:2,useTabs:false});
      let c=f;if(c.startsWith('(function')){c=c.replace(/^\(\s*function\s*\([^)]*\)\s*\{/,'').replace(/\}\s*\)\s*\(\s*\)\s*;\s*$/,'').trim();}
      c=c.replace(/function\s+\w+\s*\(\s*\)\s*\{\s*\}\s*/g,'').replace(/\n\s*\n\s*\n/g,'\n\n');
      const l=c.split('\n');let i=0;const n=[];for(const r of l){const s=r.trim();if(!s){n.push('');continue;}
      if(s.startsWith('}')||s.startsWith(']')||s.startsWith(')'))i=Math.max(0,i-1);n.push('  '.repeat(i)+s);
      if(s.endsWith('{')||s.endsWith('[')||s.endsWith('('))i++;if(s.includes('function')&&s.endsWith('{'))i++;}
      return n.join('\n');}catch(e){return cleanedCode.replace(/;/g,';\n').replace(/{/g,'{\n').replace(/}/g,'\n}\n').replace(/\n\s*\n/g,'\n').trim();}
    } catch (err) {
      throw new Error(`Deobfuscation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const processCode = async () => {
    if (!inputCode.trim()) {
      setError('Please enter JavaScript code');
      return;
    }
    setIsLoading(true);
    setError(null);
    setOutputCode('');
    try {
      let result = '';
      if (mode === 'obfuscate') {
        result = obfuscateCode(inputCode);
      } else {
        result = await deobfuscateCode(inputCode);
      }
      setOutputCode(result);
      const inputSize = new Blob([inputCode]).size;
      const outputSize = new Blob([result]).size;
      setStats({inputSize,outputSize,inputLines:inputCode.split('\n').length,outputLines:result.split('\n').length,obfuscationScore:mode==='obfuscate'?calculateObfuscationScore(result):0});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
      setOutputCode('');
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateObfuscationScore = (code: string): number => {
    let score = 0;
    const lengthRatio = code.length / Math.max(inputCode.length, 1);
    if (lengthRatio < 1.5) score += 40;
    else if (lengthRatio < 2) score += 30;
    else if (lengthRatio < 3) score += 20;
    else score += 10;
    const patterns = [
      { pattern: /_0x[a-fA-F0-9]+/g, weight: 10 },
      { pattern: /\\u[0-9a-fA-F]{4}/g, weight: 8 },
      { pattern: /\\x[0-9a-fA-F]{2}/g, weight: 6 },
      { pattern: /atob\(/g, weight: 5 },
      { pattern: /String\.fromCharCode/g, weight: 4 },
      { pattern: /eval\(/g, weight: 3 },
      { pattern: /function\s+\w+\s*\([^)]*\)\s*\{[^}]*\}/g, weight: -5 },
    ];
    patterns.forEach(indicator => {
      const matches = code.match(indicator.pattern);
      if (matches) score += matches.length * indicator.weight;
    });
    return Math.min(Math.max(Math.round(score), 0), 100);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const clearAll = () => {
    setInputCode('');
    setOutputCode('');
    setError(null);
    setStats(null);
    if (inputRef.current) inputRef.current.focus();
  };

  const loadSampleCode = () => {
    const samples = {
      obfuscate: `(function() {
  const keyArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('');
  function base64Decode(str) {
    let output = ''; let buffer = 0, bits = 0;
    for (let i = 0; i < str.length; i++) {
      const val = keyArray.indexOf(str[i]);
      if (val === -1) continue;
      buffer = (buffer << 6) | val; bits += 6;
      if (bits >= 8) {
        bits -= 8;
        output += String.fromCharCode((buffer >> bits) & 0xFF);
        buffer &= (1 << bits) - 1;
      }
    }
    return output;
  }
  function xorEncrypt(str, key) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  }
  function urlSafeEncode(str) {
    return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, hex) => {
      return '%' + hex.toLowerCase();
    });
  }
  function obfuscateString(str) {
    let obf = '';
    for (let i = 0; i < str.length; i++) {
      obf += String.fromCharCode(str.charCodeAt(i) + (i % 5));
    }
    return obf;
  }
  function deobfuscateString(str) {
    let deobf = '';
    for (let i = 0; i < str.length; i++) {
      deobf += String.fromCharCode(str.charCodeAt(i) - (i % 5));
    }
    return deobf;
  }
  const cipher = {
    encrypt: function(str, key) {
      const obf = obfuscateString(str);
      const xor = xorEncrypt(obf, key);
      return btoa(xor);
    },
    decrypt: function(str, key) {
      const decoded = atob(str);
      const xor = xorEncrypt(decoded, key);
      return deobfuscateString(xor);
    },
    urlEncrypt: function(str, key) {
      return urlSafeEncode(this.encrypt(str, key));
    }
  };
  const secretKey = 'ToolVerseKey2026';
  const message = 'This is a longer encrypted message example for testing purposes in 2026!';
  const encrypted = cipher.encrypt(message, secretKey);
  const decrypted = cipher.decrypt(encrypted, secretKey);
  const urlEncoded = cipher.urlEncrypt(message, secretKey);
  console.log('Original:', message);
  console.log('Encrypted:', encrypted);
  console.log('Decrypted:', decrypted);
  console.log('URL Safe Encoded:', urlEncoded);
})();`,
      deobfuscate: `function func0(){const _0x44827f=['WPtcRxVdMrGN','WQPZW6KQAJNcTY8qpa','dmo/W77dJh5CcSk2F8krhmkK','uXpcMSosWOGEwmkbWOddHq','iSknn8kKWOBdTsCwWPtcVq','idNcNmk0zW','W5LfA8k6nSoOWQWGymke','W59lBCkGhmoTWQmPtmkE','WRLZWQLzumoGWR4SnfW','W4/dSxxdLmo0','WPxdKmo7W7XaWOr2wa/cIGFcUa','WOnrWPOaWOzmp8oMW5RdVG','WRizxZZcQXFcQq','bXuRWQ5I','grhdRwldGSkTpW','W6BcTJhdMCowrmoCW5PvfW','ySowuW','W4rpWPuOW6NdQq','wrRdMCkqW4LC','W69pbxBdPvxcP8kuWO/cR8kQWOa','ceBcOX7cJG','WO1+p8oawHJcRbxdU8kVWObWiZm','WOKtomoRzSk2WQKPtmkOF8kX','W7edjSo+sW','e1Sgi8kRWOxdKHlcOG','tNBdQSkkzG','WRtcNSo0WOrjWRjjnwZdV8kfW77cKG','W6NdJSkTW5alW68','dLRdNCksW45CsSksWRVdTCo+Fa','Fd9SpmoxtMbvrdyiW4rwxa','W694WQrPumorWRS','W5OsnCoTsuxcVCkzWOe','umkrh8kYW6VdNq','W5OeWO5FW5akCCo3W77dJ17dSW','W68Eo8kUzSofW7ldJmkQW4q','mqFdO1ddIq','WPW7CqdcNtFcJmkOWQNcTW','W5mRWQGlwaHxDCkAW7u','W5lcKmkVWOaAW55OvJdcVW','WRhcHCk2W7CPlLNdUdi','sWCoW6NcHG','W6tdKmoHW6eemfq','Cw3cRSk0WRO','W4ytaSkiCa','WPKBW495WQZcTSoJW7Xpt8k2zSoX','x8o4WQn8iSoNWOFcH8oQysTJ','WOr3i8oEuW','FYawW6XSB0JcNSkUrG','W6NcNHW4gq','x8oPkMTx','W6Hmy8k+cCoNWRu/AmkH','oYWf','WPpdPhDVwmotnLqNaa','W7yipCo4y0tcUmkqW7RdHq','WPxcRSofW6HSW7tdKc/dRCoK','WQxcLSoXW4jmW57dHq','aWb3gCk4','ACkJWOhcSqG','W5vzW57dISox','msGvWRLk','ywhcH8k0WQn9h8kB','eJ/dP0ZdVW','W5FcOZG','srpcV8oiWQi','W6NcRGRcVmkM','W75+W6hdPSoqWOm','wmk/WQNcMaKnb8kZC8k/','zmkiWQNcNWm','tSoudNP5','W6THWR/cSmkwW5JcSmkfnSoW','WQL5WRqktCo8W6T9Cae','cqFcImoJWO8Pxq','W40jn8kXxmoDW6FdM8knWPe','W6yqmmoJva','WPGXW63dQCkWmcCtWPdcQq','cbPcimkuacKwrSkG'];func0=function(){return _0x44827f;};return func0();}`
    };
    setInputCode(samples[mode]);
    setError(null);
    setStats(null);
    setOutputCode('');
  };

  const downloadCode = () => {
    if (!outputCode) return;
    const blob = new Blob([outputCode], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `javascript-${mode}-${Date.now()}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl md:rounded-3xl mb-4 md:mb-6">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4">
            JavaScript Obfuscator & Deobfuscator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
            Professional code protection and analysis tool
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                    Input JavaScript
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={loadSampleCode}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all active:scale-95 flex items-center gap-2 text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span>Load Sample</span>
                    </button>
                    <button
                      onClick={clearAll}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Clear</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <textarea
                      ref={inputRef}
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder={`// Paste your JavaScript code here...\n\nExample:\n(function() {\n  console.log("Hello, World!");\n  const data = { id: 1, name: "Example" };\n  return data;\n})();`}
                      className="w-full h-64 md:h-80 px-4 py-3 md:py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-mono text-sm resize-none"
                      spellCheck="false"
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                      {inputCode.length} chars
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 lg:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Processing Controls
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-3">Operation Mode</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {(['obfuscate', 'deobfuscate'] as Mode[]).map((m) => (
                        <button
                          key={m}
                          onClick={() => setMode(m)}
                          className={`p-3 rounded-lg text-center transition-all ${
                            mode === m
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          <div className="font-bold text-sm">{m === 'obfuscate' ? 'Obfuscator' : 'Deobfuscator'}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={processCode}
                    disabled={isLoading || !inputCode.trim()}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {mode === 'obfuscate' ? 'Obfuscate Code' : 'Deobfuscate Code'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 lg:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                    {mode === 'obfuscate' ? 'Obfuscated Code' : 'Deobfuscated Code'}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => copyToClipboard(outputCode)}
                      disabled={!outputCode}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadCode}
                      disabled={!outputCode}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all active:scale-95 flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 bg-[#272822] text-[#f8f8f2]">
                  {outputCode ? (
                    <div className="p-4 max-h-[400px] overflow-auto">
                      <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                        {outputCode}
                      </pre>
                    </div>
                  ) : (
                    <div className="p-8 lg:p-12 text-center">
                      <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <p className="text-gray-400 dark:text-gray-500 text-base">
                        {mode === 'obfuscate' 
                          ? 'Enter JavaScript code and click "Obfuscate Code"' 
                          : 'Enter obfuscated code and click "Deobfuscate Code"'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {stats && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Statistics
                    </h2>
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                      {mode === 'obfuscate' ? 'Obfuscated ✓' : 'Deobfuscated ✓'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Input Size</div>
                      <div className="font-bold text-gray-800 dark:text-white text-base">
                        {stats.inputSize > 1024 ? `${(stats.inputSize / 1024).toFixed(2)} KB` : `${stats.inputSize} B`}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Output Size</div>
                      <div className="font-bold text-gray-800 dark:text-white text-base">
                        {stats.outputSize > 1024 ? `${(stats.outputSize / 1024).toFixed(2)} KB` : `${stats.outputSize} B`}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Input Lines</div>
                      <div className="font-bold text-gray-800 dark:text-white text-base">{stats.inputLines}</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Output Lines</div>
                      <div className="font-bold text-gray-800 dark:text-white text-base">{stats.outputLines}</div>
                    </div>
                    
                    {mode === 'obfuscate' && (
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30 col-span-2 md:col-span-4">
                        <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Obfuscation Score</div>
                        <div className="font-bold text-2xl text-blue-800 dark:text-blue-400">{stats.obfuscationScore}/100</div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" 
                            style={{ width: `${stats.obfuscationScore}%` }} 
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30">
              <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-3">Professional Features</h3>
              <ul className="text-blue-700 dark:text-blue-400 space-y-2 text-sm">
                <li>• <strong>Compact Obfuscation:</strong> Minimal size increase with maximum protection</li>
                <li>• <strong>Intelligent Deobfuscation:</strong> Restores original formatting and readability</li>
                <li>• <strong>Professional Security:</strong> Enterprise-grade code protection</li>
                <li>• <strong>Clean Output:</strong> 50-line compact format for optimized delivery</li>
                <li>• <strong>Real-time Processing:</strong> Fast transformation with detailed statistics</li>
                <li>• <strong>Sample Codes:</strong> Pre-loaded examples for testing both modes</li>
                <li>• <strong>Download & Copy:</strong> Easy export options for processed code</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 text-center text-gray-500 dark:text-gray-400 text-sm md:text-base">
          <p>All processing happens locally in your browser for maximum privacy and speed.</p>
        </div>
      </div>
    </div>
  );
};

export default JavaScriptObfuscatorTool;