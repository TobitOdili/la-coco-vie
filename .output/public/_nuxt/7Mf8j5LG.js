const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./BzeNZSVD.js","./Cpj98o6Y.js","./CHSvhzML.js","./CWRteeAo.js","./DQT1OvVT.js","./error-404.CoZKRZXM.css","./VcKin3Qu.js","./error-500.D6506J9O.css"])))=>i.map(i=>d[i]);
var Nv=Object.defineProperty;var Fv=(n,e,t)=>e in n?Nv(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var rr=(n,e,t)=>Fv(n,typeof e!="symbol"?e+"":e,t);/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Qf(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const xt={},Os=[],bi=()=>{},Vm=()=>!1,aa=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Gl=n=>n.startsWith("onUpdate:"),zt=Object.assign,eh=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Ov=Object.prototype.hasOwnProperty,at=(n,e)=>Ov.call(n,e),ke=Array.isArray,Bs=n=>la(n)==="[object Map]",Gm=n=>la(n)==="[object Set]",vd=n=>la(n)==="[object Date]",Ve=n=>typeof n=="function",Mt=n=>typeof n=="string",Yn=n=>typeof n=="symbol",lt=n=>n!==null&&typeof n=="object",Wm=n=>(lt(n)||Ve(n))&&Ve(n.then)&&Ve(n.catch),Xm=Object.prototype.toString,la=n=>Xm.call(n),Bv=n=>la(n).slice(8,-1),qm=n=>la(n)==="[object Object]",Wl=n=>Mt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,jr=Qf(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Xl=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},kv=/-\w/g,fn=Xl(n=>n.replace(kv,e=>e.slice(1).toUpperCase())),Hv=/\B([A-Z])/g,ls=Xl(n=>n.replace(Hv,"-$1").toLowerCase()),ql=Xl(n=>n.charAt(0).toUpperCase()+n.slice(1)),fc=Xl(n=>n?`on${ql(n)}`:""),mi=(n,e)=>!Object.is(n,e),hc=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Ym=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},zv=n=>{const e=parseFloat(n);return isNaN(e)?n:e},$m=n=>{const e=Mt(n)?Number(n):NaN;return isNaN(e)?n:e};let xd;const Yl=()=>xd||(xd=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ca(n){if(ke(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],r=Mt(i)?Xv(i):ca(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(Mt(n)||lt(n))return n}const Vv=/;(?![^(]*\))/g,Gv=/:([^]+)/,Wv=/\/\*[^]*?\*\//g;function Xv(n){const e={};return n.replace(Wv,"").split(Vv).forEach(t=>{if(t){const i=t.split(Gv);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function oo(n){let e="";if(Mt(n))e=n;else if(ke(n))for(let t=0;t<n.length;t++){const i=oo(n[t]);i&&(e+=i+" ")}else if(lt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}function qv(n){if(!n)return null;let{class:e,style:t}=n;return e&&!Mt(e)&&(n.class=oo(e)),t&&(n.style=ca(t)),n}const Yv="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",$v=Qf(Yv);function jm(n){return!!n||n===""}function jv(n,e){if(n.length!==e.length)return!1;let t=!0;for(let i=0;t&&i<n.length;i++)t=th(n[i],e[i]);return t}function th(n,e){if(n===e)return!0;let t=vd(n),i=vd(e);if(t||i)return t&&i?n.getTime()===e.getTime():!1;if(t=Yn(n),i=Yn(e),t||i)return n===e;if(t=ke(n),i=ke(e),t||i)return t&&i?jv(n,e):!1;if(t=lt(n),i=lt(e),t||i){if(!t||!i)return!1;const r=Object.keys(n).length,s=Object.keys(e).length;if(r!==s)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=e.hasOwnProperty(o);if(a&&!l||!a&&l||!th(n[o],e[o]))return!1}}return String(n)===String(e)}const Km=n=>!!(n&&n.__v_isRef===!0),nh=n=>Mt(n)?n:n==null?"":ke(n)||lt(n)&&(n.toString===Xm||!Ve(n.toString))?Km(n)?nh(n.value):JSON.stringify(n,Zm,2):String(n),Zm=(n,e)=>Km(e)?Zm(n,e.value):Bs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,r],s)=>(t[dc(i,s)+" =>"]=r,t),{})}:Gm(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>dc(t))}:Yn(e)?dc(e):lt(e)&&!ke(e)&&!qm(e)?String(e):e,dc=(n,e="")=>{var t;return Yn(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let $t;class Jm{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&$t&&($t.active?(this.parent=$t,this.index=($t.scopes||($t.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=$t;try{return $t=this,e()}finally{$t=t}}}on(){++this._on===1&&(this.prevScope=$t,$t=this)}off(){if(this._on>0&&--this._on===0){if($t===this)$t=this.prevScope;else{let e=$t;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Kv(n){return new Jm(n)}function Qm(){return $t}let vt;const pc=new WeakSet;class e_{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,$t&&($t.active?$t.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,pc.has(this)&&(pc.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||n_(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Sd(this),i_(this);const e=vt,t=ti;vt=this,ti=!0;try{return this.fn()}finally{r_(this),vt=e,ti=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)sh(e);this.deps=this.depsTail=void 0,Sd(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?pc.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){gu(this)&&this.run()}get dirty(){return gu(this)}}let t_=0,Lo,Do;function n_(n,e=!1){if(n.flags|=8,e){n.next=Do,Do=n;return}n.next=Lo,Lo=n}function ih(){t_++}function rh(){if(--t_>0)return;if(Do){let e=Do;for(Do=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Lo;){let e=Lo;for(Lo=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function i_(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function r_(n){let e,t=n.depsTail,i=t;for(;i;){const r=i.prevDep;i.version===-1?(i===t&&(t=r),sh(i),Zv(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}n.deps=e,n.depsTail=t}function gu(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(s_(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function s_(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===zo)||(n.globalVersion=zo,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!gu(n))))return;n.flags|=2;const e=n.dep,t=vt,i=ti;vt=n,ti=!0;try{i_(n);const r=n.fn(n._value);(e.version===0||mi(r,n._value))&&(n.flags|=128,n._value=r,e.version++)}catch(r){throw e.version++,r}finally{vt=t,ti=i,r_(n),n.flags&=-3}}function sh(n,e=!1){const{dep:t,prevSub:i,nextSub:r}=n;if(i&&(i.nextSub=r,n.prevSub=void 0),r&&(r.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)sh(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Zv(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let ti=!0;const o_=[];function Xi(){o_.push(ti),ti=!1}function qi(){const n=o_.pop();ti=n===void 0?!0:n}function Sd(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=vt;vt=void 0;try{e()}finally{vt=t}}}let zo=0;class Jv{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class oh{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!vt||!ti||vt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==vt)t=this.activeLink=new Jv(vt,this),vt.deps?(t.prevDep=vt.depsTail,vt.depsTail.nextDep=t,vt.depsTail=t):vt.deps=vt.depsTail=t,a_(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=vt.depsTail,t.nextDep=void 0,vt.depsTail.nextDep=t,vt.depsTail=t,vt.deps===t&&(vt.deps=i)}return t}trigger(e){this.version++,zo++,this.notify(e)}notify(e){ih();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{rh()}}}function a_(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)a_(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const hl=new WeakMap,Kr=Symbol(""),vu=Symbol(""),Vo=Symbol("");function nn(n,e,t){if(ti&&vt){let i=hl.get(n);i||hl.set(n,i=new Map);let r=i.get(t);r||(i.set(t,r=new oh),r.map=i,r.key=t),r.track()}}function zi(n,e,t,i,r,s){const o=hl.get(n);if(!o){zo++;return}const a=l=>{l&&l.trigger()};if(ih(),e==="clear")o.forEach(a);else{const l=ke(n),c=l&&Wl(t);if(l&&t==="length"){const u=Number(i);o.forEach((f,h)=>{(h==="length"||h===Vo||!Yn(h)&&h>=u)&&a(f)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),c&&a(o.get(Vo)),e){case"add":l?c&&a(o.get("length")):(a(o.get(Kr)),Bs(n)&&a(o.get(vu)));break;case"delete":l||(a(o.get(Kr)),Bs(n)&&a(o.get(vu)));break;case"set":Bs(n)&&a(o.get(Kr));break}}rh()}function Qv(n,e){const t=hl.get(n);return t&&t.get(e)}function ds(n){const e=st(n);return e===n?e:(nn(e,"iterate",Vo),qn(n)?e:e.map($i))}function ah(n){return nn(n=st(n),"iterate",Vo),n}function di(n,e){return Yi(n)?Go(Zr(n)?$i(e):e):$i(e)}const ex={__proto__:null,[Symbol.iterator](){return mc(this,Symbol.iterator,n=>di(this,n))},concat(...n){return ds(this).concat(...n.map(e=>ke(e)?ds(e):e))},entries(){return mc(this,"entries",n=>(n[1]=di(this,n[1]),n))},every(n,e){return Pi(this,"every",n,e,void 0,arguments)},filter(n,e){return Pi(this,"filter",n,e,t=>t.map(i=>di(this,i)),arguments)},find(n,e){return Pi(this,"find",n,e,t=>di(this,t),arguments)},findIndex(n,e){return Pi(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return Pi(this,"findLast",n,e,t=>di(this,t),arguments)},findLastIndex(n,e){return Pi(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return Pi(this,"forEach",n,e,void 0,arguments)},includes(...n){return _c(this,"includes",n)},indexOf(...n){return _c(this,"indexOf",n)},join(n){return ds(this).join(n)},lastIndexOf(...n){return _c(this,"lastIndexOf",n)},map(n,e){return Pi(this,"map",n,e,void 0,arguments)},pop(){return po(this,"pop")},push(...n){return po(this,"push",n)},reduce(n,...e){return yd(this,"reduce",n,e)},reduceRight(n,...e){return yd(this,"reduceRight",n,e)},shift(){return po(this,"shift")},some(n,e){return Pi(this,"some",n,e,void 0,arguments)},splice(...n){return po(this,"splice",n)},toReversed(){return ds(this).toReversed()},toSorted(n){return ds(this).toSorted(n)},toSpliced(...n){return ds(this).toSpliced(...n)},unshift(...n){return po(this,"unshift",n)},values(){return mc(this,"values",n=>di(this,n))}};function mc(n,e,t){const i=ah(n),r=i[e]();return i!==n&&!qn(n)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=t(s.value)),s}),r}const tx=Array.prototype;function Pi(n,e,t,i,r,s){const o=ah(n),a=o!==n&&!qn(n),l=o[e];if(l!==tx[e]){const f=l.apply(n,s);return a?$i(f):f}let c=t;o!==n&&(a?c=function(f,h){return t.call(this,di(n,f),h,n)}:t.length>2&&(c=function(f,h){return t.call(this,f,h,n)}));const u=l.call(o,c,i);return a&&r?r(u):u}function yd(n,e,t,i){const r=ah(n),s=r!==n&&!qn(n);let o=t,a=!1;r!==n&&(s?(a=i.length===0,o=function(c,u,f){return a&&(a=!1,c=di(n,c)),t.call(this,c,di(n,u),f,n)}):t.length>3&&(o=function(c,u,f){return t.call(this,c,u,f,n)}));const l=r[e](o,...i);return a?di(n,l):l}function _c(n,e,t){const i=st(n);nn(i,"iterate",Vo);const r=i[e](...t);return(r===-1||r===!1)&&$l(t[0])?(t[0]=st(t[0]),i[e](...t)):r}function po(n,e,t=[]){Xi(),ih();const i=st(n)[e].apply(n,t);return rh(),qi(),i}const nx=Qf("__proto__,__v_isRef,__isVue"),l_=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Yn));function ix(n){Yn(n)||(n=String(n));const e=st(this);return nn(e,"has",n),e.hasOwnProperty(n)}class c_{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return i===(r?s?dx:d_:s?h_:f_).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=ke(e);if(!r){let l;if(o&&(l=ex[t]))return l;if(t==="hasOwnProperty")return ix}const a=Reflect.get(e,t,Ht(e)?e:i);if((Yn(t)?l_.has(t):nx(t))||(r||nn(e,"get",t),s))return a;if(Ht(a)){const l=o&&Wl(t)?a:a.value;return r&&lt(l)?Su(l):l}return lt(a)?r?Su(a):Mr(a):a}}class u_ extends c_{constructor(e=!1){super(!1,e)}set(e,t,i,r){let s=e[t];const o=ke(e)&&Wl(t);if(!this._isShallow){const c=Yi(s);if(!qn(i)&&!Yi(i)&&(s=st(s),i=st(i)),!o&&Ht(s)&&!Ht(i))return c||(s.value=i),!0}const a=o?Number(t)<e.length:at(e,t),l=Reflect.set(e,t,i,Ht(e)?e:r);return e===st(r)&&(a?mi(i,s)&&zi(e,"set",t,i):zi(e,"add",t,i)),l}deleteProperty(e,t){const i=at(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&i&&zi(e,"delete",t,void 0),r}has(e,t){const i=Reflect.has(e,t);return(!Yn(t)||!l_.has(t))&&nn(e,"has",t),i}ownKeys(e){return nn(e,"iterate",ke(e)?"length":Kr),Reflect.ownKeys(e)}}class rx extends c_{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const sx=new u_,ox=new rx,ax=new u_(!0);const xu=n=>n,ya=n=>Reflect.getPrototypeOf(n);function lx(n,e,t){return function(...i){const r=this.__v_raw,s=st(r),o=Bs(s),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=r[n](...i),u=t?xu:e?Go:$i;return!e&&nn(s,"iterate",l?vu:Kr),zt(Object.create(c),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}}})}}function Ma(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function cx(n,e){const t={get(r){const s=this.__v_raw,o=st(s),a=st(r);n||(mi(r,a)&&nn(o,"get",r),nn(o,"get",a));const{has:l}=ya(o),c=e?xu:n?Go:$i;if(l.call(o,r))return c(s.get(r));if(l.call(o,a))return c(s.get(a));s!==o&&s.get(r)},get size(){const r=this.__v_raw;return!n&&nn(st(r),"iterate",Kr),r.size},has(r){const s=this.__v_raw,o=st(s),a=st(r);return n||(mi(r,a)&&nn(o,"has",r),nn(o,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){const o=this,a=o.__v_raw,l=st(a),c=e?xu:n?Go:$i;return!n&&nn(l,"iterate",Kr),a.forEach((u,f)=>r.call(s,c(u),c(f),o))}};return zt(t,n?{add:Ma("add"),set:Ma("set"),delete:Ma("delete"),clear:Ma("clear")}:{add(r){const s=st(this),o=ya(s),a=st(r),l=!e&&!qn(r)&&!Yi(r)?a:r;return o.has.call(s,l)||mi(r,l)&&o.has.call(s,r)||mi(a,l)&&o.has.call(s,a)||(s.add(l),zi(s,"add",l,l)),this},set(r,s){!e&&!qn(s)&&!Yi(s)&&(s=st(s));const o=st(this),{has:a,get:l}=ya(o);let c=a.call(o,r);c||(r=st(r),c=a.call(o,r));const u=l.call(o,r);return o.set(r,s),c?mi(s,u)&&zi(o,"set",r,s):zi(o,"add",r,s),this},delete(r){const s=st(this),{has:o,get:a}=ya(s);let l=o.call(s,r);l||(r=st(r),l=o.call(s,r)),a&&a.call(s,r);const c=s.delete(r);return l&&zi(s,"delete",r,void 0),c},clear(){const r=st(this),s=r.size!==0,o=r.clear();return s&&zi(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=lx(r,n,e)}),t}function lh(n,e){const t=cx(n,e);return(i,r,s)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?i:Reflect.get(at(t,r)&&r in i?t:i,r,s)}const ux={get:lh(!1,!1)},fx={get:lh(!1,!0)},hx={get:lh(!0,!1)};const f_=new WeakMap,h_=new WeakMap,d_=new WeakMap,dx=new WeakMap;function px(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function mx(n){return n.__v_skip||!Object.isExtensible(n)?0:px(Bv(n))}function Mr(n){return Yi(n)?n:ch(n,!1,sx,ux,f_)}function Ds(n){return ch(n,!1,ax,fx,h_)}function Su(n){return ch(n,!0,ox,hx,d_)}function ch(n,e,t,i,r){if(!lt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=mx(n);if(s===0)return n;const o=r.get(n);if(o)return o;const a=new Proxy(n,s===2?i:t);return r.set(n,a),a}function Zr(n){return Yi(n)?Zr(n.__v_raw):!!(n&&n.__v_isReactive)}function Yi(n){return!!(n&&n.__v_isReadonly)}function qn(n){return!!(n&&n.__v_isShallow)}function $l(n){return n?!!n.__v_raw:!1}function st(n){const e=n&&n.__v_raw;return e?st(e):n}function _x(n){return!at(n,"__v_skip")&&Object.isExtensible(n)&&Ym(n,"__v_skip",!0),n}const $i=n=>lt(n)?Mr(n):n,Go=n=>lt(n)?Su(n):n;function Ht(n){return n?n.__v_isRef===!0:!1}function kt(n){return p_(n,!1)}function Md(n){return p_(n,!0)}function p_(n,e){return Ht(n)?n:new gx(n,e)}class gx{constructor(e,t){this.dep=new oh,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:st(e),this._value=t?e:$i(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||qn(e)||Yi(e);e=i?e:st(e),mi(e,t)&&(this._rawValue=e,this._value=i?e:$i(e),this.dep.trigger())}}function Nt(n){return Ht(n)?n.value:n}const vx={get:(n,e,t)=>e==="__v_raw"?n:Nt(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const r=n[e];return Ht(r)&&!Ht(t)?(r.value=t,!0):Reflect.set(n,e,t,i)}};function m_(n){return Zr(n)?n:new Proxy(n,vx)}class xx{constructor(e,t,i){this._object=e,this._defaultValue=i,this.__v_isRef=!0,this._value=void 0,this._key=Yn(t)?t:String(t),this._raw=st(e);let r=!0,s=e;if(!ke(e)||Yn(this._key)||!Wl(this._key))do r=!$l(s)||qn(s);while(r&&(s=s.__v_raw));this._shallow=r}get value(){let e=this._object[this._key];return this._shallow&&(e=Nt(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&Ht(this._raw[this._key])){const t=this._object[this._key];if(Ht(t)){t.value=e;return}}this._object[this._key]=e}get dep(){return Qv(this._raw,this._key)}}class Sx{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function yx(n,e,t){return Ht(n)?n:Ve(n)?new Sx(n):lt(n)&&arguments.length>1?Mx(n,e,t):kt(n)}function Mx(n,e,t){return new xx(n,e,t)}class bx{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new oh(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=zo-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&vt!==this)return n_(this,!0),!0}get value(){const e=this.dep.track();return s_(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Ex(n,e,t=!1){let i,r;return Ve(n)?i=n:(i=n.get,r=n.set),new bx(i,r,t)}const ba={},dl=new WeakMap;let zr;function Tx(n,e=!1,t=zr){if(t){let i=dl.get(t);i||dl.set(t,i=[]),i.push(n)}}function Ax(n,e,t=xt){const{immediate:i,deep:r,once:s,scheduler:o,augmentJob:a,call:l}=t,c=S=>r?S:qn(S)||r===!1||r===0?pr(S,1):pr(S);let u,f,h,d,p=!1,_=!1;if(Ht(n)?(f=()=>n.value,p=qn(n)):Zr(n)?(f=()=>c(n),p=!0):ke(n)?(_=!0,p=n.some(S=>Zr(S)||qn(S)),f=()=>n.map(S=>{if(Ht(S))return S.value;if(Zr(S))return c(S);if(Ve(S))return l?l(S,2):S()})):Ve(n)?e?f=l?()=>l(n,2):n:f=()=>{if(h){Xi();try{h()}finally{qi()}}const S=zr;zr=u;try{return l?l(n,3,[d]):n(d)}finally{zr=S}}:f=bi,e&&r){const S=f,E=r===!0?1/0:r;f=()=>pr(S(),E)}const m=Qm(),g=()=>{u.stop(),m&&m.active&&eh(m.effects,u)};if(s&&e){const S=e;e=(...E)=>{S(...E),g()}}let y=_?new Array(n.length).fill(ba):ba;const v=S=>{if(!(!(u.flags&1)||!u.dirty&&!S))if(e){const E=u.run();if(r||p||(_?E.some((T,R)=>mi(T,y[R])):mi(E,y))){h&&h();const T=zr;zr=u;try{const R=[E,y===ba?void 0:_&&y[0]===ba?[]:y,d];y=E,l?l(e,3,R):e(...R)}finally{zr=T}}}else u.run()};return a&&a(v),u=new e_(f),u.scheduler=o?()=>o(v,!1):v,d=S=>Tx(S,!1,u),h=u.onStop=()=>{const S=dl.get(u);if(S){if(l)l(S,4);else for(const E of S)E();dl.delete(u)}},e?i?v(!0):y=u.run():o?o(v.bind(null,!0),!0):u.run(),g.pause=u.pause.bind(u),g.resume=u.resume.bind(u),g.stop=g,g}function pr(n,e=1/0,t){if(e<=0||!lt(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,Ht(n))pr(n.value,e,t);else if(ke(n))for(let i=0;i<n.length;i++)pr(n[i],e,t);else if(Gm(n)||Bs(n))n.forEach(i=>{pr(i,e,t)});else if(qm(n)){for(const i in n)pr(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&pr(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ua(n,e,t,i){try{return i?n(...i):n()}catch(r){ao(r,e,t)}}function ni(n,e,t,i){if(Ve(n)){const r=ua(n,e,t,i);return r&&Wm(r)&&r.catch(s=>{ao(s,e,t)}),r}if(ke(n)){const r=[];for(let s=0;s<n.length;s++)r.push(ni(n[s],e,t,i));return r}}function ao(n,e,t,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||xt;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}a=a.parent}if(s){Xi(),ua(s,null,10,[n,l,c]),qi();return}}wx(n,t,r,i,o)}function wx(n,e,t,i=!0,r=!1){if(r)throw n;console.error(n)}const un=[];let ci=-1;const ks=[];let hr=null,Ls=0;const __=Promise.resolve();let pl=null;function uh(n){const e=pl||__;return n?e.then(this?n.bind(this):n):e}function Rx(n){let e=ci+1,t=un.length;for(;e<t;){const i=e+t>>>1,r=un[i],s=Wo(r);s<n||s===n&&r.flags&2?e=i+1:t=i}return e}function fh(n){if(!(n.flags&1)){const e=Wo(n),t=un[un.length-1];!t||!(n.flags&2)&&e>=Wo(t)?un.push(n):un.splice(Rx(e),0,n),n.flags|=1,g_()}}function g_(){pl||(pl=__.then(v_))}function yu(n){ke(n)?ks.push(...n):hr&&n.id===-1?hr.splice(Ls+1,0,n):n.flags&1||(ks.push(n),n.flags|=1),g_()}function bd(n,e,t=ci+1){for(;t<un.length;t++){const i=un[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;un.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function ml(n){if(ks.length){const e=[...new Set(ks)].sort((t,i)=>Wo(t)-Wo(i));if(ks.length=0,hr){hr.push(...e);return}for(hr=e,Ls=0;Ls<hr.length;Ls++){const t=hr[Ls];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}hr=null,Ls=0}}const Wo=n=>n.id==null?n.flags&2?-1:1/0:n.id;function v_(n){try{for(ci=0;ci<un.length;ci++){const e=un[ci];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),ua(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;ci<un.length;ci++){const e=un[ci];e&&(e.flags&=-2)}ci=-1,un.length=0,ml(),pl=null,(un.length||ks.length)&&v_()}}let Qn=null,x_=null;function _l(n){const e=Qn;return Qn=n,x_=n&&n.type.__scopeId||null,e}function jl(n,e=Qn,t){if(!e||n._n)return n;const i=(...r)=>{i._d&&xl(-1);const s=_l(e);let o;try{o=n(...r)}finally{_l(s),i._d&&xl(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function ui(n,e,t,i){const r=n.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[i];l&&(Xi(),ni(l,t,8,[n.el,a,n,e]),qi())}}function S_(n,e){if(jt){let t=jt.provides;const i=jt.parent&&jt.parent.provides;i===t&&(t=jt.provides=Object.create(i)),t[n]=e}}function Hs(n,e,t=!1){const i=Ql();if(i||Jr){let r=Jr?Jr._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&n in r)return r[n];if(arguments.length>1)return t&&Ve(e)?e.call(i&&i.proxy):e}}function y_(){return!!(Ql()||Jr)}const Cx=Symbol.for("v-scx"),Px=()=>Hs(Cx);function E3(n,e){return hh(n,null,e)}function gc(n,e,t){return hh(n,e,t)}function hh(n,e,t=xt){const{immediate:i,deep:r,flush:s,once:o}=t,a=zt({},t),l=e&&i||!e&&s!=="post";let c;if(Ks){if(s==="sync"){const d=Px();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=bi,d.resume=bi,d.pause=bi,d}}const u=jt;a.call=(d,p,_)=>ni(d,u,p,_);let f=!1;s==="post"?a.scheduler=d=>{cn(d,u&&u.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(d,p)=>{p?d():fh(d)}),a.augmentJob=d=>{e&&(d.flags|=4),f&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const h=Ax(n,e,a);return Ks&&(c?c.push(h):l&&h()),h}function Lx(n,e,t){const i=this.proxy,r=Mt(n)?n.includes(".")?M_(i,n):()=>i[n]:n.bind(i,i);let s;Ve(e)?s=e:(s=e.handler,t=e);const o=pa(this),a=hh(r,s.bind(i),t);return o(),a}function M_(n,e){const t=e.split(".");return()=>{let i=n;for(let r=0;r<t.length&&i;r++)i=i[t[r]];return i}}const Dx=Symbol("_vte"),b_=n=>n.__isTeleport,fi=Symbol("_leaveCb"),mo=Symbol("_enterCb");function Ix(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return lo(()=>{n.isMounted=!0}),L_(()=>{n.isUnmounting=!0}),n}const Fn=[Function,Array],E_={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Fn,onEnter:Fn,onAfterEnter:Fn,onEnterCancelled:Fn,onBeforeLeave:Fn,onLeave:Fn,onAfterLeave:Fn,onLeaveCancelled:Fn,onBeforeAppear:Fn,onAppear:Fn,onAfterAppear:Fn,onAppearCancelled:Fn},T_=n=>{const e=n.subTree;return e.component?T_(e.component):e},Ux={name:"BaseTransition",props:E_,setup(n,{slots:e}){const t=Ql(),i=Ix();return()=>{const r=e.default&&R_(e.default(),!0),s=r&&r.length?A_(r):t.subTree?da():void 0;if(!s)return;const o=st(n),{mode:a}=o;if(i.isLeaving)return vc(s);const l=Ed(s);if(!l)return vc(s);let c=Mu(l,o,i,t,f=>c=f);l.type!==Xt&&Xo(l,c);let u=t.subTree&&Ed(t.subTree);if(u&&u.type!==Xt&&!gi(u,l)&&T_(t).type!==Xt){let f=Mu(u,o,i,t);if(Xo(u,f),a==="out-in"&&l.type!==Xt)return i.isLeaving=!0,f.afterLeave=()=>{i.isLeaving=!1,t.job.flags&8||t.update(),delete f.afterLeave,u=void 0},vc(s);a==="in-out"&&l.type!==Xt?f.delayLeave=(h,d,p)=>{const _=w_(i,u);_[String(u.key)]=u,h[fi]=()=>{d(),h[fi]=void 0,delete c.delayedLeave,u=void 0},c.delayedLeave=()=>{p(),delete c.delayedLeave,u=void 0}}:u=void 0}else u&&(u=void 0);return s}}};function A_(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==Xt){e=t;break}}return e}const Nx=Ux;function w_(n,e){const{leavingVNodes:t}=n;let i=t.get(e.type);return i||(i=Object.create(null),t.set(e.type,i)),i}function Mu(n,e,t,i,r){const{appear:s,mode:o,persisted:a=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:h,onLeave:d,onAfterLeave:p,onLeaveCancelled:_,onBeforeAppear:m,onAppear:g,onAfterAppear:y,onAppearCancelled:v}=e,S=String(n.key),E=w_(t,n),T=(b,C)=>{b&&ni(b,i,9,C)},R=(b,C)=>{const P=C[1];T(b,C),ke(b)?b.every(D=>D.length<=1)&&P():b.length<=1&&P()},x={mode:o,persisted:a,beforeEnter(b){let C=l;if(!t.isMounted)if(s)C=m||l;else return;b[fi]&&b[fi](!0);const P=E[S];P&&gi(n,P)&&P.el[fi]&&P.el[fi](),T(C,[b])},enter(b){if(E[S]===n)return;let C=c,P=u,D=f;if(!t.isMounted)if(s)C=g||c,P=y||u,D=v||f;else return;let B=!1;b[mo]=N=>{B||(B=!0,N?T(D,[b]):T(P,[b]),x.delayedLeave&&x.delayedLeave(),b[mo]=void 0)};const z=b[mo].bind(null,!1);C?R(C,[b,z]):z()},leave(b,C){const P=String(n.key);if(b[mo]&&b[mo](!0),t.isUnmounting)return C();T(h,[b]);let D=!1;b[fi]=z=>{D||(D=!0,C(),z?T(_,[b]):T(p,[b]),b[fi]=void 0,E[P]===n&&delete E[P])};const B=b[fi].bind(null,!1);E[P]=n,d?R(d,[b,B]):B()},clone(b){const C=Mu(b,e,t,i,r);return r&&r(C),C}};return x}function vc(n){if(fa(n))return n=br(n),n.children=null,n}function Ed(n){if(!fa(n))return b_(n.type)&&n.children?A_(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&Ve(t.default))return t.default()}}function Xo(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Xo(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function R_(n,e=!1,t){let i=[],r=0;for(let s=0;s<n.length;s++){let o=n[s];const a=t==null?o.key:String(t)+String(o.key!=null?o.key:s);o.type===Hn?(o.patchFlag&128&&r++,i=i.concat(R_(o.children,e,a))):(e||o.type!==Xt)&&i.push(a!=null?br(o,{key:a}):o)}if(r>1)for(let s=0;s<i.length;s++)i[s].patchFlag=-2;return i}function C_(n,e){return Ve(n)?zt({name:n.name},e,{setup:n}):n}function dh(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Td(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const gl=new WeakMap;function zs(n,e,t,i,r=!1){if(ke(n)){n.forEach((_,m)=>zs(_,e&&(ke(e)?e[m]:e),t,i,r));return}if(Vs(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&zs(n,e,t,i.component.subTree);return}const s=i.shapeFlag&4?vh(i.component):i.el,o=r?null:s,{i:a,r:l}=n,c=e&&e.r,u=a.refs===xt?a.refs={}:a.refs,f=a.setupState,h=st(f),d=f===xt?Vm:_=>Td(u,_)?!1:at(h,_),p=(_,m)=>!(m&&Td(u,m));if(c!=null&&c!==l){if(Ad(e),Mt(c))u[c]=null,d(c)&&(f[c]=null);else if(Ht(c)){const _=e;p(c,_.k)&&(c.value=null),_.k&&(u[_.k]=null)}}if(Ve(l))ua(l,a,12,[o,u]);else{const _=Mt(l),m=Ht(l);if(_||m){const g=()=>{if(n.f){const y=_?d(l)?f[l]:u[l]:p()||!n.k?l.value:u[n.k];if(r)ke(y)&&eh(y,s);else if(ke(y))y.includes(s)||y.push(s);else if(_)u[l]=[s],d(l)&&(f[l]=u[l]);else{const v=[s];p(l,n.k)&&(l.value=v),n.k&&(u[n.k]=v)}}else _?(u[l]=o,d(l)&&(f[l]=o)):m&&(p(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const y=()=>{g(),gl.delete(n)};y.id=-1,gl.set(n,y),cn(y,t)}else Ad(n),g()}}}function Ad(n){const e=gl.get(n);e&&(e.flags|=8,gl.delete(n))}let wd=!1;const ps=()=>{wd||(console.error("Hydration completed but contains mismatches."),wd=!0)},Fx=n=>n.namespaceURI.includes("svg")&&n.tagName!=="foreignObject",Ox=n=>n.namespaceURI.includes("MathML"),Ea=n=>{if(n.nodeType===1){if(Fx(n))return"svg";if(Ox(n))return"mathml"}},Is=n=>n.nodeType===8;function Bx(n){const{mt:e,p:t,o:{patchProp:i,createText:r,nextSibling:s,parentNode:o,remove:a,insert:l,createComment:c}}=n,u=(v,S)=>{if(!S.hasChildNodes()){t(null,v,S),ml(),S._vnode=v;return}f(S.firstChild,v,null,null,null),ml(),S._vnode=v},f=(v,S,E,T,R,x=!1)=>{x=x||!!S.dynamicChildren;const b=Is(v)&&v.data==="[",C=()=>_(v,S,E,T,R,b),{type:P,ref:D,shapeFlag:B,patchFlag:z}=S;let N=v.nodeType;S.el=v,z===-2&&(x=!1,S.dynamicChildren=null);let U=null;switch(P){case Qr:N!==3?S.children===""?(l(S.el=r(""),o(v),v),U=v):U=C():(v.data!==S.children&&(ps(),v.data=S.children),U=s(v));break;case Xt:y(v)?(U=s(v),g(S.el=v.content.firstChild,v,E)):N!==8||b?U=C():U=s(v);break;case Uo:if(b&&(v=s(v),N=v.nodeType),N===1||N===3){U=v;const O=!S.children.length;for(let G=0;G<S.staticCount;G++)O&&(S.children+=U.nodeType===1?U.outerHTML:U.data),G===S.staticCount-1&&(S.anchor=U),U=s(U);return b?s(U):U}else C();break;case Hn:b?U=p(v,S,E,T,R,x):U=C();break;default:if(B&1)(N!==1||S.type.toLowerCase()!==v.tagName.toLowerCase())&&!y(v)?U=C():U=h(v,S,E,T,R,x);else if(B&6){S.slotScopeIds=R;const O=o(v);if(b?U=m(v):Is(v)&&v.data==="teleport start"?U=m(v,v.data,"teleport end"):U=s(v),e(S,O,null,E,T,Ea(O),x),Vs(S)&&!S.type.__asyncResolved){let G;b?(G=yt(Hn),G.anchor=U?U.previousSibling:O.lastChild):G=v.nodeType===3?_h(""):yt("div"),G.el=v,S.component.subTree=G}}else B&64?N!==8?U=C():U=S.type.hydrate(v,S,E,T,R,x,n,d):B&128&&(U=S.type.hydrate(v,S,E,T,Ea(o(v)),R,x,n,f))}return D!=null&&zs(D,null,T,S),U},h=(v,S,E,T,R,x)=>{x=x||!!S.dynamicChildren;const{type:b,props:C,patchFlag:P,shapeFlag:D,dirs:B,transition:z}=S,N=b==="input"||b==="option";if(N||P!==-1){B&&ui(S,null,E,"created");let U=!1;if(y(v)){U=K_(null,z)&&E&&E.vnode.props&&E.vnode.props.appear;const G=v.content.firstChild;if(U){const ne=G.getAttribute("class");ne&&(G.$cls=ne),z.beforeEnter(G)}g(G,v,E),S.el=v=G}if(D&16&&!(C&&(C.innerHTML||C.textContent))){let G=d(v.firstChild,S,v,E,T,R,x);for(;G;){Ta(v,1)||ps();const ne=G;G=G.nextSibling,a(ne)}}else if(D&8){let G=S.children;G[0]===`
`&&(v.tagName==="PRE"||v.tagName==="TEXTAREA")&&(G=G.slice(1));const{textContent:ne}=v;ne!==G&&ne!==G.replace(/\r\n|\r/g,`
`)&&(Ta(v,0)||ps(),v.textContent=S.children)}if(C){if(N||!x||P&48){const G=v.tagName.includes("-");for(const ne in C)(N&&(ne.endsWith("value")||ne==="indeterminate")||aa(ne)&&!jr(ne)||ne[0]==="."||G&&!jr(ne))&&i(v,ne,null,C[ne],void 0,E)}else if(C.onClick)i(v,"onClick",null,C.onClick,void 0,E);else if(P&4&&Zr(C.style))for(const G in C.style)C.style[G]}let O;(O=C&&C.onVnodeBeforeMount)&&Bn(O,E,S),B&&ui(S,null,E,"beforeMount"),((O=C&&C.onVnodeMounted)||B||U)&&ng(()=>{O&&Bn(O,E,S),U&&z.enter(v),B&&ui(S,null,E,"mounted")},T)}return v.nextSibling},d=(v,S,E,T,R,x,b)=>{b=b||!!S.dynamicChildren;const C=S.children,P=C.length;for(let D=0;D<P;D++){const B=b?C[D]:C[D]=An(C[D]),z=B.type===Qr;v?(z&&!b&&D+1<P&&An(C[D+1]).type===Qr&&(l(r(v.data.slice(B.children.length)),E,s(v)),v.data=B.children),v=f(v,B,T,R,x,b)):z&&!B.children?l(B.el=r(""),E):(Ta(E,1)||ps(),t(null,B,E,null,T,R,Ea(E),x))}return v},p=(v,S,E,T,R,x)=>{const{slotScopeIds:b}=S;b&&(R=R?R.concat(b):b);const C=o(v),P=d(s(v),S,C,E,T,R,x);return P&&Is(P)&&P.data==="]"?s(S.anchor=P):(ps(),l(S.anchor=c("]"),C,P),P)},_=(v,S,E,T,R,x)=>{if(Ta(v.parentElement,1)||ps(),S.el=null,x){const P=m(v);for(;;){const D=s(v);if(D&&D!==P)a(D);else break}}const b=s(v),C=o(v);return a(v),t(null,S,C,b,E,T,Ea(C),R),E&&(E.vnode.el=S.el,Jl(E,S.el)),b},m=(v,S="[",E="]")=>{let T=0;for(;v;)if(v=s(v),v&&Is(v)&&(v.data===S&&T++,v.data===E)){if(T===0)return s(v);T--}return v},g=(v,S,E)=>{const T=S.parentNode;T&&T.replaceChild(v,S);let R=E;for(;R;)R.vnode.el===S&&(R.vnode.el=R.subTree.el=v),R=R.parent},y=v=>v.nodeType===1&&v.tagName==="TEMPLATE";return[u,f]}const Rd="data-allow-mismatch",kx={0:"text",1:"children",2:"class",3:"style",4:"attribute"};function Ta(n,e){if(e===0||e===1)for(;n&&!n.hasAttribute(Rd);)n=n.parentElement;const t=n&&n.getAttribute(Rd);if(t==null)return!1;if(t==="")return!0;{const i=t.split(",");return e===0&&i.includes("children")?!0:i.includes(kx[e])}}Yl().requestIdleCallback;Yl().cancelIdleCallback;function Hx(n,e){if(Is(n)&&n.data==="["){let t=1,i=n.nextSibling;for(;i;){if(i.nodeType===1){if(e(i)===!1)break}else if(Is(i))if(i.data==="]"){if(--t===0)break}else i.data==="["&&t++;i=i.nextSibling}}else e(n)}const Vs=n=>!!n.type.__asyncLoader;function Cd(n){Ve(n)&&(n={loader:n});const{loader:e,loadingComponent:t,errorComponent:i,delay:r=200,hydrate:s,timeout:o,suspensible:a=!0,onError:l}=n;let c=null,u,f=0;const h=()=>(f++,c=null,d()),d=()=>{let p;return c||(p=c=e().catch(_=>{if(_=_ instanceof Error?_:new Error(String(_)),l)return new Promise((m,g)=>{l(_,()=>m(h()),()=>g(_),f+1)});throw _}).then(_=>p!==c&&c?c:(_&&(_.__esModule||_[Symbol.toStringTag]==="Module")&&(_=_.default),u=_,_)))};return C_({name:"AsyncComponentWrapper",__asyncLoader:d,__asyncHydrate(p,_,m){let g=!1;(_.bu||(_.bu=[])).push(()=>g=!0);const y=()=>{g||m()},v=s?()=>{const S=s(y,E=>Hx(p,E));S&&(_.bum||(_.bum=[])).push(S)}:y;u?v():d().then(()=>!_.isUnmounted&&v())},get __asyncResolved(){return u},setup(){const p=jt;if(dh(p),u)return()=>Aa(u,p);const _=v=>{c=null,ao(v,p,13,!i)};if(a&&p.suspense||Ks)return d().then(v=>()=>Aa(v,p)).catch(v=>(_(v),()=>i?yt(i,{error:v}):null));const m=kt(!1),g=kt(),y=kt(!!r);return r&&setTimeout(()=>{y.value=!1},r),o!=null&&setTimeout(()=>{if(!m.value&&!g.value){const v=new Error(`Async component timed out after ${o}ms.`);_(v),g.value=v}},o),d().then(()=>{m.value=!0,p.parent&&fa(p.parent.vnode)&&p.parent.update()}).catch(v=>{_(v),g.value=v}),()=>{if(m.value&&u)return Aa(u,p);if(g.value&&i)return yt(i,{error:g.value});if(t&&!y.value)return Aa(t,p)}}})}function Aa(n,e){const{ref:t,props:i,children:r,ce:s}=e.vnode,o=yt(n,i,r);return o.ref=t,o.ce=s,delete e.vnode.ce,o}const fa=n=>n.type.__isKeepAlive;function zx(n,e){P_(n,"a",e)}function Vx(n,e){P_(n,"da",e)}function P_(n,e,t=jt){const i=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(Kl(e,i,t),t){let r=t.parent;for(;r&&r.parent;)fa(r.parent.vnode)&&Gx(i,e,t,r),r=r.parent}}function Gx(n,e,t,i){const r=Kl(e,n,i,!0);ha(()=>{eh(i[e],r)},t)}function Kl(n,e,t=jt,i=!1){if(t){const r=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...o)=>{Xi();const a=pa(t),l=ni(e,t,n,o);return a(),qi(),l});return i?r.unshift(s):r.push(s),s}}const Qi=n=>(e,t=jt)=>{(!Ks||n==="sp")&&Kl(n,(...i)=>e(...i),t)},Wx=Qi("bm"),lo=Qi("m"),Xx=Qi("bu"),qx=Qi("u"),L_=Qi("bum"),ha=Qi("um"),Yx=Qi("sp"),$x=Qi("rtg"),jx=Qi("rtc");function D_(n,e=jt){Kl("ec",n,e)}const I_="components";function T3(n,e){return N_(I_,n,!0,e)||n}const U_=Symbol.for("v-ndc");function Kx(n){return Mt(n)?N_(I_,n,!1)||n:n||U_}function N_(n,e,t=!0,i=!1){const r=Qn||jt;if(r){const s=r.type;{const a=BS(s,!1);if(a&&(a===e||a===fn(e)||a===ql(fn(e))))return s}const o=Pd(r[n]||s[n],e)||Pd(r.appContext[n],e);return!o&&i?s:o}}function Pd(n,e){return n&&(n[e]||n[fn(e)]||n[ql(fn(e))])}const bu=n=>n?ag(n)?vh(n):bu(n.parent):null,Io=zt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>bu(n.parent),$root:n=>bu(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>O_(n),$forceUpdate:n=>n.f||(n.f=()=>{fh(n.update)}),$nextTick:n=>n.n||(n.n=uh.bind(n.proxy)),$watch:n=>Lx.bind(n)}),xc=(n,e)=>n!==xt&&!n.__isScriptSetup&&at(n,e),Zx={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:r,props:s,accessCache:o,type:a,appContext:l}=n;if(e[0]!=="$"){const h=o[e];if(h!==void 0)switch(h){case 1:return i[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(xc(i,e))return o[e]=1,i[e];if(r!==xt&&at(r,e))return o[e]=2,r[e];if(at(s,e))return o[e]=3,s[e];if(t!==xt&&at(t,e))return o[e]=4,t[e];Eu&&(o[e]=0)}}const c=Io[e];let u,f;if(c)return e==="$attrs"&&nn(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[e]))return u;if(t!==xt&&at(t,e))return o[e]=4,t[e];if(f=l.config.globalProperties,at(f,e))return f[e]},set({_:n},e,t){const{data:i,setupState:r,ctx:s}=n;return xc(r,e)?(r[e]=t,!0):i!==xt&&at(i,e)?(i[e]=t,!0):at(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:r,props:s,type:o}},a){let l;return!!(t[a]||n!==xt&&a[0]!=="$"&&at(n,a)||xc(e,a)||at(s,a)||at(i,a)||at(Io,a)||at(r.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:at(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Ld(n){return ke(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Eu=!0;function Jx(n){const e=O_(n),t=n.proxy,i=n.ctx;Eu=!1,e.beforeCreate&&Dd(e.beforeCreate,n,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:p,activated:_,deactivated:m,beforeDestroy:g,beforeUnmount:y,destroyed:v,unmounted:S,render:E,renderTracked:T,renderTriggered:R,errorCaptured:x,serverPrefetch:b,expose:C,inheritAttrs:P,components:D,directives:B,filters:z}=e;if(c&&Qx(c,i,null),o)for(const O in o){const G=o[O];Ve(G)&&(i[O]=G.bind(t))}if(r){const O=r.call(t,t);lt(O)&&(n.data=Mr(O))}if(Eu=!0,s)for(const O in s){const G=s[O],ne=Ve(G)?G.bind(t,t):Ve(G.get)?G.get.bind(t,t):bi,ge=!Ve(G)&&Ve(G.set)?G.set.bind(t):bi,Ee=Fo({get:ne,set:ge});Object.defineProperty(i,O,{enumerable:!0,configurable:!0,get:()=>Ee.value,set:Te=>Ee.value=Te})}if(a)for(const O in a)F_(a[O],i,t,O);if(l){const O=Ve(l)?l.call(t):l;Reflect.ownKeys(O).forEach(G=>{S_(G,O[G])})}u&&Dd(u,n,"c");function U(O,G){ke(G)?G.forEach(ne=>O(ne.bind(t))):G&&O(G.bind(t))}if(U(Wx,f),U(lo,h),U(Xx,d),U(qx,p),U(zx,_),U(Vx,m),U(D_,x),U(jx,T),U($x,R),U(L_,y),U(ha,S),U(Yx,b),ke(C))if(C.length){const O=n.exposed||(n.exposed={});C.forEach(G=>{Object.defineProperty(O,G,{get:()=>t[G],set:ne=>t[G]=ne,enumerable:!0})})}else n.exposed||(n.exposed={});E&&n.render===bi&&(n.render=E),P!=null&&(n.inheritAttrs=P),D&&(n.components=D),B&&(n.directives=B),b&&dh(n)}function Qx(n,e,t=bi){ke(n)&&(n=Tu(n));for(const i in n){const r=n[i];let s;lt(r)?"default"in r?s=Hs(r.from||i,r.default,!0):s=Hs(r.from||i):s=Hs(r),Ht(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[i]=s}}function Dd(n,e,t){ni(ke(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function F_(n,e,t,i){let r=i.includes(".")?M_(t,i):()=>t[i];if(Mt(n)){const s=e[n];Ve(s)&&gc(r,s)}else if(Ve(n))gc(r,n.bind(t));else if(lt(n))if(ke(n))n.forEach(s=>F_(s,e,t,i));else{const s=Ve(n.handler)?n.handler.bind(t):e[n.handler];Ve(s)&&gc(r,s,n)}}function O_(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=n.appContext,a=s.get(e);let l;return a?l=a:!r.length&&!t&&!i?l=e:(l={},r.length&&r.forEach(c=>vl(l,c,o,!0)),vl(l,e,o)),lt(e)&&s.set(e,l),l}function vl(n,e,t,i=!1){const{mixins:r,extends:s}=e;s&&vl(n,s,t,!0),r&&r.forEach(o=>vl(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=eS[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const eS={data:Id,props:Ud,emits:Ud,methods:To,computed:To,beforeCreate:an,created:an,beforeMount:an,mounted:an,beforeUpdate:an,updated:an,beforeDestroy:an,beforeUnmount:an,destroyed:an,unmounted:an,activated:an,deactivated:an,errorCaptured:an,serverPrefetch:an,components:To,directives:To,watch:nS,provide:Id,inject:tS};function Id(n,e){return e?n?function(){return zt(Ve(n)?n.call(this,this):n,Ve(e)?e.call(this,this):e)}:e:n}function tS(n,e){return To(Tu(n),Tu(e))}function Tu(n){if(ke(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function an(n,e){return n?[...new Set([].concat(n,e))]:e}function To(n,e){return n?zt(Object.create(null),n,e):e}function Ud(n,e){return n?ke(n)&&ke(e)?[...new Set([...n,...e])]:zt(Object.create(null),Ld(n),Ld(e??{})):e}function nS(n,e){if(!n)return e;if(!e)return n;const t=zt(Object.create(null),n);for(const i in e)t[i]=an(n[i],e[i]);return t}function B_(){return{app:null,config:{isNativeTag:Vm,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let iS=0;function rS(n,e){return function(i,r=null){Ve(i)||(i=zt({},i)),r!=null&&!lt(r)&&(r=null);const s=B_(),o=new WeakSet,a=[];let l=!1;const c=s.app={_uid:iS++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:ug,get config(){return s.config},set config(u){},use(u,...f){return o.has(u)||(u&&Ve(u.install)?(o.add(u),u.install(c,...f)):Ve(u)&&(o.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,h){if(!l){const d=c._ceVNode||yt(i,r);return d.appContext=s,h===!0?h="svg":h===!1&&(h=void 0),f&&e?e(d,u):n(d,u,h),l=!0,c._container=u,u.__vue_app__=c,vh(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(ni(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=Jr;Jr=c;try{return u()}finally{Jr=f}}};return c}}let Jr=null;const sS=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${fn(e)}Modifiers`]||n[`${ls(e)}Modifiers`];function oS(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||xt;let r=t;const s=e.startsWith("update:"),o=s&&sS(i,e.slice(7));o&&(o.trim&&(r=t.map(u=>Mt(u)?u.trim():u)),o.number&&(r=t.map(zv)));let a,l=i[a=fc(e)]||i[a=fc(fn(e))];!l&&s&&(l=i[a=fc(ls(e))]),l&&ni(l,n,6,r);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,ni(c,n,6,r)}}const aS=new WeakMap;function k_(n,e,t=!1){const i=t?aS:e.emitsCache,r=i.get(n);if(r!==void 0)return r;const s=n.emits;let o={},a=!1;if(!Ve(n)){const l=c=>{const u=k_(c,e,!0);u&&(a=!0,zt(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!a?(lt(n)&&i.set(n,null),null):(ke(s)?s.forEach(l=>o[l]=null):zt(o,s),lt(n)&&i.set(n,o),o)}function Zl(n,e){return!n||!aa(e)?!1:(e=e.slice(2).replace(/Once$/,""),at(n,e[0].toLowerCase()+e.slice(1))||at(n,ls(e))||at(n,e))}function Sc(n){const{type:e,vnode:t,proxy:i,withProxy:r,propsOptions:[s],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:h,setupState:d,ctx:p,inheritAttrs:_}=n,m=_l(n);let g,y;try{if(t.shapeFlag&4){const S=r||i,E=S;g=An(c.call(E,S,u,f,d,h,p)),y=a}else{const S=e;g=An(S.length>1?S(f,{attrs:a,slots:o,emit:l}):S(f,null)),y=e.props?a:cS(a)}}catch(S){No.length=0,ao(S,n,1),g=yt(Xt)}let v=g;if(y&&_!==!1){const S=Object.keys(y),{shapeFlag:E}=v;S.length&&E&7&&(s&&S.some(Gl)&&(y=uS(y,s)),v=br(v,y,!1,!0))}return t.dirs&&(v=br(v,null,!1,!0),v.dirs=v.dirs?v.dirs.concat(t.dirs):t.dirs),t.transition&&Xo(v,t.transition),g=v,_l(m),g}function lS(n,e=!0){let t;for(let i=0;i<n.length;i++){const r=n[i];if(Yo(r)){if(r.type!==Xt||r.children==="v-if"){if(t)return;t=r}}else return}return t}const cS=n=>{let e;for(const t in n)(t==="class"||t==="style"||aa(t))&&((e||(e={}))[t]=n[t]);return e},uS=(n,e)=>{const t={};for(const i in n)(!Gl(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function fS(n,e,t){const{props:i,children:r,component:s}=n,{props:o,children:a,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Nd(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(H_(o,i,h)&&!Zl(c,h))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?Nd(i,o,c):!0:!!o;return!1}function Nd(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(H_(e,n,s)&&!Zl(t,s))return!0}return!1}function H_(n,e,t){const i=n[t],r=e[t];return t==="style"&&lt(i)&&lt(r)?!th(i,r):i!==r}function Jl({vnode:n,parent:e,suspense:t},i){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===n&&(r.suspense.vnode.el=r.el=i,n=r),r===n)(n=e.vnode).el=i,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=i)}const z_={},V_=()=>Object.create(z_),G_=n=>Object.getPrototypeOf(n)===z_;function hS(n,e,t,i=!1){const r={},s=V_();n.propsDefaults=Object.create(null),W_(n,e,r,s);for(const o in n.propsOptions[0])o in r||(r[o]=void 0);t?n.props=i?r:Ds(r):n.type.props?n.props=r:n.props=s,n.attrs=s}function dS(n,e,t,i){const{props:r,attrs:s,vnode:{patchFlag:o}}=n,a=st(r),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Zl(n.emitsOptions,h))continue;const d=e[h];if(l)if(at(s,h))d!==s[h]&&(s[h]=d,c=!0);else{const p=fn(h);r[p]=Au(l,a,p,d,n,!1)}else d!==s[h]&&(s[h]=d,c=!0)}}}else{W_(n,e,r,s)&&(c=!0);let u;for(const f in a)(!e||!at(e,f)&&((u=ls(f))===f||!at(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(r[f]=Au(l,a,f,void 0,n,!0)):delete r[f]);if(s!==a)for(const f in s)(!e||!at(e,f))&&(delete s[f],c=!0)}c&&zi(n.attrs,"set","")}function W_(n,e,t,i){const[r,s]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(jr(l))continue;const c=e[l];let u;r&&at(r,u=fn(l))?!s||!s.includes(u)?t[u]=c:(a||(a={}))[u]=c:Zl(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(s){const l=st(t),c=a||xt;for(let u=0;u<s.length;u++){const f=s[u];t[f]=Au(r,l,f,c[f],n,!at(c,f))}}return o}function Au(n,e,t,i,r,s){const o=n[t];if(o!=null){const a=at(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Ve(l)){const{propsDefaults:c}=r;if(t in c)i=c[t];else{const u=pa(r);i=c[t]=l.call(null,e),u()}}else i=l;r.ce&&r.ce._setProp(t,i)}o[0]&&(s&&!a?i=!1:o[1]&&(i===""||i===ls(t))&&(i=!0))}return i}const pS=new WeakMap;function X_(n,e,t=!1){const i=t?pS:e.propsCache,r=i.get(n);if(r)return r;const s=n.props,o={},a=[];let l=!1;if(!Ve(n)){const u=f=>{l=!0;const[h,d]=X_(f,e,!0);zt(o,h),d&&a.push(...d)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!s&&!l)return lt(n)&&i.set(n,Os),Os;if(ke(s))for(let u=0;u<s.length;u++){const f=fn(s[u]);Fd(f)&&(o[f]=xt)}else if(s)for(const u in s){const f=fn(u);if(Fd(f)){const h=s[u],d=o[f]=ke(h)||Ve(h)?{type:h}:zt({},h),p=d.type;let _=!1,m=!0;if(ke(p))for(let g=0;g<p.length;++g){const y=p[g],v=Ve(y)&&y.name;if(v==="Boolean"){_=!0;break}else v==="String"&&(m=!1)}else _=Ve(p)&&p.name==="Boolean";d[0]=_,d[1]=m,(_||at(d,"default"))&&a.push(f)}}const c=[o,a];return lt(n)&&i.set(n,c),c}function Fd(n){return n[0]!=="$"&&!jr(n)}const ph=n=>n==="_"||n==="_ctx"||n==="$stable",mh=n=>ke(n)?n.map(An):[An(n)],mS=(n,e,t)=>{if(e._n)return e;const i=jl((...r)=>mh(e(...r)),t);return i._c=!1,i},q_=(n,e,t)=>{const i=n._ctx;for(const r in n){if(ph(r))continue;const s=n[r];if(Ve(s))e[r]=mS(r,s,i);else if(s!=null){const o=mh(s);e[r]=()=>o}}},Y_=(n,e)=>{const t=mh(e);n.slots.default=()=>t},$_=(n,e,t)=>{for(const i in e)(t||!ph(i))&&(n[i]=e[i])},_S=(n,e,t)=>{const i=n.slots=V_();if(n.vnode.shapeFlag&32){const r=e._;r?($_(i,e,t),t&&Ym(i,"_",r,!0)):q_(e,i)}else e&&Y_(n,e)},gS=(n,e,t)=>{const{vnode:i,slots:r}=n;let s=!0,o=xt;if(i.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:$_(r,e,t):(s=!e.$stable,q_(e,r)),o=e}else e&&(Y_(n,e),o={default:1});if(s)for(const a in r)!ph(a)&&o[a]==null&&delete r[a]},cn=ng;function vS(n){return j_(n)}function xS(n){return j_(n,Bx)}function j_(n,e){const t=Yl();t.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=bi,insertStaticContent:p}=n,_=(L,F,W,te=null,re=null,ie=null,de=void 0,I=null,ue=!!F.dynamicChildren)=>{if(L===F)return;L&&!gi(L,F)&&(te=ee(L),Te(L,re,ie,!0),L=null),F.patchFlag===-2&&(ue=!1,F.dynamicChildren=null);const{type:J,ref:Ae,shapeFlag:$}=F;switch(J){case Qr:m(L,F,W,te);break;case Xt:g(L,F,W,te);break;case Uo:L==null&&y(F,W,te,de);break;case Hn:D(L,F,W,te,re,ie,de,I,ue);break;default:$&1?E(L,F,W,te,re,ie,de,I,ue):$&6?B(L,F,W,te,re,ie,de,I,ue):($&64||$&128)&&J.process(L,F,W,te,re,ie,de,I,ue,fe)}Ae!=null&&re?zs(Ae,L&&L.ref,ie,F||L,!F):Ae==null&&L&&L.ref!=null&&zs(L.ref,null,ie,L,!0)},m=(L,F,W,te)=>{if(L==null)i(F.el=a(F.children),W,te);else{const re=F.el=L.el;F.children!==L.children&&c(re,F.children)}},g=(L,F,W,te)=>{L==null?i(F.el=l(F.children||""),W,te):F.el=L.el},y=(L,F,W,te)=>{[L.el,L.anchor]=p(L.children,F,W,te,L.el,L.anchor)},v=({el:L,anchor:F},W,te)=>{let re;for(;L&&L!==F;)re=h(L),i(L,W,te),L=re;i(F,W,te)},S=({el:L,anchor:F})=>{let W;for(;L&&L!==F;)W=h(L),r(L),L=W;r(F)},E=(L,F,W,te,re,ie,de,I,ue)=>{if(F.type==="svg"?de="svg":F.type==="math"&&(de="mathml"),L==null)T(F,W,te,re,ie,de,I,ue);else{const J=L.el&&L.el._isVueCE?L.el:null;try{J&&J._beginPatch(),b(L,F,re,ie,de,I,ue)}finally{J&&J._endPatch()}}},T=(L,F,W,te,re,ie,de,I)=>{let ue,J;const{props:Ae,shapeFlag:$,transition:be,dirs:w}=L;if(ue=L.el=o(L.type,ie,Ae&&Ae.is,Ae),$&8?u(ue,L.children):$&16&&x(L.children,ue,null,te,re,yc(L,ie),de,I),w&&ui(L,null,te,"created"),R(ue,L,L.scopeId,de,te),Ae){for(const H in Ae)H!=="value"&&!jr(H)&&s(ue,H,null,Ae[H],ie,te);"value"in Ae&&s(ue,"value",null,Ae.value,ie),(J=Ae.onVnodeBeforeMount)&&Bn(J,te,L)}w&&ui(L,null,te,"beforeMount");const M=K_(re,be);M&&be.beforeEnter(ue),i(ue,F,W),((J=Ae&&Ae.onVnodeMounted)||M||w)&&cn(()=>{try{J&&Bn(J,te,L),M&&be.enter(ue),w&&ui(L,null,te,"mounted")}finally{}},re)},R=(L,F,W,te,re)=>{if(W&&d(L,W),te)for(let ie=0;ie<te.length;ie++)d(L,te[ie]);if(re){let ie=re.subTree;if(F===ie||eg(ie.type)&&(ie.ssContent===F||ie.ssFallback===F)){const de=re.vnode;R(L,de,de.scopeId,de.slotScopeIds,re.parent)}}},x=(L,F,W,te,re,ie,de,I,ue=0)=>{for(let J=ue;J<L.length;J++){const Ae=L[J]=I?ki(L[J]):An(L[J]);_(null,Ae,F,W,te,re,ie,de,I)}},b=(L,F,W,te,re,ie,de)=>{const I=F.el=L.el;let{patchFlag:ue,dynamicChildren:J,dirs:Ae}=F;ue|=L.patchFlag&16;const $=L.props||xt,be=F.props||xt;let w;if(W&&Lr(W,!1),(w=be.onVnodeBeforeUpdate)&&Bn(w,W,F,L),Ae&&ui(F,L,W,"beforeUpdate"),W&&Lr(W,!0),($.innerHTML&&be.innerHTML==null||$.textContent&&be.textContent==null)&&u(I,""),J?C(L.dynamicChildren,J,I,W,te,yc(F,re),ie):de||G(L,F,I,null,W,te,yc(F,re),ie,!1),ue>0){if(ue&16)P(I,$,be,W,re);else if(ue&2&&$.class!==be.class&&s(I,"class",null,be.class,re),ue&4&&s(I,"style",$.style,be.style,re),ue&8){const M=F.dynamicProps;for(let H=0;H<M.length;H++){const Z=M[H],se=$[Z],ce=be[Z];(ce!==se||Z==="value")&&s(I,Z,se,ce,re,W)}}ue&1&&L.children!==F.children&&u(I,F.children)}else!de&&J==null&&P(I,$,be,W,re);((w=be.onVnodeUpdated)||Ae)&&cn(()=>{w&&Bn(w,W,F,L),Ae&&ui(F,L,W,"updated")},te)},C=(L,F,W,te,re,ie,de)=>{for(let I=0;I<F.length;I++){const ue=L[I],J=F[I],Ae=ue.el&&(ue.type===Hn||!gi(ue,J)||ue.shapeFlag&198)?f(ue.el):W;_(ue,J,Ae,null,te,re,ie,de,!0)}},P=(L,F,W,te,re)=>{if(F!==W){if(F!==xt)for(const ie in F)!jr(ie)&&!(ie in W)&&s(L,ie,F[ie],null,re,te);for(const ie in W){if(jr(ie))continue;const de=W[ie],I=F[ie];de!==I&&ie!=="value"&&s(L,ie,I,de,re,te)}"value"in W&&s(L,"value",F.value,W.value,re)}},D=(L,F,W,te,re,ie,de,I,ue)=>{const J=F.el=L?L.el:a(""),Ae=F.anchor=L?L.anchor:a("");let{patchFlag:$,dynamicChildren:be,slotScopeIds:w}=F;w&&(I=I?I.concat(w):w),L==null?(i(J,W,te),i(Ae,W,te),x(F.children||[],W,Ae,re,ie,de,I,ue)):$>0&&$&64&&be&&L.dynamicChildren&&L.dynamicChildren.length===be.length?(C(L.dynamicChildren,be,W,re,ie,de,I),(F.key!=null||re&&F===re.subTree)&&Z_(L,F,!0)):G(L,F,W,Ae,re,ie,de,I,ue)},B=(L,F,W,te,re,ie,de,I,ue)=>{F.slotScopeIds=I,L==null?F.shapeFlag&512?re.ctx.activate(F,W,te,de,ue):z(F,W,te,re,ie,de,ue):N(L,F,ue)},z=(L,F,W,te,re,ie,de)=>{const I=L.component=IS(L,te,re);if(fa(L)&&(I.ctx.renderer=fe),US(I,!1,de),I.asyncDep){if(re&&re.registerDep(I,U,de),!L.el){const ue=I.subTree=yt(Xt);g(null,ue,F,W),L.placeholder=ue.el}}else U(I,L,F,W,re,ie,de)},N=(L,F,W)=>{const te=F.component=L.component;if(fS(L,F,W))if(te.asyncDep&&!te.asyncResolved){O(te,F,W);return}else te.next=F,te.update();else F.el=L.el,te.vnode=F},U=(L,F,W,te,re,ie,de)=>{const I=()=>{if(L.isMounted){let{next:$,bu:be,u:w,parent:M,vnode:H}=L;{const Q=J_(L);if(Q){$&&($.el=H.el,O(L,$,de)),Q.asyncDep.then(()=>{cn(()=>{L.isUnmounted||J()},re)});return}}let Z=$,se;Lr(L,!1),$?($.el=H.el,O(L,$,de)):$=H,be&&hc(be),(se=$.props&&$.props.onVnodeBeforeUpdate)&&Bn(se,M,$,H),Lr(L,!0);const ce=Sc(L),pe=L.subTree;L.subTree=ce,_(pe,ce,f(pe.el),ee(pe),L,re,ie),$.el=ce.el,Z===null&&Jl(L,ce.el),w&&cn(w,re),(se=$.props&&$.props.onVnodeUpdated)&&cn(()=>Bn(se,M,$,H),re)}else{let $;const{el:be,props:w}=F,{bm:M,m:H,parent:Z,root:se,type:ce}=L,pe=Vs(F);if(Lr(L,!1),M&&hc(M),!pe&&($=w&&w.onVnodeBeforeMount)&&Bn($,Z,F),Lr(L,!0),be&&Je){const Q=()=>{L.subTree=Sc(L),Je(be,L.subTree,L,re,null)};pe&&ce.__asyncHydrate?ce.__asyncHydrate(be,L,Q):Q()}else{se.ce&&se.ce._hasShadowRoot()&&se.ce._injectChildStyle(ce,L.parent?L.parent.type:void 0);const Q=L.subTree=Sc(L);_(null,Q,W,te,L,re,ie),F.el=Q.el}if(H&&cn(H,re),!pe&&($=w&&w.onVnodeMounted)){const Q=F;cn(()=>Bn($,Z,Q),re)}(F.shapeFlag&256||Z&&Vs(Z.vnode)&&Z.vnode.shapeFlag&256)&&L.a&&cn(L.a,re),L.isMounted=!0,F=W=te=null}};L.scope.on();const ue=L.effect=new e_(I);L.scope.off();const J=L.update=ue.run.bind(ue),Ae=L.job=ue.runIfDirty.bind(ue);Ae.i=L,Ae.id=L.uid,ue.scheduler=()=>fh(Ae),Lr(L,!0),J()},O=(L,F,W)=>{F.component=L;const te=L.vnode.props;L.vnode=F,L.next=null,dS(L,F.props,te,W),gS(L,F.children,W),Xi(),bd(L),qi()},G=(L,F,W,te,re,ie,de,I,ue=!1)=>{const J=L&&L.children,Ae=L?L.shapeFlag:0,$=F.children,{patchFlag:be,shapeFlag:w}=F;if(be>0){if(be&128){ge(J,$,W,te,re,ie,de,I,ue);return}else if(be&256){ne(J,$,W,te,re,ie,de,I,ue);return}}w&8?(Ae&16&&le(J,re,ie),$!==J&&u(W,$)):Ae&16?w&16?ge(J,$,W,te,re,ie,de,I,ue):le(J,re,ie,!0):(Ae&8&&u(W,""),w&16&&x($,W,te,re,ie,de,I,ue))},ne=(L,F,W,te,re,ie,de,I,ue)=>{L=L||Os,F=F||Os;const J=L.length,Ae=F.length,$=Math.min(J,Ae);let be;for(be=0;be<$;be++){const w=F[be]=ue?ki(F[be]):An(F[be]);_(L[be],w,W,null,re,ie,de,I,ue)}J>Ae?le(L,re,ie,!0,!1,$):x(F,W,te,re,ie,de,I,ue,$)},ge=(L,F,W,te,re,ie,de,I,ue)=>{let J=0;const Ae=F.length;let $=L.length-1,be=Ae-1;for(;J<=$&&J<=be;){const w=L[J],M=F[J]=ue?ki(F[J]):An(F[J]);if(gi(w,M))_(w,M,W,null,re,ie,de,I,ue);else break;J++}for(;J<=$&&J<=be;){const w=L[$],M=F[be]=ue?ki(F[be]):An(F[be]);if(gi(w,M))_(w,M,W,null,re,ie,de,I,ue);else break;$--,be--}if(J>$){if(J<=be){const w=be+1,M=w<Ae?F[w].el:te;for(;J<=be;)_(null,F[J]=ue?ki(F[J]):An(F[J]),W,M,re,ie,de,I,ue),J++}}else if(J>be)for(;J<=$;)Te(L[J],re,ie,!0),J++;else{const w=J,M=J,H=new Map;for(J=M;J<=be;J++){const Me=F[J]=ue?ki(F[J]):An(F[J]);Me.key!=null&&H.set(Me.key,J)}let Z,se=0;const ce=be-M+1;let pe=!1,Q=0;const oe=new Array(ce);for(J=0;J<ce;J++)oe[J]=0;for(J=w;J<=$;J++){const Me=L[J];if(se>=ce){Te(Me,re,ie,!0);continue}let me;if(Me.key!=null)me=H.get(Me.key);else for(Z=M;Z<=be;Z++)if(oe[Z-M]===0&&gi(Me,F[Z])){me=Z;break}me===void 0?Te(Me,re,ie,!0):(oe[me-M]=J+1,me>=Q?Q=me:pe=!0,_(Me,F[me],W,null,re,ie,de,I,ue),se++)}const we=pe?SS(oe):Os;for(Z=we.length-1,J=ce-1;J>=0;J--){const Me=M+J,me=F[Me],_e=F[Me+1],He=Me+1<Ae?_e.el||Q_(_e):te;oe[J]===0?_(null,me,W,He,re,ie,de,I,ue):pe&&(Z<0||J!==we[Z]?Ee(me,W,He,2):Z--)}}},Ee=(L,F,W,te,re=null)=>{const{el:ie,type:de,transition:I,children:ue,shapeFlag:J}=L;if(J&6){Ee(L.component.subTree,F,W,te);return}if(J&128){L.suspense.move(F,W,te);return}if(J&64){de.move(L,F,W,fe);return}if(de===Hn){i(ie,F,W);for(let $=0;$<ue.length;$++)Ee(ue[$],F,W,te);i(L.anchor,F,W);return}if(de===Uo){v(L,F,W);return}if(te!==2&&J&1&&I)if(te===0)I.beforeEnter(ie),i(ie,F,W),cn(()=>I.enter(ie),re);else{const{leave:$,delayLeave:be,afterLeave:w}=I,M=()=>{L.ctx.isUnmounted?r(ie):i(ie,F,W)},H=()=>{ie._isLeaving&&ie[fi](!0),$(ie,()=>{M(),w&&w()})};be?be(ie,M,H):H()}else i(ie,F,W)},Te=(L,F,W,te=!1,re=!1)=>{const{type:ie,props:de,ref:I,children:ue,dynamicChildren:J,shapeFlag:Ae,patchFlag:$,dirs:be,cacheIndex:w,memo:M}=L;if($===-2&&(re=!1),I!=null&&(Xi(),zs(I,null,W,L,!0),qi()),w!=null&&(F.renderCache[w]=void 0),Ae&256){F.ctx.deactivate(L);return}const H=Ae&1&&be,Z=!Vs(L);let se;if(Z&&(se=de&&de.onVnodeBeforeUnmount)&&Bn(se,F,L),Ae&6)Be(L.component,W,te);else{if(Ae&128){L.suspense.unmount(W,te);return}H&&ui(L,null,F,"beforeUnmount"),Ae&64?L.type.remove(L,F,W,fe,te):J&&!J.hasOnce&&(ie!==Hn||$>0&&$&64)?le(J,F,W,!1,!0):(ie===Hn&&$&384||!re&&Ae&16)&&le(ue,F,W),te&&Ye(L)}const ce=M!=null&&w==null;(Z&&(se=de&&de.onVnodeUnmounted)||H||ce)&&cn(()=>{se&&Bn(se,F,L),H&&ui(L,null,F,"unmounted"),ce&&(L.el=null)},W)},Ye=L=>{const{type:F,el:W,anchor:te,transition:re}=L;if(F===Hn){We(W,te);return}if(F===Uo){S(L);return}const ie=()=>{r(W),re&&!re.persisted&&re.afterLeave&&re.afterLeave()};if(L.shapeFlag&1&&re&&!re.persisted){const{leave:de,delayLeave:I}=re,ue=()=>de(W,ie);I?I(L.el,ie,ue):ue()}else ie()},We=(L,F)=>{let W;for(;L!==F;)W=h(L),r(L),L=W;r(F)},Be=(L,F,W)=>{const{bum:te,scope:re,job:ie,subTree:de,um:I,m:ue,a:J}=L;Od(ue),Od(J),te&&hc(te),re.stop(),ie&&(ie.flags|=8,Te(de,L,F,W)),I&&cn(I,F),cn(()=>{L.isUnmounted=!0},F)},le=(L,F,W,te=!1,re=!1,ie=0)=>{for(let de=ie;de<L.length;de++)Te(L[de],F,W,te,re)},ee=L=>{if(L.shapeFlag&6)return ee(L.component.subTree);if(L.shapeFlag&128)return L.suspense.next();const F=h(L.anchor||L.el),W=F&&F[Dx];return W?h(W):F};let K=!1;const ye=(L,F,W)=>{let te;L==null?F._vnode&&(Te(F._vnode,null,null,!0),te=F._vnode.component):_(F._vnode||null,L,F,null,null,null,W),F._vnode=L,K||(K=!0,bd(te),ml(),K=!1)},fe={p:_,um:Te,m:Ee,r:Ye,mt:z,mc:x,pc:G,pbc:C,n:ee,o:n};let ve,Je;return e&&([ve,Je]=e(fe)),{render:ye,hydrate:ve,createApp:rS(ye,ve)}}function yc({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Lr({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function K_(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function Z_(n,e,t=!1){const i=n.children,r=e.children;if(ke(i)&&ke(r))for(let s=0;s<i.length;s++){const o=i[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=ki(r[s]),a.el=o.el),!t&&a.patchFlag!==-2&&Z_(o,a)),a.type===Qr&&(a.patchFlag===-1&&(a=r[s]=ki(a)),a.el=o.el),a.type===Xt&&!a.el&&(a.el=o.el)}}function SS(n){const e=n.slice(),t=[0];let i,r,s,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(r=t[t.length-1],n[r]<c){e[i]=r,t.push(i);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,n[t[a]]<c?s=a+1:o=a;c<n[t[s]]&&(s>0&&(e[i]=t[s-1]),t[s]=i)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}function J_(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:J_(e)}function Od(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function Q_(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?Q_(e.subTree):null}const eg=n=>n.__isSuspense;let wu=0;const yS={name:"Suspense",__isSuspense:!0,process(n,e,t,i,r,s,o,a,l,c){if(n==null)bS(e,t,i,r,s,o,a,l,c);else{if(s&&s.deps>0&&!n.suspense.isInFallback){e.suspense=n.suspense,e.suspense.vnode=e,e.el=n.el;return}ES(n,e,t,i,r,o,a,l,c)}},hydrate:TS,normalize:AS},MS=yS;function qo(n,e){const t=n.props&&n.props[e];Ve(t)&&t()}function bS(n,e,t,i,r,s,o,a,l){const{p:c,o:{createElement:u}}=l,f=u("div"),h=n.suspense=tg(n,r,i,e,f,t,s,o,a,l);c(null,h.pendingBranch=n.ssContent,f,null,i,h,s,o),h.deps>0?(qo(n,"onPending"),qo(n,"onFallback"),c(null,n.ssFallback,e,t,i,null,s,o),Gs(h,n.ssFallback)):h.resolve(!1,!0)}function ES(n,e,t,i,r,s,o,a,{p:l,um:c,o:{createElement:u}}){const f=e.suspense=n.suspense;f.vnode=e,e.el=n.el;const h=e.ssContent,d=e.ssFallback,{activeBranch:p,pendingBranch:_,isInFallback:m,isHydrating:g}=f;if(_)f.pendingBranch=h,gi(_,h)?(l(_,h,f.hiddenContainer,null,r,f,s,o,a),f.deps<=0?f.resolve():m&&(g||(l(p,d,t,i,r,null,s,o,a),Gs(f,d)))):(f.pendingId=wu++,g?(f.isHydrating=!1,f.activeBranch=_):c(_,r,f),f.deps=0,f.effects.length=0,f.hiddenContainer=u("div"),m?(l(null,h,f.hiddenContainer,null,r,f,s,o,a),f.deps<=0?f.resolve():(l(p,d,t,i,r,null,s,o,a),Gs(f,d))):p&&gi(p,h)?(l(p,h,t,i,r,f,s,o,a),f.resolve(!0)):(l(null,h,f.hiddenContainer,null,r,f,s,o,a),f.deps<=0&&f.resolve()));else if(p&&gi(p,h))l(p,h,t,i,r,f,s,o,a),Gs(f,h);else if(qo(e,"onPending"),f.pendingBranch=h,h.shapeFlag&512?f.pendingId=h.component.suspenseId:f.pendingId=wu++,l(null,h,f.hiddenContainer,null,r,f,s,o,a),f.deps<=0)f.resolve();else{const{timeout:y,pendingId:v}=f;y>0?setTimeout(()=>{f.pendingId===v&&f.fallback(d)},y):y===0&&f.fallback(d)}}function tg(n,e,t,i,r,s,o,a,l,c,u=!1){const{p:f,m:h,um:d,n:p,o:{parentNode:_,remove:m}}=c;let g;const y=wS(n);y&&e&&e.pendingBranch&&(g=e.pendingId,e.deps++);const v=n.props?$m(n.props.timeout):void 0,S=s,E={vnode:n,parent:e,parentComponent:t,namespace:o,container:i,hiddenContainer:r,deps:0,pendingId:wu++,timeout:typeof v=="number"?v:-1,activeBranch:null,isFallbackMountPending:!1,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(T=!1,R=!1){const{vnode:x,activeBranch:b,pendingBranch:C,pendingId:P,effects:D,parentComponent:B,container:z,isInFallback:N}=E;let U=!1;if(E.isHydrating)E.isHydrating=!1;else if(!T){U=b&&C.transition&&C.transition.mode==="out-in";let ne=!1;U&&(b.transition.afterLeave=()=>{P===E.pendingId&&(h(C,z,s===S&&!ne?p(b):s,0),yu(D),N&&x.ssFallback&&(x.ssFallback.el=null))}),b&&!E.isFallbackMountPending&&(_(b.el)===z&&(s=p(b),ne=!0),d(b,B,E,!0),!U&&N&&x.ssFallback&&cn(()=>x.ssFallback.el=null,E)),U||h(C,z,s,0)}E.isFallbackMountPending=!1,Gs(E,C),E.pendingBranch=null,E.isInFallback=!1;let O=E.parent,G=!1;for(;O;){if(O.pendingBranch){O.effects.push(...D),G=!0;break}O=O.parent}!G&&!U&&yu(D),E.effects=[],y&&e&&e.pendingBranch&&g===e.pendingId&&(e.deps--,e.deps===0&&!R&&e.resolve()),qo(x,"onResolve")},fallback(T){if(!E.pendingBranch)return;const{vnode:R,activeBranch:x,parentComponent:b,container:C,namespace:P}=E;qo(R,"onFallback");const D=p(x),B=()=>{E.isFallbackMountPending=!1,E.isInFallback&&(f(null,T,C,D,b,null,P,a,l),Gs(E,T))},z=T.transition&&T.transition.mode==="out-in";z&&(E.isFallbackMountPending=!0,x.transition.afterLeave=B),E.isInFallback=!0,d(x,b,null,!0),z||B()},move(T,R,x){E.activeBranch&&h(E.activeBranch,T,R,x),E.container=T},next(){return E.activeBranch&&p(E.activeBranch)},registerDep(T,R,x){const b=!!E.pendingBranch;b&&E.deps++;const C=T.vnode.el;T.asyncDep.catch(P=>{ao(P,T,0)}).then(P=>{if(T.isUnmounted||E.isUnmounted||E.pendingId!==T.suspenseId)return;Cu(),T.asyncResolved=!0;const{vnode:D}=T;Pu(T,P),C&&(D.el=C);const B=!C&&T.subTree.el;R(T,D,_(C||T.subTree.el),C?null:p(T.subTree),E,o,x),B&&(D.placeholder=null,m(B)),Jl(T,D.el),b&&--E.deps===0&&E.resolve()})},unmount(T,R){E.isUnmounted=!0,E.activeBranch&&d(E.activeBranch,t,T,R),E.pendingBranch&&d(E.pendingBranch,t,T,R)}};return E}function TS(n,e,t,i,r,s,o,a,l){const c=e.suspense=tg(e,i,t,n.parentNode,document.createElement("div"),null,r,s,o,a,!0),u=l(n,c.pendingBranch=e.ssContent,t,c,s,o);return c.deps===0&&c.resolve(!1,!0),u}function AS(n){const{shapeFlag:e,children:t}=n,i=e&32;n.ssContent=Bd(i?t.default:t),n.ssFallback=i?Bd(t.fallback):yt(Xt)}function Bd(n){let e;if(Ve(n)){const t=js&&n._c;t&&(n._d=!1,Tt()),n=n(),t&&(n._d=!0,e=mn,ig())}return ke(n)&&(n=lS(n)),n=An(n),e&&!n.dynamicChildren&&(n.dynamicChildren=e.filter(t=>t!==n)),n}function ng(n,e){e&&e.pendingBranch?ke(n)?e.effects.push(...n):e.effects.push(n):yu(n)}function Gs(n,e){n.activeBranch=e;const{vnode:t,parentComponent:i}=n;let r=e.el;for(;!r&&e.component;)e=e.component.subTree,r=e.el;t.el=r,i&&i.subTree===t&&(i.vnode.el=r,Jl(i,r))}function wS(n){const e=n.props&&n.props.suspensible;return e!=null&&e!==!1}const Hn=Symbol.for("v-fgt"),Qr=Symbol.for("v-txt"),Xt=Symbol.for("v-cmt"),Uo=Symbol.for("v-stc"),No=[];let mn=null;function Tt(n=!1){No.push(mn=n?null:[])}function ig(){No.pop(),mn=No[No.length-1]||null}let js=1;function xl(n,e=!1){js+=n,n<0&&mn&&e&&(mn.hasOnce=!0)}function rg(n){return n.dynamicChildren=js>0?mn||Os:null,ig(),js>0&&mn&&mn.push(n),n}function zn(n,e,t,i,r,s){return rg(Ke(n,e,t,i,r,s,!0))}function _i(n,e,t,i,r){return rg(yt(n,e,t,i,r,!0))}function Yo(n){return n?n.__v_isVNode===!0:!1}function gi(n,e){return n.type===e.type&&n.key===e.key}const sg=({key:n})=>n??null,Qa=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Mt(n)||Ht(n)||Ve(n)?{i:Qn,r:n,k:e,f:!!t}:n:null);function Ke(n,e=null,t=null,i=0,r=null,s=n===Hn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&sg(e),ref:e&&Qa(e),scopeId:x_,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Qn};return a?(gh(l,t),s&128&&n.normalize(l)):t&&(l.shapeFlag|=Mt(t)?8:16),js>0&&!o&&mn&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&mn.push(l),l}const yt=RS;function RS(n,e=null,t=null,i=0,r=null,s=!1){if((!n||n===U_)&&(n=Xt),Yo(n)){const a=br(n,e,!0);return t&&gh(a,t),js>0&&!s&&mn&&(a.shapeFlag&6?mn[mn.indexOf(n)]=a:mn.push(a)),a.patchFlag=-2,a}if(kS(n)&&(n=n.__vccOpts),e){e=og(e);let{class:a,style:l}=e;a&&!Mt(a)&&(e.class=oo(a)),lt(l)&&($l(l)&&!ke(l)&&(l=zt({},l)),e.style=ca(l))}const o=Mt(n)?1:eg(n)?128:b_(n)?64:lt(n)?4:Ve(n)?2:0;return Ke(n,e,t,i,r,o,s,!0)}function og(n){return n?$l(n)||G_(n)?zt({},n):n:null}function br(n,e,t=!1,i=!1){const{props:r,ref:s,patchFlag:o,children:a,transition:l}=n,c=e?PS(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&sg(c),ref:e&&e.ref?t&&s?ke(s)?s.concat(Qa(e)):[s,Qa(e)]:Qa(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Hn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&br(n.ssContent),ssFallback:n.ssFallback&&br(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Xo(u,l.clone(u)),u}function _h(n=" ",e=0){return yt(Qr,null,n,e)}function CS(n,e){const t=yt(Uo,null,n);return t.staticCount=e,t}function da(n="",e=!1){return e?(Tt(),_i(Xt,null,n)):yt(Xt,null,n)}function An(n){return n==null||typeof n=="boolean"?yt(Xt):ke(n)?yt(Hn,null,n.slice()):Yo(n)?ki(n):yt(Qr,null,String(n))}function ki(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:br(n)}function gh(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(ke(e))t=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),gh(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!G_(e)?e._ctx=Qn:r===3&&Qn&&(Qn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Ve(e)?(e={default:e,_ctx:Qn},t=32):(e=String(e),i&64?(t=16,e=[_h(e)]):t=8);n.children=e,n.shapeFlag|=t}function PS(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=oo([e.class,i.class]));else if(r==="style")e.style=ca([e.style,i.style]);else if(aa(r)){const s=e[r],o=i[r];o&&s!==o&&!(ke(s)&&s.includes(o))?e[r]=s?[].concat(s,o):o:o==null&&s==null&&!Gl(r)&&(e[r]=o)}else r!==""&&(e[r]=i[r])}return e}function Bn(n,e,t,i=null){ni(n,e,7,[t,i])}const LS=B_();let DS=0;function IS(n,e,t){const i=n.type,r=(e?e.appContext:n.appContext)||LS,s={uid:DS++,vnode:n,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Jm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:X_(i,r),emitsOptions:k_(i,r),emit:null,emitted:null,propsDefaults:xt,inheritAttrs:i.inheritAttrs,ctx:xt,data:xt,props:xt,attrs:xt,slots:xt,refs:xt,setupState:xt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=oS.bind(null,s),n.ce&&n.ce(s),s}let jt=null;const Ql=()=>jt||Qn;let Sl,Ru;{const n=Yl(),e=(t,i)=>{let r;return(r=n[t])||(r=n[t]=[]),r.push(i),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};Sl=e("__VUE_INSTANCE_SETTERS__",t=>jt=t),Ru=e("__VUE_SSR_SETTERS__",t=>Ks=t)}const pa=n=>{const e=jt;return Sl(n),n.scope.on(),()=>{n.scope.off(),Sl(e)}},Cu=()=>{jt&&jt.scope.off(),Sl(null)};function ag(n){return n.vnode.shapeFlag&4}let Ks=!1;function US(n,e=!1,t=!1){e&&Ru(e);const{props:i,children:r}=n.vnode,s=ag(n);hS(n,i,s,e),_S(n,r,t||e);const o=s?NS(n,e):void 0;return e&&Ru(!1),o}function NS(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Zx);const{setup:i}=t;if(i){Xi();const r=n.setupContext=i.length>1?OS(n):null,s=pa(n),o=ua(i,n,0,[n.props,r]),a=Wm(o);if(qi(),s(),(a||n.sp)&&!Vs(n)&&dh(n),a){if(o.then(Cu,Cu),e)return o.then(l=>{Pu(n,l)}).catch(l=>{ao(l,n,0)});n.asyncDep=o}else Pu(n,o)}else lg(n)}function Pu(n,e,t){Ve(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:lt(e)&&(n.setupState=m_(e)),lg(n)}function lg(n,e,t){const i=n.type;n.render||(n.render=i.render||bi);{const r=pa(n);Xi();try{Jx(n)}finally{qi(),r()}}}const FS={get(n,e){return nn(n,"get",""),n[e]}};function OS(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,FS),slots:n.slots,emit:n.emit,expose:e}}function vh(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(m_(_x(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Io)return Io[t](n)},has(e,t){return t in e||t in Io}})):n.proxy}function BS(n,e=!0){return Ve(n)?n.displayName||n.name:n.name||e&&n.__name}function kS(n){return Ve(n)&&"__vccOpts"in n}const Fo=(n,e)=>Ex(n,e,Ks);function cg(n,e,t){try{xl(-1);const i=arguments.length;return i===2?lt(e)&&!ke(e)?Yo(e)?yt(n,null,[e]):yt(n,e):yt(n,null,e):(i>3?t=Array.prototype.slice.call(arguments,2):i===3&&Yo(t)&&(t=[t]),yt(n,e,t))}finally{xl(1)}}const ug="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Lu;const kd=typeof window<"u"&&window.trustedTypes;if(kd)try{Lu=kd.createPolicy("vue",{createHTML:n=>n})}catch{}const fg=Lu?n=>Lu.createHTML(n):n=>n,HS="http://www.w3.org/2000/svg",zS="http://www.w3.org/1998/Math/MathML",Oi=typeof document<"u"?document:null,Hd=Oi&&Oi.createElement("template"),VS={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const r=e==="svg"?Oi.createElementNS(HS,n):e==="mathml"?Oi.createElementNS(zS,n):t?Oi.createElement(n,{is:t}):Oi.createElement(n);return n==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:n=>Oi.createTextNode(n),createComment:n=>Oi.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Oi.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,r,s){const o=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{Hd.innerHTML=fg(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=Hd.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},sr="transition",_o="animation",$o=Symbol("_vtc"),hg={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},GS=zt({},E_,hg),WS=n=>(n.displayName="Transition",n.props=GS,n),dg=WS((n,{slots:e})=>cg(Nx,XS(n),e)),Dr=(n,e=[])=>{ke(n)?n.forEach(t=>t(...e)):n&&n(...e)},zd=n=>n?ke(n)?n.some(e=>e.length>1):n.length>1:!1;function XS(n){const e={};for(const D in n)D in hg||(e[D]=n[D]);if(n.css===!1)return e;const{name:t="v",type:i,duration:r,enterFromClass:s=`${t}-enter-from`,enterActiveClass:o=`${t}-enter-active`,enterToClass:a=`${t}-enter-to`,appearFromClass:l=s,appearActiveClass:c=o,appearToClass:u=a,leaveFromClass:f=`${t}-leave-from`,leaveActiveClass:h=`${t}-leave-active`,leaveToClass:d=`${t}-leave-to`}=n,p=qS(r),_=p&&p[0],m=p&&p[1],{onBeforeEnter:g,onEnter:y,onEnterCancelled:v,onLeave:S,onLeaveCancelled:E,onBeforeAppear:T=g,onAppear:R=y,onAppearCancelled:x=v}=e,b=(D,B,z,N)=>{D._enterCancelled=N,Ir(D,B?u:a),Ir(D,B?c:o),z&&z()},C=(D,B)=>{D._isLeaving=!1,Ir(D,f),Ir(D,d),Ir(D,h),B&&B()},P=D=>(B,z)=>{const N=D?R:y,U=()=>b(B,D,z);Dr(N,[B,U]),Vd(()=>{Ir(B,D?l:s),Li(B,D?u:a),zd(N)||Gd(B,i,_,U)})};return zt(e,{onBeforeEnter(D){Dr(g,[D]),Li(D,s),Li(D,o)},onBeforeAppear(D){Dr(T,[D]),Li(D,l),Li(D,c)},onEnter:P(!1),onAppear:P(!0),onLeave(D,B){D._isLeaving=!0;const z=()=>C(D,B);Li(D,f),D._enterCancelled?(Li(D,h),qd(D)):(qd(D),Li(D,h)),Vd(()=>{D._isLeaving&&(Ir(D,f),Li(D,d),zd(S)||Gd(D,i,m,z))}),Dr(S,[D,z])},onEnterCancelled(D){b(D,!1,void 0,!0),Dr(v,[D])},onAppearCancelled(D){b(D,!0,void 0,!0),Dr(x,[D])},onLeaveCancelled(D){C(D),Dr(E,[D])}})}function qS(n){if(n==null)return null;if(lt(n))return[Mc(n.enter),Mc(n.leave)];{const e=Mc(n);return[e,e]}}function Mc(n){return $m(n)}function Li(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[$o]||(n[$o]=new Set)).add(e)}function Ir(n,e){e.split(/\s+/).forEach(i=>i&&n.classList.remove(i));const t=n[$o];t&&(t.delete(e),t.size||(n[$o]=void 0))}function Vd(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let YS=0;function Gd(n,e,t,i){const r=n._endId=++YS,s=()=>{r===n._endId&&i()};if(t!=null)return setTimeout(s,t);const{type:o,timeout:a,propCount:l}=$S(n,e);if(!o)return i();const c=o+"end";let u=0;const f=()=>{n.removeEventListener(c,h),s()},h=d=>{d.target===n&&++u>=l&&f()};setTimeout(()=>{u<l&&f()},a+1),n.addEventListener(c,h)}function $S(n,e){const t=window.getComputedStyle(n),i=p=>(t[p]||"").split(", "),r=i(`${sr}Delay`),s=i(`${sr}Duration`),o=Wd(r,s),a=i(`${_o}Delay`),l=i(`${_o}Duration`),c=Wd(a,l);let u=null,f=0,h=0;e===sr?o>0&&(u=sr,f=o,h=s.length):e===_o?c>0&&(u=_o,f=c,h=l.length):(f=Math.max(o,c),u=f>0?o>c?sr:_o:null,h=u?u===sr?s.length:l.length:0);const d=u===sr&&/\b(?:transform|all)(?:,|$)/.test(i(`${sr}Property`).toString());return{type:u,timeout:f,propCount:h,hasTransform:d}}function Wd(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,i)=>Xd(t)+Xd(n[i])))}function Xd(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function qd(n){return(n?n.ownerDocument:document).body.offsetHeight}function jS(n,e,t){const i=n[$o];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Yd=Symbol("_vod"),KS=Symbol("_vsh"),ZS=Symbol(""),JS=/(?:^|;)\s*display\s*:/;function QS(n,e,t){const i=n.style,r=Mt(t);let s=!1;if(t&&!r){if(e)if(Mt(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&Ao(i,a,"")}else for(const o in e)t[o]==null&&Ao(i,o,"");for(const o in t){o==="display"&&(s=!0);const a=t[o];a!=null?ty(n,o,!Mt(e)&&e?e[o]:void 0,a)||Ao(i,o,a):Ao(i,o,"")}}else if(r){if(e!==t){const o=i[ZS];o&&(t+=";"+o),i.cssText=t,s=JS.test(t)}}else e&&n.removeAttribute("style");Yd in n&&(n[Yd]=s?i.display:"",n[KS]&&(i.display="none"))}const $d=/\s*!important$/;function Ao(n,e,t){if(ke(t))t.forEach(i=>Ao(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=ey(n,e);$d.test(t)?n.setProperty(ls(i),t.replace($d,""),"important"):n[i]=t}}const jd=["Webkit","Moz","ms"],bc={};function ey(n,e){const t=bc[e];if(t)return t;let i=fn(e);if(i!=="filter"&&i in n)return bc[e]=i;i=ql(i);for(let r=0;r<jd.length;r++){const s=jd[r]+i;if(s in n)return bc[e]=s}return e}function ty(n,e,t,i){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&Mt(i)&&t===i}const Kd="http://www.w3.org/1999/xlink";function Zd(n,e,t,i,r,s=$v(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Kd,e.slice(6,e.length)):n.setAttributeNS(Kd,e,t):t==null||s&&!jm(t)?n.removeAttribute(e):n.setAttribute(e,s?"":Yn(t)?String(t):t)}function Jd(n,e,t,i,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?fg(t):t);return}const s=n.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(a!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=jm(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(r||e)}function ny(n,e,t,i){n.addEventListener(e,t,i)}function iy(n,e,t,i){n.removeEventListener(e,t,i)}const Qd=Symbol("_vei");function ry(n,e,t,i,r=null){const s=n[Qd]||(n[Qd]={}),o=s[e];if(i&&o)o.value=i;else{const[a,l]=sy(e);if(i){const c=s[e]=ly(i,r);ny(n,a,c,l)}else o&&(iy(n,a,o,l),s[e]=void 0)}}const ep=/(?:Once|Passive|Capture)$/;function sy(n){let e;if(ep.test(n)){e={};let i;for(;i=n.match(ep);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):ls(n.slice(2)),e]}let Ec=0;const oy=Promise.resolve(),ay=()=>Ec||(oy.then(()=>Ec=0),Ec=Date.now());function ly(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;ni(cy(i,t.value),e,5,[i])};return t.value=n,t.attached=ay(),t}function cy(n,e){if(ke(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const tp=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,uy=(n,e,t,i,r,s)=>{const o=r==="svg";e==="class"?jS(n,i,o):e==="style"?QS(n,t,i):aa(e)?Gl(e)||ry(n,e,t,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):fy(n,e,i,o))?(Jd(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Zd(n,e,i,o,s,e!=="value")):n._isVueCE&&(hy(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!Mt(i)))?Jd(n,fn(e),i,s,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Zd(n,e,i,o))};function fy(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&tp(e)&&Ve(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return tp(e)&&Mt(t)?!1:e in n}function hy(n,e){const t=n._def.props;if(!t)return!1;const i=fn(e);return Array.isArray(t)?t.some(r=>fn(r)===i):Object.keys(t).some(r=>fn(r)===i)}const pg=zt({patchProp:uy},VS);let Oo,np=!1;function dy(){return Oo||(Oo=vS(pg))}function py(){return Oo=np?Oo:xS(pg),np=!0,Oo}const my=(...n)=>{const e=dy().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=_g(i);if(!r)return;const s=e._component;!Ve(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=t(r,!1,mg(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e},_y=(...n)=>{const e=py().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=_g(i);if(r)return t(r,!0,mg(r))},e};function mg(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function _g(n){return Mt(n)?document.querySelector(n):n}const gy=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,vy=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,xy=/^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;function Sy(n,e){if(n==="__proto__"||n==="constructor"&&e&&typeof e=="object"&&"prototype"in e){yy(n);return}return e}function yy(n){console.warn(`[destr] Dropping "${n}" key to prevent prototype pollution.`)}function yl(n,e={}){if(typeof n!="string")return n;if(n[0]==='"'&&n[n.length-1]==='"'&&n.indexOf("\\")===-1)return n.slice(1,-1);const t=n.trim();if(t.length<=9)switch(t.toLowerCase()){case"true":return!0;case"false":return!1;case"undefined":return;case"null":return null;case"nan":return Number.NaN;case"infinity":return Number.POSITIVE_INFINITY;case"-infinity":return Number.NEGATIVE_INFINITY}if(!xy.test(n)){if(e.strict)throw new SyntaxError("[destr] Invalid JSON");return n}try{if(gy.test(n)||vy.test(n)){if(e.strict)throw new Error("[destr] Possible prototype pollution");return JSON.parse(n,Sy)}return JSON.parse(n)}catch(i){if(e.strict)throw i;return n}}const My=/#/g,by=/&/g,Ey=/\//g,Ty=/=/g,xh=/\+/g,Ay=/%5e/gi,wy=/%60/gi,Ry=/%7c/gi,Cy=/%20/gi;function Py(n){return encodeURI(""+n).replace(Ry,"|")}function Du(n){return Py(typeof n=="string"?n:JSON.stringify(n)).replace(xh,"%2B").replace(Cy,"+").replace(My,"%23").replace(by,"%26").replace(wy,"`").replace(Ay,"^").replace(Ey,"%2F")}function Tc(n){return Du(n).replace(Ty,"%3D")}function Ml(n=""){try{return decodeURIComponent(""+n)}catch{return""+n}}function Ly(n){return Ml(n.replace(xh," "))}function Dy(n){return Ml(n.replace(xh," "))}function gg(n=""){const e=Object.create(null);n[0]==="?"&&(n=n.slice(1));for(const t of n.split("&")){const i=t.match(/([^=]+)=?(.*)/)||[];if(i.length<2)continue;const r=Ly(i[1]);if(r==="__proto__"||r==="constructor")continue;const s=Dy(i[2]||"");e[r]===void 0?e[r]=s:Array.isArray(e[r])?e[r].push(s):e[r]=[e[r],s]}return e}function Iy(n,e){return(typeof e=="number"||typeof e=="boolean")&&(e=String(e)),e?Array.isArray(e)?e.map(t=>`${Tc(n)}=${Du(t)}`).join("&"):`${Tc(n)}=${Du(e)}`:Tc(n)}function vg(n){return Object.keys(n).filter(e=>n[e]!==void 0).map(e=>Iy(e,n[e])).filter(Boolean).join("&")}const Uy=/^[\s\w\0+.-]{2,}:([/\\]{1,2})/,Ny=/^[\s\w\0+.-]{2,}:([/\\]{2})?/,Fy=/^([/\\]\s*){2,}[^/\\]/,Oy=/^[\s\0]*(blob|data|javascript|vbscript):$/i,By=/\/$|\/\?|\/#/,ky=/^\.?\//;function co(n,e={}){return typeof e=="boolean"&&(e={acceptRelative:e}),e.strict?Uy.test(n):Ny.test(n)||(e.acceptRelative?Fy.test(n):!1)}function Hy(n){return!!n&&Oy.test(n)}function Iu(n="",e){return e?By.test(n):n.endsWith("/")}function Sh(n="",e){if(!e)return(Iu(n)?n.slice(0,-1):n)||"/";if(!Iu(n,!0))return n||"/";let t=n,i="";const r=n.indexOf("#");r!==-1&&(t=n.slice(0,r),i=n.slice(r));const[s,...o]=t.split("?");return((s.endsWith("/")?s.slice(0,-1):s)||"/")+(o.length>0?`?${o.join("?")}`:"")+i}function Uu(n="",e){if(!e)return n.endsWith("/")?n:n+"/";if(Iu(n,!0))return n||"/";let t=n,i="";const r=n.indexOf("#");if(r!==-1&&(t=n.slice(0,r),i=n.slice(r),!t))return i;const[s,...o]=t.split("?");return s+"/"+(o.length>0?`?${o.join("?")}`:"")+i}function zy(n=""){return n.startsWith("/")}function ip(n=""){return zy(n)?n:"/"+n}function Vy(n,e){if(Sg(e)||co(n))return n;const t=Sh(e);if(n.startsWith(t)){const i=n[t.length];if(!i||i==="/"||i==="?")return n}return ec(t,n)}function Gy(n,e){if(Sg(e))return n;const t=Sh(e);if(!n.startsWith(t))return n;const i=n[t.length];return i&&i!=="/"&&i!=="?"?n:"/"+n.slice(t.length).replace(/^\/+/,"")}function xg(n,e){const t=qy(n),i={...gg(t.search),...e};return t.search=vg(i),bg(t)}function Sg(n){return!n||n==="/"}function Wy(n){return n&&n!=="/"}function ec(n,...e){let t=n||"";for(const i of e.filter(r=>Wy(r)))if(t){const r=i.replace(ky,"");t=Uu(t)+r}else t=i;return t}function yg(...n){var o,a,l,c;const e=/\/(?!\/)/,t=n.filter(Boolean),i=[];let r=0;for(const u of t)if(!(!u||u==="/")){for(const[f,h]of u.split(e).entries())if(!(!h||h===".")){if(h===".."){if(i.length===1&&co(i[0]))continue;i.pop(),r--;continue}if(f===1&&((o=i[i.length-1])!=null&&o.endsWith(":/"))){i[i.length-1]+="/"+h;continue}i.push(h),r++}}let s=i.join("/");return r>=0?(a=t[0])!=null&&a.startsWith("/")&&!s.startsWith("/")?s="/"+s:(l=t[0])!=null&&l.startsWith("./")&&!s.startsWith("./")&&(s="./"+s):s="../".repeat(-1*r)+s,(c=t[t.length-1])!=null&&c.endsWith("/")&&!s.endsWith("/")&&(s+="/"),s}function Xy(n,e,t={}){return t.trailingSlash||(n=Uu(n),e=Uu(e)),t.leadingSlash||(n=ip(n),e=ip(e)),t.encoding||(n=Ml(n),e=Ml(e)),n===e}const Mg=Symbol.for("ufo:protocolRelative");function qy(n="",e){const t=n.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);if(t){const[,f,h=""]=t;return{protocol:f.toLowerCase(),pathname:h,href:f+h,auth:"",host:"",search:"",hash:""}}if(!co(n,{acceptRelative:!0}))return rp(n);const[,i="",r,s=""]=n.replace(/\\/g,"/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/)||[];let[,o="",a=""]=s.match(/([^#/?]*)(.*)?/)||[];i==="file:"&&(a=a.replace(/\/(?=[A-Za-z]:)/,""));const{pathname:l,search:c,hash:u}=rp(a);return{protocol:i.toLowerCase(),auth:r?r.slice(0,Math.max(0,r.length-1)):"",host:o,pathname:l,search:c,hash:u,[Mg]:!i}}function rp(n=""){const[e="",t="",i=""]=(n.match(/([^#?]*)(\?[^#]*)?(#.*)?/)||[]).splice(1);return{pathname:e,search:t,hash:i}}function bg(n){const e=n.pathname||"",t=n.search?(n.search.startsWith("?")?"":"?")+n.search:"",i=n.hash||"",r=n.auth?n.auth+"@":"",s=n.host||"";return(n.protocol||n[Mg]?(n.protocol||"")+"//":"")+r+s+e+t+i}class Yy extends Error{constructor(e,t){super(e,t),this.name="FetchError",t!=null&&t.cause&&!this.cause&&(this.cause=t.cause)}}function $y(n){var l,c,u,f,h;const e=((l=n.error)==null?void 0:l.message)||((c=n.error)==null?void 0:c.toString())||"",t=((u=n.request)==null?void 0:u.method)||((f=n.options)==null?void 0:f.method)||"GET",i=((h=n.request)==null?void 0:h.url)||String(n.request)||"/",r=`[${t}] ${JSON.stringify(i)}`,s=n.response?`${n.response.status} ${n.response.statusText}`:"<no response>",o=`${r}: ${s}${e?` ${e}`:""}`,a=new Yy(o,n.error?{cause:n.error}:void 0);for(const d of["request","options","response"])Object.defineProperty(a,d,{get(){return n[d]}});for(const[d,p]of[["data","_data"],["status","status"],["statusCode","status"],["statusText","statusText"],["statusMessage","statusText"]])Object.defineProperty(a,d,{get(){return n.response&&n.response[p]}});return a}const jy=new Set(Object.freeze(["PATCH","POST","PUT","DELETE"]));function sp(n="GET"){return jy.has(n.toUpperCase())}function Ky(n){if(n===void 0)return!1;const e=typeof n;return e==="string"||e==="number"||e==="boolean"||e===null?!0:e!=="object"?!1:Array.isArray(n)?!0:n.buffer||n instanceof FormData||n instanceof URLSearchParams?!1:n.constructor&&n.constructor.name==="Object"||typeof n.toJSON=="function"}const Zy=new Set(["image/svg","application/xml","application/xhtml","application/html"]),Jy=/^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;function Qy(n=""){if(!n)return"json";const e=n.split(";").shift()||"";return Jy.test(e)?"json":e==="text/event-stream"?"stream":Zy.has(e)||e.startsWith("text/")?"text":"blob"}function eM(n,e,t,i){const r=tM((e==null?void 0:e.headers)??(n==null?void 0:n.headers),t==null?void 0:t.headers,i);let s;return(t!=null&&t.query||t!=null&&t.params||e!=null&&e.params||e!=null&&e.query)&&(s={...t==null?void 0:t.params,...t==null?void 0:t.query,...e==null?void 0:e.params,...e==null?void 0:e.query}),{...t,...e,query:s,params:s,headers:r}}function tM(n,e,t){if(!e)return new t(n);const i=new t(e);if(n)for(const[r,s]of Symbol.iterator in n||Array.isArray(n)?n:new t(n))i.set(r,s);return i}async function wa(n,e){if(e)if(Array.isArray(e))for(const t of e)await t(n);else await e(n)}const nM=new Set([408,409,425,429,500,502,503,504]),iM=new Set([101,204,205,304]);function Eg(n={}){const{fetch:e=globalThis.fetch,Headers:t=globalThis.Headers,AbortController:i=globalThis.AbortController}=n;async function r(a){const l=a.error&&a.error.name==="AbortError"&&!a.options.timeout||!1;if(a.options.retry!==!1&&!l){let u;typeof a.options.retry=="number"?u=a.options.retry:u=sp(a.options.method)?0:1;const f=a.response&&a.response.status||500;if(u>0&&(Array.isArray(a.options.retryStatusCodes)?a.options.retryStatusCodes.includes(f):nM.has(f))){const h=typeof a.options.retryDelay=="function"?a.options.retryDelay(a):a.options.retryDelay||0;return h>0&&await new Promise(d=>setTimeout(d,h)),s(a.request,{...a.options,retry:u-1})}}const c=$y(a);throw Error.captureStackTrace&&Error.captureStackTrace(c,s),c}const s=async function(l,c={}){const u={request:l,options:eM(l,c,n.defaults,t),response:void 0,error:void 0};if(u.options.method&&(u.options.method=u.options.method.toUpperCase()),u.options.onRequest&&(await wa(u,u.options.onRequest),u.options.headers instanceof t||(u.options.headers=new t(u.options.headers||{}))),typeof u.request=="string"&&(u.options.baseURL&&(u.request=Vy(u.request,u.options.baseURL)),u.options.query&&(u.request=xg(u.request,u.options.query),delete u.options.query),"query"in u.options&&delete u.options.query,"params"in u.options&&delete u.options.params),u.options.body&&sp(u.options.method))if(Ky(u.options.body)){const d=u.options.headers.get("content-type");typeof u.options.body!="string"&&(u.options.body=d==="application/x-www-form-urlencoded"?new URLSearchParams(u.options.body).toString():JSON.stringify(u.options.body)),d||u.options.headers.set("content-type","application/json"),u.options.headers.has("accept")||u.options.headers.set("accept","application/json")}else("pipeTo"in u.options.body&&typeof u.options.body.pipeTo=="function"||typeof u.options.body.pipe=="function")&&("duplex"in u.options||(u.options.duplex="half"));let f;if(!u.options.signal&&u.options.timeout){const d=new i;f=setTimeout(()=>{const p=new Error("[TimeoutError]: The operation was aborted due to timeout");p.name="TimeoutError",p.code=23,d.abort(p)},u.options.timeout),u.options.signal=d.signal}try{u.response=await e(u.request,u.options)}catch(d){return u.error=d,u.options.onRequestError&&await wa(u,u.options.onRequestError),await r(u)}finally{f&&clearTimeout(f)}if((u.response.body||u.response._bodyInit)&&!iM.has(u.response.status)&&u.options.method!=="HEAD"){const d=(u.options.parseResponse?"json":u.options.responseType)||Qy(u.response.headers.get("content-type")||"");switch(d){case"json":{const p=await u.response.text(),_=u.options.parseResponse||yl;u.response._data=_(p);break}case"stream":{u.response._data=u.response.body||u.response._bodyInit;break}default:u.response._data=await u.response[d]()}}return u.options.onResponse&&await wa(u,u.options.onResponse),!u.options.ignoreResponseError&&u.response.status>=400&&u.response.status<600?(u.options.onResponseError&&await wa(u,u.options.onResponseError),await r(u)):u.response},o=async function(l,c){return(await s(l,c))._data};return o.raw=s,o.native=(...a)=>e(...a),o.create=(a={},l={})=>Eg({...n,...l,defaults:{...n.defaults,...l.defaults,...a}}),o}const bl=function(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}(),rM=bl.fetch?(...n)=>bl.fetch(...n):()=>Promise.reject(new Error("[ofetch] global.fetch is not supported!")),sM=bl.Headers,oM=bl.AbortController,aM=Eg({fetch:rM,Headers:sM,AbortController:oM}),lM=aM,cM=()=>{var n;return((n=window==null?void 0:window.__NUXT__)==null?void 0:n.config)||{}},El=cM().app,uM=()=>El.baseURL,fM=()=>El.buildAssetsDir,yh=(...n)=>yg(Tg(),fM(),...n),Tg=(...n)=>{const e=El.cdnURL||El.baseURL;return n.length?yg(e,...n):e};globalThis.__buildAssetsURL=yh,globalThis.__publicAssetsURL=Tg;globalThis.$fetch||(globalThis.$fetch=lM.create({baseURL:uM()}));function Nu(n,e={},t){for(const i in n){const r=n[i],s=t?`${t}:${i}`:i;typeof r=="object"&&r!==null?Nu(r,e,s):typeof r=="function"&&(e[s]=r)}return e}const hM={run:n=>n()},dM=()=>hM,Ag=typeof console.createTask<"u"?console.createTask:dM;function pM(n,e){const t=e.shift(),i=Ag(t);return n.reduce((r,s)=>r.then(()=>i.run(()=>s(...e))),Promise.resolve())}function mM(n,e){const t=e.shift(),i=Ag(t);return Promise.all(n.map(r=>i.run(()=>r(...e))))}function Ac(n,e){for(const t of[...n])t(e)}class _M{constructor(){this._hooks={},this._before=void 0,this._after=void 0,this._deprecatedMessages=void 0,this._deprecatedHooks={},this.hook=this.hook.bind(this),this.callHook=this.callHook.bind(this),this.callHookWith=this.callHookWith.bind(this)}hook(e,t,i={}){if(!e||typeof t!="function")return()=>{};const r=e;let s;for(;this._deprecatedHooks[e];)s=this._deprecatedHooks[e],e=s.to;if(s&&!i.allowDeprecated){let o=s.message;o||(o=`${r} hook has been deprecated`+(s.to?`, please use ${s.to}`:"")),this._deprecatedMessages||(this._deprecatedMessages=new Set),this._deprecatedMessages.has(o)||(console.warn(o),this._deprecatedMessages.add(o))}if(!t.name)try{Object.defineProperty(t,"name",{get:()=>"_"+e.replace(/\W+/g,"_")+"_hook_cb",configurable:!0})}catch{}return this._hooks[e]=this._hooks[e]||[],this._hooks[e].push(t),()=>{t&&(this.removeHook(e,t),t=void 0)}}hookOnce(e,t){let i,r=(...s)=>(typeof i=="function"&&i(),i=void 0,r=void 0,t(...s));return i=this.hook(e,r),i}removeHook(e,t){if(this._hooks[e]){const i=this._hooks[e].indexOf(t);i!==-1&&this._hooks[e].splice(i,1),this._hooks[e].length===0&&delete this._hooks[e]}}deprecateHook(e,t){this._deprecatedHooks[e]=typeof t=="string"?{to:t}:t;const i=this._hooks[e]||[];delete this._hooks[e];for(const r of i)this.hook(e,r)}deprecateHooks(e){Object.assign(this._deprecatedHooks,e);for(const t in e)this.deprecateHook(t,e[t])}addHooks(e){const t=Nu(e),i=Object.keys(t).map(r=>this.hook(r,t[r]));return()=>{for(const r of i.splice(0,i.length))r()}}removeHooks(e){const t=Nu(e);for(const i in t)this.removeHook(i,t[i])}removeAllHooks(){for(const e in this._hooks)delete this._hooks[e]}callHook(e,...t){return t.unshift(e),this.callHookWith(pM,e,...t)}callHookParallel(e,...t){return t.unshift(e),this.callHookWith(mM,e,...t)}callHookWith(e,t,...i){const r=this._before||this._after?{name:t,args:i,context:{}}:void 0;this._before&&Ac(this._before,r);const s=e(t in this._hooks?[...this._hooks[t]]:[],i);return s instanceof Promise?s.finally(()=>{this._after&&r&&Ac(this._after,r)}):(this._after&&r&&Ac(this._after,r),s)}beforeEach(e){return this._before=this._before||[],this._before.push(e),()=>{if(this._before!==void 0){const t=this._before.indexOf(e);t!==-1&&this._before.splice(t,1)}}}afterEach(e){return this._after=this._after||[],this._after.push(e),()=>{if(this._after!==void 0){const t=this._after.indexOf(e);t!==-1&&this._after.splice(t,1)}}}}function wg(){return new _M}function gM(n={}){let e,t=!1;const i=o=>{if(e&&e!==o)throw new Error("Context conflict")};let r;if(n.asyncContext){const o=n.AsyncLocalStorage||globalThis.AsyncLocalStorage;o?r=new o:console.warn("[unctx] `AsyncLocalStorage` is not provided.")}const s=()=>{if(r){const o=r.getStore();if(o!==void 0)return o}return e};return{use:()=>{const o=s();if(o===void 0)throw new Error("Context is not available");return o},tryUse:()=>s(),set:(o,a)=>{a||i(o),e=o,t=!0},unset:()=>{e=void 0,t=!1},call:(o,a)=>{i(o),e=o;try{return r?r.run(o,a):a()}finally{t||(e=void 0)}},async callAsync(o,a){e=o;const l=()=>{e=o},c=()=>e===o?l:void 0;Fu.add(c);try{const u=r?r.run(o,a):a();return t||(e=void 0),await u}finally{Fu.delete(c)}}}}function vM(n={}){const e={};return{get(t,i={}){return e[t]||(e[t]=gM({...n,...i})),e[t]}}}const Tl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof global<"u"?global:typeof window<"u"?window:{},op="__unctx__",xM=Tl[op]||(Tl[op]=vM()),SM=(n,e={})=>xM.get(n,e),ap="__unctx_async_handlers__",Fu=Tl[ap]||(Tl[ap]=new Set);function Rg(n){const e=[];for(const r of Fu){const s=r();s&&e.push(s)}const t=()=>{for(const r of e)r()};let i=n();return i&&typeof i=="object"&&"catch"in i&&(i=i.catch(r=>{throw t(),r})),[i,t]}const A3={componentName:"NuxtLink",prefetch:!0,prefetchOn:{visibility:!0}},yM=null,MM="#__nuxt",Cg="nuxt-app",lp=36e5,bM="vite:preloadError";function Pg(n=Cg){return SM(n,{asyncContext:!1})}const EM="__nuxt_plugin";function TM(n){var r;let e=0;const t={_id:n.id||Cg||"nuxt-app",_scope:Kv(),provide:void 0,globalName:"nuxt",versions:{get nuxt(){return"3.13.2"},get vue(){return t.vueApp.version}},payload:Ds({...((r=n.ssrContext)==null?void 0:r.payload)||{},data:Ds({}),state:Mr({}),once:new Set,_errors:Ds({})}),static:{data:{}},runWithContext(s){return t._scope.active&&!Qm()?t._scope.run(()=>cp(t,s)):cp(t,s)},isHydrating:!0,deferHydration(){if(!t.isHydrating)return()=>{};e++;let s=!1;return()=>{if(!s&&(s=!0,e--,e===0))return t.isHydrating=!1,t.callHook("app:suspense:resolve")}},_asyncDataPromises:{},_asyncData:Ds({}),_payloadRevivers:{},...n};{const s=window.__NUXT__;if(s)for(const o in s)switch(o){case"data":case"state":case"_errors":Object.assign(t.payload[o],s[o]);break;default:t.payload[o]=s[o]}}t.hooks=wg(),t.hook=t.hooks.hook,t.callHook=t.hooks.callHook,t.provide=(s,o)=>{const a="$"+s;Ra(t,a,o),Ra(t.vueApp.config.globalProperties,a,o)},Ra(t.vueApp,"$nuxt",t),Ra(t.vueApp.config.globalProperties,"$nuxt",t);{window.addEventListener(bM,o=>{t.callHook("app:chunkError",{error:o.payload}),(t.isHydrating||o.payload.message.includes("Unable to preload CSS"))&&o.preventDefault()}),window.useNuxtApp=window.useNuxtApp||Jt;const s=t.hook("app:error",(...o)=>{console.error("[nuxt] error caught during app initialization",...o)});t.hook("app:mounted",s)}const i=t.payload.config;return t.provide("config",i),t}function AM(n,e){e.hooks&&n.hooks.addHooks(e.hooks)}async function wM(n,e){if(typeof e=="function"){const{provide:t}=await n.runWithContext(()=>e(n))||{};if(t&&typeof t=="object")for(const i in t)n.provide(i,t[i])}}async function RM(n,e){const t=[],i=[],r=[],s=[];let o=0;async function a(l){var u;const c=((u=l.dependsOn)==null?void 0:u.filter(f=>e.some(h=>h._name===f)&&!t.includes(f)))??[];if(c.length>0)i.push([new Set(c),l]);else{const f=wM(n,l).then(async()=>{l._name&&(t.push(l._name),await Promise.all(i.map(async([h,d])=>{h.has(l._name)&&(h.delete(l._name),h.size===0&&(o++,await a(d)))})))});l.parallel?r.push(f.catch(h=>s.push(h))):await f}}for(const l of e)AM(n,l);for(const l of e)await a(l);if(await Promise.all(r),o)for(let l=0;l<o;l++)await Promise.all(r);if(s.length)throw s[0]}function Rr(n){if(typeof n=="function")return n;const e=n._name||n.name;return delete n.name,Object.assign(n.setup||(()=>{}),n,{[EM]:!0,_name:e})}function cp(n,e,t){const i=()=>e();return Pg(n._id).set(n),n.vueApp.runWithContext(i)}function CM(n){var t;let e;return y_()&&(e=(t=Ql())==null?void 0:t.appContext.app.$nuxt),e=e||Pg(n).tryUse(),e||null}function Jt(n){const e=CM(n);if(!e)throw new Error("[nuxt] instance unavailable");return e}function jo(n){return Jt().$config}function Ra(n,e,t){Object.defineProperty(n,e,{get:()=>t})}function PM(n,e){return{ctx:{table:n},matchAll:t=>Dg(t,n)}}function Lg(n){const e={};for(const t in n)e[t]=t==="dynamic"?new Map(Object.entries(n[t]).map(([i,r])=>[i,Lg(r)])):new Map(Object.entries(n[t]));return e}function LM(n){return PM(Lg(n))}function Dg(n,e,t){n.endsWith("/")&&(n=n.slice(0,-1)||"/");const i=[];for(const[s,o]of up(e.wildcard))(n===s||n.startsWith(s+"/"))&&i.push(o);for(const[s,o]of up(e.dynamic))if(n.startsWith(s+"/")){const a="/"+n.slice(s.length).split("/").splice(2).join("/");i.push(...Dg(a,o))}const r=e.static.get(n);return r&&i.push(r),i.filter(Boolean)}function up(n){return[...n.entries()].sort((e,t)=>e[0].length-t[0].length)}function wc(n){if(n===null||typeof n!="object")return!1;const e=Object.getPrototypeOf(n);return e!==null&&e!==Object.prototype&&Object.getPrototypeOf(e)!==null||Symbol.iterator in n?!1:Symbol.toStringTag in n?Object.prototype.toString.call(n)==="[object Module]":!0}function Ou(n,e,t=".",i){if(!wc(e))return Ou(n,{},t,i);const r={...e};for(const s of Object.keys(n)){if(s==="__proto__"||s==="constructor")continue;const o=n[s];o!=null&&(i&&i(r,s,o,t)||(Array.isArray(o)&&Array.isArray(r[s])?r[s]=[...o,...r[s]]:wc(o)&&wc(r[s])?r[s]=Ou(o,r[s],(t?`${t}.`:"")+s.toString(),i):r[s]=o))}return r}function DM(n){return(...e)=>e.reduce((t,i)=>Ou(t,i,"",n),{})}const IM=DM();function UM(n,e){try{return e in n}catch{return!1}}class Bu extends Error{constructor(t,i={}){super(t,i);rr(this,"statusCode",500);rr(this,"fatal",!1);rr(this,"unhandled",!1);rr(this,"statusMessage");rr(this,"data");rr(this,"cause");i.cause&&!this.cause&&(this.cause=i.cause)}toJSON(){const t={message:this.message,statusCode:ku(this.statusCode,500)};return this.statusMessage&&(t.statusMessage=Ig(this.statusMessage)),this.data!==void 0&&(t.data=this.data),t}}rr(Bu,"__h3_error__",!0);function NM(n){if(typeof n=="string")return new Bu(n);if(FM(n))return n;const e=new Bu(n.message??n.statusMessage??"",{cause:n.cause||n});if(UM(n,"stack"))try{Object.defineProperty(e,"stack",{get(){return n.stack}})}catch{try{e.stack=n.stack}catch{}}if(n.data&&(e.data=n.data),n.statusCode?e.statusCode=ku(n.statusCode,e.statusCode):n.status&&(e.statusCode=ku(n.status,e.statusCode)),n.statusMessage?e.statusMessage=n.statusMessage:n.statusText&&(e.statusMessage=n.statusText),e.statusMessage){const t=e.statusMessage;Ig(e.statusMessage)!==t&&console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.")}return n.fatal!==void 0&&(e.fatal=n.fatal),n.unhandled!==void 0&&(e.unhandled=n.unhandled),e}function FM(n){var e;return((e=n==null?void 0:n.constructor)==null?void 0:e.__h3_error__)===!0}const OM=/[^\u0009\u0020-\u007E]/g;function Ig(n=""){return n.replace(OM,"")}function ku(n,e=200){return!n||(typeof n=="string"&&(n=Number.parseInt(n,10)),n<100||n>999)?e:n}const Ug=Symbol("route"),rs=()=>{var n;return(n=Jt())==null?void 0:n.$router},Ng=()=>y_()?Hs(Ug,Jt()._route):Jt()._route;const BM=()=>{try{if(Jt()._processingMiddleware)return!0}catch{return!1}return!1},kM=(n,e)=>{n||(n="/");const t=typeof n=="string"?n:"path"in n?HM(n):rs().resolve(n).href;if(e!=null&&e.open){const{target:l="_blank",windowFeatures:c={}}=e.open,u=Object.entries(c).filter(([f,h])=>h!==void 0).map(([f,h])=>`${f.toLowerCase()}=${h}`).join(", ");return open(t,l,u),Promise.resolve()}const i=co(t,{acceptRelative:!0}),r=(e==null?void 0:e.external)||i;if(r){if(!(e!=null&&e.external))throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");const{protocol:l}=new URL(t,window.location.href);if(l&&Hy(l))throw new Error(`Cannot navigate to a URL with '${l}' protocol.`)}const s=BM();if(!r&&s)return n;const o=rs(),a=Jt();return r?(a._scope.stop(),e!=null&&e.replace?location.replace(t):location.href=t,s?a.isHydrating?new Promise(()=>{}):!1:Promise.resolve()):e!=null&&e.replace?o.replace(n):o.push(n)};function HM(n){return xg(n.path||"",n.query||{})+(n.hash||"")}const Fg="__nuxt_error",Mh=()=>yx(Jt().payload,"error"),zM=n=>{const e=bh(n);try{const t=Jt(),i=Mh();t.hooks.callHook("app:error",e),i.value=i.value||e}catch{throw e}return e},VM=async(n={})=>{const e=Jt(),t=Mh();e.callHook("app:error:cleared",n),n.redirect&&await rs().replace(n.redirect),t.value=yM},GM=n=>!!n&&typeof n=="object"&&Fg in n,bh=n=>{const e=NM(n);return Object.defineProperty(e,Fg,{value:!0,configurable:!1,writable:!1}),e},WM=-1,XM=-2,qM=-3,YM=-4,$M=-5,jM=-6,KM=-7,Og=2**32-1,Hu=Og-1;function ZM(n){return!(!Number.isInteger(n)||n<0||n>Hu)}function JM(n){return!(!Number.isInteger(n)||n<0||n>Og)}function QM(n){return Uint8Array.fromBase64(n).buffer}function eb(n){return Uint8Array.from(Buffer.from(n,"base64")).buffer}function tb(n){const e=atob(n),t=e.length,i=new Uint8Array(t);for(let r=0;r<t;r++)i[r]=e.charCodeAt(r);return i.buffer}const nb=typeof Uint8Array.fromBase64=="function";var zm;const ib=typeof process=="object"&&((zm=process.versions)==null?void 0:zm.node)!==void 0,rb=nb?QM:ib?eb:tb;function sb(n,e){return ob(JSON.parse(n),e)}function ob(n,e){if(typeof n=="number")return s(n,!0);if(!Array.isArray(n)||n.length===0)throw new Error("Invalid input");const t=n,i=Array(t.length);let r=null;function s(o,a=!1){if(o===WM)return;if(o===qM)return NaN;if(o===YM)return 1/0;if(o===$M)return-1/0;if(o===jM)return-0;if(a||typeof o!="number")throw new Error("Invalid input");if(o in i)return i[o];const l=t[o];if(!l||typeof l!="object")i[o]=l;else if(Array.isArray(l))if(typeof l[0]=="string"){const c=l[0],u=e&&Object.hasOwn(e,c)?e[c]:void 0;if(u){let f=l[1];if(typeof f!="number"&&(f=t.push(l[1])-1),r??(r=new Set),r.has(f))throw new Error("Invalid circular reference");return r.add(f),i[o]=u(s(f)),r.delete(f),i[o]}switch(c){case"Date":i[o]=new Date(l[1]);break;case"Set":const f=new Set;i[o]=f;for(let p=1;p<l.length;p+=1)f.add(s(l[p]));break;case"Map":const h=new Map;i[o]=h;for(let p=1;p<l.length;p+=2)h.set(s(l[p]),s(l[p+1]));break;case"RegExp":i[o]=new RegExp(l[1],l[2]);break;case"Object":{const p=l[1];if(typeof t[p]=="object"&&t[p][0]!=="BigInt")throw new Error("Invalid input");i[o]=Object(s(p));break}case"BigInt":i[o]=BigInt(l[1]);break;case"null":const d=Object.create(null);i[o]=d;for(let p=1;p<l.length;p+=2){if(l[p]==="__proto__")throw new Error("Cannot parse an object with a `__proto__` property");d[l[p]]=s(l[p+1])}break;case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Float16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"BigInt64Array":case"BigUint64Array":case"DataView":{if(t[l[1]][0]!=="ArrayBuffer")throw new Error("Invalid data");const p=globalThis[c],_=s(l[1]);i[o]=l[2]!==void 0?new p(_,l[2],l[3]):new p(_);break}case"ArrayBuffer":{const p=l[1];if(typeof p!="string")throw new Error("Invalid ArrayBuffer encoding");const _=rb(p);i[o]=_;break}case"Temporal.Duration":case"Temporal.Instant":case"Temporal.PlainDate":case"Temporal.PlainTime":case"Temporal.PlainDateTime":case"Temporal.PlainMonthDay":case"Temporal.PlainYearMonth":case"Temporal.ZonedDateTime":{const p=c.slice(9);i[o]=Temporal[p].from(l[1]);break}case"URL":{const p=new URL(l[1]);i[o]=p;break}case"URLSearchParams":{const p=new URLSearchParams(l[1]);i[o]=p;break}default:throw new Error(`Unknown type ${c}`)}}else if(l[0]===KM){const c=l[1];if(!JM(c))throw new Error("Invalid input");const u=[];i[o]=u,u[Hu]=void 0,delete u[Hu];for(let f=2;f<l.length;f+=2){const h=l[f];if(!ZM(h)||h>=c)throw new Error("Invalid input");u[h]=s(l[f+1])}u.length=c}else{const c=new Array(l.length);i[o]=c;for(let u=0;u<l.length;u+=1){const f=l[u];f!==XM&&(c[u]=s(f))}}else{const c={};i[o]=c;for(const u of Object.keys(l)){if(u==="__proto__")throw new Error("Cannot parse an object with a `__proto__` property");const f=l[u];c[u]=s(f)}}return i[o]}return s(0)}const ab=new Set(["title","titleTemplate","script","style","noscript"]),el=new Set(["base","meta","link","style","script","noscript"]),lb=new Set(["title","titleTemplate","templateParams","base","htmlAttrs","bodyAttrs","meta","link","style","script","noscript"]),cb=new Set(["base","title","titleTemplate","bodyAttrs","htmlAttrs","templateParams"]),Bg=new Set(["tagPosition","tagPriority","tagDuplicateStrategy","children","innerHTML","textContent","processTemplateParams"]),ub=typeof window<"u";function Al(n){let e=9;for(let t=0;t<n.length;)e=Math.imul(e^n.charCodeAt(t++),9**9);return((e^e>>>9)+65536).toString(16).substring(1,8).toLowerCase()}function zu(n){if(n._h)return n._h;if(n._d)return Al(n._d);let e=`${n.tag}:${n.textContent||n.innerHTML||""}:`;for(const t in n.props)e+=`${t}:${String(n.props[t])},`;return Al(e)}function fb(n,e){return n instanceof Promise?n.then(e):e(n)}function Vu(n,e,t,i){const r=i||Hg(typeof e=="object"&&typeof e!="function"&&!(e instanceof Promise)?{...e}:{[n==="script"||n==="noscript"||n==="style"?"innerHTML":"textContent"]:e},n==="templateParams"||n==="titleTemplate");if(r instanceof Promise)return r.then(o=>Vu(n,e,t,o));const s={tag:n,props:r};for(const o of Bg){const a=s.props[o]!==void 0?s.props[o]:t[o];a!==void 0&&((!(o==="innerHTML"||o==="textContent"||o==="children")||ab.has(s.tag))&&(s[o==="children"?"innerHTML":o]=a),delete s.props[o])}return s.props.body&&(s.tagPosition="bodyClose",delete s.props.body),s.tag==="script"&&typeof s.innerHTML=="object"&&(s.innerHTML=JSON.stringify(s.innerHTML),s.props.type=s.props.type||"application/json"),Array.isArray(s.props.content)?s.props.content.map(o=>({...s,props:{...s.props,content:o}})):s}function hb(n,e){var i;const t=n==="class"?" ":";";return e&&typeof e=="object"&&!Array.isArray(e)&&(e=Object.entries(e).filter(([,r])=>r).map(([r,s])=>n==="style"?`${r}:${s}`:r)),(i=String(Array.isArray(e)?e.join(t):e))==null?void 0:i.split(t).filter(r=>!!r.trim()).join(t)}function kg(n,e,t,i){for(let r=i;r<t.length;r+=1){const s=t[r];if(s==="class"||s==="style"){n[s]=hb(s,n[s]);continue}if(n[s]instanceof Promise)return n[s].then(o=>(n[s]=o,kg(n,e,t,r)));if(!e&&!Bg.has(s)){const o=String(n[s]),a=s.startsWith("data-");o==="true"||o===""?n[s]=a?"true":!0:n[s]||(a&&o==="false"?n[s]="false":delete n[s])}}}function Hg(n,e=!1){const t=kg(n,e,Object.keys(n),0);return t instanceof Promise?t.then(()=>n):n}const db=10;function zg(n,e,t){for(let i=t;i<e.length;i+=1){const r=e[i];if(r instanceof Promise)return r.then(s=>(e[i]=s,zg(n,e,i)));Array.isArray(r)?n.push(...r):n.push(r)}}function pb(n){const e=[],t=n.resolvedInput;for(const r in t){if(!Object.prototype.hasOwnProperty.call(t,r))continue;const s=t[r];if(!(s===void 0||!lb.has(r))){if(Array.isArray(s)){for(const o of s)e.push(Vu(r,o,n));continue}e.push(Vu(r,s,n))}}if(e.length===0)return[];const i=[];return fb(zg(i,e,0),()=>i.map((r,s)=>(r._e=n._i,n.mode&&(r._m=n.mode),r._p=(n._i<<db)+s,r)))}const fp=new Set(["onload","onerror","onabort","onprogress","onloadstart"]),hp={base:-10,title:10},dp={critical:-80,high:-10,low:20};function wl(n){const e=n.tagPriority;if(typeof e=="number")return e;let t=100;return n.tag==="meta"?n.props["http-equiv"]==="content-security-policy"?t=-30:n.props.charset?t=-20:n.props.name==="viewport"&&(t=-15):n.tag==="link"&&n.props.rel==="preconnect"?t=20:n.tag in hp&&(t=hp[n.tag]),e&&e in dp?t+dp[e]:t}const mb=[{prefix:"before:",offset:-1},{prefix:"after:",offset:1}],_b=["name","property","http-equiv"];function Vg(n){const{props:e,tag:t}=n;if(cb.has(t))return t;if(t==="link"&&e.rel==="canonical")return"canonical";if(e.charset)return"charset";if(e.id)return`${t}:id:${e.id}`;for(const i of _b)if(e[i]!==void 0)return`${t}:${i}:${e[i]}`;return!1}const dr="%separator";function gb(n,e,t=!1){var r;let i;if(e==="s"||e==="pageTitle")i=n.pageTitle;else if(e.includes(".")){const s=e.indexOf(".");i=(r=n[e.substring(0,s)])==null?void 0:r[e.substring(s+1)]}else i=n[e];if(i!==void 0)return t?(i||"").replace(/"/g,'\\"'):i||""}const vb=new RegExp(`${dr}(?:\\s*${dr})*`,"g");function Ca(n,e,t,i=!1){if(typeof n!="string"||!n.includes("%"))return n;let r=n;try{r=decodeURI(n)}catch{}const s=r.match(/%\w+(?:\.\w+)?/g);if(!s)return n;const o=n.includes(dr);return n=n.replace(/%\w+(?:\.\w+)?/g,a=>{if(a===dr||!s.includes(a))return a;const l=gb(e,a.slice(1),i);return l!==void 0?l:a}).trim(),o&&(n.endsWith(dr)&&(n=n.slice(0,-dr.length)),n.startsWith(dr)&&(n=n.slice(dr.length)),n=n.replace(vb,t).trim()),n}function pp(n,e){return n==null?e||null:typeof n=="function"?n(e):n}async function Gg(n,e={}){const t=e.document||n.resolvedOptions.document;if(!t||!n.dirty)return;const i={shouldRender:!0,tags:[]};if(await n.hooks.callHook("dom:beforeRender",i),!!i.shouldRender)return n._domUpdatePromise||(n._domUpdatePromise=new Promise(async r=>{var f;const s=(await n.resolveTags()).map(h=>({tag:h,id:el.has(h.tag)?zu(h):h.tag,shouldRender:!0}));let o=n._dom;if(!o){o={elMap:{htmlAttrs:t.documentElement,bodyAttrs:t.body}};const h=new Set;for(const d of["body","head"]){const p=(f=t[d])==null?void 0:f.children;for(const _ of p){const m=_.tagName.toLowerCase();if(!el.has(m))continue;const g={tag:m,props:await Hg(_.getAttributeNames().reduce((E,T)=>({...E,[T]:_.getAttribute(T)}),{})),innerHTML:_.innerHTML},y=Vg(g);let v=y,S=1;for(;v&&h.has(v);)v=`${y}:${S++}`;v&&(g._d=v,h.add(v)),o.elMap[_.getAttribute("data-hid")||zu(g)]=_}}}o.pendingSideEffects={...o.sideEffects},o.sideEffects={};function a(h,d,p){const _=`${h}:${d}`;o.sideEffects[_]=p,delete o.pendingSideEffects[_]}function l({id:h,$el:d,tag:p}){const _=p.tag.endsWith("Attrs");if(o.elMap[h]=d,_||(p.textContent&&p.textContent!==d.textContent&&(d.textContent=p.textContent),p.innerHTML&&p.innerHTML!==d.innerHTML&&(d.innerHTML=p.innerHTML),a(h,"el",()=>{var m;(m=o.elMap[h])==null||m.remove(),delete o.elMap[h]})),p._eventHandlers)for(const m in p._eventHandlers)Object.prototype.hasOwnProperty.call(p._eventHandlers,m)&&d.getAttribute(`data-${m}`)!==""&&((p.tag==="bodyAttrs"?t.defaultView:d).addEventListener(m.substring(2),p._eventHandlers[m].bind(d)),d.setAttribute(`data-${m}`,""));for(const m in p.props){if(!Object.prototype.hasOwnProperty.call(p.props,m))continue;const g=p.props[m],y=`attr:${m}`;if(m==="class"){if(!g)continue;for(const v of g.split(" "))_&&a(h,`${y}:${v}`,()=>d.classList.remove(v)),!d.classList.contains(v)&&d.classList.add(v)}else if(m==="style"){if(!g)continue;for(const v of g.split(";")){const S=v.indexOf(":"),E=v.substring(0,S).trim(),T=v.substring(S+1).trim();a(h,`${y}:${E}`,()=>{d.style.removeProperty(E)}),d.style.setProperty(E,T)}}else d.getAttribute(m)!==g&&d.setAttribute(m,g===!0?"":String(g)),_&&a(h,y,()=>d.removeAttribute(m))}}const c=[],u={bodyClose:void 0,bodyOpen:void 0,head:void 0};for(const h of s){const{tag:d,shouldRender:p,id:_}=h;if(p){if(d.tag==="title"){t.title=d.textContent;continue}h.$el=h.$el||o.elMap[_],h.$el?l(h):el.has(d.tag)&&c.push(h)}}for(const h of c){const d=h.tag.tagPosition||"head";h.$el=t.createElement(h.tag.tag),l(h),u[d]=u[d]||t.createDocumentFragment(),u[d].appendChild(h.$el)}for(const h of s)await n.hooks.callHook("dom:renderTag",h,t,a);u.head&&t.head.appendChild(u.head),u.bodyOpen&&t.body.insertBefore(u.bodyOpen,t.body.firstChild),u.bodyClose&&t.body.appendChild(u.bodyClose);for(const h in o.pendingSideEffects)o.pendingSideEffects[h]();n._dom=o,await n.hooks.callHook("dom:rendered",{renders:s}),r()}).finally(()=>{n._domUpdatePromise=void 0,n.dirty=!1})),n._domUpdatePromise}function xb(n,e={}){const t=e.delayFn||(i=>setTimeout(i,10));return n._domDebouncedUpdatePromise=n._domDebouncedUpdatePromise||new Promise(i=>t(()=>Gg(n,e).then(()=>{delete n._domDebouncedUpdatePromise,i()})))}function Sb(n){return e=>{var i,r;const t=((r=(i=e.resolvedOptions.document)==null?void 0:i.head.querySelector('script[id="unhead:payload"]'))==null?void 0:r.innerHTML)||!1;return t&&e.push(JSON.parse(t)),{mode:"client",hooks:{"entries:updated":s=>{xb(s,n)}}}}}const yb=new Set(["templateParams","htmlAttrs","bodyAttrs"]),Mb={hooks:{"tag:normalise":({tag:n})=>{n.props.hid&&(n.key=n.props.hid,delete n.props.hid),n.props.vmid&&(n.key=n.props.vmid,delete n.props.vmid),n.props.key&&(n.key=n.props.key,delete n.props.key);const e=Vg(n);e&&!e.startsWith("meta:og:")&&!e.startsWith("meta:twitter:")&&delete n.key;const t=e||(n.key?`${n.tag}:${n.key}`:!1);t&&(n._d=t)},"tags:resolve":n=>{const e=Object.create(null);for(const i of n.tags){const r=(i.key?`${i.tag}:${i.key}`:i._d)||zu(i),s=e[r];if(s){let a=i==null?void 0:i.tagDuplicateStrategy;if(!a&&yb.has(i.tag)&&(a="merge"),a==="merge"){const l=s.props;l.style&&i.props.style&&(l.style[l.style.length-1]!==";"&&(l.style+=";"),i.props.style=`${l.style} ${i.props.style}`),l.class&&i.props.class?i.props.class=`${l.class} ${i.props.class}`:l.class&&(i.props.class=l.class),e[r].props={...l,...i.props};continue}else if(i._e===s._e){s._duped=s._duped||[],i._d=`${s._d}:${s._duped.length+1}`,s._duped.push(i);continue}else if(wl(i)>wl(s))continue}if(!(i.innerHTML||i.textContent||Object.keys(i.props).length!==0)&&el.has(i.tag)){delete e[r];continue}e[r]=i}const t=[];for(const i in e){const r=e[i],s=r._duped;t.push(r),s&&(delete r._duped,t.push(...s))}n.tags=t,n.tags=n.tags.filter(i=>!(i.tag==="meta"&&(i.props.name||i.props.property)&&!i.props.content))}}},bb=new Set(["script","link","bodyAttrs"]),Eb=n=>({hooks:{"tags:resolve":e=>{for(const t of e.tags){if(!bb.has(t.tag))continue;const i=t.props;for(const r in i){if(r[0]!=="o"||r[1]!=="n"||!Object.prototype.hasOwnProperty.call(i,r))continue;const s=i[r];typeof s=="function"&&(n.ssr&&fp.has(r)?i[r]=`this.dataset.${r}fired = true`:delete i[r],t._eventHandlers=t._eventHandlers||{},t._eventHandlers[r]=s)}n.ssr&&t._eventHandlers&&(t.props.src||t.props.href)&&(t.key=t.key||Al(t.props.src||t.props.href))}},"dom:renderTag":({$el:e,tag:t})=>{var r,s;const i=e==null?void 0:e.dataset;if(i)for(const o in i){if(!o.endsWith("fired"))continue;const a=o.slice(0,-5);fp.has(a)&&((s=(r=t._eventHandlers)==null?void 0:r[a])==null||s.call(e,new Event(a.substring(2))))}}}}),Tb=new Set(["link","style","script","noscript"]),Ab={hooks:{"tag:normalise":({tag:n})=>{n.key&&Tb.has(n.tag)&&(n.props["data-hid"]=n._h=Al(n.key))}}},wb={mode:"server",hooks:{"tags:beforeResolve":n=>{const e={};let t=!1;for(const i of n.tags)i._m!=="server"||i.tag!=="titleTemplate"&&i.tag!=="templateParams"&&i.tag!=="title"||(e[i.tag]=i.tag==="title"||i.tag==="titleTemplate"?i.textContent:i.props,t=!0);t&&n.tags.push({tag:"script",innerHTML:JSON.stringify(e),props:{id:"unhead:payload",type:"application/json"}})}}},Rb={hooks:{"tags:resolve":n=>{var e;for(const t of n.tags)if(typeof t.tagPriority=="string")for(const{prefix:i,offset:r}of mb){if(!t.tagPriority.startsWith(i))continue;const s=t.tagPriority.substring(i.length),o=(e=n.tags.find(a=>a._d===s))==null?void 0:e._p;if(o!==void 0){t._p=o+r;break}}n.tags.sort((t,i)=>{const r=wl(t),s=wl(i);return r<s?-1:r>s?1:t._p-i._p})}}},Cb={meta:"content",link:"href",htmlAttrs:"lang"},Pb=["innerHTML","textContent"],Lb=n=>({hooks:{"tags:resolve":e=>{var o;const{tags:t}=e;let i;for(let a=0;a<t.length;a+=1)t[a].tag==="templateParams"&&(i=e.tags.splice(a,1)[0].props,a-=1);const r=i||{},s=r.separator||"|";delete r.separator,r.pageTitle=Ca(r.pageTitle||((o=t.find(a=>a.tag==="title"))==null?void 0:o.textContent)||"",r,s);for(const a of t){if(a.processTemplateParams===!1)continue;const l=Cb[a.tag];if(l&&typeof a.props[l]=="string")a.props[l]=Ca(a.props[l],r,s);else if(a.processTemplateParams||a.tag==="titleTemplate"||a.tag==="title")for(const c of Pb)typeof a[c]=="string"&&(a[c]=Ca(a[c],r,s,a.tag==="script"&&a.props.type.endsWith("json")))}n._templateParams=r,n._separator=s},"tags:afterResolve":({tags:e})=>{let t;for(let i=0;i<e.length;i+=1){const r=e[i];r.tag==="title"&&r.processTemplateParams!==!1&&(t=r)}t!=null&&t.textContent&&(t.textContent=Ca(t.textContent,n._templateParams,n._separator))}}}),Db={hooks:{"tags:resolve":n=>{const{tags:e}=n;let t,i;for(let r=0;r<e.length;r+=1){const s=e[r];s.tag==="title"?t=s:s.tag==="titleTemplate"&&(i=s)}if(i&&t){const r=pp(i.textContent,t.textContent);r!==null?t.textContent=r||t.textContent:n.tags.splice(n.tags.indexOf(t),1)}else if(i){const r=pp(i.textContent);r!==null&&(i.textContent=r,i.tag="title",i=void 0)}i&&n.tags.splice(n.tags.indexOf(i),1)}}},Ib={hooks:{"tags:afterResolve":n=>{for(const e of n.tags)typeof e.innerHTML=="string"&&(e.innerHTML&&(e.props.type==="application/ld+json"||e.props.type==="application/json")?e.innerHTML=e.innerHTML.replace(/</g,"\\u003C"):e.innerHTML=e.innerHTML.replace(new RegExp(`</${e.tag}`,"g"),`<\\/${e.tag}`))}}};let Wg;function Ub(n={}){const e=Nb(n);return e.use(Sb()),Wg=e}function mp(n,e){return!n||n==="server"&&e||n==="client"&&!e}function Nb(n={}){const e=wg();e.addHooks(n.hooks||{}),n.document=n.document||(ub?document:void 0);const t=!n.document,i=()=>{a.dirty=!0,e.callHook("entries:updated",a)};let r=0,s=[];const o=[],a={plugins:o,dirty:!1,resolvedOptions:n,hooks:e,headEntries(){return s},use(l){const c=typeof l=="function"?l(a):l;(!c.key||!o.some(u=>u.key===c.key))&&(o.push(c),mp(c.mode,t)&&e.addHooks(c.hooks||{}))},push(l,c){c==null||delete c.head;const u={_i:r++,input:l,...c};return mp(u.mode,t)&&(s.push(u),i()),{dispose(){s=s.filter(f=>f._i!==u._i),i()},patch(f){for(const h of s)h._i===u._i&&(h.input=u.input=f);i()}}},async resolveTags(){const l={tags:[],entries:[...s]};await e.callHook("entries:resolve",l);for(const c of l.entries){const u=c.resolvedInput||c.input;if(c.resolvedInput=await(c.transform?c.transform(u):u),c.resolvedInput)for(const f of await pb(c)){const h={tag:f,entry:c,resolvedOptions:a.resolvedOptions};await e.callHook("tag:normalise",h),l.tags.push(h.tag)}}return await e.callHook("tags:beforeResolve",l),await e.callHook("tags:resolve",l),await e.callHook("tags:afterResolve",l),l.tags},ssr:t};return[Mb,wb,Eb,Ab,Rb,Lb,Db,Ib,...(n==null?void 0:n.plugins)||[]].forEach(l=>a.use(l)),a.hooks.callHook("init",a),a}function Fb(){return Wg}const Ob=ug[0]==="3";function Bb(n){return typeof n=="function"?n():Nt(n)}function Gu(n){if(n instanceof Promise||n instanceof Date||n instanceof RegExp)return n;const e=Bb(n);if(!n||!e)return e;if(Array.isArray(e))return e.map(t=>Gu(t));if(typeof e=="object"){const t={};for(const i in e)if(Object.prototype.hasOwnProperty.call(e,i)){if(i==="titleTemplate"||i[0]==="o"&&i[1]==="n"){t[i]=Nt(e[i]);continue}t[i]=Gu(e[i])}return t}return e}const kb={hooks:{"entries:resolve":n=>{for(const e of n.entries)e.resolvedInput=Gu(e.input)}}},Xg="usehead";function Hb(n){return{install(t){Ob&&(t.config.globalProperties.$unhead=n,t.config.globalProperties.$head=n,t.provide(Xg,n))}}.install}function zb(n={}){n.domDelayFn=n.domDelayFn||(t=>uh(()=>setTimeout(()=>t(),0)));const e=Ub(n);return e.use(kb),e.install=Hb(e),e}const Wu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Xu="__unhead_injection_handler__";function Vb(n){Wu[Xu]=n}function w3(){return Xu in Wu?Wu[Xu]():Hs(Xg)||Fb()}let tl,nl;function Gb(){return tl=$fetch(yh(`builds/meta/${jo().app.buildId}.json`),{responseType:"json"}),tl.then(n=>{nl=LM(n.matcher)}).catch(n=>{console.error("[nuxt] Error fetching app manifest.",n)}),tl}function tc(){return tl||Gb()}async function Eh(n){if(await tc(),!nl)return console.error("[nuxt] Error creating app manifest matcher.",nl),{};try{return IM({},...nl.matchAll(n).reverse())}catch(e){return console.error("[nuxt] Error matching route rules.",e),{}}}async function _p(n,e={}){const t=await Xb(n,e),i=Jt(),r=i._payloadCache=i._payloadCache||{};return t in r||(r[t]=Yg(n).then(s=>s?qg(t).then(o=>o||(delete r[t],null)):(r[t]=null,null))),r[t]}const Wb="_payload.json";async function Xb(n,e={}){const t=new URL(n,"http://localhost");if(t.host!=="localhost"||co(t.pathname,{acceptRelative:!0}))throw new Error("Payload URL must not include hostname: "+n);const i=jo(),r=e.hash||(e.fresh?Date.now():i.app.buildId),s=i.app.cdnURL,o=s&&await Yg(n)?s:i.app.baseURL;return ec(o,t.pathname,Wb+(r?`?${r}`:""))}async function qg(n){const e=fetch(n).then(t=>t.text().then($g));try{return await e}catch(t){console.warn("[nuxt] Cannot load payload ",n,t)}return null}async function Yg(n=Ng().path){if(n=Sh(n),(await tc()).prerendered.includes(n))return!0;const t=await Eh(n);return!!t.prerender&&!t.redirect}let Ur=null;async function qb(){var i;if(Ur)return Ur;const n=document.getElementById("__NUXT_DATA__");if(!n)return{};const e=await $g(n.textContent||""),t=n.dataset.src?await qg(n.dataset.src):void 0;return Ur={...e,...t,...window.__NUXT__},(i=Ur.config)!=null&&i.public&&(Ur.config.public=Mr(Ur.config.public)),Ur}async function $g(n){return await sb(n,Jt()._payloadRevivers)}function Yb(n,e){Jt()._payloadRevivers[n]=e}const gp={NuxtError:n=>bh(n),EmptyShallowRef:n=>Md(n==="_"?void 0:n==="0n"?BigInt(0):yl(n)),EmptyRef:n=>kt(n==="_"?void 0:n==="0n"?BigInt(0):yl(n)),ShallowRef:n=>Md(n),ShallowReactive:n=>Ds(n),Ref:n=>kt(n),Reactive:n=>Mr(n)},$b=Rr({name:"nuxt:revive-payload:client",order:-30,async setup(n){let e,t;for(const i in gp)Yb(i,gp[i]);Object.assign(n.payload,([e,t]=Rg(()=>n.runWithContext(qb)),e=await e,t(),e)),window.__NUXT__=n.payload}}),jb=[],Kb=Rr({name:"nuxt:head",enforce:"pre",setup(n){const e=zb({plugins:jb});Vb(()=>Jt().vueApp._context.provides.usehead),n.vueApp.use(e);{let t=!0;const i=async()=>{t=!1,await Gg(e)};e.hooks.hook("dom:beforeRender",r=>{r.shouldRender=!t}),n.hooks.hook("page:start",()=>{t=!0}),n.hooks.hook("page:finish",()=>{n.isHydrating||i()}),n.hooks.hook("app:error",i),n.hooks.hook("app:suspense:resolve",i)}}}),Zb=async n=>{let e,t;const i=([e,t]=Rg(()=>Eh(n.path)),e=await e,t(),e);if(i.redirect)return co(i.redirect,{acceptRelative:!0})?(window.location.href=i.redirect,!1):i.redirect},Jb=[Zb];function Rc(n){typeof n=="object"&&(n=bg({pathname:n.path||"",search:vg(n.query||{}),hash:n.hash||""}));const e=new URL(n.toString(),window.location.href);return{path:e.pathname,fullPath:n,query:gg(e.search),hash:e.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:n}}const Qb=Rr({name:"nuxt:router",enforce:"pre",setup(n){const e=Gy(window.location.pathname,jo().app.baseURL)+window.location.search+window.location.hash,t=[],i={"navigate:before":[],"resolve:before":[],"navigate:after":[],error:[]},r=(f,h)=>(i[f].push(h),()=>i[f].splice(i[f].indexOf(h),1)),s=jo().app.baseURL,o=Mr(Rc(e));async function a(f,h){try{const d=Rc(f);for(const p of i["navigate:before"]){const _=await p(d,o);if(_===!1||_ instanceof Error)return;if(typeof _=="string"&&_.length)return a(_,!0)}for(const p of i["resolve:before"])await p(d,o);Object.assign(o,d),window.history[h?"replaceState":"pushState"]({},"",ec(s,d.fullPath)),n.isHydrating||await n.runWithContext(VM);for(const p of i["navigate:after"])await p(d,o)}catch(d){for(const p of i.error)await p(d)}}const c={currentRoute:Fo(()=>o),isReady:()=>Promise.resolve(),options:{},install:()=>Promise.resolve(),push:f=>a(f,!1),replace:f=>a(f,!0),back:()=>window.history.go(-1),go:f=>window.history.go(f),forward:()=>window.history.go(1),beforeResolve:f=>r("resolve:before",f),beforeEach:f=>r("navigate:before",f),afterEach:f=>r("navigate:after",f),onError:f=>r("error",f),resolve:Rc,addRoute:(f,h)=>{t.push(h)},getRoutes:()=>t,hasRoute:f=>t.some(h=>h.name===f),removeRoute:f=>{const h=t.findIndex(d=>d.name===f);h!==-1&&t.splice(h,1)}};n.vueApp.component("RouterLink",C_({functional:!0,props:{to:{type:String,required:!0},custom:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,ariaCurrentValue:String},setup:(f,{slots:h})=>{const d=()=>a(f.to,f.replace);return()=>{var _;const p=c.resolve(f.to);return f.custom?(_=h.default)==null?void 0:_.call(h,{href:f.to,navigate:d,route:p}):cg("a",{href:f.to,onClick:m=>(m.preventDefault(),d())},h)}}})),window.addEventListener("popstate",f=>{const h=f.target.location;c.replace(h.href.replace(h.origin,""))}),n._route=o,n._middleware=n._middleware||{global:[],named:{}};const u=n.payload.state._layout;return n.hooks.hookOnce("app:created",async()=>{c.beforeEach(async(f,h)=>{f.meta=Mr(f.meta||{}),n.isHydrating&&u&&!Yi(f.meta.layout)&&(f.meta.layout=u),n._processingMiddleware=!0;{const d=new Set([...Jb,...n._middleware.global]);{const p=await n.runWithContext(()=>Eh(f.path));if(p.appMiddleware)for(const _ in p.appMiddleware){const m=n._middleware.named[_];if(!m)return;p.appMiddleware[_]?d.add(m):d.delete(m)}}for(const p of d){const _=await n.runWithContext(()=>p(f,h));if(_!==!0&&(_||_===!1))return _}}}),c.afterEach(()=>{delete n._processingMiddleware}),await c.replace(e),Xy(o.fullPath,e)||await n.runWithContext(()=>kM(o.fullPath))}),{provide:{route:o,router:c}}}}),vp=globalThis.requestIdleCallback||(n=>{const e=Date.now(),t={didTimeout:!1,timeRemaining:()=>Math.max(0,50-(Date.now()-e))};return setTimeout(()=>{n(t)},1)}),R3=globalThis.cancelIdleCallback||(n=>{clearTimeout(n)}),Th=n=>{const e=Jt();e.isHydrating?e.hooks.hookOnce("app:suspense:resolve",()=>{vp(()=>n())}):vp(()=>n())},eE=Rr({name:"nuxt:payload",setup(n){rs().beforeResolve(async(e,t)=>{if(e.path===t.path)return;const i=await _p(e.path);i&&Object.assign(n.static.data,i.data)}),Th(()=>{var e;n.hooks.hook("link:prefetch",async t=>{const{hostname:i}=new URL(t,window.location.href);i===window.location.hostname&&await _p(t)}),((e=navigator.connection)==null?void 0:e.effectiveType)!=="slow-2g"&&setTimeout(tc,1e3)})}}),tE=Rr(()=>{const n=rs();Th(()=>{n.beforeResolve(async()=>{await new Promise(e=>{setTimeout(e,100),requestAnimationFrame(()=>{setTimeout(e,0)})})})})}),nE=Rr(n=>{let e;async function t(){const i=await tc();e&&clearTimeout(e),e=setTimeout(t,lp);try{const r=await $fetch(yh("builds/latest.json")+`?${Date.now()}`);r.id!==i.id&&n.hooks.callHook("app:manifest:update",r)}catch{}}Th(()=>{e=setTimeout(t,lp)})});function iE(n={}){const e=n.path||window.location.pathname;let t={};try{t=yl(sessionStorage.getItem("nuxt:reload")||"{}")}catch{}if(n.force||(t==null?void 0:t.path)!==e||(t==null?void 0:t.expires)<Date.now()){try{sessionStorage.setItem("nuxt:reload",JSON.stringify({path:e,expires:Date.now()+(n.ttl??1e4)}))}catch{}if(n.persistState)try{sessionStorage.setItem("nuxt:reload:state",JSON.stringify({state:Jt().payload.state}))}catch{}window.location.pathname!==e?window.location.href=e:window.location.reload()}}const rE=Rr({name:"nuxt:chunk-reload",setup(n){const e=rs(),t=jo(),i=new Set;e.beforeEach(()=>{i.clear()}),n.hook("app:chunkError",({error:s})=>{i.add(s)});function r(s){const a="href"in s&&s.href[0]==="#"?t.app.baseURL+s.href:ec(t.app.baseURL,s.fullPath);iE({path:a,persistState:!0})}n.hook("app:manifest:update",()=>{e.beforeResolve(r)}),e.onError((s,o)=>{i.has(s)&&r(o)})}}),sE=Rr({name:"nuxt:global-components"}),oE=[$b,Kb,Qb,eE,tE,nE,rE,sE],aE="modulepreload",lE=function(n,e){return new URL(n,e).href},xp={},Rl=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=Promise.allSettled(t.map(c=>{if(c=lE(c,i),c in xp)return;xp[c]=!0;const u=c.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(!!i)for(let p=o.length-1;p>=0;p--){const _=o[p];if(_.href===c&&(!u||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${f}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":aE,u||(d.as="script"),d.crossOrigin="",d.href=c,l&&d.setAttribute("nonce",l),document.head.appendChild(d),u)return new Promise((p,_)=>{d.addEventListener("load",p),d.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},Ah=(n,e)=>{const t=n.__vccOpts||n;for(const[i,r]of e)t[i]=r;return t},cE={key:0,class:"loader-overlay"},uE={class:"--la-storia"},fE={class:"display loader"},hE={__name:"LoadingScreen",emits:["complete"],setup(n,{emit:e}){const t=kt(!0),i=kt(0),r=e;return lo(()=>{const s=Date.now(),o=5e3;function a(){const l=Date.now()-s,c=Math.min(100,Math.floor(l/o*100));i.value=c,c<100?requestAnimationFrame(a):setTimeout(()=>{t.value=!1,r("complete")},400)}requestAnimationFrame(a)}),(s,o)=>(Tt(),_i(dg,{name:"fade"},{default:jl(()=>[t.value?(Tt(),zn("div",cE,[Ke("span",uE,[Ke("span",fE,nh(i.value),1)]),o[0]||(o[0]=Ke("span",{class:"--eat-marry-love",style:{position:"absolute"}},[Ke("span",{class:"display loader"},"%")],-1))])):da("",!0)]),_:1}))}},dE=Ah(hE,[["__scopeId","data-v-c2fcdc65"]]),pE={__name:"CustomCursor",setup(n,{expose:e}){const t=kt(null),i=kt(!1);let r=-200,s=-200,o=-200,a=-200,l=null;function c(p,_,m){return p+(_-p)*m}function u(p){o=p.clientX,a=p.clientY}function f(){r=c(r,o,.2),s=c(s,a,.2),t.value&&(t.value.style.transform=`translate(${r}px, ${s}px)`),l=requestAnimationFrame(f)}function h(){i.value=!0}function d(){i.value=!1}return lo(()=>{window.addEventListener("mousemove",u),f()}),ha(()=>{window.removeEventListener("mousemove",u),cancelAnimationFrame(l)}),e({activate:h,deactivate:d}),(p,_)=>(Tt(),zn("div",{ref_key:"cursorRef",ref:t,class:oo(["cursor",{active:i.value}])},[..._[0]||(_[0]=[Ke("div",{class:"cursor-box"},[Ke("span",{class:"explore"},"Explore")],-1)])],2))}};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wh="184",mE=0,Sp=1,_E=2,il=1,gE=2,wo=3,Er=0,_n=1,vi=2,Vi=0,Ws=1,yp=2,Mp=3,bp=4,vE=5,Wr=100,xE=101,SE=102,yE=103,ME=104,bE=200,EE=201,TE=202,AE=203,qu=204,Yu=205,wE=206,RE=207,CE=208,PE=209,LE=210,DE=211,IE=212,UE=213,NE=214,$u=0,ju=1,Ku=2,Zs=3,Zu=4,Ju=5,Qu=6,ef=7,jg=0,FE=1,OE=2,Ei=0,Kg=1,Zg=2,Jg=3,Qg=4,e0=5,t0=6,n0=7,i0=300,ss=301,Js=302,Cc=303,Pc=304,nc=306,tf=1e3,Rn=1001,nf=1002,Kt=1003,BE=1004,Pa=1005,Ot=1006,Lc=1007,qr=1008,Gn=1009,r0=1010,s0=1011,Ko=1012,Rh=1013,wi=1014,Si=1015,ji=1016,Ch=1017,Ph=1018,Zo=1020,o0=35902,a0=35899,l0=1021,c0=1022,ei=1023,Ki=1026,Yr=1027,u0=1028,Lh=1029,os=1030,Dh=1031,Ih=1033,rl=33776,sl=33777,ol=33778,al=33779,rf=35840,sf=35841,of=35842,af=35843,lf=36196,cf=37492,uf=37496,ff=37488,hf=37489,Cl=37490,df=37491,pf=37808,mf=37809,_f=37810,gf=37811,vf=37812,xf=37813,Sf=37814,yf=37815,Mf=37816,bf=37817,Ef=37818,Tf=37819,Af=37820,wf=37821,Rf=36492,Cf=36494,Pf=36495,Lf=36283,Df=36284,Pl=36285,If=36286,kE=3200,Ep=0,HE=1,mr="",dn="srgb",Ll="srgb-linear",Dl="linear",ct="srgb",ms=7680,Tp=519,zE=512,VE=513,GE=514,Uh=515,WE=516,XE=517,Nh=518,qE=519,Ap=35044,wp="300 es",yi=2e3,Il=2001;function YE(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Jo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function $E(){const n=Jo("canvas");return n.style.display="block",n}const Rp={};function Cp(...n){const e="THREE."+n.shift();console.log(e,...n)}function f0(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function ze(...n){n=f0(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function nt(...n){n=f0(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Uf(...n){const e=n.join(" ");e in Rp||(Rp[e]=!0,ze(...n))}function jE(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const KE={[$u]:ju,[Ku]:Qu,[Zu]:ef,[Zs]:Ju,[ju]:$u,[Qu]:Ku,[ef]:Zu,[Ju]:Zs};class cs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Dc=Math.PI/180,Nf=180/Math.PI;function ma(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]).toLowerCase()}function et(n,e,t){return Math.max(e,Math.min(t,n))}function ZE(n,e){return(n%e+e)%e}function Ic(n,e,t){return(1-t)*n+t*e}function go(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function hn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const sd=class sd{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};sd.prototype.isVector2=!0;let ot=sd;class uo{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],h=s[o+0],d=s[o+1],p=s[o+2],_=s[o+3];if(f!==_||l!==h||c!==d||u!==p){let m=l*h+c*d+u*p+f*_;m<0&&(h=-h,d=-d,p=-p,_=-_,m=-m);let g=1-a;if(m<.9995){const y=Math.acos(m),v=Math.sin(y);g=Math.sin(g*y)/v,a=Math.sin(a*y)/v,l=l*g+h*a,c=c*g+d*a,u=u*g+p*a,f=f*g+_*a}else{l=l*g+h*a,c=c*g+d*a,u=u*g+p*a,f=f*g+_*a;const y=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=y,c*=y,u*=y,f*=y}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],h=s[o+1],d=s[o+2],p=s[o+3];return e[t]=a*p+u*f+l*d-c*h,e[t+1]=l*p+u*h+c*f-a*d,e[t+2]=c*p+u*d+a*h-l*f,e[t+3]=u*p-a*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),h=l(i/2),d=l(r/2),p=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"YXZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"ZXY":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"ZYX":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"YZX":this._x=h*u*f+c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f-h*d*p;break;case"XZY":this._x=h*u*f-c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f+h*d*p;break;default:ze("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(i>a&&i>f){const d=2*Math.sqrt(1+i-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-i-f);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const od=class od{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Pp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Pp.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Uc.copy(this).projectOnVector(e),this.sub(Uc)}reflect(e){return this.sub(Uc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};od.prototype.isVector3=!0;let Y=od;const Uc=new Y,Pp=new uo,ad=class ad{constructor(e,t,i,r,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],p=i[8],_=r[0],m=r[3],g=r[6],y=r[1],v=r[4],S=r[7],E=r[2],T=r[5],R=r[8];return s[0]=o*_+a*y+l*E,s[3]=o*m+a*v+l*T,s[6]=o*g+a*S+l*R,s[1]=c*_+u*y+f*E,s[4]=c*m+u*v+f*T,s[7]=c*g+u*S+f*R,s[2]=h*_+d*y+p*E,s[5]=h*m+d*v+p*T,s[8]=h*g+d*S+p*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,d=c*s-o*l,p=t*f+i*h+r*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=f*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=d*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Nc.makeScale(e,t)),this}rotate(e){return this.premultiply(Nc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Nc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ad.prototype.isMatrix3=!0;let Ge=ad;const Nc=new Ge,Lp=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dp=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function JE(){const n={enabled:!0,workingColorSpace:Ll,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ct&&(r.r=Gi(r.r),r.g=Gi(r.g),r.b=Gi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ct&&(r.r=Xs(r.r),r.g=Xs(r.g),r.b=Xs(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===mr?Dl:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Uf("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Uf("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ll]:{primaries:e,whitePoint:i,transfer:Dl,toXYZ:Lp,fromXYZ:Dp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:dn},outputColorSpaceConfig:{drawingBufferColorSpace:dn}},[dn]:{primaries:e,whitePoint:i,transfer:ct,toXYZ:Lp,fromXYZ:Dp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:dn}}}),n}const Qe=JE();function Gi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Xs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let _s;class QE{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{_s===void 0&&(_s=Jo("canvas")),_s.width=e.width,_s.height=e.height;const r=_s.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=_s}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Jo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Gi(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Gi(t[i]/255)*255):t[i]=Gi(t[i]);return{data:t,width:e.width,height:e.height}}else return ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let eT=0;class Fh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:eT++}),this.uuid=ma(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Fc(r[o].image)):s.push(Fc(r[o]))}else s=Fc(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Fc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?QE.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(ze("Texture: Unable to serialize Texture."),{})}let tT=0;const Oc=new Y;class qt extends cs{constructor(e=qt.DEFAULT_IMAGE,t=qt.DEFAULT_MAPPING,i=Rn,r=Rn,s=Ot,o=qr,a=ei,l=Gn,c=qt.DEFAULT_ANISOTROPY,u=mr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tT++}),this.uuid=ma(),this.name="",this.source=new Fh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Oc).x}get height(){return this.source.getSize(Oc).y}get depth(){return this.source.getSize(Oc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ze(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==i0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case tf:e.x=e.x-Math.floor(e.x);break;case Rn:e.x=e.x<0?0:1;break;case nf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case tf:e.y=e.y-Math.floor(e.y);break;case Rn:e.y=e.y<0?0:1;break;case nf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=i0;qt.DEFAULT_ANISOTROPY=1;const ld=class ld{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],p=l[9],_=l[2],m=l[6],g=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(p+m)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,S=(d+1)/2,E=(g+1)/2,T=(u+h)/4,R=(f+_)/4,x=(p+m)/4;return v>S&&v>E?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=T/i,s=R/i):S>E?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=T/r,s=x/r):E<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(E),i=R/s,r=x/s),this.set(i,r,s,t),this}let y=Math.sqrt((m-p)*(m-p)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(m-p)/y,this.y=(f-_)/y,this.z=(h-u)/y,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ld.prototype.isVector4=!0;let It=ld;class nT extends cs{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ot,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new qt(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Ot,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Fh(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ti extends nT{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class h0 extends qt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class iT extends qt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Vl=class Vl{constructor(e,t,i,r,s,o,a,l,c,u,f,h,d,p,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,f,h,d,p,_,m)}set(e,t,i,r,s,o,a,l,c,u,f,h,d,p,_,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=s,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=u,g[10]=f,g[14]=h,g[3]=d,g[7]=p,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Vl().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,r=1/gs.setFromMatrixColumn(e,0).length(),s=1/gs.setFromMatrixColumn(e,1).length(),o=1/gs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,d=o*f,p=a*u,_=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+p*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=p+d*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,p=c*u,_=c*f;t[0]=h+_*a,t[4]=p*a-d,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=d*a-p,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,p=c*u,_=c*f;t[0]=h-_*a,t[4]=-o*f,t[8]=p+d*a,t[1]=d+p*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,d=o*f,p=a*u,_=a*f;t[0]=l*u,t[4]=p*c-d,t[8]=h*c+_,t[1]=l*f,t[5]=_*c+h,t[9]=d*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,d=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=_-h*f,t[8]=p*f+d,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*f+p,t[10]=h-_*f}else if(e.order==="XZY"){const h=o*l,d=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+_,t[5]=o*u,t[9]=d*f-p,t[2]=p*f-d,t[6]=a*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rT,e,sT)}lookAt(e,t,i){const r=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),or.crossVectors(i,bn),or.lengthSq()===0&&(Math.abs(i.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),or.crossVectors(i,bn)),or.normalize(),La.crossVectors(bn,or),r[0]=or.x,r[4]=La.x,r[8]=bn.x,r[1]=or.y,r[5]=La.y,r[9]=bn.y,r[2]=or.z,r[6]=La.z,r[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],p=i[2],_=i[6],m=i[10],g=i[14],y=i[3],v=i[7],S=i[11],E=i[15],T=r[0],R=r[4],x=r[8],b=r[12],C=r[1],P=r[5],D=r[9],B=r[13],z=r[2],N=r[6],U=r[10],O=r[14],G=r[3],ne=r[7],ge=r[11],Ee=r[15];return s[0]=o*T+a*C+l*z+c*G,s[4]=o*R+a*P+l*N+c*ne,s[8]=o*x+a*D+l*U+c*ge,s[12]=o*b+a*B+l*O+c*Ee,s[1]=u*T+f*C+h*z+d*G,s[5]=u*R+f*P+h*N+d*ne,s[9]=u*x+f*D+h*U+d*ge,s[13]=u*b+f*B+h*O+d*Ee,s[2]=p*T+_*C+m*z+g*G,s[6]=p*R+_*P+m*N+g*ne,s[10]=p*x+_*D+m*U+g*ge,s[14]=p*b+_*B+m*O+g*Ee,s[3]=y*T+v*C+S*z+E*G,s[7]=y*R+v*P+S*N+E*ne,s[11]=y*x+v*D+S*U+E*ge,s[15]=y*b+v*B+S*O+E*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],p=e[3],_=e[7],m=e[11],g=e[15],y=l*d-c*h,v=a*d-c*f,S=a*h-l*f,E=o*d-c*u,T=o*h-l*u,R=o*f-a*u;return t*(_*y-m*v+g*S)-i*(p*y-m*E+g*T)+r*(p*v-_*E+g*R)-s*(p*S-_*T+m*R)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],p=e[12],_=e[13],m=e[14],g=e[15],y=t*a-i*o,v=t*l-r*o,S=t*c-s*o,E=i*l-r*a,T=i*c-s*a,R=r*c-s*l,x=u*_-f*p,b=u*m-h*p,C=u*g-d*p,P=f*m-h*_,D=f*g-d*_,B=h*g-d*m,z=y*B-v*D+S*P+E*C-T*b+R*x;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/z;return e[0]=(a*B-l*D+c*P)*N,e[1]=(r*D-i*B-s*P)*N,e[2]=(_*R-m*T+g*E)*N,e[3]=(h*T-f*R-d*E)*N,e[4]=(l*C-o*B-c*b)*N,e[5]=(t*B-r*C+s*b)*N,e[6]=(m*S-p*R-g*v)*N,e[7]=(u*R-h*S+d*v)*N,e[8]=(o*D-a*C+c*x)*N,e[9]=(i*C-t*D-s*x)*N,e[10]=(p*T-_*S+g*y)*N,e[11]=(f*S-u*T-d*y)*N,e[12]=(a*b-o*P-l*x)*N,e[13]=(t*P-i*b+r*x)*N,e[14]=(_*v-p*E-m*y)*N,e[15]=(u*E-f*v+h*y)*N,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,f=a+a,h=s*c,d=s*u,p=s*f,_=o*u,m=o*f,g=a*f,y=l*c,v=l*u,S=l*f,E=i.x,T=i.y,R=i.z;return r[0]=(1-(_+g))*E,r[1]=(d+S)*E,r[2]=(p-v)*E,r[3]=0,r[4]=(d-S)*T,r[5]=(1-(h+g))*T,r[6]=(m+y)*T,r[7]=0,r[8]=(p+v)*R,r[9]=(m-y)*R,r[10]=(1-(h+_))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let o=gs.set(r[0],r[1],r[2]).length();const a=gs.set(r[4],r[5],r[6]).length(),l=gs.set(r[8],r[9],r[10]).length();s<0&&(o=-o),$n.copy(this);const c=1/o,u=1/a,f=1/l;return $n.elements[0]*=c,$n.elements[1]*=c,$n.elements[2]*=c,$n.elements[4]*=u,$n.elements[5]*=u,$n.elements[6]*=u,$n.elements[8]*=f,$n.elements[9]*=f,$n.elements[10]*=f,t.setFromRotationMatrix($n),i.x=o,i.y=a,i.z=l,this}makePerspective(e,t,i,r,s,o,a=yi,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(i-r),h=(t+e)/(t-e),d=(i+r)/(i-r);let p,_;if(l)p=s/(o-s),_=o*s/(o-s);else if(a===yi)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Il)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=yi,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-r),h=-(t+e)/(t-e),d=-(i+r)/(i-r);let p,_;if(l)p=1/(o-s),_=o/(o-s);else if(a===yi)p=-2/(o-s),_=-(o+s)/(o-s);else if(a===Il)p=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Vl.prototype.isMatrix4=!0;let Bt=Vl;const gs=new Y,$n=new Bt,rT=new Y(0,0,0),sT=new Y(1,1,1),or=new Y,La=new Y,bn=new Y,Ip=new Bt,Up=new uo;class as{constructor(e=0,t=0,i=0,r=as.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-et(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ip.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ip,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Up.setFromEuler(this),this.setFromQuaternion(Up,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}as.DEFAULT_ORDER="XYZ";class Oh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let oT=0;const Np=new Y,vs=new uo,Di=new Bt,Da=new Y,vo=new Y,aT=new Y,lT=new uo,Fp=new Y(1,0,0),Op=new Y(0,1,0),Bp=new Y(0,0,1),kp={type:"added"},cT={type:"removed"},xs={type:"childadded",child:null},Bc={type:"childremoved",child:null};class Ln extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:oT++}),this.uuid=ma(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ln.DEFAULT_UP.clone();const e=new Y,t=new as,i=new uo,r=new Y(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Bt},normalMatrix:{value:new Ge}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=Ln.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Oh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return vs.setFromAxisAngle(e,t),this.quaternion.multiply(vs),this}rotateOnWorldAxis(e,t){return vs.setFromAxisAngle(e,t),this.quaternion.premultiply(vs),this}rotateX(e){return this.rotateOnAxis(Fp,e)}rotateY(e){return this.rotateOnAxis(Op,e)}rotateZ(e){return this.rotateOnAxis(Bp,e)}translateOnAxis(e,t){return Np.copy(e).applyQuaternion(this.quaternion),this.position.add(Np.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Fp,e)}translateY(e){return this.translateOnAxis(Op,e)}translateZ(e){return this.translateOnAxis(Bp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Di.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Da.copy(e):Da.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),vo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Di.lookAt(vo,Da,this.up):Di.lookAt(Da,vo,this.up),this.quaternion.setFromRotationMatrix(Di),r&&(Di.extractRotation(r.matrixWorld),vs.setFromRotationMatrix(Di),this.quaternion.premultiply(vs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(nt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(kp),xs.child=e,this.dispatchEvent(xs),xs.child=null):nt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cT),Bc.child=e,this.dispatchEvent(Bc),Bc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Di.multiply(e.parent.matrixWorld)),e.applyMatrix4(Di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(kp),xs.child=e,this.dispatchEvent(xs),xs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vo,e,aT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vo,lT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),d=o(e.animations),p=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ln.DEFAULT_UP=new Y(0,1,0);Ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Us extends Ln{constructor(){super(),this.isGroup=!0,this.type="Group"}}const uT={type:"move"};class kc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Us,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Us,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Us,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),g=this._getHandJoint(c,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&h>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(uT)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Us;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const d0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ar={h:0,s:0,l:0},Ia={h:0,s:0,l:0};function Hc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ht{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Qe.workingColorSpace){if(e=ZE(e,1),t=et(t,0,1),i=et(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Hc(o,s,e+1/3),this.g=Hc(o,s,e),this.b=Hc(o,s,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,t=dn){function i(s){s!==void 0&&parseFloat(s)<1&&ze("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:ze("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dn){const i=d0[e.toLowerCase()];return i!==void 0?this.setHex(i,t):ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gi(e.r),this.g=Gi(e.g),this.b=Gi(e.b),this}copyLinearToSRGB(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dn){return Qe.workingToColorSpace(tn.copy(this),e),Math.round(et(tn.r*255,0,255))*65536+Math.round(et(tn.g*255,0,255))*256+Math.round(et(tn.b*255,0,255))}getHexString(e=dn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(tn.copy(this),t);const i=tn.r,r=tn.g,s=tn.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=dn){Qe.workingToColorSpace(tn.copy(this),e);const t=tn.r,i=tn.g,r=tn.b;return e!==dn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ar),this.setHSL(ar.h+e,ar.s+t,ar.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ar),e.getHSL(Ia);const i=Ic(ar.h,Ia.h,t),r=Ic(ar.s,Ia.s,t),s=Ic(ar.l,Ia.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new ht;ht.NAMES=d0;class fT extends Ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new as,this.environmentIntensity=1,this.environmentRotation=new as,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const jn=new Y,Ii=new Y,zc=new Y,Ui=new Y,Ss=new Y,ys=new Y,Hp=new Y,Vc=new Y,Gc=new Y,Wc=new Y,Xc=new It,qc=new It,Yc=new It;class Jn{constructor(e=new Y,t=new Y,i=new Y){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),jn.subVectors(e,t),r.cross(jn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){jn.subVectors(r,t),Ii.subVectors(i,t),zc.subVectors(e,t);const o=jn.dot(jn),a=jn.dot(Ii),l=jn.dot(zc),c=Ii.dot(Ii),u=Ii.dot(zc),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,p=(o*u-a*l)*h;return s.set(1-d-p,p,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ui)===null?!1:Ui.x>=0&&Ui.y>=0&&Ui.x+Ui.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ui.x),l.addScaledVector(o,Ui.y),l.addScaledVector(a,Ui.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Xc.setScalar(0),qc.setScalar(0),Yc.setScalar(0),Xc.fromBufferAttribute(e,t),qc.fromBufferAttribute(e,i),Yc.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Xc,s.x),o.addScaledVector(qc,s.y),o.addScaledVector(Yc,s.z),o}static isFrontFacing(e,t,i,r){return jn.subVectors(i,t),Ii.subVectors(e,t),jn.cross(Ii).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),Ii.subVectors(this.a,this.b),jn.cross(Ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Jn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Jn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Jn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Jn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Jn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Ss.subVectors(r,i),ys.subVectors(s,i),Vc.subVectors(e,i);const l=Ss.dot(Vc),c=ys.dot(Vc);if(l<=0&&c<=0)return t.copy(i);Gc.subVectors(e,r);const u=Ss.dot(Gc),f=ys.dot(Gc);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Ss,o);Wc.subVectors(e,s);const d=Ss.dot(Wc),p=ys.dot(Wc);if(p>=0&&d<=p)return t.copy(s);const _=d*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(i).addScaledVector(ys,a);const m=u*p-d*f;if(m<=0&&f-u>=0&&d-p>=0)return Hp.subVectors(s,r),a=(f-u)/(f-u+(d-p)),t.copy(r).addScaledVector(Hp,a);const g=1/(m+_+h);return o=_*g,a=h*g,t.copy(i).addScaledVector(Ss,o).addScaledVector(ys,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class _a{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Kn):Kn.fromBufferAttribute(s,o),Kn.applyMatrix4(e.matrixWorld),this.expandByPoint(Kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ua.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ua.copy(i.boundingBox)),Ua.applyMatrix4(e.matrixWorld),this.union(Ua)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kn),Kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xo),Na.subVectors(this.max,xo),Ms.subVectors(e.a,xo),bs.subVectors(e.b,xo),Es.subVectors(e.c,xo),lr.subVectors(bs,Ms),cr.subVectors(Es,bs),Nr.subVectors(Ms,Es);let t=[0,-lr.z,lr.y,0,-cr.z,cr.y,0,-Nr.z,Nr.y,lr.z,0,-lr.x,cr.z,0,-cr.x,Nr.z,0,-Nr.x,-lr.y,lr.x,0,-cr.y,cr.x,0,-Nr.y,Nr.x,0];return!$c(t,Ms,bs,Es,Na)||(t=[1,0,0,0,1,0,0,0,1],!$c(t,Ms,bs,Es,Na))?!1:(Fa.crossVectors(lr,cr),t=[Fa.x,Fa.y,Fa.z],$c(t,Ms,bs,Es,Na))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ni=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],Kn=new Y,Ua=new _a,Ms=new Y,bs=new Y,Es=new Y,lr=new Y,cr=new Y,Nr=new Y,xo=new Y,Na=new Y,Fa=new Y,Fr=new Y;function $c(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Fr.fromArray(n,s);const a=r.x*Math.abs(Fr.x)+r.y*Math.abs(Fr.y)+r.z*Math.abs(Fr.z),l=e.dot(Fr),c=t.dot(Fr),u=i.dot(Fr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ut=new Y,Oa=new ot;let hT=0;class Ai extends cs{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hT++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ap,this.updateRanges=[],this.gpuType=Si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Oa.fromBufferAttribute(this,t),Oa.applyMatrix3(e),this.setXY(t,Oa.x,Oa.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=go(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=hn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=go(t,this.array)),t}setX(e,t){return this.normalized&&(t=hn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=go(t,this.array)),t}setY(e,t){return this.normalized&&(t=hn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=go(t,this.array)),t}setZ(e,t){return this.normalized&&(t=hn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=go(t,this.array)),t}setW(e,t){return this.normalized&&(t=hn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=hn(t,this.array),i=hn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=hn(t,this.array),i=hn(i,this.array),r=hn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=hn(t,this.array),i=hn(i,this.array),r=hn(r,this.array),s=hn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ap&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class p0 extends Ai{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class m0 extends Ai{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Wi extends Ai{constructor(e,t,i){super(new Float32Array(e),t,i)}}const dT=new _a,So=new Y,jc=new Y;class Bh{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):dT.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;So.subVectors(e,this.center);const t=So.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(So,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(jc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(So.copy(e.center).add(jc)),this.expandByPoint(So.copy(e.center).sub(jc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let pT=0;const On=new Bt,Kc=new Ln,Ts=new Y,En=new _a,yo=new _a,Wt=new Y;class er extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pT++}),this.uuid=ma(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(YE(e)?m0:p0)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ge().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return On.makeRotationFromQuaternion(e),this.applyMatrix4(On),this}rotateX(e){return On.makeRotationX(e),this.applyMatrix4(On),this}rotateY(e){return On.makeRotationY(e),this.applyMatrix4(On),this}rotateZ(e){return On.makeRotationZ(e),this.applyMatrix4(On),this}translate(e,t,i){return On.makeTranslation(e,t,i),this.applyMatrix4(On),this}scale(e,t,i){return On.makeScale(e,t,i),this.applyMatrix4(On),this}lookAt(e){return Kc.lookAt(e),Kc.updateMatrix(),this.applyMatrix4(Kc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Wi(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _a);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];En.setFromBufferAttribute(s),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,En.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,En.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(En.min),this.boundingBox.expandByPoint(En.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bh);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){const i=this.boundingSphere.center;if(En.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];yo.setFromBufferAttribute(a),this.morphTargetsRelative?(Wt.addVectors(En.min,yo.min),En.expandByPoint(Wt),Wt.addVectors(En.max,yo.max),En.expandByPoint(Wt)):(En.expandByPoint(yo.min),En.expandByPoint(yo.max))}En.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Wt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Wt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Wt.fromBufferAttribute(a,c),l&&(Ts.fromBufferAttribute(e,c),Wt.add(Ts)),r=Math.max(r,i.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ai(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let x=0;x<i.count;x++)a[x]=new Y,l[x]=new Y;const c=new Y,u=new Y,f=new Y,h=new ot,d=new ot,p=new ot,_=new Y,m=new Y;function g(x,b,C){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,C),h.fromBufferAttribute(s,x),d.fromBufferAttribute(s,b),p.fromBufferAttribute(s,C),u.sub(c),f.sub(c),d.sub(h),p.sub(h);const P=1/(d.x*p.y-p.x*d.y);isFinite(P)&&(_.copy(u).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(P),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(P),a[x].add(_),a[b].add(_),a[C].add(_),l[x].add(m),l[b].add(m),l[C].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let x=0,b=y.length;x<b;++x){const C=y[x],P=C.start,D=C.count;for(let B=P,z=P+D;B<z;B+=3)g(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const v=new Y,S=new Y,E=new Y,T=new Y;function R(x){E.fromBufferAttribute(r,x),T.copy(E);const b=a[x];v.copy(b),v.sub(E.multiplyScalar(E.dot(b))).normalize(),S.crossVectors(T,b);const P=S.dot(l[x])<0?-1:1;o.setXYZW(x,v.x,v.y,v.z,P)}for(let x=0,b=y.length;x<b;++x){const C=y[x],P=C.start,D=C.count;for(let B=P,z=P+D;B<z;B+=3)R(e.getX(B+0)),R(e.getX(B+1)),R(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ai(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const r=new Y,s=new Y,o=new Y,a=new Y,l=new Y,c=new Y,u=new Y,f=new Y;if(e)for(let h=0,d=e.count;h<d;h+=3){const p=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,p),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,p=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let g=0;g<u;g++)h[p++]=c[d++]}return new Ai(h,u,f)}if(this.index===null)return ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new er,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let mT=0;class ic extends cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mT++}),this.uuid=ma(),this.name="",this.type="Material",this.blending=Ws,this.side=Er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qu,this.blendDst=Yu,this.blendEquation=Wr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ht(0,0,0),this.blendAlpha=0,this.depthFunc=Zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ms,this.stencilZFail=ms,this.stencilZPass=ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){ze(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ws&&(i.blending=this.blending),this.side!==Er&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==qu&&(i.blendSrc=this.blendSrc),this.blendDst!==Yu&&(i.blendDst=this.blendDst),this.blendEquation!==Wr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Zs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ms&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ms&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ms&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Fi=new Y,Zc=new Y,Ba=new Y,ur=new Y,Jc=new Y,ka=new Y,Qc=new Y;class _0{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fi.copy(this.origin).addScaledVector(this.direction,t),Fi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Zc.copy(e).add(t).multiplyScalar(.5),Ba.copy(t).sub(e).normalize(),ur.copy(this.origin).sub(Zc);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ba),a=ur.dot(this.direction),l=-ur.dot(Ba),c=ur.lengthSq(),u=Math.abs(1-o*o);let f,h,d,p;if(u>0)if(f=o*l-a,h=o*a-l,p=s*u,f>=0)if(h>=-p)if(h<=p){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-p?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=p?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Zc).addScaledVector(Ba,h),d}intersectSphere(e,t){Fi.subVectors(e.center,this.origin);const i=Fi.dot(this.direction),r=Fi.dot(Fi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Fi)!==null}intersectTriangle(e,t,i,r,s){Jc.subVectors(t,e),ka.subVectors(i,e),Qc.crossVectors(Jc,ka);let o=this.direction.dot(Qc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ur.subVectors(this.origin,e);const l=a*this.direction.dot(ka.crossVectors(ur,ka));if(l<0)return null;const c=a*this.direction.dot(Jc.cross(ur));if(c<0||l+c>o)return null;const u=-a*ur.dot(Qc);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class kh extends ic{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new as,this.combine=jg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const zp=new Bt,Or=new _0,Ha=new Bh,Vp=new Y,za=new Y,Va=new Y,Ga=new Y,eu=new Y,Wa=new Y,Gp=new Y,Xa=new Y;class ii extends Ln{constructor(e=new er,t=new kh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Wa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(eu.fromBufferAttribute(f,e),o?Wa.addScaledVector(eu,u):Wa.addScaledVector(eu.sub(t),u))}t.add(Wa)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ha.copy(i.boundingSphere),Ha.applyMatrix4(s),Or.copy(e.ray).recast(e.near),!(Ha.containsPoint(Or.origin)===!1&&(Or.intersectSphere(Ha,Vp)===null||Or.origin.distanceToSquared(Vp)>(e.far-e.near)**2))&&(zp.copy(s).invert(),Or.copy(e.ray).applyMatrix4(zp),!(i.boundingBox!==null&&Or.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Or)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=h.length;p<_;p++){const m=h[p],g=o[m.materialIndex],y=Math.max(m.start,d.start),v=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let S=y,E=v;S<E;S+=3){const T=a.getX(S),R=a.getX(S+1),x=a.getX(S+2);r=qa(this,g,e,i,c,u,f,T,R,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=p,g=_;m<g;m+=3){const y=a.getX(m),v=a.getX(m+1),S=a.getX(m+2);r=qa(this,o,e,i,c,u,f,y,v,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=h.length;p<_;p++){const m=h[p],g=o[m.materialIndex],y=Math.max(m.start,d.start),v=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let S=y,E=v;S<E;S+=3){const T=S,R=S+1,x=S+2;r=qa(this,g,e,i,c,u,f,T,R,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=p,g=_;m<g;m+=3){const y=m,v=m+1,S=m+2;r=qa(this,o,e,i,c,u,f,y,v,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function _T(n,e,t,i,r,s,o,a){let l;if(e.side===_n?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Er,a),l===null)return null;Xa.copy(a),Xa.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Xa);return c<t.near||c>t.far?null:{distance:c,point:Xa.clone(),object:n}}function qa(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,za),n.getVertexPosition(l,Va),n.getVertexPosition(c,Ga);const u=_T(n,e,t,i,za,Va,Ga,Gp);if(u){const f=new Y;Jn.getBarycoord(Gp,za,Va,Ga,f),r&&(u.uv=Jn.getInterpolatedAttribute(r,a,l,c,f,new ot)),s&&(u.uv1=Jn.getInterpolatedAttribute(s,a,l,c,f,new ot)),o&&(u.normal=Jn.getInterpolatedAttribute(o,a,l,c,f,new Y),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new Y,materialIndex:0};Jn.getNormal(za,Va,Ga,h.normal),u.face=h,u.barycoord=f}return u}class gT extends qt{constructor(e=null,t=1,i=1,r,s,o,a,l,c=Kt,u=Kt,f,h){super(null,o,a,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const tu=new Y,vT=new Y,xT=new Ge;class Vr{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=tu.subVectors(i,t).cross(vT.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(tu),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||xT.getNormalMatrix(e),r=this.coplanarPoint(tu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Br=new Bh,ST=new ot(.5,.5),Ya=new Y;class g0{constructor(e=new Vr,t=new Vr,i=new Vr,r=new Vr,s=new Vr,o=new Vr){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=yi,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],p=s[8],_=s[9],m=s[10],g=s[11],y=s[12],v=s[13],S=s[14],E=s[15];if(r[0].setComponents(c-o,d-u,g-p,E-y).normalize(),r[1].setComponents(c+o,d+u,g+p,E+y).normalize(),r[2].setComponents(c+a,d+f,g+_,E+v).normalize(),r[3].setComponents(c-a,d-f,g-_,E-v).normalize(),i)r[4].setComponents(l,h,m,S).normalize(),r[5].setComponents(c-l,d-h,g-m,E-S).normalize();else if(r[4].setComponents(c-l,d-h,g-m,E-S).normalize(),t===yi)r[5].setComponents(c+l,d+h,g+m,E+S).normalize();else if(t===Il)r[5].setComponents(l,h,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Br.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Br.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Br)}intersectsSprite(e){Br.center.set(0,0,0);const t=ST.distanceTo(e.center);return Br.radius=.7071067811865476+t,Br.applyMatrix4(e.matrixWorld),this.intersectsSphere(Br)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ya.x=r.normal.x>0?e.max.x:e.min.x,Ya.y=r.normal.y>0?e.max.y:e.min.y,Ya.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ya)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class yT extends qt{constructor(e,t,i,r,s=Ot,o=Ot,a,l,c){super(e,t,i,r,s,o,a,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;const u=this;function f(){u.needsUpdate=!0,u._requestVideoFrameCallbackId=e.requestVideoFrameCallback(f)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(f))}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}}class v0 extends qt{constructor(e=[],t=ss,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class MT extends qt{constructor(e,t,i,r,s,o,a,l,c){super(e,t,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Qs extends qt{constructor(e,t,i=wi,r,s,o,a=Kt,l=Kt,c,u=Ki,f=1){if(u!==Ki&&u!==Yr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Fh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class bT extends Qs{constructor(e,t=wi,i=ss,r,s,o=Kt,a=Kt,l,c=Ki){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class x0 extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class fo extends er{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;p("z","y","x",-1,-1,i,t,e,o,s,0),p("z","y","x",1,-1,i,t,-e,o,s,1),p("x","z","y",1,1,e,i,t,r,o,2),p("x","z","y",1,-1,e,i,-t,r,o,3),p("x","y","z",1,-1,e,t,i,r,s,4),p("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Wi(c,3)),this.setAttribute("normal",new Wi(u,3)),this.setAttribute("uv",new Wi(f,2));function p(_,m,g,y,v,S,E,T,R,x,b){const C=S/R,P=E/x,D=S/2,B=E/2,z=T/2,N=R+1,U=x+1;let O=0,G=0;const ne=new Y;for(let ge=0;ge<U;ge++){const Ee=ge*P-B;for(let Te=0;Te<N;Te++){const Ye=Te*C-D;ne[_]=Ye*y,ne[m]=Ee*v,ne[g]=z,c.push(ne.x,ne.y,ne.z),ne[_]=0,ne[m]=0,ne[g]=T>0?1:-1,u.push(ne.x,ne.y,ne.z),f.push(Te/R),f.push(1-ge/x),O+=1}}for(let ge=0;ge<x;ge++)for(let Ee=0;Ee<R;Ee++){const Te=h+Ee+N*ge,Ye=h+Ee+N*(ge+1),We=h+(Ee+1)+N*(ge+1),Be=h+(Ee+1)+N*ge;l.push(Te,Ye,Be),l.push(Ye,We,Be),G+=6}a.addGroup(d,G,b),d+=G,h+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ga extends er{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,h=t/l,d=[],p=[],_=[],m=[];for(let g=0;g<u;g++){const y=g*h-o;for(let v=0;v<c;v++){const S=v*f-s;p.push(S,-y,0),_.push(0,0,1),m.push(v/a),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let y=0;y<a;y++){const v=y+c*g,S=y+c*(g+1),E=y+1+c*(g+1),T=y+1+c*g;d.push(v,S,T),d.push(S,E,T)}this.setIndex(d),this.setAttribute("position",new Wi(p,3)),this.setAttribute("normal",new Wi(_,3)),this.setAttribute("uv",new Wi(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ga(e.width,e.height,e.widthSegments,e.heightSegments)}}function eo(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Wp(r))r.isRenderTargetTexture?(ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Wp(r[0])){const s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function ln(n){const e={};for(let t=0;t<n.length;t++){const i=eo(n[t]);for(const r in i)e[r]=i[r]}return e}function Wp(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function ET(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function S0(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const TT={clone:eo,merge:ln};var AT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ri extends ic{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=AT,this.fragmentShader=wT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=eo(e.uniforms),this.uniformsGroups=ET(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class RT extends ri{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class CT extends ic{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class PT extends ic{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const nu={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Xp(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Xp(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Xp(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class LT{constructor(e,t,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){const d=c[f],p=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const DT=new LT;class Hh{constructor(e){this.manager=e!==void 0?e:DT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Hh.DEFAULT_MATERIAL_NAME="__DEFAULT";const As=new WeakMap;class IT extends Hh{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=nu.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let f=As.get(o);f===void 0&&(f=[],As.set(o,f)),f.push({onLoad:t,onError:r})}return o}const a=Jo("img");function l(){u(),t&&t(this);const f=As.get(this)||[];for(let h=0;h<f.length;h++){const d=f[h];d.onLoad&&d.onLoad(this)}As.delete(this),s.manager.itemEnd(e)}function c(f){u(),r&&r(f),nu.remove(`image:${e}`);const h=As.get(this)||[];for(let d=0;d<h.length;d++){const p=h[d];p.onError&&p.onError(f)}As.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),nu.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class UT extends Hh{constructor(e){super(e)}load(e,t,i,r){const s=new qt,o=new IT(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}const $a=new Y,ja=new uo,ai=new Y;class y0 extends Ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt,this.coordinateSystem=yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose($a,ja,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($a,ja,ai.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose($a,ja,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($a,ja,ai.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const fr=new Y,qp=new ot,Yp=new ot;class Vn extends y0{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Nf*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Dc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Nf*2*Math.atan(Math.tan(Dc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){fr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(fr.x,fr.y).multiplyScalar(-e/fr.z),fr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(fr.x,fr.y).multiplyScalar(-e/fr.z)}getViewSize(e,t){return this.getViewBounds(e,qp,Yp),t.subVectors(Yp,qp)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Dc*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class M0 extends y0{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ws=-90,Rs=1;class NT extends Ln{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Vn(ws,Rs,e,t);r.layers=this.layers,this.add(r);const s=new Vn(ws,Rs,e,t);s.layers=this.layers,this.add(s);const o=new Vn(ws,Rs,e,t);o.layers=this.layers,this.add(o);const a=new Vn(ws,Rs,e,t);a.layers=this.layers,this.add(a);const l=new Vn(ws,Rs,e,t);l.layers=this.layers,this.add(l);const c=new Vn(ws,Rs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===yi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Il)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class FT extends Vn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const $p=new Bt;class OT{constructor(e,t,i=0,r=1/0){this.ray=new _0(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Oh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):nt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return $p.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4($p),this}intersectObject(e,t=!0,i=[]){return Ff(e,this,i,t),i.sort(jp),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Ff(e[r],this,i,t);return i.sort(jp),i}}function jp(n,e){return n.distance-e.distance}function Ff(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)Ff(s[o],e,t,!0)}}const cd=class cd{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};cd.prototype.isMatrix2=!0;let Kp=cd;function Zp(n,e,t,i){const r=BT(i);switch(t){case l0:return n*e;case u0:return n*e/r.components*r.byteLength;case Lh:return n*e/r.components*r.byteLength;case os:return n*e*2/r.components*r.byteLength;case Dh:return n*e*2/r.components*r.byteLength;case c0:return n*e*3/r.components*r.byteLength;case ei:return n*e*4/r.components*r.byteLength;case Ih:return n*e*4/r.components*r.byteLength;case rl:case sl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ol:case al:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case sf:case af:return Math.max(n,16)*Math.max(e,8)/4;case rf:case of:return Math.max(n,8)*Math.max(e,8)/2;case lf:case cf:case ff:case hf:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case uf:case Cl:case df:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case pf:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case mf:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case _f:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case gf:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case vf:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case xf:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Sf:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case yf:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Mf:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case bf:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ef:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Tf:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Af:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case wf:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Rf:case Cf:case Pf:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Lf:case Df:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Pl:case If:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function BT(n){switch(n){case Gn:case r0:return{byteLength:1,components:1};case Ko:case s0:case ji:return{byteLength:2,components:1};case Ch:case Ph:return{byteLength:2,components:4};case wi:case Rh:case Si:return{byteLength:4,components:1};case o0:case a0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wh}}));typeof window<"u"&&(window.__THREE__?ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function b0(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function kT(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,p)=>d.start-p.start);let h=0;for(let d=1;d<f.length;d++){const p=f[h],_=f[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,p=f.length;d<p;d++){const _=f[d];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var HT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,VT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,GT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,WT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,XT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qT=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,YT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$T=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,jT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,KT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ZT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,JT=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,QT=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,e1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,t1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,n1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,i1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,r1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,s1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,o1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,a1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,l1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,c1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,u1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,f1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,h1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,d1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,p1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,m1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_1="gl_FragColor = linearToOutputTexel( gl_FragColor );",g1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,v1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,x1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,S1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,y1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,M1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,b1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,E1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,T1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,A1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,w1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,R1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,C1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,P1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,L1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,D1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,I1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,U1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,N1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,F1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,O1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,B1=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,k1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,H1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,z1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,V1=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,G1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,W1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,X1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,q1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Y1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,j1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,K1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Z1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,J1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Q1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,eA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nA=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,iA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,sA=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,oA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,aA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cA=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,uA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,_A=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,SA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,MA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,bA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,EA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,TA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,AA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,RA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,CA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,PA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,LA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,DA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,IA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,UA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,NA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,FA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,OA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,BA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,kA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const HA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,VA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,GA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,XA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,YA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,$A=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,KA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ZA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,JA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,QA=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ew=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,tw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,sw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ow=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,aw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,lw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,fw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,mw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_w=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:HT,alphahash_pars_fragment:zT,alphamap_fragment:VT,alphamap_pars_fragment:GT,alphatest_fragment:WT,alphatest_pars_fragment:XT,aomap_fragment:qT,aomap_pars_fragment:YT,batching_pars_vertex:$T,batching_vertex:jT,begin_vertex:KT,beginnormal_vertex:ZT,bsdfs:JT,iridescence_fragment:QT,bumpmap_pars_fragment:e1,clipping_planes_fragment:t1,clipping_planes_pars_fragment:n1,clipping_planes_pars_vertex:i1,clipping_planes_vertex:r1,color_fragment:s1,color_pars_fragment:o1,color_pars_vertex:a1,color_vertex:l1,common:c1,cube_uv_reflection_fragment:u1,defaultnormal_vertex:f1,displacementmap_pars_vertex:h1,displacementmap_vertex:d1,emissivemap_fragment:p1,emissivemap_pars_fragment:m1,colorspace_fragment:_1,colorspace_pars_fragment:g1,envmap_fragment:v1,envmap_common_pars_fragment:x1,envmap_pars_fragment:S1,envmap_pars_vertex:y1,envmap_physical_pars_fragment:D1,envmap_vertex:M1,fog_vertex:b1,fog_pars_vertex:E1,fog_fragment:T1,fog_pars_fragment:A1,gradientmap_pars_fragment:w1,lightmap_pars_fragment:R1,lights_lambert_fragment:C1,lights_lambert_pars_fragment:P1,lights_pars_begin:L1,lights_toon_fragment:I1,lights_toon_pars_fragment:U1,lights_phong_fragment:N1,lights_phong_pars_fragment:F1,lights_physical_fragment:O1,lights_physical_pars_fragment:B1,lights_fragment_begin:k1,lights_fragment_maps:H1,lights_fragment_end:z1,lightprobes_pars_fragment:V1,logdepthbuf_fragment:G1,logdepthbuf_pars_fragment:W1,logdepthbuf_pars_vertex:X1,logdepthbuf_vertex:q1,map_fragment:Y1,map_pars_fragment:$1,map_particle_fragment:j1,map_particle_pars_fragment:K1,metalnessmap_fragment:Z1,metalnessmap_pars_fragment:J1,morphinstance_vertex:Q1,morphcolor_vertex:eA,morphnormal_vertex:tA,morphtarget_pars_vertex:nA,morphtarget_vertex:iA,normal_fragment_begin:rA,normal_fragment_maps:sA,normal_pars_fragment:oA,normal_pars_vertex:aA,normal_vertex:lA,normalmap_pars_fragment:cA,clearcoat_normal_fragment_begin:uA,clearcoat_normal_fragment_maps:fA,clearcoat_pars_fragment:hA,iridescence_pars_fragment:dA,opaque_fragment:pA,packing:mA,premultiplied_alpha_fragment:_A,project_vertex:gA,dithering_fragment:vA,dithering_pars_fragment:xA,roughnessmap_fragment:SA,roughnessmap_pars_fragment:yA,shadowmap_pars_fragment:MA,shadowmap_pars_vertex:bA,shadowmap_vertex:EA,shadowmask_pars_fragment:TA,skinbase_vertex:AA,skinning_pars_vertex:wA,skinning_vertex:RA,skinnormal_vertex:CA,specularmap_fragment:PA,specularmap_pars_fragment:LA,tonemapping_fragment:DA,tonemapping_pars_fragment:IA,transmission_fragment:UA,transmission_pars_fragment:NA,uv_pars_fragment:FA,uv_pars_vertex:OA,uv_vertex:BA,worldpos_vertex:kA,background_vert:HA,background_frag:zA,backgroundCube_vert:VA,backgroundCube_frag:GA,cube_vert:WA,cube_frag:XA,depth_vert:qA,depth_frag:YA,distance_vert:$A,distance_frag:jA,equirect_vert:KA,equirect_frag:ZA,linedashed_vert:JA,linedashed_frag:QA,meshbasic_vert:ew,meshbasic_frag:tw,meshlambert_vert:nw,meshlambert_frag:iw,meshmatcap_vert:rw,meshmatcap_frag:sw,meshnormal_vert:ow,meshnormal_frag:aw,meshphong_vert:lw,meshphong_frag:cw,meshphysical_vert:uw,meshphysical_frag:fw,meshtoon_vert:hw,meshtoon_frag:dw,points_vert:pw,points_frag:mw,shadow_vert:_w,shadow_frag:gw,sprite_vert:vw,sprite_frag:xw},Re={common:{diffuse:{value:new ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new ht(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},pi={basic:{uniforms:ln([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:ln([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new ht(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:ln([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new ht(0)},specular:{value:new ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:ln([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:ln([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new ht(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:ln([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:ln([Re.points,Re.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:ln([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:ln([Re.common,Re.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:ln([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:ln([Re.sprite,Re.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:ln([Re.common,Re.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:ln([Re.lights,Re.fog,{color:{value:new ht(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};pi.physical={uniforms:ln([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new ht(0)},specularColor:{value:new ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const Ka={r:0,b:0,g:0},Sw=new Bt,E0=new Ge;E0.set(-1,0,0,0,1,0,0,0,1);function yw(n,e,t,i,r,s){const o=new ht(0);let a=r===!0?0:1,l,c,u=null,f=0,h=null;function d(y){let v=y.isScene===!0?y.background:null;if(v&&v.isTexture){const S=y.backgroundBlurriness>0;v=e.get(v,S)}return v}function p(y){let v=!1;const S=d(y);S===null?m(o,a):S&&S.isColor&&(m(S,1),v=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,s):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(y,v){const S=d(v);S&&(S.isCubeTexture||S.mapping===nc)?(c===void 0&&(c=new ii(new fo(1,1,1),new ri({name:"BackgroundCubeMaterial",uniforms:eo(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Sw.makeRotationFromEuler(v.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(E0),c.material.toneMapped=Qe.getTransfer(S.colorSpace)!==ct,(u!==S||f!==S.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,f=S.version,h=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new ii(new ga(2,2),new ri({name:"BackgroundMaterial",uniforms:eo(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:Er,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Qe.getTransfer(S.colorSpace)!==ct,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,f=S.version,h=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,v){y.getRGB(Ka,S0(n)),t.buffers.color.setClear(Ka.r,Ka.g,Ka.b,v,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,v=1){o.set(y),a=v,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,m(o,a)},render:p,addToRenderList:_,dispose:g}}function Mw(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(P,D,B,z,N){let U=!1;const O=f(P,z,B,D);s!==O&&(s=O,c(s.object)),U=d(P,z,B,N),U&&p(P,z,B,N),N!==null&&e.update(N,n.ELEMENT_ARRAY_BUFFER),(U||o)&&(o=!1,S(P,D,B,z),N!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function u(P){return n.deleteVertexArray(P)}function f(P,D,B,z){const N=z.wireframe===!0;let U=i[D.id];U===void 0&&(U={},i[D.id]=U);const O=P.isInstancedMesh===!0?P.id:0;let G=U[O];G===void 0&&(G={},U[O]=G);let ne=G[B.id];ne===void 0&&(ne={},G[B.id]=ne);let ge=ne[N];return ge===void 0&&(ge=h(l()),ne[N]=ge),ge}function h(P){const D=[],B=[],z=[];for(let N=0;N<t;N++)D[N]=0,B[N]=0,z[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:B,attributeDivisors:z,object:P,attributes:{},index:null}}function d(P,D,B,z){const N=s.attributes,U=D.attributes;let O=0;const G=B.getAttributes();for(const ne in G)if(G[ne].location>=0){const Ee=N[ne];let Te=U[ne];if(Te===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(Te=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(Te=P.instanceColor)),Ee===void 0||Ee.attribute!==Te||Te&&Ee.data!==Te.data)return!0;O++}return s.attributesNum!==O||s.index!==z}function p(P,D,B,z){const N={},U=D.attributes;let O=0;const G=B.getAttributes();for(const ne in G)if(G[ne].location>=0){let Ee=U[ne];Ee===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(Ee=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(Ee=P.instanceColor));const Te={};Te.attribute=Ee,Ee&&Ee.data&&(Te.data=Ee.data),N[ne]=Te,O++}s.attributes=N,s.attributesNum=O,s.index=z}function _(){const P=s.newAttributes;for(let D=0,B=P.length;D<B;D++)P[D]=0}function m(P){g(P,0)}function g(P,D){const B=s.newAttributes,z=s.enabledAttributes,N=s.attributeDivisors;B[P]=1,z[P]===0&&(n.enableVertexAttribArray(P),z[P]=1),N[P]!==D&&(n.vertexAttribDivisor(P,D),N[P]=D)}function y(){const P=s.newAttributes,D=s.enabledAttributes;for(let B=0,z=D.length;B<z;B++)D[B]!==P[B]&&(n.disableVertexAttribArray(B),D[B]=0)}function v(P,D,B,z,N,U,O){O===!0?n.vertexAttribIPointer(P,D,B,N,U):n.vertexAttribPointer(P,D,B,z,N,U)}function S(P,D,B,z){_();const N=z.attributes,U=B.getAttributes(),O=D.defaultAttributeValues;for(const G in U){const ne=U[G];if(ne.location>=0){let ge=N[G];if(ge===void 0&&(G==="instanceMatrix"&&P.instanceMatrix&&(ge=P.instanceMatrix),G==="instanceColor"&&P.instanceColor&&(ge=P.instanceColor)),ge!==void 0){const Ee=ge.normalized,Te=ge.itemSize,Ye=e.get(ge);if(Ye===void 0)continue;const We=Ye.buffer,Be=Ye.type,le=Ye.bytesPerElement,ee=Be===n.INT||Be===n.UNSIGNED_INT||ge.gpuType===Rh;if(ge.isInterleavedBufferAttribute){const K=ge.data,ye=K.stride,fe=ge.offset;if(K.isInstancedInterleavedBuffer){for(let ve=0;ve<ne.locationSize;ve++)g(ne.location+ve,K.meshPerAttribute);P.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ve=0;ve<ne.locationSize;ve++)m(ne.location+ve);n.bindBuffer(n.ARRAY_BUFFER,We);for(let ve=0;ve<ne.locationSize;ve++)v(ne.location+ve,Te/ne.locationSize,Be,Ee,ye*le,(fe+Te/ne.locationSize*ve)*le,ee)}else{if(ge.isInstancedBufferAttribute){for(let K=0;K<ne.locationSize;K++)g(ne.location+K,ge.meshPerAttribute);P.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let K=0;K<ne.locationSize;K++)m(ne.location+K);n.bindBuffer(n.ARRAY_BUFFER,We);for(let K=0;K<ne.locationSize;K++)v(ne.location+K,Te/ne.locationSize,Be,Ee,Te*le,Te/ne.locationSize*K*le,ee)}}else if(O!==void 0){const Ee=O[G];if(Ee!==void 0)switch(Ee.length){case 2:n.vertexAttrib2fv(ne.location,Ee);break;case 3:n.vertexAttrib3fv(ne.location,Ee);break;case 4:n.vertexAttrib4fv(ne.location,Ee);break;default:n.vertexAttrib1fv(ne.location,Ee)}}}}y()}function E(){b();for(const P in i){const D=i[P];for(const B in D){const z=D[B];for(const N in z){const U=z[N];for(const O in U)u(U[O].object),delete U[O];delete z[N]}}delete i[P]}}function T(P){if(i[P.id]===void 0)return;const D=i[P.id];for(const B in D){const z=D[B];for(const N in z){const U=z[N];for(const O in U)u(U[O].object),delete U[O];delete z[N]}}delete i[P.id]}function R(P){for(const D in i){const B=i[D];for(const z in B){const N=B[z];if(N[P.id]===void 0)continue;const U=N[P.id];for(const O in U)u(U[O].object),delete U[O];delete N[P.id]}}}function x(P){for(const D in i){const B=i[D],z=P.isInstancedMesh===!0?P.id:0,N=B[z];if(N!==void 0){for(const U in N){const O=N[U];for(const G in O)u(O[G].object),delete O[G];delete N[U]}delete B[z],Object.keys(B).length===0&&delete i[D]}}}function b(){C(),o=!0,s!==r&&(s=r,c(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:b,resetDefaultState:C,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function bw(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let d=0;d<u;d++)h+=c[d];t.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function Ew(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==ei&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const x=R===ji&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Gn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Si&&!x)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(ze("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:S,maxSamples:E,samples:T}}function Tw(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Vr,a=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||r;return r=h,i=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const p=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,g=n.get(f);if(!r||p===null||p.length===0||s&&!m)s?u(null):c();else{const y=s?0:i,v=y*4;let S=g.clippingState||null;l.value=S,S=u(p,h,v,d);for(let E=0;E!==v;++E)S[E]=t[E];g.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,d,p){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,p!==!0||m===null){const g=d+_*4,y=h.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<g)&&(m=new Float32Array(g));for(let v=0,S=d;v!==_;++v,S+=4)o.copy(f[v]).applyMatrix4(y,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const _r=4,Jp=[.125,.215,.35,.446,.526,.582],Xr=20,Aw=256,Mo=new M0,Qp=new ht;let iu=null,ru=0,su=0,ou=!1;const ww=new Y;class em{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=ww}=s;iu=this._renderer.getRenderTarget(),ru=this._renderer.getActiveCubeFace(),su=this._renderer.getActiveMipmapLevel(),ou=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=im(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(iu,ru,su),this._renderer.xr.enabled=ou,e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ss||e.mapping===Js?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),iu=this._renderer.getRenderTarget(),ru=this._renderer.getActiveCubeFace(),su=this._renderer.getActiveMipmapLevel(),ou=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ot,minFilter:Ot,generateMipmaps:!1,type:ji,format:ei,colorSpace:Ll,depthBuffer:!1},r=tm(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tm(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Rw(s)),this._blurMaterial=Pw(s,e,t),this._ggxMaterial=Cw(s,e,t)}return r}_compileMaterial(e){const t=new ii(new er,e);this._renderer.compile(t,Mo)}_sceneToCubeUV(e,t,i,r,s){const l=new Vn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Qp),f.toneMapping=Ei,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ii(new fo,new kh({name:"PMREM.Background",side:_n,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let g=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,g=!0):(m.color.copy(Qp),g=!0);for(let v=0;v<6;v++){const S=v%3;S===0?(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[v],s.y,s.z)):S===1?(l.up.set(0,0,c[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[v],s.z)):(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[v]));const E=this._cubeSize;Cs(r,S*E,v>2?E:0,E,E),f.setRenderTarget(r),g&&f.render(_,l),f.render(e,l)}f.toneMapping=d,f.autoClear=h,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ss||e.mapping===Js;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=im()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nm());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Cs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Mo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=0+c*1.25,d=f*h,{_lodMax:p}=this,_=this._sizeLods[i],m=3*_*(i>p-_r?i-p+_r:0),g=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=p-t,Cs(s,m,g,3*_,2*_),r.setRenderTarget(s),r.render(a,Mo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-i,Cs(e,m,g,3*_,2*_),r.setRenderTarget(e),r.render(a,Mo)}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&nt("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[r];f.material=c;const h=c.uniforms,d=this._sizeLods[i]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Xr-1),_=s/p,m=isFinite(s)?1+Math.floor(u*_):Xr;m>Xr&&ze(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Xr}`);const g=[];let y=0;for(let R=0;R<Xr;++R){const x=R/_,b=Math.exp(-x*x/2);g.push(b),R===0?y+=b:R<m&&(y+=2*b)}for(let R=0;R<g.length;R++)g[R]=g[R]/y;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=g,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:v}=this;h.dTheta.value=p,h.mipInt.value=v-i;const S=this._sizeLods[r],E=3*S*(r>v-_r?r-v+_r:0),T=4*(this._cubeSize-S);Cs(t,E,T,3*S,2*S),l.setRenderTarget(t),l.render(f,Mo)}}function Rw(n){const e=[],t=[],i=[];let r=n;const s=n-_r+1+Jp.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-_r?l=Jp[o-n+_r-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,p=6,_=3,m=2,g=1,y=new Float32Array(_*p*d),v=new Float32Array(m*p*d),S=new Float32Array(g*p*d);for(let T=0;T<d;T++){const R=T%3*2/3-1,x=T>2?0:-1,b=[R,x,0,R+2/3,x,0,R+2/3,x+1,0,R,x,0,R+2/3,x+1,0,R,x+1,0];y.set(b,_*p*T),v.set(h,m*p*T);const C=[T,T,T,T,T,T];S.set(C,g*p*T)}const E=new er;E.setAttribute("position",new Ai(y,_)),E.setAttribute("uv",new Ai(v,m)),E.setAttribute("faceIndex",new Ai(S,g)),i.push(new ii(E,null)),r>_r&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function tm(n,e,t){const i=new Ti(n,e,t);return i.texture.mapping=nc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Cs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Cw(n,e,t){return new ri({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Aw,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:rc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function Pw(n,e,t){const i=new Float32Array(Xr),r=new Y(0,1,0);return new ri({name:"SphericalGaussianBlur",defines:{n:Xr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function nm(){return new ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function im(){return new ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function rc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class T0 extends Ti{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new v0(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new fo(5,5,5),s=new ri({name:"CubemapFromEquirect",uniforms:eo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:_n,blending:Vi});s.uniforms.tEquirect.value=t;const o=new ii(r,s),a=t.minFilter;return t.minFilter===qr&&(t.minFilter=Ot),new NT(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}function Lw(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,d=!1){return h==null?null:d?o(h):s(h)}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===Cc||d===Pc)if(e.has(h)){const p=e.get(h).texture;return a(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const _=new T0(p.height);return _.fromEquirectangularTexture(n,h),e.set(h,_),h.addEventListener("dispose",c),a(_.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){const d=h.mapping,p=d===Cc||d===Pc,_=d===ss||d===Js;if(p||_){let m=t.get(h);const g=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==g)return i===null&&(i=new em(n)),m=p?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const y=h.image;return p&&y&&y.height>0||_&&y&&l(y)?(i===null&&(i=new em(n)),m=p?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function a(h,d){return d===Cc?h.mapping=ss:d===Pc&&(h.mapping=Js),h}function l(h){let d=0;const p=6;for(let _=0;_<p;_++)h[_]!==void 0&&d++;return d===p}function c(h){const d=h.target;d.removeEventListener("dispose",c);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function Dw(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Uf("WebGLRenderer: "+i+" extension not supported."),r}}}function Iw(n,e,t,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const p in h.attributes)e.remove(h.attributes[p]);h.removeEventListener("dispose",o),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const d in h)e.update(h[d],n.ARRAY_BUFFER)}function c(f){const h=[],d=f.index,p=f.attributes.position;let _=0;if(p===void 0)return;if(d!==null){const y=d.array;_=d.version;for(let v=0,S=y.length;v<S;v+=3){const E=y[v+0],T=y[v+1],R=y[v+2];h.push(E,T,T,R,R,E)}}else{const y=p.array;_=p.version;for(let v=0,S=y.length/3-1;v<S;v+=3){const E=v+0,T=v+1,R=v+2;h.push(E,T,T,R,R,E)}}const m=new(p.count>=65535?m0:p0)(h,1);m.version=_;const g=s.get(f);g&&e.remove(g),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function Uw(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,h){n.drawElements(i,h,s,f*o),t.update(h,i,1)}function c(f,h,d){d!==0&&(n.drawElementsInstanced(i,h,s,f*o,d),t.update(h,i,d))}function u(f,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,d);let _=0;for(let m=0;m<d;m++)_+=h[m];t.update(_,i,1)}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Nw(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:nt("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Fw(n,e,t){const i=new WeakMap,r=new It;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let b=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();const d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let v=0;d===!0&&(v=1),p===!0&&(v=2),_===!0&&(v=3);let S=a.attributes.position.count*v,E=1;S>e.maxTextureSize&&(E=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const T=new Float32Array(S*E*4*f),R=new h0(T,S,E,f);R.type=Si,R.needsUpdate=!0;const x=v*4;for(let C=0;C<f;C++){const P=m[C],D=g[C],B=y[C],z=S*E*4*C;for(let N=0;N<P.count;N++){const U=N*x;d===!0&&(r.fromBufferAttribute(P,N),T[z+U+0]=r.x,T[z+U+1]=r.y,T[z+U+2]=r.z,T[z+U+3]=0),p===!0&&(r.fromBufferAttribute(D,N),T[z+U+4]=r.x,T[z+U+5]=r.y,T[z+U+6]=r.z,T[z+U+7]=0),_===!0&&(r.fromBufferAttribute(B,N),T[z+U+8]=r.x,T[z+U+9]=r.y,T[z+U+10]=r.z,T[z+U+11]=B.itemSize===4?r.w:1)}}h={count:f,texture:R,size:new ot(S,E)},i.set(a,h),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];const p=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",p),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function Ow(n,e,t,i,r){let s=new WeakMap;function o(c){const u=r.render.frame,f=c.geometry,h=e.get(c,f);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function a(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}const Bw={[Kg]:"LINEAR_TONE_MAPPING",[Zg]:"REINHARD_TONE_MAPPING",[Jg]:"CINEON_TONE_MAPPING",[Qg]:"ACES_FILMIC_TONE_MAPPING",[t0]:"AGX_TONE_MAPPING",[n0]:"NEUTRAL_TONE_MAPPING",[e0]:"CUSTOM_TONE_MAPPING"};function kw(n,e,t,i,r){const s=new Ti(e,t,{type:n,depthBuffer:i,stencilBuffer:r,depthTexture:i?new Qs(e,t):void 0}),o=new Ti(e,t,{type:ji,depthBuffer:!1,stencilBuffer:!1}),a=new er;a.setAttribute("position",new Wi([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Wi([0,2,0,0,2,0],2));const l=new RT({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new ii(a,l),u=new M0(-1,1,1,-1,0,1);let f=null,h=null,d=!1,p,_=null,m=[],g=!1;this.setSize=function(y,v){s.setSize(y,v),o.setSize(y,v);for(let S=0;S<m.length;S++){const E=m[S];E.setSize&&E.setSize(y,v)}},this.setEffects=function(y){m=y,g=m.length>0&&m[0].isRenderPass===!0;const v=s.width,S=s.height;for(let E=0;E<m.length;E++){const T=m[E];T.setSize&&T.setSize(v,S)}},this.begin=function(y,v){if(d||y.toneMapping===Ei&&m.length===0)return!1;if(_=v,v!==null){const S=v.width,E=v.height;(s.width!==S||s.height!==E)&&this.setSize(S,E)}return g===!1&&y.setRenderTarget(s),p=y.toneMapping,y.toneMapping=Ei,!0},this.hasRenderPass=function(){return g},this.end=function(y,v){y.toneMapping=p,d=!0;let S=s,E=o;for(let T=0;T<m.length;T++){const R=m[T];if(R.enabled!==!1&&(R.render(y,E,S,v),R.needsSwap!==!1)){const x=S;S=E,E=x}}if(f!==y.outputColorSpace||h!==y.toneMapping){f=y.outputColorSpace,h=y.toneMapping,l.defines={},Qe.getTransfer(f)===ct&&(l.defines.SRGB_TRANSFER="");const T=Bw[h];T&&(l.defines[T]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,y.setRenderTarget(_),y.render(c,u),_=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),a.dispose(),l.dispose()}}const A0=new qt,Of=new Qs(1,1),w0=new h0,R0=new iT,C0=new v0,rm=[],sm=[],om=new Float32Array(16),am=new Float32Array(9),lm=new Float32Array(4);function ho(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=rm[r];if(s===void 0&&(s=new Float32Array(r),rm[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Vt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Gt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function sc(n,e){let t=sm[e];t===void 0&&(t=new Int32Array(e),sm[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Hw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function zw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2fv(this.addr,e),Gt(t,e)}}function Vw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;n.uniform3fv(this.addr,e),Gt(t,e)}}function Gw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4fv(this.addr,e),Gt(t,e)}}function Ww(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,i))return;lm.set(i),n.uniformMatrix2fv(this.addr,!1,lm),Gt(t,i)}}function Xw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,i))return;am.set(i),n.uniformMatrix3fv(this.addr,!1,am),Gt(t,i)}}function qw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,i))return;om.set(i),n.uniformMatrix4fv(this.addr,!1,om),Gt(t,i)}}function Yw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function $w(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2iv(this.addr,e),Gt(t,e)}}function jw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;n.uniform3iv(this.addr,e),Gt(t,e)}}function Kw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4iv(this.addr,e),Gt(t,e)}}function Zw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Jw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2uiv(this.addr,e),Gt(t,e)}}function Qw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;n.uniform3uiv(this.addr,e),Gt(t,e)}}function eR(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4uiv(this.addr,e),Gt(t,e)}}function tR(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Of.compareFunction=t.isReversedDepthBuffer()?Nh:Uh,s=Of):s=A0,t.setTexture2D(e||s,r)}function nR(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||R0,r)}function iR(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||C0,r)}function rR(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||w0,r)}function sR(n){switch(n){case 5126:return Hw;case 35664:return zw;case 35665:return Vw;case 35666:return Gw;case 35674:return Ww;case 35675:return Xw;case 35676:return qw;case 5124:case 35670:return Yw;case 35667:case 35671:return $w;case 35668:case 35672:return jw;case 35669:case 35673:return Kw;case 5125:return Zw;case 36294:return Jw;case 36295:return Qw;case 36296:return eR;case 35678:case 36198:case 36298:case 36306:case 35682:return tR;case 35679:case 36299:case 36307:return nR;case 35680:case 36300:case 36308:case 36293:return iR;case 36289:case 36303:case 36311:case 36292:return rR}}function oR(n,e){n.uniform1fv(this.addr,e)}function aR(n,e){const t=ho(e,this.size,2);n.uniform2fv(this.addr,t)}function lR(n,e){const t=ho(e,this.size,3);n.uniform3fv(this.addr,t)}function cR(n,e){const t=ho(e,this.size,4);n.uniform4fv(this.addr,t)}function uR(n,e){const t=ho(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function fR(n,e){const t=ho(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function hR(n,e){const t=ho(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function dR(n,e){n.uniform1iv(this.addr,e)}function pR(n,e){n.uniform2iv(this.addr,e)}function mR(n,e){n.uniform3iv(this.addr,e)}function _R(n,e){n.uniform4iv(this.addr,e)}function gR(n,e){n.uniform1uiv(this.addr,e)}function vR(n,e){n.uniform2uiv(this.addr,e)}function xR(n,e){n.uniform3uiv(this.addr,e)}function SR(n,e){n.uniform4uiv(this.addr,e)}function yR(n,e,t){const i=this.cache,r=e.length,s=sc(t,r);Vt(i,s)||(n.uniform1iv(this.addr,s),Gt(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=Of:o=A0;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function MR(n,e,t){const i=this.cache,r=e.length,s=sc(t,r);Vt(i,s)||(n.uniform1iv(this.addr,s),Gt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||R0,s[o])}function bR(n,e,t){const i=this.cache,r=e.length,s=sc(t,r);Vt(i,s)||(n.uniform1iv(this.addr,s),Gt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||C0,s[o])}function ER(n,e,t){const i=this.cache,r=e.length,s=sc(t,r);Vt(i,s)||(n.uniform1iv(this.addr,s),Gt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||w0,s[o])}function TR(n){switch(n){case 5126:return oR;case 35664:return aR;case 35665:return lR;case 35666:return cR;case 35674:return uR;case 35675:return fR;case 35676:return hR;case 5124:case 35670:return dR;case 35667:case 35671:return pR;case 35668:case 35672:return mR;case 35669:case 35673:return _R;case 5125:return gR;case 36294:return vR;case 36295:return xR;case 36296:return SR;case 35678:case 36198:case 36298:case 36306:case 35682:return yR;case 35679:case 36299:case 36307:return MR;case 35680:case 36300:case 36308:case 36293:return bR;case 36289:case 36303:case 36311:case 36292:return ER}}class AR{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=sR(t.type)}}class wR{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=TR(t.type)}}class RR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const au=/(\w+)(\])?(\[|\.)?/g;function cm(n,e){n.seq.push(e),n.map[e.id]=e}function CR(n,e,t){const i=n.name,r=i.length;for(au.lastIndex=0;;){const s=au.exec(i),o=au.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){cm(t,c===void 0?new AR(a,n,e):new wR(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new RR(a),cm(t,f)),t=f}}}class ll{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);CR(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function um(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const PR=37297;let LR=0;function DR(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const fm=new Ge;function IR(n){Qe._getMatrix(fm,Qe.workingColorSpace,n);const e=`mat3( ${fm.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case Dl:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return ze("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function hm(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+DR(n.getShaderSource(e),a)}else return s}function UR(n,e){const t=IR(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const NR={[Kg]:"Linear",[Zg]:"Reinhard",[Jg]:"Cineon",[Qg]:"ACESFilmic",[t0]:"AgX",[n0]:"Neutral",[e0]:"Custom"};function FR(n,e){const t=NR[e];return t===void 0?(ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Za=new Y;function OR(){Qe.getLuminanceCoefficients(Za);const n=Za.x.toFixed(4),e=Za.y.toFixed(4),t=Za.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function BR(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ro).join(`
`)}function kR(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function HR(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Ro(n){return n!==""}function dm(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pm(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const zR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bf(n){return n.replace(zR,GR)}const VR=new Map;function GR(n,e){let t=je[e];if(t===void 0){const i=VR.get(e);if(i!==void 0)t=je[i],ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Bf(t)}const WR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mm(n){return n.replace(WR,XR)}function XR(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function _m(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const qR={[il]:"SHADOWMAP_TYPE_PCF",[wo]:"SHADOWMAP_TYPE_VSM"};function YR(n){return qR[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const $R={[ss]:"ENVMAP_TYPE_CUBE",[Js]:"ENVMAP_TYPE_CUBE",[nc]:"ENVMAP_TYPE_CUBE_UV"};function jR(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":$R[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const KR={[Js]:"ENVMAP_MODE_REFRACTION"};function ZR(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":KR[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const JR={[jg]:"ENVMAP_BLENDING_MULTIPLY",[FE]:"ENVMAP_BLENDING_MIX",[OE]:"ENVMAP_BLENDING_ADD"};function QR(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":JR[n.combine]||"ENVMAP_BLENDING_NONE"}function eC(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function tC(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=YR(t),c=jR(t),u=ZR(t),f=QR(t),h=eC(t),d=BR(t),p=kR(s),_=r.createProgram();let m,g,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ro).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ro).join(`
`),g.length>0&&(g+=`
`)):(m=[_m(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ro).join(`
`),g=[_m(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ei?"#define TONE_MAPPING":"",t.toneMapping!==Ei?je.tonemapping_pars_fragment:"",t.toneMapping!==Ei?FR("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,UR("linearToOutputTexel",t.outputColorSpace),OR(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ro).join(`
`)),o=Bf(o),o=dm(o,t),o=pm(o,t),a=Bf(a),a=dm(a,t),a=pm(a,t),o=mm(o),a=mm(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===wp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const v=y+m+o,S=y+g+a,E=um(r,r.VERTEX_SHADER,v),T=um(r,r.FRAGMENT_SHADER,S);r.attachShader(_,E),r.attachShader(_,T),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(P){if(n.debug.checkShaderErrors){const D=r.getProgramInfoLog(_)||"",B=r.getShaderInfoLog(E)||"",z=r.getShaderInfoLog(T)||"",N=D.trim(),U=B.trim(),O=z.trim();let G=!0,ne=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(G=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,E,T);else{const ge=hm(r,E,"vertex"),Ee=hm(r,T,"fragment");nt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+N+`
`+ge+`
`+Ee)}else N!==""?ze("WebGLProgram: Program Info Log:",N):(U===""||O==="")&&(ne=!1);ne&&(P.diagnostics={runnable:G,programLog:N,vertexShader:{log:U,prefix:m},fragmentShader:{log:O,prefix:g}})}r.deleteShader(E),r.deleteShader(T),x=new ll(r,_),b=HR(r,_)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(_,PR)),C},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=LR++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=T,this}let nC=0;class iC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new rC(e),t.set(e,i)),i}}class rC{constructor(e){this.id=nC++,this.code=e,this.usedTimes=0}}function sC(n){return n===os||n===Cl||n===Pl}function oC(n,e,t,i,r,s){const o=new Oh,a=new iC,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return l.add(x),x===0?"uv":`uv${x}`}function _(x,b,C,P,D,B){const z=P.fog,N=D.geometry,U=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,O=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,G=e.get(x.envMap||U,O),ne=G&&G.mapping===nc?G.image.height:null,ge=d[x.type];x.precision!==null&&(h=i.getMaxPrecision(x.precision),h!==x.precision&&ze("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));const Ee=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Te=Ee!==void 0?Ee.length:0;let Ye=0;N.morphAttributes.position!==void 0&&(Ye=1),N.morphAttributes.normal!==void 0&&(Ye=2),N.morphAttributes.color!==void 0&&(Ye=3);let We,Be,le,ee;if(ge){const Xe=pi[ge];We=Xe.vertexShader,Be=Xe.fragmentShader}else We=x.vertexShader,Be=x.fragmentShader,a.update(x),le=a.getVertexShaderID(x),ee=a.getFragmentShaderID(x);const K=n.getRenderTarget(),ye=n.state.buffers.depth.getReversed(),fe=D.isInstancedMesh===!0,ve=D.isBatchedMesh===!0,Je=!!x.map,L=!!x.matcap,F=!!G,W=!!x.aoMap,te=!!x.lightMap,re=!!x.bumpMap,ie=!!x.normalMap,de=!!x.displacementMap,I=!!x.emissiveMap,ue=!!x.metalnessMap,J=!!x.roughnessMap,Ae=x.anisotropy>0,$=x.clearcoat>0,be=x.dispersion>0,w=x.iridescence>0,M=x.sheen>0,H=x.transmission>0,Z=Ae&&!!x.anisotropyMap,se=$&&!!x.clearcoatMap,ce=$&&!!x.clearcoatNormalMap,pe=$&&!!x.clearcoatRoughnessMap,Q=w&&!!x.iridescenceMap,oe=w&&!!x.iridescenceThicknessMap,we=M&&!!x.sheenColorMap,Me=M&&!!x.sheenRoughnessMap,me=!!x.specularMap,_e=!!x.specularColorMap,He=!!x.specularIntensityMap,$e=H&&!!x.transmissionMap,rt=H&&!!x.thicknessMap,k=!!x.gradientMap,xe=!!x.alphaMap,ae=x.alphaTest>0,Le=!!x.alphaHash,Se=!!x.extensions;let he=Ei;x.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(he=n.toneMapping);const Ne={shaderID:ge,shaderType:x.type,shaderName:x.name,vertexShader:We,fragmentShader:Be,defines:x.defines,customVertexShaderID:le,customFragmentShaderID:ee,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:ve,batchingColor:ve&&D._colorsTexture!==null,instancing:fe,instancingColor:fe&&D.instanceColor!==null,instancingMorph:fe&&D.morphTexture!==null,outputColorSpace:K===null?n.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Qe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Je,matcap:L,envMap:F,envMapMode:F&&G.mapping,envMapCubeUVHeight:ne,aoMap:W,lightMap:te,bumpMap:re,normalMap:ie,displacementMap:de,emissiveMap:I,normalMapObjectSpace:ie&&x.normalMapType===HE,normalMapTangentSpace:ie&&x.normalMapType===Ep,packedNormalMap:ie&&x.normalMapType===Ep&&sC(x.normalMap.format),metalnessMap:ue,roughnessMap:J,anisotropy:Ae,anisotropyMap:Z,clearcoat:$,clearcoatMap:se,clearcoatNormalMap:ce,clearcoatRoughnessMap:pe,dispersion:be,iridescence:w,iridescenceMap:Q,iridescenceThicknessMap:oe,sheen:M,sheenColorMap:we,sheenRoughnessMap:Me,specularMap:me,specularColorMap:_e,specularIntensityMap:He,transmission:H,transmissionMap:$e,thicknessMap:rt,gradientMap:k,opaque:x.transparent===!1&&x.blending===Ws&&x.alphaToCoverage===!1,alphaMap:xe,alphaTest:ae,alphaHash:Le,combine:x.combine,mapUv:Je&&p(x.map.channel),aoMapUv:W&&p(x.aoMap.channel),lightMapUv:te&&p(x.lightMap.channel),bumpMapUv:re&&p(x.bumpMap.channel),normalMapUv:ie&&p(x.normalMap.channel),displacementMapUv:de&&p(x.displacementMap.channel),emissiveMapUv:I&&p(x.emissiveMap.channel),metalnessMapUv:ue&&p(x.metalnessMap.channel),roughnessMapUv:J&&p(x.roughnessMap.channel),anisotropyMapUv:Z&&p(x.anisotropyMap.channel),clearcoatMapUv:se&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:ce&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:we&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:Me&&p(x.sheenRoughnessMap.channel),specularMapUv:me&&p(x.specularMap.channel),specularColorMapUv:_e&&p(x.specularColorMap.channel),specularIntensityMapUv:He&&p(x.specularIntensityMap.channel),transmissionMapUv:$e&&p(x.transmissionMap.channel),thicknessMapUv:rt&&p(x.thicknessMap.channel),alphaMapUv:xe&&p(x.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(ie||Ae),vertexNormals:!!N.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!N.attributes.uv&&(Je||xe),fog:!!z,useFog:x.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||N.attributes.normal===void 0&&ie===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ye,skinning:D.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Ye,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:he,decodeVideoTexture:Je&&x.map.isVideoTexture===!0&&Qe.getTransfer(x.map.colorSpace)===ct,decodeVideoTextureEmissive:I&&x.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(x.emissiveMap.colorSpace)===ct,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===vi,flipSided:x.side===_n,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Se&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&x.extensions.multiDraw===!0||ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ne.vertexUv1s=l.has(1),Ne.vertexUv2s=l.has(2),Ne.vertexUv3s=l.has(3),l.clear(),Ne}function m(x){const b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(const C in x.defines)b.push(C),b.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(g(b,x),y(b,x),b.push(n.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function g(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function y(x,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),x.push(o.mask)}function v(x){const b=d[x.type];let C;if(b){const P=pi[b];C=TT.clone(P.uniforms)}else C=x.uniforms;return C}function S(x,b){let C=u.get(b);return C!==void 0?++C.usedTimes:(C=new tC(n,b,x,r),c.push(C),u.set(b,C)),C}function E(x){if(--x.usedTimes===0){const b=c.indexOf(x);c[b]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function T(x){a.remove(x)}function R(){a.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:v,acquireProgram:S,releaseProgram:E,releaseShaderCache:T,programs:c,dispose:R}}function aC(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function lC(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function gm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function vm(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function a(h,d,p,_,m,g){let y=n[e];return y===void 0?(y={id:h.id,object:h,geometry:d,material:p,materialVariant:o(h),groupOrder:_,renderOrder:h.renderOrder,z:m,group:g},n[e]=y):(y.id=h.id,y.object=h,y.geometry=d,y.material=p,y.materialVariant=o(h),y.groupOrder=_,y.renderOrder=h.renderOrder,y.z=m,y.group=g),e++,y}function l(h,d,p,_,m,g){const y=a(h,d,p,_,m,g);p.transmission>0?i.push(y):p.transparent===!0?r.push(y):t.push(y)}function c(h,d,p,_,m,g){const y=a(h,d,p,_,m,g);p.transmission>0?i.unshift(y):p.transparent===!0?r.unshift(y):t.unshift(y)}function u(h,d){t.length>1&&t.sort(h||lC),i.length>1&&i.sort(d||gm),r.length>1&&r.sort(d||gm)}function f(){for(let h=e,d=n.length;h<d;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function cC(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new vm,n.set(i,[o])):r>=s.length?(o=new vm,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function uC(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Y,color:new ht};break;case"SpotLight":t={position:new Y,direction:new Y,color:new ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new ht,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new ht,groundColor:new ht};break;case"RectAreaLight":t={color:new ht,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return n[e.id]=t,t}}}function fC(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let hC=0;function dC(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function pC(n){const e=new uC,t=fC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new Y);const r=new Y,s=new Bt,o=new Bt;function a(c){let u=0,f=0,h=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let d=0,p=0,_=0,m=0,g=0,y=0,v=0,S=0,E=0,T=0,R=0;c.sort(dC);for(let b=0,C=c.length;b<C;b++){const P=c[b],D=P.color,B=P.intensity,z=P.distance;let N=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===os?N=P.shadow.map.texture:N=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=D.r*B,f+=D.g*B,h+=D.b*B;else if(P.isLightProbe){for(let U=0;U<9;U++)i.probe[U].addScaledVector(P.sh.coefficients[U],B);R++}else if(P.isDirectionalLight){const U=e.get(P);if(U.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const O=P.shadow,G=t.get(P);G.shadowIntensity=O.intensity,G.shadowBias=O.bias,G.shadowNormalBias=O.normalBias,G.shadowRadius=O.radius,G.shadowMapSize=O.mapSize,i.directionalShadow[d]=G,i.directionalShadowMap[d]=N,i.directionalShadowMatrix[d]=P.shadow.matrix,y++}i.directional[d]=U,d++}else if(P.isSpotLight){const U=e.get(P);U.position.setFromMatrixPosition(P.matrixWorld),U.color.copy(D).multiplyScalar(B),U.distance=z,U.coneCos=Math.cos(P.angle),U.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),U.decay=P.decay,i.spot[_]=U;const O=P.shadow;if(P.map&&(i.spotLightMap[E]=P.map,E++,O.updateMatrices(P),P.castShadow&&T++),i.spotLightMatrix[_]=O.matrix,P.castShadow){const G=t.get(P);G.shadowIntensity=O.intensity,G.shadowBias=O.bias,G.shadowNormalBias=O.normalBias,G.shadowRadius=O.radius,G.shadowMapSize=O.mapSize,i.spotShadow[_]=G,i.spotShadowMap[_]=N,S++}_++}else if(P.isRectAreaLight){const U=e.get(P);U.color.copy(D).multiplyScalar(B),U.halfWidth.set(P.width*.5,0,0),U.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=U,m++}else if(P.isPointLight){const U=e.get(P);if(U.color.copy(P.color).multiplyScalar(P.intensity),U.distance=P.distance,U.decay=P.decay,P.castShadow){const O=P.shadow,G=t.get(P);G.shadowIntensity=O.intensity,G.shadowBias=O.bias,G.shadowNormalBias=O.normalBias,G.shadowRadius=O.radius,G.shadowMapSize=O.mapSize,G.shadowCameraNear=O.camera.near,G.shadowCameraFar=O.camera.far,i.pointShadow[p]=G,i.pointShadowMap[p]=N,i.pointShadowMatrix[p]=P.shadow.matrix,v++}i.point[p]=U,p++}else if(P.isHemisphereLight){const U=e.get(P);U.skyColor.copy(P.color).multiplyScalar(B),U.groundColor.copy(P.groundColor).multiplyScalar(B),i.hemi[g]=U,g++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Re.LTC_FLOAT_1,i.rectAreaLTC2=Re.LTC_FLOAT_2):(i.rectAreaLTC1=Re.LTC_HALF_1,i.rectAreaLTC2=Re.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const x=i.hash;(x.directionalLength!==d||x.pointLength!==p||x.spotLength!==_||x.rectAreaLength!==m||x.hemiLength!==g||x.numDirectionalShadows!==y||x.numPointShadows!==v||x.numSpotShadows!==S||x.numSpotMaps!==E||x.numLightProbes!==R)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=m,i.point.length=p,i.hemi.length=g,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=S+E-T,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=R,x.directionalLength=d,x.pointLength=p,x.spotLength=_,x.rectAreaLength=m,x.hemiLength=g,x.numDirectionalShadows=y,x.numPointShadows=v,x.numSpotShadows=S,x.numSpotMaps=E,x.numLightProbes=R,i.version=hC++)}function l(c,u){let f=0,h=0,d=0,p=0,_=0;const m=u.matrixWorldInverse;for(let g=0,y=c.length;g<y;g++){const v=c[g];if(v.isDirectionalLight){const S=i.directional[f];S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),f++}else if(v.isSpotLight){const S=i.spot[d];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(v.isRectAreaLight){const S=i.rectArea[p];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),o.identity(),s.copy(v.matrixWorld),s.premultiply(m),o.extractRotation(s),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),p++}else if(v.isPointLight){const S=i.point[h];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),h++}else if(v.isHemisphereLight){const S=i.hemi[_];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function xm(n){const e=new pC(n),t=[],i=[],r=[];function s(h){f.camera=h,t.length=0,i.length=0,r.length=0}function o(h){t.push(h)}function a(h){i.push(h)}function l(h){r.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function mC(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new xm(n),e.set(r,[a])):s>=o.length?(a=new xm(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const _C=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,vC=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],xC=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],Sm=new Bt,bo=new Y,lu=new Y;function SC(n,e,t){let i=new g0;const r=new ot,s=new ot,o=new It,a=new CT,l=new PT,c={},u=t.maxTextureSize,f={[Er]:_n,[_n]:Er,[vi]:vi},h=new ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:_C,fragmentShader:gC}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const p=new er;p.setAttribute("position",new Ai(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ii(p,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=il;let g=this.type;this.render=function(T,R,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===gE&&(ze("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=il);const b=n.getRenderTarget(),C=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),D=n.state;D.setBlending(Vi),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const B=g!==this.type;B&&R.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(N=>N.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,N=T.length;z<N;z++){const U=T[z],O=U.shadow;if(O===void 0){ze("WebGLShadowMap:",U,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;r.copy(O.mapSize);const G=O.getFrameExtents();r.multiply(G),s.copy(O.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/G.x),r.x=s.x*G.x,O.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/G.y),r.y=s.y*G.y,O.mapSize.y=s.y));const ne=n.state.buffers.depth.getReversed();if(O.camera._reversedDepth=ne,O.map===null||B===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===wo){if(U.isPointLight){ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new Ti(r.x,r.y,{format:os,type:ji,minFilter:Ot,magFilter:Ot,generateMipmaps:!1}),O.map.texture.name=U.name+".shadowMap",O.map.depthTexture=new Qs(r.x,r.y,Si),O.map.depthTexture.name=U.name+".shadowMapDepth",O.map.depthTexture.format=Ki,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Kt,O.map.depthTexture.magFilter=Kt}else U.isPointLight?(O.map=new T0(r.x),O.map.depthTexture=new bT(r.x,wi)):(O.map=new Ti(r.x,r.y),O.map.depthTexture=new Qs(r.x,r.y,wi)),O.map.depthTexture.name=U.name+".shadowMap",O.map.depthTexture.format=Ki,this.type===il?(O.map.depthTexture.compareFunction=ne?Nh:Uh,O.map.depthTexture.minFilter=Ot,O.map.depthTexture.magFilter=Ot):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Kt,O.map.depthTexture.magFilter=Kt);O.camera.updateProjectionMatrix()}const ge=O.map.isWebGLCubeRenderTarget?6:1;for(let Ee=0;Ee<ge;Ee++){if(O.map.isWebGLCubeRenderTarget)n.setRenderTarget(O.map,Ee),n.clear();else{Ee===0&&(n.setRenderTarget(O.map),n.clear());const Te=O.getViewport(Ee);o.set(s.x*Te.x,s.y*Te.y,s.x*Te.z,s.y*Te.w),D.viewport(o)}if(U.isPointLight){const Te=O.camera,Ye=O.matrix,We=U.distance||Te.far;We!==Te.far&&(Te.far=We,Te.updateProjectionMatrix()),bo.setFromMatrixPosition(U.matrixWorld),Te.position.copy(bo),lu.copy(Te.position),lu.add(vC[Ee]),Te.up.copy(xC[Ee]),Te.lookAt(lu),Te.updateMatrixWorld(),Ye.makeTranslation(-bo.x,-bo.y,-bo.z),Sm.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),O._frustum.setFromProjectionMatrix(Sm,Te.coordinateSystem,Te.reversedDepth)}else O.updateMatrices(U);i=O.getFrustum(),S(R,x,O.camera,U,this.type)}O.isPointLightShadow!==!0&&this.type===wo&&y(O,x),O.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(b,C,P)};function y(T,R){const x=e.update(_);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ti(r.x,r.y,{format:os,type:ji})),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(R,null,x,h,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(R,null,x,d,_,null)}function v(T,R,x,b){let C=null;const P=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)C=P;else if(C=x.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const D=C.uuid,B=R.uuid;let z=c[D];z===void 0&&(z={},c[D]=z);let N=z[B];N===void 0&&(N=C.clone(),z[B]=N,R.addEventListener("dispose",E)),C=N}if(C.visible=R.visible,C.wireframe=R.wireframe,b===wo?C.side=R.shadowSide!==null?R.shadowSide:R.side:C.side=R.shadowSide!==null?R.shadowSide:f[R.side],C.alphaMap=R.alphaMap,C.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,C.map=R.map,C.clipShadows=R.clipShadows,C.clippingPlanes=R.clippingPlanes,C.clipIntersection=R.clipIntersection,C.displacementMap=R.displacementMap,C.displacementScale=R.displacementScale,C.displacementBias=R.displacementBias,C.wireframeLinewidth=R.wireframeLinewidth,C.linewidth=R.linewidth,x.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const D=n.properties.get(C);D.light=x}return C}function S(T,R,x,b,C){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&C===wo)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);const B=e.update(T),z=T.material;if(Array.isArray(z)){const N=B.groups;for(let U=0,O=N.length;U<O;U++){const G=N[U],ne=z[G.materialIndex];if(ne&&ne.visible){const ge=v(T,ne,b,C);T.onBeforeShadow(n,T,R,x,B,ge,G),n.renderBufferDirect(x,null,B,ge,T,G),T.onAfterShadow(n,T,R,x,B,ge,G)}}}else if(z.visible){const N=v(T,z,b,C);T.onBeforeShadow(n,T,R,x,B,N,null),n.renderBufferDirect(x,null,B,N,T,null),T.onAfterShadow(n,T,R,x,B,N,null)}}const D=T.children;for(let B=0,z=D.length;B<z;B++)S(D[B],R,x,b,C)}function E(T){T.target.removeEventListener("dispose",E);for(const x in c){const b=c[x],C=T.target.uuid;C in b&&(b[C].dispose(),delete b[C])}}}function yC(n,e){function t(){let k=!1;const xe=new It;let ae=null;const Le=new It(0,0,0,0);return{setMask:function(Se){ae!==Se&&!k&&(n.colorMask(Se,Se,Se,Se),ae=Se)},setLocked:function(Se){k=Se},setClear:function(Se,he,Ne,Xe,Ct){Ct===!0&&(Se*=Xe,he*=Xe,Ne*=Xe),xe.set(Se,he,Ne,Xe),Le.equals(xe)===!1&&(n.clearColor(Se,he,Ne,Xe),Le.copy(xe))},reset:function(){k=!1,ae=null,Le.set(-1,0,0,0)}}}function i(){let k=!1,xe=!1,ae=null,Le=null,Se=null;return{setReversed:function(he){if(xe!==he){const Ne=e.get("EXT_clip_control");he?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),xe=he;const Xe=Se;Se=null,this.setClear(Xe)}},getReversed:function(){return xe},setTest:function(he){he?K(n.DEPTH_TEST):ye(n.DEPTH_TEST)},setMask:function(he){ae!==he&&!k&&(n.depthMask(he),ae=he)},setFunc:function(he){if(xe&&(he=KE[he]),Le!==he){switch(he){case $u:n.depthFunc(n.NEVER);break;case ju:n.depthFunc(n.ALWAYS);break;case Ku:n.depthFunc(n.LESS);break;case Zs:n.depthFunc(n.LEQUAL);break;case Zu:n.depthFunc(n.EQUAL);break;case Ju:n.depthFunc(n.GEQUAL);break;case Qu:n.depthFunc(n.GREATER);break;case ef:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Le=he}},setLocked:function(he){k=he},setClear:function(he){Se!==he&&(Se=he,xe&&(he=1-he),n.clearDepth(he))},reset:function(){k=!1,ae=null,Le=null,Se=null,xe=!1}}}function r(){let k=!1,xe=null,ae=null,Le=null,Se=null,he=null,Ne=null,Xe=null,Ct=null;return{setTest:function(ut){k||(ut?K(n.STENCIL_TEST):ye(n.STENCIL_TEST))},setMask:function(ut){xe!==ut&&!k&&(n.stencilMask(ut),xe=ut)},setFunc:function(ut,Ci,si){(ae!==ut||Le!==Ci||Se!==si)&&(n.stencilFunc(ut,Ci,si),ae=ut,Le=Ci,Se=si)},setOp:function(ut,Ci,si){(he!==ut||Ne!==Ci||Xe!==si)&&(n.stencilOp(ut,Ci,si),he=ut,Ne=Ci,Xe=si)},setLocked:function(ut){k=ut},setClear:function(ut){Ct!==ut&&(n.clearStencil(ut),Ct=ut)},reset:function(){k=!1,xe=null,ae=null,Le=null,Se=null,he=null,Ne=null,Xe=null,Ct=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h={},d=new WeakMap,p=[],_=null,m=!1,g=null,y=null,v=null,S=null,E=null,T=null,R=null,x=new ht(0,0,0),b=0,C=!1,P=null,D=null,B=null,z=null,N=null;const U=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,G=0;const ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(ne)[1]),O=G>=1):ne.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),O=G>=2);let ge=null,Ee={};const Te=n.getParameter(n.SCISSOR_BOX),Ye=n.getParameter(n.VIEWPORT),We=new It().fromArray(Te),Be=new It().fromArray(Ye);function le(k,xe,ae,Le){const Se=new Uint8Array(4),he=n.createTexture();n.bindTexture(k,he),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ne=0;Ne<ae;Ne++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(xe,0,n.RGBA,1,1,Le,0,n.RGBA,n.UNSIGNED_BYTE,Se):n.texImage2D(xe+Ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Se);return he}const ee={};ee[n.TEXTURE_2D]=le(n.TEXTURE_2D,n.TEXTURE_2D,1),ee[n.TEXTURE_CUBE_MAP]=le(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[n.TEXTURE_2D_ARRAY]=le(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ee[n.TEXTURE_3D]=le(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(n.DEPTH_TEST),o.setFunc(Zs),re(!1),ie(Sp),K(n.CULL_FACE),W(Vi);function K(k){u[k]!==!0&&(n.enable(k),u[k]=!0)}function ye(k){u[k]!==!1&&(n.disable(k),u[k]=!1)}function fe(k,xe){return h[k]!==xe?(n.bindFramebuffer(k,xe),h[k]=xe,k===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=xe),k===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=xe),!0):!1}function ve(k,xe){let ae=p,Le=!1;if(k){ae=d.get(xe),ae===void 0&&(ae=[],d.set(xe,ae));const Se=k.textures;if(ae.length!==Se.length||ae[0]!==n.COLOR_ATTACHMENT0){for(let he=0,Ne=Se.length;he<Ne;he++)ae[he]=n.COLOR_ATTACHMENT0+he;ae.length=Se.length,Le=!0}}else ae[0]!==n.BACK&&(ae[0]=n.BACK,Le=!0);Le&&n.drawBuffers(ae)}function Je(k){return _!==k?(n.useProgram(k),_=k,!0):!1}const L={[Wr]:n.FUNC_ADD,[xE]:n.FUNC_SUBTRACT,[SE]:n.FUNC_REVERSE_SUBTRACT};L[yE]=n.MIN,L[ME]=n.MAX;const F={[bE]:n.ZERO,[EE]:n.ONE,[TE]:n.SRC_COLOR,[qu]:n.SRC_ALPHA,[LE]:n.SRC_ALPHA_SATURATE,[CE]:n.DST_COLOR,[wE]:n.DST_ALPHA,[AE]:n.ONE_MINUS_SRC_COLOR,[Yu]:n.ONE_MINUS_SRC_ALPHA,[PE]:n.ONE_MINUS_DST_COLOR,[RE]:n.ONE_MINUS_DST_ALPHA,[DE]:n.CONSTANT_COLOR,[IE]:n.ONE_MINUS_CONSTANT_COLOR,[UE]:n.CONSTANT_ALPHA,[NE]:n.ONE_MINUS_CONSTANT_ALPHA};function W(k,xe,ae,Le,Se,he,Ne,Xe,Ct,ut){if(k===Vi){m===!0&&(ye(n.BLEND),m=!1);return}if(m===!1&&(K(n.BLEND),m=!0),k!==vE){if(k!==g||ut!==C){if((y!==Wr||E!==Wr)&&(n.blendEquation(n.FUNC_ADD),y=Wr,E=Wr),ut)switch(k){case Ws:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yp:n.blendFunc(n.ONE,n.ONE);break;case Mp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case bp:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:nt("WebGLState: Invalid blending: ",k);break}else switch(k){case Ws:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yp:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Mp:nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bp:nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:nt("WebGLState: Invalid blending: ",k);break}v=null,S=null,T=null,R=null,x.set(0,0,0),b=0,g=k,C=ut}return}Se=Se||xe,he=he||ae,Ne=Ne||Le,(xe!==y||Se!==E)&&(n.blendEquationSeparate(L[xe],L[Se]),y=xe,E=Se),(ae!==v||Le!==S||he!==T||Ne!==R)&&(n.blendFuncSeparate(F[ae],F[Le],F[he],F[Ne]),v=ae,S=Le,T=he,R=Ne),(Xe.equals(x)===!1||Ct!==b)&&(n.blendColor(Xe.r,Xe.g,Xe.b,Ct),x.copy(Xe),b=Ct),g=k,C=!1}function te(k,xe){k.side===vi?ye(n.CULL_FACE):K(n.CULL_FACE);let ae=k.side===_n;xe&&(ae=!ae),re(ae),k.blending===Ws&&k.transparent===!1?W(Vi):W(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),s.setMask(k.colorWrite);const Le=k.stencilWrite;a.setTest(Le),Le&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),I(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):ye(n.SAMPLE_ALPHA_TO_COVERAGE)}function re(k){P!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),P=k)}function ie(k){k!==mE?(K(n.CULL_FACE),k!==D&&(k===Sp?n.cullFace(n.BACK):k===_E?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ye(n.CULL_FACE),D=k}function de(k){k!==B&&(O&&n.lineWidth(k),B=k)}function I(k,xe,ae){k?(K(n.POLYGON_OFFSET_FILL),(z!==xe||N!==ae)&&(z=xe,N=ae,o.getReversed()&&(xe=-xe),n.polygonOffset(xe,ae))):ye(n.POLYGON_OFFSET_FILL)}function ue(k){k?K(n.SCISSOR_TEST):ye(n.SCISSOR_TEST)}function J(k){k===void 0&&(k=n.TEXTURE0+U-1),ge!==k&&(n.activeTexture(k),ge=k)}function Ae(k,xe,ae){ae===void 0&&(ge===null?ae=n.TEXTURE0+U-1:ae=ge);let Le=Ee[ae];Le===void 0&&(Le={type:void 0,texture:void 0},Ee[ae]=Le),(Le.type!==k||Le.texture!==xe)&&(ge!==ae&&(n.activeTexture(ae),ge=ae),n.bindTexture(k,xe||ee[k]),Le.type=k,Le.texture=xe)}function $(){const k=Ee[ge];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function be(){try{n.compressedTexImage2D(...arguments)}catch(k){nt("WebGLState:",k)}}function w(){try{n.compressedTexImage3D(...arguments)}catch(k){nt("WebGLState:",k)}}function M(){try{n.texSubImage2D(...arguments)}catch(k){nt("WebGLState:",k)}}function H(){try{n.texSubImage3D(...arguments)}catch(k){nt("WebGLState:",k)}}function Z(){try{n.compressedTexSubImage2D(...arguments)}catch(k){nt("WebGLState:",k)}}function se(){try{n.compressedTexSubImage3D(...arguments)}catch(k){nt("WebGLState:",k)}}function ce(){try{n.texStorage2D(...arguments)}catch(k){nt("WebGLState:",k)}}function pe(){try{n.texStorage3D(...arguments)}catch(k){nt("WebGLState:",k)}}function Q(){try{n.texImage2D(...arguments)}catch(k){nt("WebGLState:",k)}}function oe(){try{n.texImage3D(...arguments)}catch(k){nt("WebGLState:",k)}}function we(k){return f[k]!==void 0?f[k]:n.getParameter(k)}function Me(k,xe){f[k]!==xe&&(n.pixelStorei(k,xe),f[k]=xe)}function me(k){We.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),We.copy(k))}function _e(k){Be.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),Be.copy(k))}function He(k,xe){let ae=c.get(xe);ae===void 0&&(ae=new WeakMap,c.set(xe,ae));let Le=ae.get(k);Le===void 0&&(Le=n.getUniformBlockIndex(xe,k.name),ae.set(k,Le))}function $e(k,xe){const Le=c.get(xe).get(k);l.get(xe)!==Le&&(n.uniformBlockBinding(xe,Le,k.__bindingPointIndex),l.set(xe,Le))}function rt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},ge=null,Ee={},h={},d=new WeakMap,p=[],_=null,m=!1,g=null,y=null,v=null,S=null,E=null,T=null,R=null,x=new ht(0,0,0),b=0,C=!1,P=null,D=null,B=null,z=null,N=null,We.set(0,0,n.canvas.width,n.canvas.height),Be.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:K,disable:ye,bindFramebuffer:fe,drawBuffers:ve,useProgram:Je,setBlending:W,setMaterial:te,setFlipSided:re,setCullFace:ie,setLineWidth:de,setPolygonOffset:I,setScissorTest:ue,activeTexture:J,bindTexture:Ae,unbindTexture:$,compressedTexImage2D:be,compressedTexImage3D:w,texImage2D:Q,texImage3D:oe,pixelStorei:Me,getParameter:we,updateUBOMapping:He,uniformBlockBinding:$e,texStorage2D:ce,texStorage3D:pe,texSubImage2D:M,texSubImage3D:H,compressedTexSubImage2D:Z,compressedTexSubImage3D:se,scissor:me,viewport:_e,reset:rt}}function MC(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ot,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(w,M){return p?new OffscreenCanvas(w,M):Jo("canvas")}function m(w,M,H){let Z=1;const se=be(w);if((se.width>H||se.height>H)&&(Z=H/Math.max(se.width,se.height)),Z<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const ce=Math.floor(Z*se.width),pe=Math.floor(Z*se.height);h===void 0&&(h=_(ce,pe));const Q=M?_(ce,pe):h;return Q.width=ce,Q.height=pe,Q.getContext("2d").drawImage(w,0,0,ce,pe),ze("WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+ce+"x"+pe+")."),Q}else return"data"in w&&ze("WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),w;return w}function g(w){return w.generateMipmaps}function y(w){n.generateMipmap(w)}function v(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(w,M,H,Z,se,ce=!1){if(w!==null){if(n[w]!==void 0)return n[w];ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let pe;Z&&(pe=e.get("EXT_texture_norm16"),pe||ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=M;if(M===n.RED&&(H===n.FLOAT&&(Q=n.R32F),H===n.HALF_FLOAT&&(Q=n.R16F),H===n.UNSIGNED_BYTE&&(Q=n.R8),H===n.UNSIGNED_SHORT&&pe&&(Q=pe.R16_EXT),H===n.SHORT&&pe&&(Q=pe.R16_SNORM_EXT)),M===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.R8UI),H===n.UNSIGNED_SHORT&&(Q=n.R16UI),H===n.UNSIGNED_INT&&(Q=n.R32UI),H===n.BYTE&&(Q=n.R8I),H===n.SHORT&&(Q=n.R16I),H===n.INT&&(Q=n.R32I)),M===n.RG&&(H===n.FLOAT&&(Q=n.RG32F),H===n.HALF_FLOAT&&(Q=n.RG16F),H===n.UNSIGNED_BYTE&&(Q=n.RG8),H===n.UNSIGNED_SHORT&&pe&&(Q=pe.RG16_EXT),H===n.SHORT&&pe&&(Q=pe.RG16_SNORM_EXT)),M===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.RG8UI),H===n.UNSIGNED_SHORT&&(Q=n.RG16UI),H===n.UNSIGNED_INT&&(Q=n.RG32UI),H===n.BYTE&&(Q=n.RG8I),H===n.SHORT&&(Q=n.RG16I),H===n.INT&&(Q=n.RG32I)),M===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),H===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),H===n.UNSIGNED_INT&&(Q=n.RGB32UI),H===n.BYTE&&(Q=n.RGB8I),H===n.SHORT&&(Q=n.RGB16I),H===n.INT&&(Q=n.RGB32I)),M===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),H===n.UNSIGNED_INT&&(Q=n.RGBA32UI),H===n.BYTE&&(Q=n.RGBA8I),H===n.SHORT&&(Q=n.RGBA16I),H===n.INT&&(Q=n.RGBA32I)),M===n.RGB&&(H===n.UNSIGNED_SHORT&&pe&&(Q=pe.RGB16_EXT),H===n.SHORT&&pe&&(Q=pe.RGB16_SNORM_EXT),H===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),H===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),M===n.RGBA){const oe=ce?Dl:Qe.getTransfer(se);H===n.FLOAT&&(Q=n.RGBA32F),H===n.HALF_FLOAT&&(Q=n.RGBA16F),H===n.UNSIGNED_BYTE&&(Q=oe===ct?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT&&pe&&(Q=pe.RGBA16_EXT),H===n.SHORT&&pe&&(Q=pe.RGBA16_SNORM_EXT),H===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function E(w,M){let H;return w?M===null||M===wi||M===Zo?H=n.DEPTH24_STENCIL8:M===Si?H=n.DEPTH32F_STENCIL8:M===Ko&&(H=n.DEPTH24_STENCIL8,ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===wi||M===Zo?H=n.DEPTH_COMPONENT24:M===Si?H=n.DEPTH_COMPONENT32F:M===Ko&&(H=n.DEPTH_COMPONENT16),H}function T(w,M){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Kt&&w.minFilter!==Ot?Math.log2(Math.max(M.width,M.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?M.mipmaps.length:1}function R(w){const M=w.target;M.removeEventListener("dispose",R),b(M),M.isVideoTexture&&u.delete(M),M.isHTMLTexture&&f.delete(M)}function x(w){const M=w.target;M.removeEventListener("dispose",x),P(M)}function b(w){const M=i.get(w);if(M.__webglInit===void 0)return;const H=w.source,Z=d.get(H);if(Z){const se=Z[M.__cacheKey];se.usedTimes--,se.usedTimes===0&&C(w),Object.keys(Z).length===0&&d.delete(H)}i.remove(w)}function C(w){const M=i.get(w);n.deleteTexture(M.__webglTexture);const H=w.source,Z=d.get(H);delete Z[M.__cacheKey],o.memory.textures--}function P(w){const M=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(M.__webglFramebuffer[Z]))for(let se=0;se<M.__webglFramebuffer[Z].length;se++)n.deleteFramebuffer(M.__webglFramebuffer[Z][se]);else n.deleteFramebuffer(M.__webglFramebuffer[Z]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[Z])}else{if(Array.isArray(M.__webglFramebuffer))for(let Z=0;Z<M.__webglFramebuffer.length;Z++)n.deleteFramebuffer(M.__webglFramebuffer[Z]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Z=0;Z<M.__webglColorRenderbuffer.length;Z++)M.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[Z]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const H=w.textures;for(let Z=0,se=H.length;Z<se;Z++){const ce=i.get(H[Z]);ce.__webglTexture&&(n.deleteTexture(ce.__webglTexture),o.memory.textures--),i.remove(H[Z])}i.remove(w)}let D=0;function B(){D=0}function z(){return D}function N(w){D=w}function U(){const w=D;return w>=r.maxTextures&&ze("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),D+=1,w}function O(w){const M=[];return M.push(w.wrapS),M.push(w.wrapT),M.push(w.wrapR||0),M.push(w.magFilter),M.push(w.minFilter),M.push(w.anisotropy),M.push(w.internalFormat),M.push(w.format),M.push(w.type),M.push(w.generateMipmaps),M.push(w.premultiplyAlpha),M.push(w.flipY),M.push(w.unpackAlignment),M.push(w.colorSpace),M.join()}function G(w,M){const H=i.get(w);if(w.isVideoTexture&&Ae(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&H.__version!==w.version){const Z=w.image;if(Z===null)ze("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)ze("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(H,w,M);return}}else w.isExternalTexture&&(H.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+M)}function ne(w,M){const H=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&H.__version!==w.version){ye(H,w,M);return}else w.isExternalTexture&&(H.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+M)}function ge(w,M){const H=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&H.__version!==w.version){ye(H,w,M);return}t.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+M)}function Ee(w,M){const H=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&H.__version!==w.version){fe(H,w,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+M)}const Te={[tf]:n.REPEAT,[Rn]:n.CLAMP_TO_EDGE,[nf]:n.MIRRORED_REPEAT},Ye={[Kt]:n.NEAREST,[BE]:n.NEAREST_MIPMAP_NEAREST,[Pa]:n.NEAREST_MIPMAP_LINEAR,[Ot]:n.LINEAR,[Lc]:n.LINEAR_MIPMAP_NEAREST,[qr]:n.LINEAR_MIPMAP_LINEAR},We={[zE]:n.NEVER,[qE]:n.ALWAYS,[VE]:n.LESS,[Uh]:n.LEQUAL,[GE]:n.EQUAL,[Nh]:n.GEQUAL,[WE]:n.GREATER,[XE]:n.NOTEQUAL};function Be(w,M){if(M.type===Si&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Ot||M.magFilter===Lc||M.magFilter===Pa||M.magFilter===qr||M.minFilter===Ot||M.minFilter===Lc||M.minFilter===Pa||M.minFilter===qr)&&ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,Te[M.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,Te[M.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,Te[M.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,Ye[M.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,Ye[M.minFilter]),M.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,We[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Kt||M.minFilter!==Pa&&M.minFilter!==qr||M.type===Si&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function le(w,M){let H=!1;w.__webglInit===void 0&&(w.__webglInit=!0,M.addEventListener("dispose",R));const Z=M.source;let se=d.get(Z);se===void 0&&(se={},d.set(Z,se));const ce=O(M);if(ce!==w.__cacheKey){se[ce]===void 0&&(se[ce]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,H=!0),se[ce].usedTimes++;const pe=se[w.__cacheKey];pe!==void 0&&(se[w.__cacheKey].usedTimes--,pe.usedTimes===0&&C(M)),w.__cacheKey=ce,w.__webglTexture=se[ce].texture}return H}function ee(w,M,H){return Math.floor(Math.floor(w/H)/M)}function K(w,M,H,Z){const ce=w.updateRanges;if(ce.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,M.width,M.height,H,Z,M.data);else{ce.sort((Me,me)=>Me.start-me.start);let pe=0;for(let Me=1;Me<ce.length;Me++){const me=ce[pe],_e=ce[Me],He=me.start+me.count,$e=ee(_e.start,M.width,4),rt=ee(me.start,M.width,4);_e.start<=He+1&&$e===rt&&ee(_e.start+_e.count-1,M.width,4)===$e?me.count=Math.max(me.count,_e.start+_e.count-me.start):(++pe,ce[pe]=_e)}ce.length=pe+1;const Q=t.getParameter(n.UNPACK_ROW_LENGTH),oe=t.getParameter(n.UNPACK_SKIP_PIXELS),we=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,M.width);for(let Me=0,me=ce.length;Me<me;Me++){const _e=ce[Me],He=Math.floor(_e.start/4),$e=Math.ceil(_e.count/4),rt=He%M.width,k=Math.floor(He/M.width),xe=$e,ae=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,rt),t.pixelStorei(n.UNPACK_SKIP_ROWS,k),t.texSubImage2D(n.TEXTURE_2D,0,rt,k,xe,ae,H,Z,M.data)}w.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,oe),t.pixelStorei(n.UNPACK_SKIP_ROWS,we)}}function ye(w,M,H){let Z=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Z=n.TEXTURE_3D);const se=le(w,M),ce=M.source;t.bindTexture(Z,w.__webglTexture,n.TEXTURE0+H);const pe=i.get(ce);if(ce.version!==pe.__version||se===!0){if(t.activeTexture(n.TEXTURE0+H),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const ae=Qe.getPrimaries(Qe.workingColorSpace),Le=M.colorSpace===mr?null:Qe.getPrimaries(M.colorSpace),Se=M.colorSpace===mr||ae===Le?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment);let oe=m(M.image,!1,r.maxTextureSize);oe=$(M,oe);const we=s.convert(M.format,M.colorSpace),Me=s.convert(M.type);let me=S(M.internalFormat,we,Me,M.normalized,M.colorSpace,M.isVideoTexture);Be(Z,M);let _e;const He=M.mipmaps,$e=M.isVideoTexture!==!0,rt=pe.__version===void 0||se===!0,k=ce.dataReady,xe=T(M,oe);if(M.isDepthTexture)me=E(M.format===Yr,M.type),rt&&($e?t.texStorage2D(n.TEXTURE_2D,1,me,oe.width,oe.height):t.texImage2D(n.TEXTURE_2D,0,me,oe.width,oe.height,0,we,Me,null));else if(M.isDataTexture)if(He.length>0){$e&&rt&&t.texStorage2D(n.TEXTURE_2D,xe,me,He[0].width,He[0].height);for(let ae=0,Le=He.length;ae<Le;ae++)_e=He[ae],$e?k&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,_e.width,_e.height,we,Me,_e.data):t.texImage2D(n.TEXTURE_2D,ae,me,_e.width,_e.height,0,we,Me,_e.data);M.generateMipmaps=!1}else $e?(rt&&t.texStorage2D(n.TEXTURE_2D,xe,me,oe.width,oe.height),k&&K(M,oe,we,Me)):t.texImage2D(n.TEXTURE_2D,0,me,oe.width,oe.height,0,we,Me,oe.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){$e&&rt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,me,He[0].width,He[0].height,oe.depth);for(let ae=0,Le=He.length;ae<Le;ae++)if(_e=He[ae],M.format!==ei)if(we!==null)if($e){if(k)if(M.layerUpdates.size>0){const Se=Zp(_e.width,_e.height,M.format,M.type);for(const he of M.layerUpdates){const Ne=_e.data.subarray(he*Se/_e.data.BYTES_PER_ELEMENT,(he+1)*Se/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,he,_e.width,_e.height,1,we,Ne)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,_e.width,_e.height,oe.depth,we,_e.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,me,_e.width,_e.height,oe.depth,0,_e.data,0,0);else ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?k&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,_e.width,_e.height,oe.depth,we,Me,_e.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,me,_e.width,_e.height,oe.depth,0,we,Me,_e.data)}else{$e&&rt&&t.texStorage2D(n.TEXTURE_2D,xe,me,He[0].width,He[0].height);for(let ae=0,Le=He.length;ae<Le;ae++)_e=He[ae],M.format!==ei?we!==null?$e?k&&t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,_e.width,_e.height,we,_e.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,me,_e.width,_e.height,0,_e.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?k&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,_e.width,_e.height,we,Me,_e.data):t.texImage2D(n.TEXTURE_2D,ae,me,_e.width,_e.height,0,we,Me,_e.data)}else if(M.isDataArrayTexture)if($e){if(rt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,me,oe.width,oe.height,oe.depth),k)if(M.layerUpdates.size>0){const ae=Zp(oe.width,oe.height,M.format,M.type);for(const Le of M.layerUpdates){const Se=oe.data.subarray(Le*ae/oe.data.BYTES_PER_ELEMENT,(Le+1)*ae/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Le,oe.width,oe.height,1,we,Me,Se)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,we,Me,oe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,me,oe.width,oe.height,oe.depth,0,we,Me,oe.data);else if(M.isData3DTexture)$e?(rt&&t.texStorage3D(n.TEXTURE_3D,xe,me,oe.width,oe.height,oe.depth),k&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,we,Me,oe.data)):t.texImage3D(n.TEXTURE_3D,0,me,oe.width,oe.height,oe.depth,0,we,Me,oe.data);else if(M.isFramebufferTexture){if(rt)if($e)t.texStorage2D(n.TEXTURE_2D,xe,me,oe.width,oe.height);else{let ae=oe.width,Le=oe.height;for(let Se=0;Se<xe;Se++)t.texImage2D(n.TEXTURE_2D,Se,me,ae,Le,0,we,Me,null),ae>>=1,Le>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in n){const ae=n.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),oe.parentNode!==ae){ae.appendChild(oe),f.add(M),ae.onpaint=Xe=>{const Ct=Xe.changedElements;for(const ut of f)Ct.includes(ut.image)&&(ut.needsUpdate=!0)},ae.requestPaint();return}const Le=0,Se=n.RGBA,he=n.RGBA,Ne=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,Le,Se,he,Ne,oe),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(He.length>0){if($e&&rt){const ae=be(He[0]);t.texStorage2D(n.TEXTURE_2D,xe,me,ae.width,ae.height)}for(let ae=0,Le=He.length;ae<Le;ae++)_e=He[ae],$e?k&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,we,Me,_e):t.texImage2D(n.TEXTURE_2D,ae,me,we,Me,_e);M.generateMipmaps=!1}else if($e){if(rt){const ae=be(oe);t.texStorage2D(n.TEXTURE_2D,xe,me,ae.width,ae.height)}k&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,we,Me,oe)}else t.texImage2D(n.TEXTURE_2D,0,me,we,Me,oe);g(M)&&y(Z),pe.__version=ce.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function fe(w,M,H){if(M.image.length!==6)return;const Z=le(w,M),se=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+H);const ce=i.get(se);if(se.version!==ce.__version||Z===!0){t.activeTexture(n.TEXTURE0+H);const pe=Qe.getPrimaries(Qe.workingColorSpace),Q=M.colorSpace===mr?null:Qe.getPrimaries(M.colorSpace),oe=M.colorSpace===mr||pe===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);const we=M.isCompressedTexture||M.image[0].isCompressedTexture,Me=M.image[0]&&M.image[0].isDataTexture,me=[];for(let he=0;he<6;he++)!we&&!Me?me[he]=m(M.image[he],!0,r.maxCubemapSize):me[he]=Me?M.image[he].image:M.image[he],me[he]=$(M,me[he]);const _e=me[0],He=s.convert(M.format,M.colorSpace),$e=s.convert(M.type),rt=S(M.internalFormat,He,$e,M.normalized,M.colorSpace),k=M.isVideoTexture!==!0,xe=ce.__version===void 0||Z===!0,ae=se.dataReady;let Le=T(M,_e);Be(n.TEXTURE_CUBE_MAP,M);let Se;if(we){k&&xe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Le,rt,_e.width,_e.height);for(let he=0;he<6;he++){Se=me[he].mipmaps;for(let Ne=0;Ne<Se.length;Ne++){const Xe=Se[Ne];M.format!==ei?He!==null?k?ae&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne,0,0,Xe.width,Xe.height,He,Xe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne,rt,Xe.width,Xe.height,0,Xe.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne,0,0,Xe.width,Xe.height,He,$e,Xe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne,rt,Xe.width,Xe.height,0,He,$e,Xe.data)}}}else{if(Se=M.mipmaps,k&&xe){Se.length>0&&Le++;const he=be(me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Le,rt,he.width,he.height)}for(let he=0;he<6;he++)if(Me){k?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,me[he].width,me[he].height,He,$e,me[he].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,rt,me[he].width,me[he].height,0,He,$e,me[he].data);for(let Ne=0;Ne<Se.length;Ne++){const Ct=Se[Ne].image[he].image;k?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne+1,0,0,Ct.width,Ct.height,He,$e,Ct.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne+1,rt,Ct.width,Ct.height,0,He,$e,Ct.data)}}else{k?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,He,$e,me[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,rt,He,$e,me[he]);for(let Ne=0;Ne<Se.length;Ne++){const Xe=Se[Ne];k?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne+1,0,0,He,$e,Xe.image[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ne+1,rt,He,$e,Xe.image[he])}}}g(M)&&y(n.TEXTURE_CUBE_MAP),ce.__version=se.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function ve(w,M,H,Z,se,ce){const pe=s.convert(H.format,H.colorSpace),Q=s.convert(H.type),oe=S(H.internalFormat,pe,Q,H.normalized,H.colorSpace),we=i.get(M),Me=i.get(H);if(Me.__renderTarget=M,!we.__hasExternalTextures){const me=Math.max(1,M.width>>ce),_e=Math.max(1,M.height>>ce);se===n.TEXTURE_3D||se===n.TEXTURE_2D_ARRAY?t.texImage3D(se,ce,oe,me,_e,M.depth,0,pe,Q,null):t.texImage2D(se,ce,oe,me,_e,0,pe,Q,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),J(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,se,Me.__webglTexture,0,ue(M)):(se===n.TEXTURE_2D||se>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,se,Me.__webglTexture,ce),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Je(w,M,H){if(n.bindRenderbuffer(n.RENDERBUFFER,w),M.depthBuffer){const Z=M.depthTexture,se=Z&&Z.isDepthTexture?Z.type:null,ce=E(M.stencilBuffer,se),pe=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;J(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue(M),ce,M.width,M.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue(M),ce,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,ce,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pe,n.RENDERBUFFER,w)}else{const Z=M.textures;for(let se=0;se<Z.length;se++){const ce=Z[se],pe=s.convert(ce.format,ce.colorSpace),Q=s.convert(ce.type),oe=S(ce.internalFormat,pe,Q,ce.normalized,ce.colorSpace);J(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue(M),oe,M.width,M.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue(M),oe,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,oe,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function L(w,M,H){const Z=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const se=i.get(M.depthTexture);if(se.__renderTarget=M,(!se.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Z){if(se.__webglInit===void 0&&(se.__webglInit=!0,M.depthTexture.addEventListener("dispose",R)),se.__webglTexture===void 0){se.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,se.__webglTexture),Be(n.TEXTURE_CUBE_MAP,M.depthTexture);const we=s.convert(M.depthTexture.format),Me=s.convert(M.depthTexture.type);let me;M.depthTexture.format===Ki?me=n.DEPTH_COMPONENT24:M.depthTexture.format===Yr&&(me=n.DEPTH24_STENCIL8);for(let _e=0;_e<6;_e++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,me,M.width,M.height,0,we,Me,null)}}else G(M.depthTexture,0);const ce=se.__webglTexture,pe=ue(M),Q=Z?n.TEXTURE_CUBE_MAP_POSITIVE_X+H:n.TEXTURE_2D,oe=M.depthTexture.format===Yr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(M.depthTexture.format===Ki)J(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,oe,Q,ce,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,oe,Q,ce,0);else if(M.depthTexture.format===Yr)J(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,oe,Q,ce,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,oe,Q,ce,0);else throw new Error("Unknown depthTexture format")}function F(w){const M=i.get(w),H=w.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==w.depthTexture){const Z=w.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Z){const se=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Z.removeEventListener("dispose",se)};Z.addEventListener("dispose",se),M.__depthDisposeCallback=se}M.__boundDepthTexture=Z}if(w.depthTexture&&!M.__autoAllocateDepthBuffer)if(H)for(let Z=0;Z<6;Z++)L(M.__webglFramebuffer[Z],w,Z);else{const Z=w.texture.mipmaps;Z&&Z.length>0?L(M.__webglFramebuffer[0],w,0):L(M.__webglFramebuffer,w,0)}else if(H){M.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[Z]),M.__webglDepthbuffer[Z]===void 0)M.__webglDepthbuffer[Z]=n.createRenderbuffer(),Je(M.__webglDepthbuffer[Z],w,!1);else{const se=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=M.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,ce)}}else{const Z=w.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),Je(M.__webglDepthbuffer,w,!1);else{const se=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,ce)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function W(w,M,H){const Z=i.get(w);M!==void 0&&ve(Z.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&F(w)}function te(w){const M=w.texture,H=i.get(w),Z=i.get(M);w.addEventListener("dispose",x);const se=w.textures,ce=w.isWebGLCubeRenderTarget===!0,pe=se.length>1;if(pe||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=M.version,o.memory.textures++),ce){H.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[Q]=[];for(let oe=0;oe<M.mipmaps.length;oe++)H.__webglFramebuffer[Q][oe]=n.createFramebuffer()}else H.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let Q=0;Q<M.mipmaps.length;Q++)H.__webglFramebuffer[Q]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(pe)for(let Q=0,oe=se.length;Q<oe;Q++){const we=i.get(se[Q]);we.__webglTexture===void 0&&(we.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&J(w)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let Q=0;Q<se.length;Q++){const oe=se[Q];H.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[Q]);const we=s.convert(oe.format,oe.colorSpace),Me=s.convert(oe.type),me=S(oe.internalFormat,we,Me,oe.normalized,oe.colorSpace,w.isXRRenderTarget===!0),_e=ue(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,_e,me,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,H.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),Je(H.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ce){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Be(n.TEXTURE_CUBE_MAP,M);for(let Q=0;Q<6;Q++)if(M.mipmaps&&M.mipmaps.length>0)for(let oe=0;oe<M.mipmaps.length;oe++)ve(H.__webglFramebuffer[Q][oe],w,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,oe);else ve(H.__webglFramebuffer[Q],w,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);g(M)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let Q=0,oe=se.length;Q<oe;Q++){const we=se[Q],Me=i.get(we);let me=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(me=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,Me.__webglTexture),Be(me,we),ve(H.__webglFramebuffer,w,we,n.COLOR_ATTACHMENT0+Q,me,0),g(we)&&y(me)}t.unbindTexture()}else{let Q=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Q=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Q,Z.__webglTexture),Be(Q,M),M.mipmaps&&M.mipmaps.length>0)for(let oe=0;oe<M.mipmaps.length;oe++)ve(H.__webglFramebuffer[oe],w,M,n.COLOR_ATTACHMENT0,Q,oe);else ve(H.__webglFramebuffer,w,M,n.COLOR_ATTACHMENT0,Q,0);g(M)&&y(Q),t.unbindTexture()}w.depthBuffer&&F(w)}function re(w){const M=w.textures;for(let H=0,Z=M.length;H<Z;H++){const se=M[H];if(g(se)){const ce=v(w),pe=i.get(se).__webglTexture;t.bindTexture(ce,pe),y(ce),t.unbindTexture()}}}const ie=[],de=[];function I(w){if(w.samples>0){if(J(w)===!1){const M=w.textures,H=w.width,Z=w.height;let se=n.COLOR_BUFFER_BIT;const ce=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=i.get(w),Q=M.length>1;if(Q)for(let we=0;we<M.length;we++)t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);const oe=w.texture.mipmaps;oe&&oe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let we=0;we<M.length;we++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(se|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(se|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pe.__webglColorRenderbuffer[we]);const Me=i.get(M[we]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Me,0)}n.blitFramebuffer(0,0,H,Z,0,0,H,Z,se,n.NEAREST),l===!0&&(ie.length=0,de.length=0,ie.push(n.COLOR_ATTACHMENT0+we),w.depthBuffer&&w.resolveDepthBuffer===!1&&(ie.push(ce),de.push(ce),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,de)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ie))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let we=0;we<M.length;we++){t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,pe.__webglColorRenderbuffer[we]);const Me=i.get(M[we]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,Me,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const M=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function ue(w){return Math.min(r.maxSamples,w.samples)}function J(w){const M=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ae(w){const M=o.render.frame;u.get(w)!==M&&(u.set(w,M),w.update())}function $(w,M){const H=w.colorSpace,Z=w.format,se=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||H!==Ll&&H!==mr&&(Qe.getTransfer(H)===ct?(Z!==ei||se!==Gn)&&ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):nt("WebGLTextures: Unsupported texture color space:",H)),M}function be(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=B,this.getTextureUnits=z,this.setTextureUnits=N,this.setTexture2D=G,this.setTexture2DArray=ne,this.setTexture3D=ge,this.setTextureCube=Ee,this.rebindTextures=W,this.setupRenderTarget=te,this.updateRenderTargetMipmap=re,this.updateMultisampleRenderTarget=I,this.setupDepthRenderbuffer=F,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=J,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function bC(n,e){function t(i,r=mr){let s;const o=Qe.getTransfer(r);if(i===Gn)return n.UNSIGNED_BYTE;if(i===Ch)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ph)return n.UNSIGNED_SHORT_5_5_5_1;if(i===o0)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===a0)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===r0)return n.BYTE;if(i===s0)return n.SHORT;if(i===Ko)return n.UNSIGNED_SHORT;if(i===Rh)return n.INT;if(i===wi)return n.UNSIGNED_INT;if(i===Si)return n.FLOAT;if(i===ji)return n.HALF_FLOAT;if(i===l0)return n.ALPHA;if(i===c0)return n.RGB;if(i===ei)return n.RGBA;if(i===Ki)return n.DEPTH_COMPONENT;if(i===Yr)return n.DEPTH_STENCIL;if(i===u0)return n.RED;if(i===Lh)return n.RED_INTEGER;if(i===os)return n.RG;if(i===Dh)return n.RG_INTEGER;if(i===Ih)return n.RGBA_INTEGER;if(i===rl||i===sl||i===ol||i===al)if(o===ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===rl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ol)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===rl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===sl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ol)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===al)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===rf||i===sf||i===of||i===af)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===rf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===sf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===of)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===af)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===lf||i===cf||i===uf||i===ff||i===hf||i===Cl||i===df)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===lf||i===cf)return o===ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===uf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===ff)return s.COMPRESSED_R11_EAC;if(i===hf)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Cl)return s.COMPRESSED_RG11_EAC;if(i===df)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===pf||i===mf||i===_f||i===gf||i===vf||i===xf||i===Sf||i===yf||i===Mf||i===bf||i===Ef||i===Tf||i===Af||i===wf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===pf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===mf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===_f)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===gf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===vf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Sf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===yf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Mf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ef)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Tf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Af)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===wf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Rf||i===Cf||i===Pf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Rf)return o===ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Cf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Pf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Lf||i===Df||i===Pl||i===If)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Lf)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Df)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Pl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===If)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Zo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const EC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,TC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class AC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new x0(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ri({vertexShader:EC,fragmentShader:TC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ii(new ga(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wC extends cs{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,p=null;const _=typeof XRWebGLBinding<"u",m=new AC,g={},y=t.getContextAttributes();let v=null,S=null;const E=[],T=[],R=new ot;let x=null;const b=new Vn;b.viewport=new It;const C=new Vn;C.viewport=new It;const P=[b,C],D=new FT;let B=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(le){let ee=E[le];return ee===void 0&&(ee=new kc,E[le]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(le){let ee=E[le];return ee===void 0&&(ee=new kc,E[le]=ee),ee.getGripSpace()},this.getHand=function(le){let ee=E[le];return ee===void 0&&(ee=new kc,E[le]=ee),ee.getHandSpace()};function N(le){const ee=T.indexOf(le.inputSource);if(ee===-1)return;const K=E[ee];K!==void 0&&(K.update(le.inputSource,le.frame,c||o),K.dispatchEvent({type:le.type,data:le.inputSource}))}function U(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",U),r.removeEventListener("inputsourceschange",O);for(let le=0;le<E.length;le++){const ee=T[le];ee!==null&&(T[le]=null,E[le].disconnect(ee))}B=null,z=null,m.reset();for(const le in g)delete g[le];e.setRenderTarget(v),d=null,h=null,f=null,r=null,S=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(le){s=le,i.isPresenting===!0&&ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(le){a=le,i.isPresenting===!0&&ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(le){c=le},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(le){if(r=le,r!==null){if(v=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",U),r.addEventListener("inputsourceschange",O),y.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let K=null,ye=null,fe=null;y.depth&&(fe=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=y.stencil?Yr:Ki,ye=y.stencil?Zo:wi);const ve={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(ve),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new Ti(h.textureWidth,h.textureHeight,{format:ei,type:Gn,depthTexture:new Qs(h.textureWidth,h.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const K={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,K),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new Ti(d.framebufferWidth,d.framebufferHeight,{format:ei,type:Gn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Be.setContext(r),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function O(le){for(let ee=0;ee<le.removed.length;ee++){const K=le.removed[ee],ye=T.indexOf(K);ye>=0&&(T[ye]=null,E[ye].disconnect(K))}for(let ee=0;ee<le.added.length;ee++){const K=le.added[ee];let ye=T.indexOf(K);if(ye===-1){for(let ve=0;ve<E.length;ve++)if(ve>=T.length){T.push(K),ye=ve;break}else if(T[ve]===null){T[ve]=K,ye=ve;break}if(ye===-1)break}const fe=E[ye];fe&&fe.connect(K)}}const G=new Y,ne=new Y;function ge(le,ee,K){G.setFromMatrixPosition(ee.matrixWorld),ne.setFromMatrixPosition(K.matrixWorld);const ye=G.distanceTo(ne),fe=ee.projectionMatrix.elements,ve=K.projectionMatrix.elements,Je=fe[14]/(fe[10]-1),L=fe[14]/(fe[10]+1),F=(fe[9]+1)/fe[5],W=(fe[9]-1)/fe[5],te=(fe[8]-1)/fe[0],re=(ve[8]+1)/ve[0],ie=Je*te,de=Je*re,I=ye/(-te+re),ue=I*-te;if(ee.matrixWorld.decompose(le.position,le.quaternion,le.scale),le.translateX(ue),le.translateZ(I),le.matrixWorld.compose(le.position,le.quaternion,le.scale),le.matrixWorldInverse.copy(le.matrixWorld).invert(),fe[10]===-1)le.projectionMatrix.copy(ee.projectionMatrix),le.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const J=Je+I,Ae=L+I,$=ie-ue,be=de+(ye-ue),w=F*L/Ae*J,M=W*L/Ae*J;le.projectionMatrix.makePerspective($,be,w,M,J,Ae),le.projectionMatrixInverse.copy(le.projectionMatrix).invert()}}function Ee(le,ee){ee===null?le.matrixWorld.copy(le.matrix):le.matrixWorld.multiplyMatrices(ee.matrixWorld,le.matrix),le.matrixWorldInverse.copy(le.matrixWorld).invert()}this.updateCamera=function(le){if(r===null)return;let ee=le.near,K=le.far;m.texture!==null&&(m.depthNear>0&&(ee=m.depthNear),m.depthFar>0&&(K=m.depthFar)),D.near=C.near=b.near=ee,D.far=C.far=b.far=K,(B!==D.near||z!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),B=D.near,z=D.far),D.layers.mask=le.layers.mask|6,b.layers.mask=D.layers.mask&-5,C.layers.mask=D.layers.mask&-3;const ye=le.parent,fe=D.cameras;Ee(D,ye);for(let ve=0;ve<fe.length;ve++)Ee(fe[ve],ye);fe.length===2?ge(D,b,C):D.projectionMatrix.copy(b.projectionMatrix),Te(le,D,ye)};function Te(le,ee,K){K===null?le.matrix.copy(ee.matrixWorld):(le.matrix.copy(K.matrixWorld),le.matrix.invert(),le.matrix.multiply(ee.matrixWorld)),le.matrix.decompose(le.position,le.quaternion,le.scale),le.updateMatrixWorld(!0),le.projectionMatrix.copy(ee.projectionMatrix),le.projectionMatrixInverse.copy(ee.projectionMatrixInverse),le.isPerspectiveCamera&&(le.fov=Nf*2*Math.atan(1/le.projectionMatrix.elements[5]),le.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(le){l=le,h!==null&&(h.fixedFoveation=le),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=le)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(le){return g[le]};let Ye=null;function We(le,ee){if(u=ee.getViewerPose(c||o),p=ee,u!==null){const K=u.views;d!==null&&(e.setRenderTargetFramebuffer(S,d.framebuffer),e.setRenderTarget(S));let ye=!1;K.length!==D.cameras.length&&(D.cameras.length=0,ye=!0);for(let L=0;L<K.length;L++){const F=K[L];let W=null;if(d!==null)W=d.getViewport(F);else{const re=f.getViewSubImage(h,F);W=re.viewport,L===0&&(e.setRenderTargetTextures(S,re.colorTexture,re.depthStencilTexture),e.setRenderTarget(S))}let te=P[L];te===void 0&&(te=new Vn,te.layers.enable(L),te.viewport=new It,P[L]=te),te.matrix.fromArray(F.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(F.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(W.x,W.y,W.width,W.height),L===0&&(D.matrix.copy(te.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),ye===!0&&D.cameras.push(te)}const fe=r.enabledFeatures;if(fe&&fe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){f=i.getBinding();const L=f.getDepthInformation(K[0]);L&&L.isValid&&L.texture&&m.init(L,r.renderState)}if(fe&&fe.includes("camera-access")&&_){e.state.unbindTexture(),f=i.getBinding();for(let L=0;L<K.length;L++){const F=K[L].camera;if(F){let W=g[F];W||(W=new x0,g[F]=W);const te=f.getCameraImage(F);W.sourceTexture=te}}}}for(let K=0;K<E.length;K++){const ye=T[K],fe=E[K];ye!==null&&fe!==void 0&&fe.update(ye,ee,c||o)}Ye&&Ye(le,ee),ee.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ee}),p=null}const Be=new b0;Be.setAnimationLoop(We),this.setAnimationLoop=function(le){Ye=le},this.dispose=function(){}}}const RC=new Bt,P0=new Ge;P0.set(-1,0,0,0,1,0,0,0,1);function CC(n,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,S0(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function r(m,g,y,v,S){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(m,g):g.isMeshLambertMaterial?(s(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(m,g),f(m,g)):g.isMeshPhongMaterial?(s(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(m,g),h(m,g),g.isMeshPhysicalMaterial&&d(m,g,S)):g.isMeshMatcapMaterial?(s(m,g),p(m,g)):g.isMeshDepthMaterial?s(m,g):g.isMeshDistanceMaterial?(s(m,g),_(m,g)):g.isMeshNormalMaterial?s(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?l(m,g,y,v):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===_n&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===_n&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const y=e.get(g),v=y.envMap,S=y.envMapRotation;v&&(m.envMap.value=v,m.envMapRotation.value.setFromMatrix4(RC.makeRotationFromEuler(S)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(P0),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,y,v){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*y,m.scale.value=v*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function h(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,y){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===_n&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){const y=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function PC(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){const S=v.program;i.uniformBlockBinding(y,S)}function c(y,v){let S=r[y.id];S===void 0&&(p(y),S=u(y),r[y.id]=S,y.addEventListener("dispose",m));const E=v.program;i.updateUBOMapping(y,E);const T=e.render.frame;s[y.id]!==T&&(h(y),s[y.id]=T)}function u(y){const v=f();y.__bindingPointIndex=v;const S=n.createBuffer(),E=y.__size,T=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,E,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,S),S}function f(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return nt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const v=r[y.id],S=y.uniforms,E=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let T=0,R=S.length;T<R;T++){const x=Array.isArray(S[T])?S[T]:[S[T]];for(let b=0,C=x.length;b<C;b++){const P=x[b];if(d(P,T,b,E)===!0){const D=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let z=0;for(let N=0;N<B.length;N++){const U=B[N],O=_(U);typeof U=="number"||typeof U=="boolean"?(P.__data[0]=U,n.bufferSubData(n.UNIFORM_BUFFER,D+z,P.__data)):U.isMatrix3?(P.__data[0]=U.elements[0],P.__data[1]=U.elements[1],P.__data[2]=U.elements[2],P.__data[3]=0,P.__data[4]=U.elements[3],P.__data[5]=U.elements[4],P.__data[6]=U.elements[5],P.__data[7]=0,P.__data[8]=U.elements[6],P.__data[9]=U.elements[7],P.__data[10]=U.elements[8],P.__data[11]=0):ArrayBuffer.isView(U)?P.__data.set(new U.constructor(U.buffer,U.byteOffset,P.__data.length)):(U.toArray(P.__data,z),z+=O.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(y,v,S,E){const T=y.value,R=v+"_"+S;if(E[R]===void 0)return typeof T=="number"||typeof T=="boolean"?E[R]=T:ArrayBuffer.isView(T)?E[R]=T.slice():E[R]=T.clone(),!0;{const x=E[R];if(typeof T=="number"||typeof T=="boolean"){if(x!==T)return E[R]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(x.equals(T)===!1)return x.copy(T),!0}}return!1}function p(y){const v=y.uniforms;let S=0;const E=16;for(let R=0,x=v.length;R<x;R++){const b=Array.isArray(v[R])?v[R]:[v[R]];for(let C=0,P=b.length;C<P;C++){const D=b[C],B=Array.isArray(D.value)?D.value:[D.value];for(let z=0,N=B.length;z<N;z++){const U=B[z],O=_(U),G=S%E,ne=G%O.boundary,ge=G+ne;S+=ne,ge!==0&&E-ge<O.storage&&(S+=E-ge),D.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=S,S+=O.storage}}}const T=S%E;return T>0&&(S+=E-T),y.__size=S,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(v.boundary=16,v.storage=y.byteLength):ze("WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function g(){for(const y in r)n.deleteBuffer(r[y]);o=[],r={},s={}}return{bind:l,update:c,dispose:g}}const LC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let li=null;function DC(){return li===null&&(li=new gT(LC,16,16,os,ji),li.name="DFG_LUT",li.minFilter=Ot,li.magFilter=Ot,li.wrapS=Rn,li.wrapT=Rn,li.generateMipmaps=!1,li.needsUpdate=!0),li}class IC{constructor(e={}){const{canvas:t=$E(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=Gn}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const _=d,m=new Set([Ih,Dh,Lh]),g=new Set([Gn,wi,Ko,Zo,Ch,Ph]),y=new Uint32Array(4),v=new Int32Array(4),S=new Y;let E=null,T=null;const R=[],x=[];let b=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ei,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let P=!1,D=null;this._outputColorSpace=dn;let B=0,z=0,N=null,U=-1,O=null;const G=new It,ne=new It;let ge=null;const Ee=new ht(0);let Te=0,Ye=t.width,We=t.height,Be=1,le=null,ee=null;const K=new It(0,0,Ye,We),ye=new It(0,0,Ye,We);let fe=!1;const ve=new g0;let Je=!1,L=!1;const F=new Bt,W=new Y,te=new It,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ie=!1;function de(){return N===null?Be:1}let I=i;function ue(A,V){return t.getContext(A,V)}try{const A={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${wh}`),t.addEventListener("webglcontextlost",he,!1),t.addEventListener("webglcontextrestored",Ne,!1),t.addEventListener("webglcontextcreationerror",Xe,!1),I===null){const V="webgl2";if(I=ue(V,A),I===null)throw ue(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw nt("WebGLRenderer: "+A.message),A}let J,Ae,$,be,w,M,H,Z,se,ce,pe,Q,oe,we,Me,me,_e,He,$e,rt,k,xe,ae;function Le(){J=new Dw(I),J.init(),k=new bC(I,J),Ae=new Ew(I,J,e,k),$=new yC(I,J),Ae.reversedDepthBuffer&&h&&$.buffers.depth.setReversed(!0),be=new Nw(I),w=new aC,M=new MC(I,J,$,w,Ae,k,be),H=new Lw(C),Z=new kT(I),xe=new Mw(I,Z),se=new Iw(I,Z,be,xe),ce=new Ow(I,se,Z,xe,be),He=new Fw(I,Ae,M),Me=new Tw(w),pe=new oC(C,H,J,Ae,xe,Me),Q=new CC(C,w),oe=new cC,we=new mC(J),_e=new yw(C,H,$,ce,p,l),me=new SC(C,ce,Ae),ae=new PC(I,be,Ae,$),$e=new bw(I,J,be),rt=new Uw(I,J,be),be.programs=pe.programs,C.capabilities=Ae,C.extensions=J,C.properties=w,C.renderLists=oe,C.shadowMap=me,C.state=$,C.info=be}Le(),_!==Gn&&(b=new kw(_,t.width,t.height,r,s));const Se=new wC(C,I);this.xr=Se,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const A=J.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=J.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Be},this.setPixelRatio=function(A){A!==void 0&&(Be=A,this.setSize(Ye,We,!1))},this.getSize=function(A){return A.set(Ye,We)},this.setSize=function(A,V,j=!0){if(Se.isPresenting){ze("WebGLRenderer: Can't change size while VR device is presenting.");return}Ye=A,We=V,t.width=Math.floor(A*Be),t.height=Math.floor(V*Be),j===!0&&(t.style.width=A+"px",t.style.height=V+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,A,V)},this.getDrawingBufferSize=function(A){return A.set(Ye*Be,We*Be).floor()},this.setDrawingBufferSize=function(A,V,j){Ye=A,We=V,Be=j,t.width=Math.floor(A*j),t.height=Math.floor(V*j),this.setViewport(0,0,A,V)},this.setEffects=function(A){if(_===Gn){nt("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let V=0;V<A.length;V++)if(A[V].isOutputPass===!0){ze("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(G)},this.getViewport=function(A){return A.copy(K)},this.setViewport=function(A,V,j,X){A.isVector4?K.set(A.x,A.y,A.z,A.w):K.set(A,V,j,X),$.viewport(G.copy(K).multiplyScalar(Be).round())},this.getScissor=function(A){return A.copy(ye)},this.setScissor=function(A,V,j,X){A.isVector4?ye.set(A.x,A.y,A.z,A.w):ye.set(A,V,j,X),$.scissor(ne.copy(ye).multiplyScalar(Be).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(A){$.setScissorTest(fe=A)},this.setOpaqueSort=function(A){le=A},this.setTransparentSort=function(A){ee=A},this.getClearColor=function(A){return A.copy(_e.getClearColor())},this.setClearColor=function(){_e.setClearColor(...arguments)},this.getClearAlpha=function(){return _e.getClearAlpha()},this.setClearAlpha=function(){_e.setClearAlpha(...arguments)},this.clear=function(A=!0,V=!0,j=!0){let X=0;if(A){let q=!1;if(N!==null){const Pe=N.texture.format;q=m.has(Pe)}if(q){const Pe=N.texture.type,Ie=g.has(Pe),Ce=_e.getClearColor(),Ue=_e.getClearAlpha(),Fe=Ce.r,qe=Ce.g,Ze=Ce.b;Ie?(y[0]=Fe,y[1]=qe,y[2]=Ze,y[3]=Ue,I.clearBufferuiv(I.COLOR,0,y)):(v[0]=Fe,v[1]=qe,v[2]=Ze,v[3]=Ue,I.clearBufferiv(I.COLOR,0,v))}else X|=I.COLOR_BUFFER_BIT}V&&(X|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(X|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&I.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),D=A},this.dispose=function(){t.removeEventListener("webglcontextlost",he,!1),t.removeEventListener("webglcontextrestored",Ne,!1),t.removeEventListener("webglcontextcreationerror",Xe,!1),_e.dispose(),oe.dispose(),we.dispose(),w.dispose(),H.dispose(),ce.dispose(),xe.dispose(),ae.dispose(),pe.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",ud),Se.removeEventListener("sessionend",fd),Pr.stop()};function he(A){A.preventDefault(),Cp("WebGLRenderer: Context Lost."),P=!0}function Ne(){Cp("WebGLRenderer: Context Restored."),P=!1;const A=be.autoReset,V=me.enabled,j=me.autoUpdate,X=me.needsUpdate,q=me.type;Le(),be.autoReset=A,me.enabled=V,me.autoUpdate=j,me.needsUpdate=X,me.type=q}function Xe(A){nt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ct(A){const V=A.target;V.removeEventListener("dispose",Ct),ut(V)}function ut(A){Ci(A),w.remove(A)}function Ci(A){const V=w.get(A).programs;V!==void 0&&(V.forEach(function(j){pe.releaseProgram(j)}),A.isShaderMaterial&&pe.releaseShaderCache(A))}this.renderBufferDirect=function(A,V,j,X,q,Pe){V===null&&(V=re);const Ie=q.isMesh&&q.matrixWorld.determinant()<0,Ce=Cv(A,V,j,X,q);$.setMaterial(X,Ie);let Ue=j.index,Fe=1;if(X.wireframe===!0){if(Ue=se.getWireframeAttribute(j),Ue===void 0)return;Fe=2}const qe=j.drawRange,Ze=j.attributes.position;let Oe=qe.start*Fe,ft=(qe.start+qe.count)*Fe;Pe!==null&&(Oe=Math.max(Oe,Pe.start*Fe),ft=Math.min(ft,(Pe.start+Pe.count)*Fe)),Ue!==null?(Oe=Math.max(Oe,0),ft=Math.min(ft,Ue.count)):Ze!=null&&(Oe=Math.max(Oe,0),ft=Math.min(ft,Ze.count));const Pt=ft-Oe;if(Pt<0||Pt===1/0)return;xe.setup(q,X,Ce,j,Ue);let wt,dt=$e;if(Ue!==null&&(wt=Z.get(Ue),dt=rt,dt.setIndex(wt)),q.isMesh)X.wireframe===!0?($.setLineWidth(X.wireframeLinewidth*de()),dt.setMode(I.LINES)):dt.setMode(I.TRIANGLES);else if(q.isLine){let Qt=X.linewidth;Qt===void 0&&(Qt=1),$.setLineWidth(Qt*de()),q.isLineSegments?dt.setMode(I.LINES):q.isLineLoop?dt.setMode(I.LINE_LOOP):dt.setMode(I.LINE_STRIP)}else q.isPoints?dt.setMode(I.POINTS):q.isSprite&&dt.setMode(I.TRIANGLES);if(q.isBatchedMesh)if(J.get("WEBGL_multi_draw"))dt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const Qt=q._multiDrawStarts,De=q._multiDrawCounts,Mn=q._multiDrawCount,it=Ue?Z.get(Ue).bytesPerElement:1,Nn=w.get(X).currentProgram.getUniforms();for(let oi=0;oi<Mn;oi++)Nn.setValue(I,"_gl_DrawID",oi),dt.render(Qt[oi]/it,De[oi])}else if(q.isInstancedMesh)dt.renderInstances(Oe,Pt,q.count);else if(j.isInstancedBufferGeometry){const Qt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,De=Math.min(j.instanceCount,Qt);dt.renderInstances(Oe,Pt,De)}else dt.render(Oe,Pt)};function si(A,V,j){A.transparent===!0&&A.side===vi&&A.forceSinglePass===!1?(A.side=_n,A.needsUpdate=!0,Sa(A,V,j),A.side=Er,A.needsUpdate=!0,Sa(A,V,j),A.side=vi):Sa(A,V,j)}this.compile=function(A,V,j=null){j===null&&(j=A),T=we.get(j),T.init(V),x.push(T),j.traverseVisible(function(q){q.isLight&&q.layers.test(V.layers)&&(T.pushLight(q),q.castShadow&&T.pushShadow(q))}),A!==j&&A.traverseVisible(function(q){q.isLight&&q.layers.test(V.layers)&&(T.pushLight(q),q.castShadow&&T.pushShadow(q))}),T.setupLights();const X=new Set;return A.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const Pe=q.material;if(Pe)if(Array.isArray(Pe))for(let Ie=0;Ie<Pe.length;Ie++){const Ce=Pe[Ie];si(Ce,j,q),X.add(Ce)}else si(Pe,j,q),X.add(Pe)}),T=x.pop(),X},this.compileAsync=function(A,V,j=null){const X=this.compile(A,V,j);return new Promise(q=>{function Pe(){if(X.forEach(function(Ie){w.get(Ie).currentProgram.isReady()&&X.delete(Ie)}),X.size===0){q(A);return}setTimeout(Pe,10)}J.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let cc=null;function wv(A){cc&&cc(A)}function ud(){Pr.stop()}function fd(){Pr.start()}const Pr=new b0;Pr.setAnimationLoop(wv),typeof self<"u"&&Pr.setContext(self),this.setAnimationLoop=function(A){cc=A,Se.setAnimationLoop(A),A===null?Pr.stop():Pr.start()},Se.addEventListener("sessionstart",ud),Se.addEventListener("sessionend",fd),this.render=function(A,V){if(V!==void 0&&V.isCamera!==!0){nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;D!==null&&D.renderStart(A,V);const j=Se.enabled===!0&&Se.isPresenting===!0,X=b!==null&&(N===null||j)&&b.begin(C,N);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(V),V=Se.getCamera()),A.isScene===!0&&A.onBeforeRender(C,A,V,N),T=we.get(A,x.length),T.init(V),T.state.textureUnits=M.getTextureUnits(),x.push(T),F.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),ve.setFromProjectionMatrix(F,yi,V.reversedDepth),L=this.localClippingEnabled,Je=Me.init(this.clippingPlanes,L),E=oe.get(A,R.length),E.init(),R.push(E),Se.enabled===!0&&Se.isPresenting===!0){const Ie=C.xr.getDepthSensingMesh();Ie!==null&&uc(Ie,V,-1/0,C.sortObjects)}uc(A,V,0,C.sortObjects),E.finish(),C.sortObjects===!0&&E.sort(le,ee),ie=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,ie&&_e.addToRenderList(E,A),this.info.render.frame++,Je===!0&&Me.beginShadows();const q=T.state.shadowsArray;if(me.render(q,A,V),Je===!0&&Me.endShadows(),this.info.autoReset===!0&&this.info.reset(),(X&&b.hasRenderPass())===!1){const Ie=E.opaque,Ce=E.transmissive;if(T.setupLights(),V.isArrayCamera){const Ue=V.cameras;if(Ce.length>0)for(let Fe=0,qe=Ue.length;Fe<qe;Fe++){const Ze=Ue[Fe];dd(Ie,Ce,A,Ze)}ie&&_e.render(A);for(let Fe=0,qe=Ue.length;Fe<qe;Fe++){const Ze=Ue[Fe];hd(E,A,Ze,Ze.viewport)}}else Ce.length>0&&dd(Ie,Ce,A,V),ie&&_e.render(A),hd(E,A,V)}N!==null&&z===0&&(M.updateMultisampleRenderTarget(N),M.updateRenderTargetMipmap(N)),X&&b.end(C),A.isScene===!0&&A.onAfterRender(C,A,V),xe.resetDefaultState(),U=-1,O=null,x.pop(),x.length>0?(T=x[x.length-1],M.setTextureUnits(T.state.textureUnits),Je===!0&&Me.setGlobalState(C.clippingPlanes,T.state.camera)):T=null,R.pop(),R.length>0?E=R[R.length-1]:E=null,D!==null&&D.renderEnd()};function uc(A,V,j,X){if(A.visible===!1)return;if(A.layers.test(V.layers)){if(A.isGroup)j=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(V);else if(A.isLightProbeGrid)T.pushLightProbeGrid(A);else if(A.isLight)T.pushLight(A),A.castShadow&&T.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||ve.intersectsSprite(A)){X&&te.setFromMatrixPosition(A.matrixWorld).applyMatrix4(F);const Ie=ce.update(A),Ce=A.material;Ce.visible&&E.push(A,Ie,Ce,j,te.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||ve.intersectsObject(A))){const Ie=ce.update(A),Ce=A.material;if(X&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),te.copy(A.boundingSphere.center)):(Ie.boundingSphere===null&&Ie.computeBoundingSphere(),te.copy(Ie.boundingSphere.center)),te.applyMatrix4(A.matrixWorld).applyMatrix4(F)),Array.isArray(Ce)){const Ue=Ie.groups;for(let Fe=0,qe=Ue.length;Fe<qe;Fe++){const Ze=Ue[Fe],Oe=Ce[Ze.materialIndex];Oe&&Oe.visible&&E.push(A,Ie,Oe,j,te.z,Ze)}}else Ce.visible&&E.push(A,Ie,Ce,j,te.z,null)}}const Pe=A.children;for(let Ie=0,Ce=Pe.length;Ie<Ce;Ie++)uc(Pe[Ie],V,j,X)}function hd(A,V,j,X){const{opaque:q,transmissive:Pe,transparent:Ie}=A;T.setupLightsView(j),Je===!0&&Me.setGlobalState(C.clippingPlanes,j),X&&$.viewport(G.copy(X)),q.length>0&&xa(q,V,j),Pe.length>0&&xa(Pe,V,j),Ie.length>0&&xa(Ie,V,j),$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),$.setPolygonOffset(!1)}function dd(A,V,j,X){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[X.id]===void 0){const Oe=J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[X.id]=new Ti(1,1,{generateMipmaps:!0,type:Oe?ji:Gn,minFilter:qr,samples:Math.max(4,Ae.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}const Pe=T.state.transmissionRenderTarget[X.id],Ie=X.viewport||G;Pe.setSize(Ie.z*C.transmissionResolutionScale,Ie.w*C.transmissionResolutionScale);const Ce=C.getRenderTarget(),Ue=C.getActiveCubeFace(),Fe=C.getActiveMipmapLevel();C.setRenderTarget(Pe),C.getClearColor(Ee),Te=C.getClearAlpha(),Te<1&&C.setClearColor(16777215,.5),C.clear(),ie&&_e.render(j);const qe=C.toneMapping;C.toneMapping=Ei;const Ze=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),T.setupLightsView(X),Je===!0&&Me.setGlobalState(C.clippingPlanes,X),xa(A,j,X),M.updateMultisampleRenderTarget(Pe),M.updateRenderTargetMipmap(Pe),J.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let ft=0,Pt=V.length;ft<Pt;ft++){const wt=V[ft],{object:dt,geometry:Qt,material:De,group:Mn}=wt;if(De.side===vi&&dt.layers.test(X.layers)){const it=De.side;De.side=_n,De.needsUpdate=!0,pd(dt,j,X,Qt,De,Mn),De.side=it,De.needsUpdate=!0,Oe=!0}}Oe===!0&&(M.updateMultisampleRenderTarget(Pe),M.updateRenderTargetMipmap(Pe))}C.setRenderTarget(Ce,Ue,Fe),C.setClearColor(Ee,Te),Ze!==void 0&&(X.viewport=Ze),C.toneMapping=qe}function xa(A,V,j){const X=V.isScene===!0?V.overrideMaterial:null;for(let q=0,Pe=A.length;q<Pe;q++){const Ie=A[q],{object:Ce,geometry:Ue,group:Fe}=Ie;let qe=Ie.material;qe.allowOverride===!0&&X!==null&&(qe=X),Ce.layers.test(j.layers)&&pd(Ce,V,j,Ue,qe,Fe)}}function pd(A,V,j,X,q,Pe){A.onBeforeRender(C,V,j,X,q,Pe),A.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),q.onBeforeRender(C,V,j,X,A,Pe),q.transparent===!0&&q.side===vi&&q.forceSinglePass===!1?(q.side=_n,q.needsUpdate=!0,C.renderBufferDirect(j,V,X,q,A,Pe),q.side=Er,q.needsUpdate=!0,C.renderBufferDirect(j,V,X,q,A,Pe),q.side=vi):C.renderBufferDirect(j,V,X,q,A,Pe),A.onAfterRender(C,V,j,X,q,Pe)}function Sa(A,V,j){V.isScene!==!0&&(V=re);const X=w.get(A),q=T.state.lights,Pe=T.state.shadowsArray,Ie=q.state.version,Ce=pe.getParameters(A,q.state,Pe,V,j,T.state.lightProbeGridArray),Ue=pe.getProgramCacheKey(Ce);let Fe=X.programs;X.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?V.environment:null,X.fog=V.fog;const qe=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;X.envMap=H.get(A.envMap||X.environment,qe),X.envMapRotation=X.environment!==null&&A.envMap===null?V.environmentRotation:A.envMapRotation,Fe===void 0&&(A.addEventListener("dispose",Ct),Fe=new Map,X.programs=Fe);let Ze=Fe.get(Ue);if(Ze!==void 0){if(X.currentProgram===Ze&&X.lightsStateVersion===Ie)return _d(A,Ce),Ze}else Ce.uniforms=pe.getUniforms(A),D!==null&&A.isNodeMaterial&&D.build(A,j,Ce),A.onBeforeCompile(Ce,C),Ze=pe.acquireProgram(Ce,Ue),Fe.set(Ue,Ze),X.uniforms=Ce.uniforms;const Oe=X.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Oe.clippingPlanes=Me.uniform),_d(A,Ce),X.needsLights=Lv(A),X.lightsStateVersion=Ie,X.needsLights&&(Oe.ambientLightColor.value=q.state.ambient,Oe.lightProbe.value=q.state.probe,Oe.directionalLights.value=q.state.directional,Oe.directionalLightShadows.value=q.state.directionalShadow,Oe.spotLights.value=q.state.spot,Oe.spotLightShadows.value=q.state.spotShadow,Oe.rectAreaLights.value=q.state.rectArea,Oe.ltc_1.value=q.state.rectAreaLTC1,Oe.ltc_2.value=q.state.rectAreaLTC2,Oe.pointLights.value=q.state.point,Oe.pointLightShadows.value=q.state.pointShadow,Oe.hemisphereLights.value=q.state.hemi,Oe.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Oe.spotLightMatrix.value=q.state.spotLightMatrix,Oe.spotLightMap.value=q.state.spotLightMap,Oe.pointShadowMatrix.value=q.state.pointShadowMatrix),X.lightProbeGrid=T.state.lightProbeGridArray.length>0,X.currentProgram=Ze,X.uniformsList=null,Ze}function md(A){if(A.uniformsList===null){const V=A.currentProgram.getUniforms();A.uniformsList=ll.seqWithValue(V.seq,A.uniforms)}return A.uniformsList}function _d(A,V){const j=w.get(A);j.outputColorSpace=V.outputColorSpace,j.batching=V.batching,j.batchingColor=V.batchingColor,j.instancing=V.instancing,j.instancingColor=V.instancingColor,j.instancingMorph=V.instancingMorph,j.skinning=V.skinning,j.morphTargets=V.morphTargets,j.morphNormals=V.morphNormals,j.morphColors=V.morphColors,j.morphTargetsCount=V.morphTargetsCount,j.numClippingPlanes=V.numClippingPlanes,j.numIntersection=V.numClipIntersection,j.vertexAlphas=V.vertexAlphas,j.vertexTangents=V.vertexTangents,j.toneMapping=V.toneMapping}function Rv(A,V){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;S.setFromMatrixPosition(V.matrixWorld);for(let j=0,X=A.length;j<X;j++){const q=A[j];if(q.texture!==null&&q.boundingBox.containsPoint(S))return q}return null}function Cv(A,V,j,X,q){V.isScene!==!0&&(V=re),M.resetTextureUnits();const Pe=V.fog,Ie=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?V.environment:null,Ce=N===null?C.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Qe.workingColorSpace,Ue=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Fe=H.get(X.envMap||Ie,Ue),qe=X.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ze=!!j.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Oe=!!j.morphAttributes.position,ft=!!j.morphAttributes.normal,Pt=!!j.morphAttributes.color;let wt=Ei;X.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(wt=C.toneMapping);const dt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Qt=dt!==void 0?dt.length:0,De=w.get(X),Mn=T.state.lights;if(Je===!0&&(L===!0||A!==O)){const gt=A===O&&X.id===U;Me.setState(X,A,gt)}let it=!1;X.version===De.__version?(De.needsLights&&De.lightsStateVersion!==Mn.state.version||De.outputColorSpace!==Ce||q.isBatchedMesh&&De.batching===!1||!q.isBatchedMesh&&De.batching===!0||q.isBatchedMesh&&De.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&De.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&De.instancing===!1||!q.isInstancedMesh&&De.instancing===!0||q.isSkinnedMesh&&De.skinning===!1||!q.isSkinnedMesh&&De.skinning===!0||q.isInstancedMesh&&De.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&De.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&De.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&De.instancingMorph===!1&&q.morphTexture!==null||De.envMap!==Fe||X.fog===!0&&De.fog!==Pe||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==Me.numPlanes||De.numIntersection!==Me.numIntersection)||De.vertexAlphas!==qe||De.vertexTangents!==Ze||De.morphTargets!==Oe||De.morphNormals!==ft||De.morphColors!==Pt||De.toneMapping!==wt||De.morphTargetsCount!==Qt||!!De.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,De.__version=X.version);let Nn=De.currentProgram;it===!0&&(Nn=Sa(X,V,q),D&&X.isNodeMaterial&&D.onUpdateProgram(X,Nn,De));let oi=!1,tr=!1,fs=!1;const pt=Nn.getUniforms(),Lt=De.uniforms;if($.useProgram(Nn.program)&&(oi=!0,tr=!0,fs=!0),X.id!==U&&(U=X.id,tr=!0),De.needsLights){const gt=Rv(T.state.lightProbeGridArray,q);De.lightProbeGrid!==gt&&(De.lightProbeGrid=gt,tr=!0)}if(oi||O!==A){$.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),pt.setValue(I,"projectionMatrix",A.projectionMatrix),pt.setValue(I,"viewMatrix",A.matrixWorldInverse);const ir=pt.map.cameraPosition;ir!==void 0&&ir.setValue(I,W.setFromMatrixPosition(A.matrixWorld)),Ae.logarithmicDepthBuffer&&pt.setValue(I,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&pt.setValue(I,"isOrthographic",A.isOrthographicCamera===!0),O!==A&&(O=A,tr=!0,fs=!0)}if(De.needsLights&&(Mn.state.directionalShadowMap.length>0&&pt.setValue(I,"directionalShadowMap",Mn.state.directionalShadowMap,M),Mn.state.spotShadowMap.length>0&&pt.setValue(I,"spotShadowMap",Mn.state.spotShadowMap,M),Mn.state.pointShadowMap.length>0&&pt.setValue(I,"pointShadowMap",Mn.state.pointShadowMap,M)),q.isSkinnedMesh){pt.setOptional(I,q,"bindMatrix"),pt.setOptional(I,q,"bindMatrixInverse");const gt=q.skeleton;gt&&(gt.boneTexture===null&&gt.computeBoneTexture(),pt.setValue(I,"boneTexture",gt.boneTexture,M))}q.isBatchedMesh&&(pt.setOptional(I,q,"batchingTexture"),pt.setValue(I,"batchingTexture",q._matricesTexture,M),pt.setOptional(I,q,"batchingIdTexture"),pt.setValue(I,"batchingIdTexture",q._indirectTexture,M),pt.setOptional(I,q,"batchingColorTexture"),q._colorsTexture!==null&&pt.setValue(I,"batchingColorTexture",q._colorsTexture,M));const nr=j.morphAttributes;if((nr.position!==void 0||nr.normal!==void 0||nr.color!==void 0)&&He.update(q,j,Nn),(tr||De.receiveShadow!==q.receiveShadow)&&(De.receiveShadow=q.receiveShadow,pt.setValue(I,"receiveShadow",q.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&V.environment!==null&&(Lt.envMapIntensity.value=V.environmentIntensity),Lt.dfgLUT!==void 0&&(Lt.dfgLUT.value=DC()),tr){if(pt.setValue(I,"toneMappingExposure",C.toneMappingExposure),De.needsLights&&Pv(Lt,fs),Pe&&X.fog===!0&&Q.refreshFogUniforms(Lt,Pe),Q.refreshMaterialUniforms(Lt,X,Be,We,T.state.transmissionRenderTarget[A.id]),De.needsLights&&De.lightProbeGrid){const gt=De.lightProbeGrid;Lt.probesSH.value=gt.texture,Lt.probesMin.value.copy(gt.boundingBox.min),Lt.probesMax.value.copy(gt.boundingBox.max),Lt.probesResolution.value.copy(gt.resolution)}ll.upload(I,md(De),Lt,M)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(ll.upload(I,md(De),Lt,M),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&pt.setValue(I,"center",q.center),pt.setValue(I,"modelViewMatrix",q.modelViewMatrix),pt.setValue(I,"normalMatrix",q.normalMatrix),pt.setValue(I,"modelMatrix",q.matrixWorld),X.uniformsGroups!==void 0){const gt=X.uniformsGroups;for(let ir=0,hs=gt.length;ir<hs;ir++){const gd=gt[ir];ae.update(gd,Nn),ae.bind(gd,Nn)}}return Nn}function Pv(A,V){A.ambientLightColor.needsUpdate=V,A.lightProbe.needsUpdate=V,A.directionalLights.needsUpdate=V,A.directionalLightShadows.needsUpdate=V,A.pointLights.needsUpdate=V,A.pointLightShadows.needsUpdate=V,A.spotLights.needsUpdate=V,A.spotLightShadows.needsUpdate=V,A.rectAreaLights.needsUpdate=V,A.hemisphereLights.needsUpdate=V}function Lv(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(A,V,j){const X=w.get(A);X.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),w.get(A.texture).__webglTexture=V,w.get(A.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:j,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,V){const j=w.get(A);j.__webglFramebuffer=V,j.__useDefaultFramebuffer=V===void 0};const Dv=I.createFramebuffer();this.setRenderTarget=function(A,V=0,j=0){N=A,B=V,z=j;let X=null,q=!1,Pe=!1;if(A){const Ce=w.get(A);if(Ce.__useDefaultFramebuffer!==void 0){$.bindFramebuffer(I.FRAMEBUFFER,Ce.__webglFramebuffer),G.copy(A.viewport),ne.copy(A.scissor),ge=A.scissorTest,$.viewport(G),$.scissor(ne),$.setScissorTest(ge),U=-1;return}else if(Ce.__webglFramebuffer===void 0)M.setupRenderTarget(A);else if(Ce.__hasExternalTextures)M.rebindTextures(A,w.get(A.texture).__webglTexture,w.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const qe=A.depthTexture;if(Ce.__boundDepthTexture!==qe){if(qe!==null&&w.has(qe)&&(A.width!==qe.image.width||A.height!==qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(A)}}const Ue=A.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(Pe=!0);const Fe=w.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Fe[V])?X=Fe[V][j]:X=Fe[V],q=!0):A.samples>0&&M.useMultisampledRTT(A)===!1?X=w.get(A).__webglMultisampledFramebuffer:Array.isArray(Fe)?X=Fe[j]:X=Fe,G.copy(A.viewport),ne.copy(A.scissor),ge=A.scissorTest}else G.copy(K).multiplyScalar(Be).floor(),ne.copy(ye).multiplyScalar(Be).floor(),ge=fe;if(j!==0&&(X=Dv),$.bindFramebuffer(I.FRAMEBUFFER,X)&&$.drawBuffers(A,X),$.viewport(G),$.scissor(ne),$.setScissorTest(ge),q){const Ce=w.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+V,Ce.__webglTexture,j)}else if(Pe){const Ce=V;for(let Ue=0;Ue<A.textures.length;Ue++){const Fe=w.get(A.textures[Ue]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ue,Fe.__webglTexture,j,Ce)}}else if(A!==null&&j!==0){const Ce=w.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ce.__webglTexture,j)}U=-1},this.readRenderTargetPixels=function(A,V,j,X,q,Pe,Ie,Ce=0){if(!(A&&A.isWebGLRenderTarget)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=w.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ie!==void 0&&(Ue=Ue[Ie]),Ue){$.bindFramebuffer(I.FRAMEBUFFER,Ue);try{const Fe=A.textures[Ce],qe=Fe.format,Ze=Fe.type;if(A.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ce),!Ae.textureFormatReadable(qe)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ae.textureTypeReadable(Ze)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=A.width-X&&j>=0&&j<=A.height-q&&I.readPixels(V,j,X,q,k.convert(qe),k.convert(Ze),Pe)}finally{const Fe=N!==null?w.get(N).__webglFramebuffer:null;$.bindFramebuffer(I.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(A,V,j,X,q,Pe,Ie,Ce=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=w.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ie!==void 0&&(Ue=Ue[Ie]),Ue)if(V>=0&&V<=A.width-X&&j>=0&&j<=A.height-q){$.bindFramebuffer(I.FRAMEBUFFER,Ue);const Fe=A.textures[Ce],qe=Fe.format,Ze=Fe.type;if(A.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ce),!Ae.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ae.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Oe=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Oe),I.bufferData(I.PIXEL_PACK_BUFFER,Pe.byteLength,I.STREAM_READ),I.readPixels(V,j,X,q,k.convert(qe),k.convert(Ze),0);const ft=N!==null?w.get(N).__webglFramebuffer:null;$.bindFramebuffer(I.FRAMEBUFFER,ft);const Pt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await jE(I,Pt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Oe),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Pe),I.deleteBuffer(Oe),I.deleteSync(Pt),Pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,V=null,j=0){const X=Math.pow(2,-j),q=Math.floor(A.image.width*X),Pe=Math.floor(A.image.height*X),Ie=V!==null?V.x:0,Ce=V!==null?V.y:0;M.setTexture2D(A,0),I.copyTexSubImage2D(I.TEXTURE_2D,j,0,0,Ie,Ce,q,Pe),$.unbindTexture()};const Iv=I.createFramebuffer(),Uv=I.createFramebuffer();this.copyTextureToTexture=function(A,V,j=null,X=null,q=0,Pe=0){let Ie,Ce,Ue,Fe,qe,Ze,Oe,ft,Pt;const wt=A.isCompressedTexture?A.mipmaps[Pe]:A.image;if(j!==null)Ie=j.max.x-j.min.x,Ce=j.max.y-j.min.y,Ue=j.isBox3?j.max.z-j.min.z:1,Fe=j.min.x,qe=j.min.y,Ze=j.isBox3?j.min.z:0;else{const Lt=Math.pow(2,-q);Ie=Math.floor(wt.width*Lt),Ce=Math.floor(wt.height*Lt),A.isDataArrayTexture?Ue=wt.depth:A.isData3DTexture?Ue=Math.floor(wt.depth*Lt):Ue=1,Fe=0,qe=0,Ze=0}X!==null?(Oe=X.x,ft=X.y,Pt=X.z):(Oe=0,ft=0,Pt=0);const dt=k.convert(V.format),Qt=k.convert(V.type);let De;V.isData3DTexture?(M.setTexture3D(V,0),De=I.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(M.setTexture2DArray(V,0),De=I.TEXTURE_2D_ARRAY):(M.setTexture2D(V,0),De=I.TEXTURE_2D),$.activeTexture(I.TEXTURE0),$.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,V.flipY),$.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),$.pixelStorei(I.UNPACK_ALIGNMENT,V.unpackAlignment);const Mn=$.getParameter(I.UNPACK_ROW_LENGTH),it=$.getParameter(I.UNPACK_IMAGE_HEIGHT),Nn=$.getParameter(I.UNPACK_SKIP_PIXELS),oi=$.getParameter(I.UNPACK_SKIP_ROWS),tr=$.getParameter(I.UNPACK_SKIP_IMAGES);$.pixelStorei(I.UNPACK_ROW_LENGTH,wt.width),$.pixelStorei(I.UNPACK_IMAGE_HEIGHT,wt.height),$.pixelStorei(I.UNPACK_SKIP_PIXELS,Fe),$.pixelStorei(I.UNPACK_SKIP_ROWS,qe),$.pixelStorei(I.UNPACK_SKIP_IMAGES,Ze);const fs=A.isDataArrayTexture||A.isData3DTexture,pt=V.isDataArrayTexture||V.isData3DTexture;if(A.isDepthTexture){const Lt=w.get(A),nr=w.get(V),gt=w.get(Lt.__renderTarget),ir=w.get(nr.__renderTarget);$.bindFramebuffer(I.READ_FRAMEBUFFER,gt.__webglFramebuffer),$.bindFramebuffer(I.DRAW_FRAMEBUFFER,ir.__webglFramebuffer);for(let hs=0;hs<Ue;hs++)fs&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,w.get(A).__webglTexture,q,Ze+hs),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,w.get(V).__webglTexture,Pe,Pt+hs)),I.blitFramebuffer(Fe,qe,Ie,Ce,Oe,ft,Ie,Ce,I.DEPTH_BUFFER_BIT,I.NEAREST);$.bindFramebuffer(I.READ_FRAMEBUFFER,null),$.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(q!==0||A.isRenderTargetTexture||w.has(A)){const Lt=w.get(A),nr=w.get(V);$.bindFramebuffer(I.READ_FRAMEBUFFER,Iv),$.bindFramebuffer(I.DRAW_FRAMEBUFFER,Uv);for(let gt=0;gt<Ue;gt++)fs?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Lt.__webglTexture,q,Ze+gt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Lt.__webglTexture,q),pt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,nr.__webglTexture,Pe,Pt+gt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,nr.__webglTexture,Pe),q!==0?I.blitFramebuffer(Fe,qe,Ie,Ce,Oe,ft,Ie,Ce,I.COLOR_BUFFER_BIT,I.NEAREST):pt?I.copyTexSubImage3D(De,Pe,Oe,ft,Pt+gt,Fe,qe,Ie,Ce):I.copyTexSubImage2D(De,Pe,Oe,ft,Fe,qe,Ie,Ce);$.bindFramebuffer(I.READ_FRAMEBUFFER,null),$.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else pt?A.isDataTexture||A.isData3DTexture?I.texSubImage3D(De,Pe,Oe,ft,Pt,Ie,Ce,Ue,dt,Qt,wt.data):V.isCompressedArrayTexture?I.compressedTexSubImage3D(De,Pe,Oe,ft,Pt,Ie,Ce,Ue,dt,wt.data):I.texSubImage3D(De,Pe,Oe,ft,Pt,Ie,Ce,Ue,dt,Qt,wt):A.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,Pe,Oe,ft,Ie,Ce,dt,Qt,wt.data):A.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,Pe,Oe,ft,wt.width,wt.height,dt,wt.data):I.texSubImage2D(I.TEXTURE_2D,Pe,Oe,ft,Ie,Ce,dt,Qt,wt);$.pixelStorei(I.UNPACK_ROW_LENGTH,Mn),$.pixelStorei(I.UNPACK_IMAGE_HEIGHT,it),$.pixelStorei(I.UNPACK_SKIP_PIXELS,Nn),$.pixelStorei(I.UNPACK_SKIP_ROWS,oi),$.pixelStorei(I.UNPACK_SKIP_IMAGES,tr),Pe===0&&V.generateMipmaps&&I.generateMipmap(De),$.unbindTexture()},this.initRenderTarget=function(A){w.get(A).__webglFramebuffer===void 0&&M.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?M.setTextureCube(A,0):A.isData3DTexture?M.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?M.setTexture2DArray(A,0):M.setTexture2D(A,0),$.unbindTexture()},this.resetState=function(){B=0,z=0,N=null,$.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}function Bi(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function L0(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Dn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Qo={duration:.5,overwrite:!1,delay:0},zh,Zt,St,Wn=1e8,_t=1/Wn,kf=Math.PI*2,UC=kf/4,NC=0,D0=Math.sqrt,FC=Math.cos,OC=Math.sin,Yt=function(e){return typeof e=="string"},Rt=function(e){return typeof e=="function"},Zi=function(e){return typeof e=="number"},Vh=function(e){return typeof e>"u"},Ri=function(e){return typeof e=="object"},gn=function(e){return e!==!1},Gh=function(){return typeof window<"u"},Ja=function(e){return Rt(e)||Yt(e)},I0=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},sn=Array.isArray,BC=/random\([^)]+\)/g,kC=/,\s*/g,ym=/(?:-?\.?\d|\.)+/gi,U0=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ns=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,cu=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,N0=/[+-]=-?[.\d]+/,HC=/[^,'"\[\]\s]+/gi,zC=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Et,hi,Hf,Wh,In={},Ul={},F0,O0=function(e){return(Ul=to(e,In))&&yn},Xh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ea=function(e,t){return!t&&console.warn(e)},B0=function(e,t){return e&&(In[e]=t)&&Ul&&(Ul[e]=t)||In},ta=function(){return 0},VC={suppressEvents:!0,isStart:!0,kill:!1},cl={suppressEvents:!0,kill:!1},GC={suppressEvents:!0},qh={},Sr=[],zf={},k0,Tn={},uu={},Mm=30,ul=[],Yh="",$h=function(e){var t=e[0],i,r;if(Ri(t)||Rt(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=ul.length;r--&&!ul[r].targetTest(t););i=ul[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new av(e[r],i)))||e.splice(r,1);return e},es=function(e){return e._gsap||$h(Xn(e))[0]._gsap},H0=function(e,t,i){return(i=e[t])&&Rt(i)?e[t]():Vh(i)&&e.getAttribute&&e.getAttribute(t)||i},vn=function(e,t){return(e=e.split(",")).forEach(t)||e},Dt=function(e){return Math.round(e*1e5)/1e5||0},bt=function(e){return Math.round(e*1e7)/1e7||0},qs=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},WC=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},Nl=function(){var e=Sr.length,t=Sr.slice(0),i,r;for(zf={},Sr.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},jh=function(e){return!!(e._initted||e._startAt||e.add)},z0=function(e,t,i,r){Sr.length&&!Zt&&Nl(),e.render(t,i,!!(Zt&&t<0&&jh(e))),Sr.length&&!Zt&&Nl()},V0=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(HC).length<2?t:Yt(e)?e.trim():e},G0=function(e){return e},Un=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},XC=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},to=function(e,t){for(var i in t)e[i]=t[i];return e},bm=function n(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=Ri(t[i])?n(e[i]||(e[i]={}),t[i]):t[i]);return e},Fl=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},Bo=function(e){var t=e.parent||Et,i=e.keyframes?XC(sn(e.keyframes)):Un;if(gn(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},qC=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},W0=function(e,t,i,r,s){var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},oc=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[i]===t&&(e[i]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},Tr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},ts=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},YC=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Vf=function(e,t,i,r){return e._startAt&&(Zt?e._startAt.revert(cl):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},$C=function n(e){return!e||e._ts&&n(e.parent)},Em=function(e){return e._repeat?no(e._tTime,e=e.duration()+e._rDelay)*e:0},no=function(e,t){var i=Math.floor(e=bt(e/t));return e&&i===e?i-1:i},Ol=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},ac=function(e){return e._end=bt(e._start+(e._tDur/Math.abs(e._ts||e._rts||_t)||0))},lc=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=bt(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),ac(e),i._dirty||ts(i,e)),e},X0=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=Ol(e.rawTime(),t),(!t._dur||va(0,t.totalDuration(),i)-t._tTime>_t)&&t.render(i,!0)),ts(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-_t}},xi=function(e,t,i,r){return t.parent&&Tr(t),t._start=bt((Zi(i)?i:i||e!==Et?kn(e,i,t):e._time)+t._delay),t._end=bt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),W0(e,t,"_first","_last",e._sort?"_start":0),Gf(t)||(e._recent=t),r||X0(e,t),e._ts<0&&lc(e,e._tTime),e},q0=function(e,t){return(In.ScrollTrigger||Xh("scrollTrigger",t))&&In.ScrollTrigger.create(t,e)},Y0=function(e,t,i,r,s){if(Zh(e,t,s),!e._initted)return 1;if(!i&&e._pt&&!Zt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&k0!==wn.frame)return Sr.push(e),e._lazy=[s,r],1},jC=function n(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||n(t))},Gf=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},KC=function(e,t,i,r){var s=e.ratio,o=t<0||!t&&(!e._start&&jC(e)&&!(!e._initted&&Gf(e))||(e._ts<0||e._dp._ts<0)&&!Gf(e))?0:1,a=e._rDelay,l=0,c,u,f;if(a&&e._repeat&&(l=va(0,e._tDur,t),u=no(l,a),e._yoyo&&u&1&&(o=1-o),u!==no(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||Zt||r||e._zTime===_t||!t&&e._zTime){if(!e._initted&&Y0(e,t,r,i,l))return;for(f=e._zTime,e._zTime=t||(i?_t:0),i||(i=t&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&Vf(e,t,i,!0),e._onUpdate&&!i&&Cn(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&Cn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Tr(e,1),!i&&!Zt&&(Cn(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},ZC=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},io=function(e,t,i,r){var s=e._repeat,o=bt(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:bt(o*(s+1)+e._rDelay*s):o,a>0&&!r&&lc(e,e._tTime=e._tDur*a),e.parent&&ac(e),i||ts(e.parent,e),e},Tm=function(e){return e instanceof pn?ts(e):io(e,e._dur)},JC={_start:0,endTime:ta,totalDuration:ta},kn=function n(e,t,i){var r=e.labels,s=e._recent||JC,o=e.duration()>=Wn?s.endTime(!1):e._dur,a,l,c;return Yt(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:i).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&i&&(l=l/100*(sn(i)?i[0]:i).totalDuration()),a>1?n(e,t.substr(0,a-1),i)+l:o+l)):t==null?o:+t},ko=function(e,t,i){var r=Zi(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,l;if(r&&(o.duration=t[1]),o.parent=i,e){for(a=o,l=i;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=gn(l.vars.inherit)&&l.parent;o.immediateRender=gn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Ft(t[0],o,t[s+1])},Cr=function(e,t){return e||e===0?t(e):t},va=function(e,t,i){return i<e?e:i>t?t:i},rn=function(e,t){return!Yt(e)||!(t=zC.exec(e))?"":t[1]},QC=function(e,t,i){return Cr(i,function(r){return va(e,t,r)})},Wf=[].slice,$0=function(e,t){return e&&Ri(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Ri(e[0]))&&!e.nodeType&&e!==hi},eP=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var s;return Yt(r)&&!t||$0(r,1)?(s=i).push.apply(s,Xn(r)):i.push(r)})||i},Xn=function(e,t,i){return St&&!t&&St.selector?St.selector(e):Yt(e)&&!i&&(Hf||!ro())?Wf.call((t||Wh).querySelectorAll(e),0):sn(e)?eP(e,i):$0(e)?Wf.call(e,0):e?[e]:[]},Xf=function(e){return e=Xn(e)[0]||ea("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return Xn(t,i.querySelectorAll?i:i===e?ea("Invalid scope")||Wh.createElement("div"):e)}},j0=function(e){return e.sort(function(){return .5-Math.random()})},K0=function(e){if(Rt(e))return e;var t=Ri(e)?e:{each:e},i=ns(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=t.axis,u=r,f=r;return Yt(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],f=r[1]),function(h,d,p){var _=(p||t).length,m=o[_],g,y,v,S,E,T,R,x,b;if(!m){if(b=t.grid==="auto"?0:(t.grid||[1,Wn])[1],!b){for(R=-Wn;R<(R=p[b++].getBoundingClientRect().left)&&b<_;);b<_&&b--}for(m=o[_]=[],g=l?Math.min(b,_)*u-.5:r%b,y=b===Wn?0:l?_*f/b-.5:r/b|0,R=0,x=Wn,T=0;T<_;T++)v=T%b-g,S=y-(T/b|0),m[T]=E=c?Math.abs(c==="y"?S:v):D0(v*v+S*S),E>R&&(R=E),E<x&&(x=E);r==="random"&&j0(m),m.max=R-x,m.min=x,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(b>_?_-1:c?c==="y"?_/b:b:Math.max(b,_/b))||0)*(r==="edges"?-1:1),m.b=_<0?s-_:s,m.u=rn(t.amount||t.each)||0,i=i&&_<0?dP(i):i}return _=(m[h]-m.min)/m.max||0,bt(m.b+(i?i(_):_)*m.v)+m.u}},qf=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=bt(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(Zi(i)?0:rn(i))}},Z0=function(e,t){var i=sn(e),r,s;return!i&&Ri(e)&&(r=i=e.radius||Wn,e.values?(e=Xn(e.values),(s=!Zi(e[0]))&&(r*=r)):e=qf(e.increment)),Cr(t,i?Rt(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Wn,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-a,d=e[f].y-l,h=h*h+d*d):h=Math.abs(e[f]-a),h<c&&(c=h,u=f);return u=!r||c<=r?e[u]:o,s||u===o||Zi(o)?u:u+rn(o)}:qf(e))},J0=function(e,t,i,r){return Cr(sn(e)?!t:i===!0?!!(i=0):!r,function(){return sn(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},tP=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(r){return t.reduce(function(s,o){return o(s)},r)}},nP=function(e,t){return function(i){return e(parseFloat(i))+(t||rn(i))}},iP=function(e,t,i){return ev(e,t,0,1,i)},Q0=function(e,t,i){return Cr(i,function(r){return e[~~t(r)]})},rP=function n(e,t,i){var r=t-e;return sn(e)?Q0(e,n(0,e.length),t):Cr(i,function(s){return(r+(s-e)%r)%r+e})},sP=function n(e,t,i){var r=t-e,s=r*2;return sn(e)?Q0(e,n(0,e.length-1),t):Cr(i,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},na=function(e){return e.replace(BC,function(t){var i=t.indexOf("[")+1,r=t.substring(i||7,i?t.indexOf("]"):t.length-1).split(kC);return J0(i?r:+r[0],i?0:+r[1],+r[2]||1e-5)})},ev=function(e,t,i,r,s){var o=t-e,a=r-i;return Cr(s,function(l){return i+((l-e)/o*a||0)})},oP=function n(e,t,i,r){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var o=Yt(e),a={},l,c,u,f,h;if(i===!0&&(r=1)&&(i=null),o)e={p:e},t={p:t};else if(sn(e)&&!sn(t)){for(u=[],f=e.length,h=f-2,c=1;c<f;c++)u.push(n(e[c-1],e[c]));f--,s=function(p){p*=f;var _=Math.min(h,~~p);return u[_](p-_)},i=t}else r||(e=to(sn(e)?[]:{},e));if(!u){for(l in t)Kh.call(a,e,l,"get",t[l]);s=function(p){return ed(p,a)||(o?e.p:e)}}}return Cr(i,s)},Am=function(e,t,i){var r=e.labels,s=Wn,o,a,l;for(o in r)a=r[o]-t,a<0==!!i&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Cn=function(e,t,i){var r=e.vars,s=r[t],o=St,a=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,i&&Sr.length&&Nl(),a&&(St=a),u=l?s.apply(c,l):s.call(c),St=o,u},Co=function(e){return Tr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Zt),e.progress()<1&&Cn(e,"onInterrupt"),e},Fs,tv=[],nv=function(e){if(e)if(e=!e.name&&e.default||e,Gh()||e.headless){var t=e.name,i=Rt(e),r=t&&!i&&e.init?function(){this._props=[]}:e,s={init:ta,render:ed,add:Kh,kill:bP,modifier:MP,rawVars:0},o={targetTest:0,get:0,getSetter:Qh,aliases:{},register:0};if(ro(),e!==r){if(Tn[t])return;Un(r,Un(Fl(e,s),o)),to(r.prototype,to(s,Fl(e,o))),Tn[r.prop=t]=r,e.targetTest&&(ul.push(r),qh[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}B0(t,r),e.register&&e.register(yn,r,xn)}else tv.push(e)},mt=255,Po={aqua:[0,mt,mt],lime:[0,mt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,mt],navy:[0,0,128],white:[mt,mt,mt],olive:[128,128,0],yellow:[mt,mt,0],orange:[mt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[mt,0,0],pink:[mt,192,203],cyan:[0,mt,mt],transparent:[mt,mt,mt,0]},fu=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*mt+.5|0},iv=function(e,t,i){var r=e?Zi(e)?[e>>16,e>>8&mt,e&mt]:0:Po.black,s,o,a,l,c,u,f,h,d,p;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Po[e])r=Po[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&mt,r&mt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&mt,e&mt]}else if(e.substr(0,3)==="hsl"){if(r=p=e.match(ym),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=fu(l+1/3,s,o),r[1]=fu(l,s,o),r[2]=fu(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(U0),i&&r.length<4&&(r[3]=1),r}else r=e.match(ym)||Po.transparent;r=r.map(Number)}return t&&!p&&(s=r[0]/mt,o=r[1]/mt,a=r[2]/mt,f=Math.max(s,o,a),h=Math.min(s,o,a),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(o-a)/d+(o<a?6:0):f===o?(a-s)/d+2:(s-o)/d+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),i&&r.length<4&&(r[3]=1),r},rv=function(e){var t=[],i=[],r=-1;return e.split(yr).forEach(function(s){var o=s.match(Ns)||[];t.push.apply(t,o),i.push(r+=o.length+1)}),t.c=i,t},wm=function(e,t,i){var r="",s=(e+r).match(yr),o=t?"hsla(":"rgba(",a=0,l,c,u,f;if(!s)return e;if(s=s.map(function(h){return(h=iv(h,t,1))&&o+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),i&&(u=rv(e),l=i.c,l.join(r)!==u.c.join(r)))for(c=e.replace(yr,"1").split(Ns),f=c.length-1;a<f;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:i).shift());if(!c)for(c=e.split(yr),f=c.length-1;a<f;a++)r+=c[a]+s[a];return r+c[f]},yr=function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Po)n+="|"+e+"\\b";return new RegExp(n+")","gi")}(),aP=/hsl[a]?\(/,sv=function(e){var t=e.join(" "),i;if(yr.lastIndex=0,yr.test(t))return i=aP.test(t),e[1]=wm(e[1],i),e[0]=wm(e[0],i,rv(e[1])),!0},ia,wn=function(){var n=Date.now,e=500,t=33,i=n(),r=i,s=1e3/240,o=s,a=[],l,c,u,f,h,d,p=function _(m){var g=n()-r,y=m===!0,v,S,E,T;if((g>e||g<0)&&(i+=g-t),r+=g,E=r-i,v=E-o,(v>0||y)&&(T=++f.frame,h=E-f.time*1e3,f.time=E=E/1e3,o+=v+(v>=s?4:s-v),S=1),y||(l=c(_)),S)for(d=0;d<a.length;d++)a[d](E,h,T,m)};return f={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){F0&&(!Hf&&Gh()&&(hi=Hf=window,Wh=hi.document||{},In.gsap=yn,(hi.gsapVersions||(hi.gsapVersions=[])).push(yn.version),O0(Ul||hi.GreenSockGlobals||!hi.gsap&&hi||{}),tv.forEach(nv)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(m){return setTimeout(m,o-f.time*1e3+1|0)},ia=1,p(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ia=0,c=ta},lagSmoothing:function(m,g){e=m||1/0,t=Math.min(g||33,e)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,g,y){var v=g?function(S,E,T,R){m(S,E,T,R),f.remove(v)}:m;return f.remove(m),a[y?"unshift":"push"](v),ro(),v},remove:function(m,g){~(g=a.indexOf(m))&&a.splice(g,1)&&d>=g&&d--},_listeners:a},f}(),ro=function(){return!ia&&wn.wake()},tt={},lP=/^[\d.\-M][\d.\-,\s]/,cP=/["']/g,uP=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],s=1,o=i.length,a,l,c;s<o;s++)l=i[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[r]=isNaN(c)?c.replace(cP,"").trim():+c,r=l.substr(a+1).trim();return t},fP=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},hP=function(e){var t=(e+"").split("("),i=tt[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[uP(t[1])]:fP(e).split(",").map(V0)):tt._CE&&lP.test(e)?tt._CE("",e):i},dP=function(e){return function(t){return 1-e(1-t)}},ns=function(e,t){return e&&(Rt(e)?e:tt[e]||hP(e))||t},us=function(e,t,i,r){i===void 0&&(i=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:i,easeInOut:r},o;return vn(e,function(a){tt[a]=In[a]=s,tt[o=a.toLowerCase()]=i;for(var l in s)tt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=tt[a+"."+l]=s[l]}),s},ov=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},hu=function n(e,t,i){var r=t>=1?t:1,s=(i||(e?.3:.45))/(t<1?t:1),o=s/kf*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*OC((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:ov(a);return s=kf/s,l.config=function(c,u){return n(e,c,u)},l},du=function n(e,t){t===void 0&&(t=1.70158);var i=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?i:e==="in"?function(s){return 1-i(1-s)}:ov(i);return r.config=function(s){return n(e,s)},r};vn("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,e){var t=e<5?e+1:e;us(n+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});tt.Linear.easeNone=tt.none=tt.Linear.easeIn;us("Elastic",hu("in"),hu("out"),hu());(function(n,e){var t=1/e,i=2*t,r=2.5*t,s=function(a){return a<t?n*a*a:a<i?n*Math.pow(a-1.5/e,2)+.75:a<r?n*(a-=2.25/e)*a+.9375:n*Math.pow(a-2.625/e,2)+.984375};us("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);us("Expo",function(n){return Math.pow(2,10*(n-1))*n+n*n*n*n*n*n*(1-n)});us("Circ",function(n){return-(D0(1-n*n)-1)});us("Sine",function(n){return n===1?1:-FC(n*UC)+1});us("Back",du("in"),du("out"),du());tt.SteppedEase=tt.steps=In.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+(t?0:1),s=t?1:0,o=1-_t;return function(a){return((r*va(0,o,a)|0)+s)*i}}};Qo.ease=tt["quad.out"];vn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return Yh+=n+","+n+"Params,"});var av=function(e,t){this.id=NC++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:H0,this.set=t?t.getSetter:Qh},ra=function(){function n(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,io(this,+t.duration,1,1),this.data=t.data,St&&(this._ctx=St,St.data.push(this)),ia||wn.wake()}var e=n.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,io(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(ro(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(lc(this,i),!s._dp||s.parent||X0(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&xi(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===_t||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),z0(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+Em(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+Em(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*s,r):this._repeat?no(this._tTime,s)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-_t?0:this._rts;if(this._rts===i)return this;var s=this.parent&&this._ts?Ol(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-_t?0:this._rts,this.totalTime(va(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),ac(this),YC(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ro(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==_t&&(this._tTime-=_t)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=bt(i);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&xi(r,this,this._start-this._delay),this}return this._start},e.endTime=function(i){return this._start+(gn(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ol(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=GC);var r=Zt;return Zt=i,jh(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),Zt=r,this},e.globalTime=function(i){for(var r=this,s=arguments.length?i:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):s},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,Tm(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,Tm(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(kn(this,i),gn(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,gn(r)),this._dur||(this._zTime=-_t),this},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-_t:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-_t,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,s;return!!(!i||this._ts&&this._initted&&i.isActive()&&(s=i.rawTime(!0))>=r&&s<this.endTime(!0)-_t)},e.eventCallback=function(i,r,s){var o=this.vars;return arguments.length>1?(r?(o[i]=r,s&&(o[i+"Params"]=s),i==="onUpdate"&&(this._onUpdate=r)):delete o[i],this):o[i]},e.then=function(i){var r=this,s=r._prom;return new Promise(function(o){var a=Rt(i)?i:G0,l=function(){var u=r.then;r.then=null,s&&s(),Rt(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=u),o(a),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){Co(this)},n}();Un(ra.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-_t,_prom:0,_ps:!1,_rts:1});var pn=function(n){L0(e,n);function e(i,r){var s;return i===void 0&&(i={}),s=n.call(this,i)||this,s.labels={},s.smoothChildTiming=!!i.smoothChildTiming,s.autoRemoveChildren=!!i.autoRemoveChildren,s._sort=gn(i.sortChildren),Et&&xi(i.parent||Et,Bi(s),r),i.reversed&&s.reverse(),i.paused&&s.paused(!0),i.scrollTrigger&&q0(Bi(s),i.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return ko(0,arguments,this),this},t.from=function(r,s,o){return ko(1,arguments,this),this},t.fromTo=function(r,s,o,a){return ko(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,Bo(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ft(r,s,kn(this,o),1),this},t.call=function(r,s,o){return xi(this,Ft.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Ft(r,o,kn(this,l)),this},t.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,Bo(o).immediateRender=gn(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},t.staggerFromTo=function(r,s,o,a,l,c,u,f){return a.startAt=o,Bo(a).immediateRender=gn(a.immediateRender),this.staggerTo(r,s,a,l,c,u,f)},t.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:bt(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,d,p,_,m,g,y,v,S,E,T,R;if(this!==Et&&u>l&&r>=0&&(u=l),u!==this._tTime||o||f){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),h=u,S=this._start,v=this._ts,g=!v,f&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(T=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(h=bt(u%m),u===l?(_=this._repeat,h=c):(E=bt(u/m),_=~~E,_&&_===E&&(h=c,_--),h>c&&(h=c)),E=no(this._tTime,m),!a&&this._tTime&&E!==_&&this._tTime-E*m-this._dur<=0&&(E=_),T&&_&1&&(h=c-h,R=1),_!==E&&!this._lock){var x=T&&E&1,b=x===(T&&_&1);if(_<E&&(x=!x),a=x?0:u%c?c:u,this._lock=1,this.render(a||(R?0:bt(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Cn(this,"onRepeat"),this.vars.repeatRefresh&&!R&&(this.invalidate()._lock=1,E=_),a&&a!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,b&&(this._lock=2,a=x?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!R&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=ZC(this,bt(a),bt(h)),y&&(u-=h-(h=y._start))),this._tTime=u,this._time=h,this._act=!!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&c&&!s&&!E&&(Cn(this,"onStart"),this._tTime!==u))return this;if(h>=a&&r>=0)for(d=this._first;d;){if(p=d._next,(d._act||h>=d._start)&&d._ts&&y!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,o),h!==this._time||!this._ts&&!g){y=0,p&&(u+=this._zTime=-_t);break}}d=p}else{d=this._last;for(var C=r<0?r:h;d;){if(p=d._prev,(d._act||C<=d._end)&&d._ts&&y!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(C-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(C-d._start)*d._ts,s,o||Zt&&jh(d)),h!==this._time||!this._ts&&!g){y=0,p&&(u+=this._zTime=C?-_t:_t);break}}d=p}}if(y&&!s&&(this.pause(),y.render(h>=a?0:-_t)._zTime=h>=a?1:-1,this._ts))return this._start=S,ac(this),this.render(r,s,o);this._onUpdate&&!s&&Cn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(S===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Tr(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(Cn(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(Zi(s)||(s=kn(this,s,r)),!(r instanceof ra)){if(sn(r))return r.forEach(function(a){return o.add(a,s)}),this;if(Yt(r))return this.addLabel(r,s);if(Rt(r))r=Ft.delayedCall(0,r);else return this}return this!==r?xi(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Wn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Ft?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return Yt(r)?this.removeLabel(r):Rt(r)?this.killTweensOf(r):(r.parent===this&&oc(this,r),r===this._recent&&(this._recent=this._last),ts(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=bt(wn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),n.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=kn(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=Ft.delayedCall(0,s||ta,o);return a.data="isPause",this._hasPause=1,xi(this,a,kn(this,r))},t.removePause=function(r){var s=this._first;for(r=kn(this,r);s;)s._start===r&&s.data==="isPause"&&Tr(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)gr!==a[l]&&a[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=Xn(r),l=this._first,c=Zi(s),u;l;)l instanceof Ft?WC(l._targets,a)&&(c?(!gr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=kn(o,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,p=Ft.to(o,Un({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||_t,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());p._dur!==m&&io(p,m,0,1).render(p._time,!0,!0),d=1}u&&u.apply(p,f||[])}},s));return h?p.render(0):p},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,Un({startAt:{time:kn(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),Am(this,kn(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),Am(this,kn(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+_t)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(r=bt(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return ts(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return n.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),ts(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,l=Wn,c,u,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,xi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=bt(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;io(o,o===Et&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(Et._ts&&(z0(Et,Ol(r,Et)),k0=wn.frame),wn.frame>=Mm){Mm+=Dn.autoSleep||120;var s=Et._first;if((!s||!s._ts)&&Dn.autoSleep&&wn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||wn.sleep()}}},e}(ra);Un(pn.prototype,{_lock:0,_hasPause:0,_forcing:0});var pP=function(e,t,i,r,s,o,a){var l=new xn(this._pt,e,t,0,1,dv,null,s),c=0,u=0,f,h,d,p,_,m,g,y;for(l.b=i,l.e=r,i+="",r+="",(g=~r.indexOf("random("))&&(r=na(r)),o&&(y=[i,r],o(y,e,t),i=y[0],r=y[1]),h=i.match(cu)||[];f=cu.exec(r);)p=f[0],_=r.substring(c,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),p!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:p.charAt(1)==="="?qs(m,p)-m:parseFloat(p)-m,m:d&&d<4?Math.round:0},c=cu.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(N0.test(r)||g)&&(l.e=0),this._pt=l,l},Kh=function(e,t,i,r,s,o,a,l,c,u){Rt(r)&&(r=r(s||0,e,o));var f=e[t],h=i!=="get"?i:Rt(f)?c?e[t.indexOf("set")||!Rt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():f,d=Rt(f)?c?xP:fv:Jh,p;if(Yt(r)&&(~r.indexOf("random(")&&(r=na(r)),r.charAt(1)==="="&&(p=qs(h,r)+(rn(h)||0),(p||p===0)&&(r=p))),!u||h!==r||Yf)return!isNaN(h*r)&&r!==""?(p=new xn(this._pt,e,t,+h||0,r-(h||0),typeof f=="boolean"?yP:hv,0,d),c&&(p.fp=c),a&&p.modifier(a,this,e),this._pt=p):(!f&&!(t in e)&&Xh(t,r),pP.call(this,e,t,h,r,d,l||Dn.stringFilter,c))},mP=function(e,t,i,r,s){if(Rt(e)&&(e=Ho(e,s,t,i,r)),!Ri(e)||e.style&&e.nodeType||sn(e)||I0(e))return Yt(e)?Ho(e,s,t,i,r):e;var o={},a;for(a in e)o[a]=Ho(e[a],s,t,i,r);return o},lv=function(e,t,i,r,s,o){var a,l,c,u;if(Tn[e]&&(a=new Tn[e]).init(s,a.rawVars?t[e]:mP(t[e],r,s,o,i),i,r,o)!==!1&&(i._pt=l=new xn(i._pt,s,e,0,1,a.render,a,0,a.priority),i!==Fs))for(c=i._ptLookup[i._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},gr,Yf,Zh=function n(e,t,i){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,p=e._dur,_=e._startAt,m=e._targets,g=e.parent,y=g&&g.data==="nested"?g.vars.targets:m,v=e._overwrite==="auto"&&!zh,S=e.timeline,E=r.easeReverse||f,T,R,x,b,C,P,D,B,z,N,U,O,G;if(S&&(!h||!s)&&(s="none"),e._ease=ns(s,Qo.ease),e._rEase=E&&(ns(E)||e._ease),e._from=!S&&!!r.runBackwards,e._from&&(e.ratio=1),!S||h&&!r.stagger){if(B=m[0]?es(m[0]).harness:0,O=B&&r[B.prop],T=Fl(r,qh),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&p?cl:VC),_._lazy=0),o){if(Tr(e._startAt=Ft.set(m,Un({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!_&&gn(l),startAt:null,delay:0,onUpdate:c&&function(){return Cn(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Zt||!a&&!d)&&e._startAt.revert(cl),a&&p&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(u&&p&&!_){if(t&&(a=!1),x=Un({overwrite:!1,data:"isFromStart",lazy:a&&!_&&gn(l),immediateRender:a,stagger:0,parent:g},T),O&&(x[B.prop]=O),Tr(e._startAt=Ft.set(m,x)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Zt?e._startAt.revert(cl):e._startAt.render(-1,!0)),e._zTime=t,!a)n(e._startAt,_t,_t);else if(!t)return}for(e._pt=e._ptCache=0,l=p&&gn(l)||l&&!p,R=0;R<m.length;R++){if(C=m[R],D=C._gsap||$h(m)[R]._gsap,e._ptLookup[R]=N={},zf[D.id]&&Sr.length&&Nl(),U=y===m?R:y.indexOf(C),B&&(z=new B).init(C,O||T,e,U,y)!==!1&&(e._pt=b=new xn(e._pt,C,z.name,0,1,z.render,z,0,z.priority),z._props.forEach(function(ne){N[ne]=b}),z.priority&&(P=1)),!B||O)for(x in T)Tn[x]&&(z=lv(x,T,e,U,C,y))?z.priority&&(P=1):N[x]=b=Kh.call(e,C,x,"get",T[x],U,y,0,r.stringFilter);e._op&&e._op[R]&&e.kill(C,e._op[R]),v&&e._pt&&(gr=e,Et.killTweensOf(C,N,e.globalTime(t)),G=!e.parent,gr=0),e._pt&&l&&(zf[D.id]=1)}P&&pv(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!G,h&&t<=0&&S.render(Wn,!0,!0)},_P=function(e,t,i,r,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,f,h,d;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Yf=1,e.vars[t]="+=0",Zh(e,a),Yf=0,l?ea(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=i-u.s,f.e&&(f.e=Dt(i)+rn(f.e)),f.b&&(f.b=u.s+rn(f.b))},gP=function(e,t){var i=e[0]?es(e[0]).harness:0,r=i&&i.aliases,s,o,a,l;if(!r)return t;s=to({},t);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},vP=function(e,t,i,r){var s=t.ease||r||"power1.inOut",o,a;if(sn(t))a=i[e]||(i[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=i[o]||(i[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Ho=function(e,t,i,r,s){return Rt(e)?e.call(t,i,r,s):Yt(e)&&~e.indexOf("random(")?na(e):e},cv=Yh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",uv={};vn(cv+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return uv[n]=1});var Ft=function(n){L0(e,n);function e(i,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=n.call(this,o?r:Bo(r))||this;var l=a.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,p=l.keyframes,_=l.defaults,m=l.scrollTrigger,g=r.parent||Et,y=(sn(i)||I0(i)?Zi(i[0]):"length"in r)?[i]:Xn(i),v,S,E,T,R,x,b,C;if(a._targets=y.length?$h(y):ea("GSAP target "+i+" not found. https://gsap.com",!Dn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,p||h||Ja(c)||Ja(u)){r=a.vars;var P=r.easeReverse||r.yoyoEase;if(v=a.timeline=new pn({data:"nested",defaults:_||{},targets:g&&g.data==="nested"?g.vars.targets:y}),v.kill(),v.parent=v._dp=Bi(a),v._start=0,h||Ja(c)||Ja(u)){if(T=y.length,b=h&&K0(h),Ri(h))for(R in h)~cv.indexOf(R)&&(C||(C={}),C[R]=h[R]);for(S=0;S<T;S++)E=Fl(r,uv),E.stagger=0,P&&(E.easeReverse=P),C&&to(E,C),x=y[S],E.duration=+Ho(c,Bi(a),S,x,y),E.delay=(+Ho(u,Bi(a),S,x,y)||0)-a._delay,!h&&T===1&&E.delay&&(a._delay=u=E.delay,a._start+=u,E.delay=0),v.to(x,E,b?b(S,x,y):0),v._ease=tt.none;v.duration()?c=u=0:a.timeline=0}else if(p){Bo(Un(v.vars.defaults,{ease:"none"})),v._ease=ns(p.ease||r.ease||"none");var D=0,B,z,N;if(sn(p))p.forEach(function(U){return v.to(y,U,">")}),v.duration();else{E={};for(R in p)R==="ease"||R==="easeEach"||vP(R,p[R],E,p.easeEach);for(R in E)for(B=E[R].sort(function(U,O){return U.t-O.t}),D=0,S=0;S<B.length;S++)z=B[S],N={ease:z.e,duration:(z.t-(S?B[S-1].t:0))/100*c},N[R]=z.v,v.to(y,N,D),D+=N.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return d===!0&&!zh&&(gr=Bi(a),Et.killTweensOf(y),gr=0),xi(g,Bi(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!c&&!p&&a._start===bt(g._time)&&gn(f)&&$C(Bi(a))&&g.data!=="nested")&&(a._tTime=-_t,a.render(Math.max(0,-u)||0)),m&&q0(Bi(a),m),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-_t&&!u?l:r<_t?0:r,h,d,p,_,m,g,y,v;if(!c)KC(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,v=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+r,s,o);if(h=bt(f%_),f===l?(p=this._repeat,h=c):(m=bt(f/_),p=~~m,p&&p===m?(h=c,p--):h>c&&(h=c)),g=this._yoyo&&p&1,g&&(h=c-h),m=no(this._tTime,_),h===a&&!o&&this._initted&&p===m)return this._tTime=f,this;p!==m&&this.vars.repeatRefresh&&!g&&!this._lock&&h!==_&&this._initted&&(this._lock=o=1,this.render(bt(_*p),!0).invalidate()._lock=0)}if(!this._initted){if(Y0(this,u?r:h,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&p!==m))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._rEase){var S=h<a;if(S!==this._inv){var E=S?a:c-a;this._inv=S,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=E?(S?-1:1)/E:0,this._invScale=S?-this.ratio:1-this.ratio,this._invEase=S?this._rEase:this._ease}this.ratio=y=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=y=this._ease(h/c);if(this._from&&(this.ratio=y=1-y),this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&f&&!s&&!m&&(Cn(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(y,d.d),d=d._next;v&&v.render(r<0?r:v._dur*v._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&Vf(this,r,s,o),Cn(this,"onUpdate")),this._repeat&&p!==m&&this.vars.onRepeat&&!s&&this.parent&&Cn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&Vf(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&Tr(this,1),!s&&!(u&&!a)&&(f||a||g)&&(Cn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),n.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,l){ia||wn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Zh(this,c),u=this._ease(c/this._dur),_P(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(lc(this,0),this.parent||W0(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Co(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Zt),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,gr&&gr.vars.overwrite!==!0)._first||Co(this),this.parent&&o!==this.timeline.totalDuration()&&io(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?Xn(r):a,c=this._ptLookup,u=this._pt,f,h,d,p,_,m,g;if((!s||s==="all")&&qC(a,l))return s==="all"&&(this._pt=0),Co(this);for(f=this._op=this._op||[],s!=="all"&&(Yt(s)&&(_={},vn(s,function(y){return _[y]=1}),s=_),s=gP(a,s)),g=a.length;g--;)if(~l.indexOf(a[g])){h=c[g],s==="all"?(f[g]=s,p=h,d={}):(d=f[g]=f[g]||{},p=s);for(_ in p)m=h&&h[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&oc(this,m,"_pt"),delete h[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&Co(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return ko(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return ko(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return Et.killTweensOf(r,s,o)},e}(ra);Un(Ft.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});vn("staggerTo,staggerFrom,staggerFromTo",function(n){Ft[n]=function(){var e=new pn,t=Wf.call(arguments,0);return t.splice(n==="staggerFromTo"?5:4,0,0),e[n].apply(e,t)}});var Jh=function(e,t,i){return e[t]=i},fv=function(e,t,i){return e[t](i)},xP=function(e,t,i,r){return e[t](r.fp,i)},SP=function(e,t,i){return e.setAttribute(t,i)},Qh=function(e,t){return Rt(e[t])?fv:Vh(e[t])&&e.setAttribute?SP:Jh},hv=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},yP=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},dv=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},ed=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},MP=function(e,t,i,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,i),s=o},bP=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?oc(this,t,"_pt"):t.dep||(i=1),t=r;return!i},EP=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},pv=function(e){for(var t=e._pt,i,r,s,o;t;){for(i=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=i}e._pt=s},xn=function(){function n(t,i,r,s,o,a,l,c,u){this.t=i,this.s=s,this.c=o,this.p=r,this.r=a||hv,this.d=l||this,this.set=c||Jh,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=n.prototype;return e.modifier=function(i,r,s){this.mSet=this.mSet||this.set,this.set=EP,this.m=i,this.mt=s,this.tween=r},n}();vn(Yh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(n){return qh[n]=1});In.TweenMax=In.TweenLite=Ft;In.TimelineLite=In.TimelineMax=pn;Et=new pn({sortChildren:!1,defaults:Qo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Dn.stringFilter=sv;var is=[],fl={},TP=[],Rm=0,AP=0,pu=function(e){return(fl[e]||TP).map(function(t){return t()})},$f=function(){var e=Date.now(),t=[];e-Rm>2&&(pu("matchMediaInit"),is.forEach(function(i){var r=i.queries,s=i.conditions,o,a,l,c;for(a in r)o=hi.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(i.revert(),l&&t.push(i))}),pu("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),Rm=e,pu("matchMedia"))},mv=function(){function n(t,i){this.selector=i&&Xf(i),this.data=[],this._r=[],this.isReverted=!1,this.id=AP++,t&&this.add(t)}var e=n.prototype;return e.add=function(i,r,s){Rt(i)&&(s=r,r=i,i=Rt);var o=this,a=function(){var c=St,u=o.selector,f;return c&&c!==o&&c.data.push(o),s&&(o.selector=Xf(s)),St=o,f=r.apply(o,arguments),Rt(f)&&o._r.push(f),St=c,o.selector=u,o.isReverted=!1,f};return o.last=a,i===Rt?a(o,function(l){return o.add(null,l)}):i?o[i]=a:a},e.ignore=function(i){var r=St;St=null,i(this),St=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof n?i.push.apply(i,r.getTweens()):r instanceof Ft&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var s=this;if(i?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(i)}),l=s.data.length;l--;)c=s.data[l],c instanceof pn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ft)&&c.revert&&c.revert(i);s._r.forEach(function(u){return u(i,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=is.length;o--;)is[o].id===this.id&&is.splice(o,1)},e.revert=function(i){this.kill(i||{})},n}(),wP=function(){function n(t){this.contexts=[],this.scope=t,St&&St.data.push(this)}var e=n.prototype;return e.add=function(i,r,s){Ri(i)||(i={matches:i});var o=new mv(0,s||this.scope),a=o.conditions={},l,c,u;St&&!o.selector&&(o.selector=St.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=i;for(c in i)c==="all"?u=1:(l=hi.matchMedia(i[c]),l&&(is.indexOf(o)<0&&is.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener($f):l.addEventListener("change",$f)));return u&&r(o,function(f){return o.add(null,f)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},n}(),Bl={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(r){return nv(r)})},timeline:function(e){return new pn(e)},getTweensOf:function(e,t){return Et.getTweensOf(e,t)},getProperty:function(e,t,i,r){Yt(e)&&(e=Xn(e)[0]);var s=es(e||{}).get,o=i?G0:V0;return i==="native"&&(i=""),e&&(t?o((Tn[t]&&Tn[t].get||s)(e,t,i,r)):function(a,l,c){return o((Tn[a]&&Tn[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,i){if(e=Xn(e),e.length>1){var r=e.map(function(u){return yn.quickSetter(u,t,i)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}e=e[0]||{};var o=Tn[t],a=es(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var f=new o;Fs._pt=0,f.init(e,i?u+i:u,Fs,0,[e]),f.render(1,f),Fs._pt&&ed(1,Fs)}:a.set(e,l);return o?c:function(u){return c(e,l,i?u+i:u,a,1)}},quickTo:function(e,t,i){var r,s=yn.to(e,Un((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),i||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return Et.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=ns(e.ease,Qo.ease)),bm(Qo,e||{})},config:function(e){return bm(Dn,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!Tn[a]&&!In[a]&&ea(t+" effect requires "+a+" plugin.")}),uu[t]=function(a,l,c){return i(Xn(a),Un(l||{},s),c)},o&&(pn.prototype[t]=function(a,l,c){return this.add(uu[t](a,Ri(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){tt[e]=ns(t)},parseEase:function(e,t){return arguments.length?ns(e,t):tt},getById:function(e){return Et.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new pn(e),r,s;for(i.smoothChildTiming=gn(e.smoothChildTiming),Et.remove(i),i._dp=0,i._time=i._tTime=Et._time,r=Et._first;r;)s=r._next,(t||!(!r._dur&&r instanceof Ft&&r.vars.onComplete===r._targets[0]))&&xi(i,r,r._start-r._delay),r=s;return xi(Et,i,0),i},context:function(e,t){return e?new mv(e,t):St},matchMedia:function(e){return new wP(e)},matchMediaRefresh:function(){return is.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||$f()},addEventListener:function(e,t){var i=fl[e]||(fl[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=fl[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:rP,wrapYoyo:sP,distribute:K0,random:J0,snap:Z0,normalize:iP,getUnit:rn,clamp:QC,splitColor:iv,toArray:Xn,selector:Xf,mapRange:ev,pipe:tP,unitize:nP,interpolate:oP,shuffle:j0},install:O0,effects:uu,ticker:wn,updateRoot:pn.updateRoot,plugins:Tn,globalTimeline:Et,core:{PropTween:xn,globals:B0,Tween:Ft,Timeline:pn,Animation:ra,getCache:es,_removeLinkedListItem:oc,reverting:function(){return Zt},context:function(e){return e&&St&&(St.data.push(e),e._ctx=St),St},suppressOverwrites:function(e){return zh=e}}};vn("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return Bl[n]=Ft[n]});wn.add(pn.updateRoot);Fs=Bl.to({},{duration:0});var RP=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},CP=function(e,t){var i=e._targets,r,s,o;for(r in t)for(s=i.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=RP(o,r)),o&&o.modifier&&o.modifier(t[r],e,i[s],r))},mu=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(Yt(s)&&(l={},vn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}CP(a,s)}}}},yn=Bl.registerPlugin({name:"attr",init:function(e,t,i,r,s){var o,a,l;this.tween=i;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var i=t._pt;i;)Zt?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},mu("roundProps",qf),mu("modifiers"),mu("snap",Z0))||Bl;Ft.version=pn.version=yn.version="3.15.0";F0=1;Gh()&&ro();tt.Power0;tt.Power1;tt.Power2;tt.Power3;tt.Power4;tt.Linear;tt.Quad;tt.Cubic;tt.Quart;tt.Quint;tt.Strong;tt.Elastic;tt.Back;tt.SteppedEase;tt.Bounce;tt.Sine;tt.Expo;tt.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Cm,vr,Ys,td,$r,Pm,nd,PP=function(){return typeof window<"u"},Ji={},Gr=180/Math.PI,$s=Math.PI/180,Ps=Math.atan2,Lm=1e8,id=/([A-Z])/g,LP=/(left|right|width|margin|padding|x)/i,DP=/[\s,\(]\S/,Mi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},jf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},IP=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},UP=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},NP=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},FP=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},_v=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},gv=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},OP=function(e,t,i){return e.style[t]=i},BP=function(e,t,i){return e.style.setProperty(t,i)},kP=function(e,t,i){return e._gsap[t]=i},HP=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},zP=function(e,t,i,r,s){var o=e._gsap;o.scaleX=o.scaleY=i,o.renderTransform(s,o)},VP=function(e,t,i,r,s){var o=e._gsap;o[t]=i,o.renderTransform(s,o)},At="transform",Sn=At+"Origin",GP=function n(e,t){var i=this,r=this.target,s=r.style,o=r._gsap;if(e in Ji&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Mi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return i.tfm[a]=Hi(r,a)}):this.tfm[e]=o.x?o[e]:Hi(r,e),e===Sn&&(this.tfm.zOrigin=o.zOrigin);else return Mi.transform.split(",").forEach(function(a){return n.call(i,a,t)});if(this.props.indexOf(At)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Sn,t,"")),e=At}(s||t)&&this.props.push(e,t,s[e])},vv=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},WP=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?i[e[s]]=e[s+2]:i.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(id,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=nd(),(!s||!s.isStart)&&!i[At]&&(vv(i),r.zOrigin&&i[Sn]&&(i[Sn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},xv=function(e,t){var i={target:e,props:[],revert:WP,save:GP};return e._gsap||yn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return i.save(r)}),i},Sv,Kf=function(e,t){var i=vr.createElementNS?vr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):vr.createElement(e);return i&&i.style?i:vr.createElement(e)},Pn=function n(e,t,i){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(id,"-$1").toLowerCase())||r.getPropertyValue(t)||!i&&n(e,so(t)||t,1)||""},Dm="O,Moz,ms,Ms,Webkit".split(","),so=function(e,t,i){var r=t||$r,s=r.style,o=5;if(e in s&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Dm[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Dm[o]:"")+e},Zf=function(){PP()&&window.document&&(Cm=window,vr=Cm.document,Ys=vr.documentElement,$r=Kf("div")||{style:{}},Kf("div"),At=so(At),Sn=At+"Origin",$r.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Sv=!!so("perspective"),nd=yn.core.reverting,td=1)},Im=function(e){var t=e.ownerSVGElement,i=Kf("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",i.appendChild(r),Ys.appendChild(i);try{s=r.getBBox()}catch{}return i.removeChild(r),Ys.removeChild(i),s},Um=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},yv=function(e){var t,i;try{t=e.getBBox()}catch{t=Im(e),i=1}return t&&(t.width||t.height)||i||(t=Im(e)),t&&!t.width&&!t.x&&!t.y?{x:+Um(e,["x","cx","x1"])||0,y:+Um(e,["y","cy","y1"])||0,width:0,height:0}:t},Mv=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&yv(e))},Ar=function(e,t){if(t){var i=e.style,r;t in Ji&&t!==Sn&&(t=At),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(id,"-$1").toLowerCase())):i.removeAttribute(t)}},xr=function(e,t,i,r,s,o){var a=new xn(e._pt,t,i,0,1,o?gv:_v);return e._pt=a,a.b=r,a.e=s,e._props.push(i),a},Nm={deg:1,rad:1,turn:1},XP={grid:1,flex:1},wr=function n(e,t,i,r){var s=parseFloat(i)||0,o=(i+"").trim().substr((s+"").length)||"px",a=$r.style,l=LP.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",d=r==="%",p,_,m,g;if(r===o||!s||Nm[r]||Nm[o])return s;if(o!=="px"&&!h&&(s=n(e,t,i,"px")),g=e.getCTM&&Mv(e),(d||o==="%")&&(Ji[t]||~t.indexOf("adius")))return p=g?e.getBBox()[l?"width":"height"]:e[u],Dt(d?s/p*f:s/100*p);if(a[l?"width":"height"]=f+(h?o:r),_=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,g&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===vr||!_.appendChild)&&(_=vr.body),m=_._gsap,m&&d&&m.width&&l&&m.time===wn.time&&!m.uncache)return Dt(s/m.width*f);if(d&&(t==="height"||t==="width")){var y=e.style[t];e.style[t]=f+r,p=e[u],y?e.style[t]=y:Ar(e,t)}else(d||o==="%")&&!XP[Pn(_,"display")]&&(a.position=Pn(e,"position")),_===e&&(a.position="static"),_.appendChild($r),p=$r[u],_.removeChild($r),a.position="absolute";return l&&d&&(m=es(_),m.time=wn.time,m.width=_[u]),Dt(h?p*s/f:p&&s?f/p*s:0)},Hi=function(e,t,i,r){var s;return td||Zf(),t in Mi&&t!=="transform"&&(t=Mi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Ji[t]&&t!=="transform"?(s=oa(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Hl(Pn(e,Sn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=kl[t]&&kl[t](e,t,i)||Pn(e,t)||H0(e,t)||(t==="opacity"?1:0))),i&&!~(s+"").trim().indexOf(" ")?wr(e,t,s,i)+i:s},qP=function(e,t,i,r){if(!i||i==="none"){var s=so(t,e,1),o=s&&Pn(e,s,1);o&&o!==i?(t=s,i=o):t==="borderColor"&&(i=Pn(e,"borderTopColor"))}var a=new xn(this._pt,e.style,t,0,1,dv),l=0,c=0,u,f,h,d,p,_,m,g,y,v,S,E;if(a.b=i,a.e=r,i+="",r+="",r.substring(0,6)==="var(--"&&(r=Pn(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(_=e.style[t],e.style[t]=r,r=Pn(e,t)||r,_?e.style[t]=_:Ar(e,t)),u=[i,r],sv(u),i=u[0],r=u[1],h=i.match(Ns)||[],E=r.match(Ns)||[],E.length){for(;f=Ns.exec(r);)m=f[0],y=r.substring(l,f.index),p?p=(p+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(p=1),m!==(_=h[c++]||"")&&(d=parseFloat(_)||0,S=_.substr((d+"").length),m.charAt(1)==="="&&(m=qs(d,m)+S),g=parseFloat(m),v=m.substr((g+"").length),l=Ns.lastIndex-v.length,v||(v=v||Dn.units[t]||S,l===r.length&&(r+=v,a.e+=v)),S!==v&&(d=wr(e,t,_,v)||0),a._pt={_next:a._pt,p:y||c===1?y:",",s:d,c:g-d,m:p&&p<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?gv:_v;return N0.test(r)&&(a.e=0),this._pt=a,a},Fm={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},YP=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=Fm[i]||i,t[1]=Fm[r]||r,t.join(" ")},$P=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,s=t.u,o=i._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Ji[a]&&(l=1,a=a==="transformOrigin"?Sn:At),Ar(i,a);l&&(Ar(i,At),o&&(o.svg&&i.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",oa(i,1),o.uncache=1,vv(r)))}},kl={clearProps:function(e,t,i,r,s){if(s.data!=="isFromStart"){var o=e._pt=new xn(e._pt,t,i,0,0,$P);return o.u=r,o.pr=-10,o.tween=s,e._props.push(i),1}}},sa=[1,0,0,1,0,0],bv={},Ev=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Om=function(e){var t=Pn(e,At);return Ev(t)?sa:t.substr(7).match(U0).map(Dt)},rd=function(e,t){var i=e._gsap||es(e),r=e.style,s=Om(e),o,a,l,c;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?sa:s):(s===sa&&!e.offsetParent&&e!==Ys&&!i.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Ys.appendChild(e)),s=Om(e),l?r.display=l:Ar(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Ys.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Jf=function(e,t,i,r,s,o){var a=e._gsap,l=s||rd(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,f=a.xOffset||0,h=a.yOffset||0,d=l[0],p=l[1],_=l[2],m=l[3],g=l[4],y=l[5],v=t.split(" "),S=parseFloat(v[0])||0,E=parseFloat(v[1])||0,T,R,x,b;i?l!==sa&&(R=d*m-p*_)&&(x=S*(m/R)+E*(-_/R)+(_*y-m*g)/R,b=S*(-p/R)+E*(d/R)-(d*y-p*g)/R,S=x,E=b):(T=yv(e),S=T.x+(~v[0].indexOf("%")?S/100*T.width:S),E=T.y+(~(v[1]||v[0]).indexOf("%")?E/100*T.height:E)),r||r!==!1&&a.smooth?(g=S-c,y=E-u,a.xOffset=f+(g*d+y*_)-g,a.yOffset=h+(g*p+y*m)-y):a.xOffset=a.yOffset=0,a.xOrigin=S,a.yOrigin=E,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!i,e.style[Sn]="0px 0px",o&&(xr(o,a,"xOrigin",c,S),xr(o,a,"yOrigin",u,E),xr(o,a,"xOffset",f,a.xOffset),xr(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",S+" "+E)},oa=function(e,t){var i=e._gsap||new av(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,s=i.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=Pn(e,Sn)||"0",u,f,h,d,p,_,m,g,y,v,S,E,T,R,x,b,C,P,D,B,z,N,U,O,G,ne,ge,Ee,Te,Ye,We,Be;return u=f=h=_=m=g=y=v=S=0,d=p=1,i.svg=!!(e.getCTM&&Mv(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[At]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[At]!=="none"?l[At]:"")),r.scale=r.rotate=r.translate="none"),R=rd(e,i.svg),i.svg&&(i.uncache?(G=e.getBBox(),c=i.xOrigin-G.x+"px "+(i.yOrigin-G.y)+"px",O=""):O=!t&&e.getAttribute("data-svg-origin"),Jf(e,O||c,!!O||i.originIsAbsolute,i.smooth!==!1,R)),E=i.xOrigin||0,T=i.yOrigin||0,R!==sa&&(P=R[0],D=R[1],B=R[2],z=R[3],u=N=R[4],f=U=R[5],R.length===6?(d=Math.sqrt(P*P+D*D),p=Math.sqrt(z*z+B*B),_=P||D?Ps(D,P)*Gr:0,y=B||z?Ps(B,z)*Gr+_:0,y&&(p*=Math.abs(Math.cos(y*$s))),i.svg&&(u-=E-(E*P+T*B),f-=T-(E*D+T*z))):(Be=R[6],Ye=R[7],ge=R[8],Ee=R[9],Te=R[10],We=R[11],u=R[12],f=R[13],h=R[14],x=Ps(Be,Te),m=x*Gr,x&&(b=Math.cos(-x),C=Math.sin(-x),O=N*b+ge*C,G=U*b+Ee*C,ne=Be*b+Te*C,ge=N*-C+ge*b,Ee=U*-C+Ee*b,Te=Be*-C+Te*b,We=Ye*-C+We*b,N=O,U=G,Be=ne),x=Ps(-B,Te),g=x*Gr,x&&(b=Math.cos(-x),C=Math.sin(-x),O=P*b-ge*C,G=D*b-Ee*C,ne=B*b-Te*C,We=z*C+We*b,P=O,D=G,B=ne),x=Ps(D,P),_=x*Gr,x&&(b=Math.cos(x),C=Math.sin(x),O=P*b+D*C,G=N*b+U*C,D=D*b-P*C,U=U*b-N*C,P=O,N=G),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,g=180-g),d=Dt(Math.sqrt(P*P+D*D+B*B)),p=Dt(Math.sqrt(U*U+Be*Be)),x=Ps(N,U),y=Math.abs(x)>2e-4?x*Gr:0,S=We?1/(We<0?-We:We):0),i.svg&&(O=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!Ev(Pn(e,At)),O&&e.setAttribute("transform",O))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(d*=-1,y+=_<=0?180:-180,_+=_<=0?180:-180):(p*=-1,y+=y<=0?180:-180)),t=t||i.uncache,i.x=u-((i.xPercent=u&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+o,i.y=f-((i.yPercent=f&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+o,i.z=h+o,i.scaleX=Dt(d),i.scaleY=Dt(p),i.rotation=Dt(_)+a,i.rotationX=Dt(m)+a,i.rotationY=Dt(g)+a,i.skewX=y+a,i.skewY=v+a,i.transformPerspective=S+o,(i.zOrigin=parseFloat(c.split(" ")[2])||!t&&i.zOrigin||0)&&(r[Sn]=Hl(c)),i.xOffset=i.yOffset=0,i.force3D=Dn.force3D,i.renderTransform=i.svg?KP:Sv?Tv:jP,i.uncache=0,i},Hl=function(e){return(e=e.split(" "))[0]+" "+e[1]},_u=function(e,t,i){var r=rn(t);return Dt(parseFloat(t)+parseFloat(wr(e,"x",i+"px",r)))+r},jP=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Tv(e,t)},kr="0deg",Eo="0px",Hr=") ",Tv=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.z,c=i.rotation,u=i.rotationY,f=i.rotationX,h=i.skewX,d=i.skewY,p=i.scaleX,_=i.scaleY,m=i.transformPerspective,g=i.force3D,y=i.target,v=i.zOrigin,S="",E=g==="auto"&&e&&e!==1||g===!0;if(v&&(f!==kr||u!==kr)){var T=parseFloat(u)*$s,R=Math.sin(T),x=Math.cos(T),b;T=parseFloat(f)*$s,b=Math.cos(T),o=_u(y,o,R*b*-v),a=_u(y,a,-Math.sin(T)*-v),l=_u(y,l,x*b*-v+v)}m!==Eo&&(S+="perspective("+m+Hr),(r||s)&&(S+="translate("+r+"%, "+s+"%) "),(E||o!==Eo||a!==Eo||l!==Eo)&&(S+=l!==Eo||E?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Hr),c!==kr&&(S+="rotate("+c+Hr),u!==kr&&(S+="rotateY("+u+Hr),f!==kr&&(S+="rotateX("+f+Hr),(h!==kr||d!==kr)&&(S+="skew("+h+", "+d+Hr),(p!==1||_!==1)&&(S+="scale("+p+", "+_+Hr),y.style[At]=S||"translate(0, 0)"},KP=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.rotation,c=i.skewX,u=i.skewY,f=i.scaleX,h=i.scaleY,d=i.target,p=i.xOrigin,_=i.yOrigin,m=i.xOffset,g=i.yOffset,y=i.forceCSS,v=parseFloat(o),S=parseFloat(a),E,T,R,x,b;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=$s,c*=$s,E=Math.cos(l)*f,T=Math.sin(l)*f,R=Math.sin(l-c)*-h,x=Math.cos(l-c)*h,c&&(u*=$s,b=Math.tan(c-u),b=Math.sqrt(1+b*b),R*=b,x*=b,u&&(b=Math.tan(u),b=Math.sqrt(1+b*b),E*=b,T*=b)),E=Dt(E),T=Dt(T),R=Dt(R),x=Dt(x)):(E=f,x=h,T=R=0),(v&&!~(o+"").indexOf("px")||S&&!~(a+"").indexOf("px"))&&(v=wr(d,"x",o,"px"),S=wr(d,"y",a,"px")),(p||_||m||g)&&(v=Dt(v+p-(p*E+_*R)+m),S=Dt(S+_-(p*T+_*x)+g)),(r||s)&&(b=d.getBBox(),v=Dt(v+r/100*b.width),S=Dt(S+s/100*b.height)),b="matrix("+E+","+T+","+R+","+x+","+v+","+S+")",d.setAttribute("transform",b),y&&(d.style[At]=b)},ZP=function(e,t,i,r,s){var o=360,a=Yt(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Gr:1),c=l-r,u=r+c+"deg",f,h;return a&&(f=s.split("_")[1],f==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),f==="cw"&&c<0?c=(c+o*Lm)%o-~~(c/o)*o:f==="ccw"&&c>0&&(c=(c-o*Lm)%o-~~(c/o)*o)),e._pt=h=new xn(e._pt,t,i,r,c,IP),h.e=u,h.u="deg",e._props.push(i),h},Bm=function(e,t){for(var i in t)e[i]=t[i];return e},JP=function(e,t,i){var r=Bm({},i._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=i.style,a,l,c,u,f,h,d,p;r.svg?(c=i.getAttribute("transform"),i.setAttribute("transform",""),o[At]=t,a=oa(i,1),Ar(i,At),i.setAttribute("transform",c)):(c=getComputedStyle(i)[At],o[At]=t,a=oa(i,1),o[At]=c);for(l in Ji)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=rn(c),p=rn(u),f=d!==p?wr(i,l,c,p):parseFloat(c),h=parseFloat(u),e._pt=new xn(e._pt,a,l,f,h-f,jf),e._pt.u=p||0,e._props.push(l));Bm(a,r)};vn("padding,margin,Width,Radius",function(n,e){var t="Top",i="Right",r="Bottom",s="Left",o=(e<3?[t,i,r,s]:[t+s,t+i,r+i,r+s]).map(function(a){return e<2?n+a:"border"+a+n});kl[e>1?"border"+n:n]=function(a,l,c,u,f){var h,d;if(arguments.length<4)return h=o.map(function(p){return Hi(a,p,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},o.forEach(function(p,_){return d[p]=h[_]=h[_]||h[(_-1)/2|0]}),a.init(l,d,f)}});var Av={name:"css",register:Zf,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,s){var o=this._props,a=e.style,l=i.vars.startAt,c,u,f,h,d,p,_,m,g,y,v,S,E,T,R,x,b;td||Zf(),this.styles=this.styles||xv(e),x=this.styles.props,this.tween=i;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(Tn[_]&&lv(_,t,i,r,e,s)))){if(d=typeof u,p=kl[_],d==="function"&&(u=u.call(i,r,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=na(u)),p)p(this,e,_,u,i)&&(R=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",yr.lastIndex=0,yr.test(c)||(m=rn(c),g=rn(u),g?m!==g&&(c=wr(e,_,c,g)+g):m&&(u+=m)),this.add(a,"setProperty",c,u,r,s,0,0,_),o.push(_),x.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(i,r,e,s):l[_],Yt(c)&&~c.indexOf("random(")&&(c=na(c)),rn(c+"")||c==="auto"||(c+=Dn.units[_]||rn(Hi(e,_))||""),(c+"").charAt(1)==="="&&(c=Hi(e,_))):c=Hi(e,_),h=parseFloat(c),y=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),y&&(u=u.substr(2)),f=parseFloat(u),_ in Mi&&(_==="autoAlpha"&&(h===1&&Hi(e,"visibility")==="hidden"&&f&&(h=0),x.push("visibility",0,a.visibility),xr(this,a,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=Mi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),v=_ in Ji,v){if(this.styles.save(_),b=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=Pn(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var C=e.style.perspective;e.style.perspective=u,u=Pn(e,"perspective"),C?e.style.perspective=C:Ar(e,"perspective")}f=parseFloat(u)}if(S||(E=e._gsap,E.renderTransform&&!t.parseTransform||oa(e,t.parseTransform),T=t.smoothOrigin!==!1&&E.smooth,S=this._pt=new xn(this._pt,a,At,0,1,E.renderTransform,E,0,-1),S.dep=1),_==="scale")this._pt=new xn(this._pt,E,"scaleY",E.scaleY,(y?qs(E.scaleY,y+f):f)-E.scaleY||0,jf),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){x.push(Sn,0,a[Sn]),u=YP(u),E.svg?Jf(e,u,0,T,0,this):(g=parseFloat(u.split(" ")[2])||0,g!==E.zOrigin&&xr(this,E,"zOrigin",E.zOrigin,g),xr(this,a,_,Hl(c),Hl(u)));continue}else if(_==="svgOrigin"){Jf(e,u,1,T,0,this);continue}else if(_ in bv){ZP(this,E,_,h,y?qs(h,y+u):u);continue}else if(_==="smoothOrigin"){xr(this,E,"smooth",E.smooth,u);continue}else if(_==="force3D"){E[_]=u;continue}else if(_==="transform"){JP(this,u,e);continue}}else _ in a||(_=so(_)||_);if(v||(f||f===0)&&(h||h===0)&&!DP.test(u)&&_ in a)m=(c+"").substr((h+"").length),f||(f=0),g=rn(u)||(_ in Dn.units?Dn.units[_]:m),m!==g&&(h=wr(e,_,c,g)),this._pt=new xn(this._pt,v?E:a,_,h,(y?qs(h,y+f):f)-h,!v&&(g==="px"||_==="zIndex")&&t.autoRound!==!1?FP:jf),this._pt.u=g||0,v&&b!==u?(this._pt.b=c,this._pt.e=b,this._pt.r=NP):m!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=UP);else if(_ in a)qP.call(this,e,_,c,y?y+u:u);else if(_ in e)this.add(e,_,c||e[_],y?y+u:u,r,s);else if(_!=="parseTransform"){Xh(_,u);continue}v||(_ in a?x.push(_,0,a[_]):typeof e[_]=="function"?x.push(_,2,e[_]()):x.push(_,1,c||e[_])),o.push(_)}}R&&pv(this)},render:function(e,t){if(t.tween._time||!nd())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Hi,aliases:Mi,getSetter:function(e,t,i){var r=Mi[t];return r&&r.indexOf(",")<0&&(t=r),t in Ji&&t!==Sn&&(e._gsap.x||Hi(e,"x"))?i&&Pm===i?t==="scale"?HP:kP:(Pm=i||{})&&(t==="scale"?zP:VP):e.style&&!Vh(e.style[t])?OP:~t.indexOf("-")?BP:Qh(e,t)},core:{_removeProperty:Ar,_getMatrix:rd}};yn.utils.checkPrefix=so;yn.core.getStyleSaver=xv;(function(n,e,t,i){var r=vn(n+","+e+","+t,function(s){Ji[s]=1});vn(e,function(s){Dn.units[s]="deg",bv[s]=1}),Mi[r[13]]=n+","+e,vn(i,function(s){var o=s.split(":");Mi[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");vn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){Dn.units[n]="px"});yn.registerPlugin(Av);var Zn=yn.registerPlugin(Av)||yn;Zn.core.Tween;const on=n=>n*Math.PI/180,zl=[{slug:"eat-marry-love",title:"Eat, Merry, Love",accent:"#B32C05",accentLight:"#F3EBE4",accentLighter:"#f0d7bf",audio:"/audio/eat-merry-love.mp3",video:"/video/eat-intro.mp4",poster:"/images/poster-1.jpg",txt:"/images/txt-1.png",svg:"/images/p1.svg",index:0},{slug:"la-storia",title:"La Storia Dell'eleganza",accent:"#304443",accentLight:"#D7DDDD",accentLighter:"#a0aeae",audio:"/audio/la-storia.mp3",video:"/video/la-intro.mp4",poster:"/images/poster-2.jpg",txt:"/images/txt-2.png",svg:"/images/p2.svg",index:1},{slug:"wine-o-clock",title:"Wine O'Clock",accent:"#353454",accentLight:"#D6D5E8",accentLighter:"#b3b0db",audio:"/audio/wine-time.mp3",video:"/video/wine-intro.mp4",poster:"/images/poster-3.jpg",txt:"/images/txt-3.png",svg:"/images/p3.svg",index:2},{slug:"amour-getaway",title:"Amour Getaway",accent:"#7E3C48",accentLight:"#FFE7F7",accentLighter:"#f0c3e1",audio:"/audio/amour-getway.mp3",video:"/video/amour-intro.mp4",poster:"/images/poster-4.jpg",txt:"/images/txt-4.png",svg:"/images/p4.svg",index:3}],QP=`
varying vec2 vUv;
uniform vec3 axisPosition;
uniform float aspectRatio;
uniform float uAngle;
uniform float blendFactor;
uniform float progress;

vec3 rotateZ(vec3 v, float angle) {
    float cosTheta = cos(angle);
    float sinTheta = sin(angle);
    return vec3(cosTheta * v.x - sinTheta * v.y, sinTheta * v.x + cosTheta * v.y, v.z);
}

void main() {
    vUv = uv;
    float initialZRotation = radians(uAngle);
    vec3 rotatedPosition = rotateZ(position, initialZRotation);
    float lengthOfArc = rotatedPosition.x - axisPosition.x;
    float angleOfArc = lengthOfArc / axisPosition.z;
    rotatedPosition.x = 0.0;
    rotatedPosition.z = -axisPosition.z;
    float cosTheta = cos(-angleOfArc);
    float sinTheta = sin(-angleOfArc);
    vec3 bentPosition = vec3(
        cosTheta * rotatedPosition.x - sinTheta * rotatedPosition.z,
        rotatedPosition.y,
        sinTheta * rotatedPosition.x + cosTheta * rotatedPosition.z
    ) + axisPosition;
    vec3 p = position;
    p.x *= -1.0;
    vec3 finalPosition = mix(bentPosition, p, blendFactor);
    if (aspectRatio < 0.75) {
        float f = finalPosition.x * 1.0/aspectRatio;
        f = finalPosition.x;
        finalPosition.x = mix(finalPosition.x, f, progress);
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0);
}
`,e3=`
varying vec2 vUv;
uniform sampler2D posterTexture;
uniform sampler2D photoTexture;
uniform sampler2D logoTexture;
uniform float progress;
uniform bool showBorder;
uniform vec3 borderColor;
uniform float windowWidth;
uniform float aspectRatio;
uniform float blendFactor;

vec4 fromLinear(vec4 linearRGB) {
    bvec4 cutoff = lessThan(linearRGB, vec4(0.0031308));
    vec4 higher = vec4(1.055)*pow(linearRGB, vec4(1.0/2.4)) - vec4(0.055);
    vec4 lower = linearRGB * vec4(12.92);
    return mix(higher, lower, cutoff);
}

void main() {
    vec2 uv = vUv;
    float posterAspectRatio = 1.333;
    float md = 1024.0;
    float sm = 768.0;
    bool condition = aspectRatio < 0.75 || (windowWidth < sm && aspectRatio < 1.);
    float windowHeight = windowWidth / aspectRatio;
    float posterWidth = windowWidth;
    float textureScaleFactor = 1.0;
    if (condition) {
        posterWidth = windowHeight * 0.75;
        textureScaleFactor = aspectRatio;
    }
    vec2 logoUv = uv;
    float xCenter = 0.5;
    float offsetYinPixel = mix(0.0, -32.0, progress);
    float pY = offsetYinPixel / (posterWidth*posterAspectRatio);
    float yCenter = 1.0 - pY;
    float logoWidth = posterWidth > md ? 200.0 : 137.0;
    logoWidth = mix(posterWidth/120., logoWidth, progress);
    vec2 logoSize = vec2(logoWidth / posterWidth, (logoWidth / posterWidth/posterAspectRatio) / 1.05);
    logoSize.x = mix(.1, logoSize.x, progress);
    logoSize.y = mix(.1/posterAspectRatio, logoSize.y, progress);
    logoUv.x = (logoUv.x - xCenter) / logoSize.x + xCenter;
    logoUv.y = (logoUv.y - yCenter) / logoSize.y + yCenter;
    vec4 logo = texture2D(logoTexture, logoUv);
    vec2 ppUv = uv;
    if (condition) {
        ppUv.x = (ppUv.x - 0.5) / textureScaleFactor*.75 + 0.5;
        float pY2 = 1.;
        ppUv.y = (ppUv.y - pY2) / textureScaleFactor*.75 + pY2;
        ppUv.y += 40./ (windowWidth*posterAspectRatio);
    } else {
        float posterSize = posterWidth > md ? 1000. : 500.;
        ppUv.x = (ppUv.x - xCenter) / (posterSize / posterWidth) + xCenter;
        ppUv.y = (ppUv.y - 1.) / (posterSize / posterWidth) + 1.;
        ppUv.y += 0.02;
    }
    ppUv.x = mix(uv.x, ppUv.x, progress);
    ppUv.y = mix(uv.y, ppUv.y, progress);
    vec4 poster = texture2D(posterTexture, ppUv);
    poster = mix(poster, fromLinear(vec4(borderColor.r, borderColor.g, borderColor.b, 1.0)), logo.a);
    vec2 pUv = uv;
    pUv.y *= 1.333;
    float edge = .05;
    edge -= progress*edge;
    pUv /= 1.0 - edge*2.;
    pUv.x -= edge;
    pUv.y -= edge - (progress*.05*1.5);
    if (condition) {
        float pUvY = (ppUv.y - 1.) * aspectRatio * 1.75 + 1.;
        pUvY += aspectRatio / 2.;
        pUvY += 40./ (posterWidth*posterAspectRatio);
        pUv.y = mix(pUv.y, pUvY, progress);
        pUv.y /= 1.333;
    } else {
        float _pUvY = pUv.y;
        _pUvY += .25;
        _pUvY /= 1.333;
        _pUvY -= .25;
        _pUvY += (posterWidth > md ? 350. : 175.) / (posterWidth);
        pUv.y = mix(pUv.y/1.333, _pUvY - .1, progress);
    }
    pUv.x -= 0.5;
    pUv.x += 0.5;
    pUv.y += mix(0.2, 0.0, progress);
    vec4 photo = texture2D(photoTexture, pUv);
    float a = 0.0;
    float ofY = condition ? 0.0 : .1;
    if (pUv.x > edge && pUv.x < 1.-edge && pUv.y > (edge*1.4 + mix(.18, 0., progress)) && pUv.y < (1.-edge - mix(.025, ofY, progress))) {
        a = 1.0;
    }
    poster = mix(poster, photo, a);
    vec4 fin = vec4(poster.r, poster.g, poster.b, poster.a);
    if (gl_FrontFacing) {
        gl_FragColor = fin;
    } else {
        gl_FragColor = mix(vec4(vec3(.95), poster.a), fin, 0.01);
    }
}
`;function t3(n){const e=parseInt(n.slice(1,3),16)/255,t=parseInt(n.slice(3,5),16)/255,i=parseInt(n.slice(5,7),16)/255;return new Y(e,t,i)}function n3(){let n,e,t,i,r,s,o=[],a=[],l=[],c,u,f,h=new ot(.5,.5),d=new ot(.5,.5),p=new OT,_=-1,m=-1,g=!1,y=!1;const v=8,S=40,E=-70;let T=0,R=null,x=null;const b=new UT;function C(ee){return new Promise(K=>{b.load(ee,ye=>K(ye),void 0,()=>{const ye=document.createElement("canvas");ye.width=2,ye.height=2;const fe=ye.getContext("2d");fe.fillStyle="#888",fe.fillRect(0,0,2,2),K(new MT(ye))})})}async function P(ee){c=window.innerWidth,u=window.innerHeight,f=c/u,y=f<1,n=new IC({canvas:ee,antialias:!0,alpha:!0}),n.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.setSize(c,u),n.setClearColor(0,0),n.outputColorSpace=dn,e=new fT,t=new Vn(45,f,.1,1e3),y?t.position.set(0,0,120):t.position.set(0,-15,100),t.basePosition=t.position.clone(),e.add(t),i=new Us,y?i.rotation.set(on(22),0,0):i.rotation.set(on(25),on(70),on(15)),e.add(i),r=new Us,r.animatedRotationY=0,i.add(r);const K=await C("/images/logo.png");K.wrapS=Rn,K.wrapT=Rn;for(let fe=0;fe<4;fe++){const ve=document.createElement("video");ve.src=zl[fe].video,ve.loop=!0,ve.muted=!0,ve.playsInline=!0,ve.crossOrigin="anonymous",ve.preload="none",document.body.appendChild(ve),ve.style.position="absolute",ve.style.opacity="0",ve.style.width="1px",ve.style.height="1px",ve.style.pointerEvents="none",a.push(ve);const Je=new yT(ve);Je.minFilter=Ot,Je.magFilter=Ot,Je.colorSpace=dn,l.push(Je)}const ye=[];for(let fe=1;fe<=v;fe++){const ve=fe>4?fe-4:fe;ye.push(D(fe,ve-1,K))}return o=await Promise.all(ye),z(),B(),{renderer:n,scene:e,camera:t}}async function D(ee,K,ye){const fe=zl[K],ve=ee*45,Je=on(ve),L=S*Math.cos(on(ve)),F=S*Math.sin(on(ve)),W=await C(fe.svg);W.wrapS=Rn,W.wrapT=Rn;const te=l[K],re=new ga(24,32,40,40),ie=new ri({vertexShader:QP,fragmentShader:e3,uniforms:{posterTexture:{value:W},photoTexture:{value:te},logoTexture:{value:ye},axisPosition:{value:new Y(0,0,S)},aspectRatio:{value:f},uAngle:{value:0},blendFactor:{value:0},progress:{value:0},showBorder:{value:!1},borderColor:{value:t3(fe.accent)},windowWidth:{value:c}},side:vi,transparent:!0}),de=new ii(re,ie);de.position.set(L,0,F),de.rotation.y=-Je+Math.PI/2,de.userData={chapterIdx:K,i:ee,posterIndex:ee},r.add(de);const I=new fo(16,22,2),ue=new kh({transparent:!0,opacity:0,depthWrite:!1}),J=new ii(I,ue);return J.position.copy(de.position),J.rotation.copy(de.rotation),J.userData={chapterIdx:K,i:ee,isPosterHitbox:!0},r.add(J),{mesh:de,hitbox:J,material:ie,chapterIdx:K,i:ee,intRotationY:ve,baseY:0}}function B(){g=!1;const ee={val:0};Zn.to(ee,{val:Math.PI*4,duration:6,ease:"power3.inOut",onUpdate:()=>{r.animatedRotationY=ee.val}});const K={x:-10,y:-10};Zn.to(K,{x:.5,y:.5,duration:6,ease:"power3.inOut",onUpdate:()=>{h.set(K.x,K.y),d.set(K.x,K.y)}}),o.forEach((ye,fe)=>{const ve=.2*fe+3;Zn.fromTo(ye.mesh.position,{y:-60},{y:0,duration:1.5,delay:ve,ease:"power3.inOut"})}),Zn.delayedCall(7,()=>{g=!0})}function z(){if(s=requestAnimationFrame(z),d.x+=(h.x-d.x)*.05,d.y+=(h.y-d.y)*.05,m===-1){const K=(d.x-.5)*8+t.basePosition.x,ye=-(d.y-.5)*8+t.basePosition.y;t.position.x+=(K-t.position.x)*.05,t.position.y+=(ye-t.position.y)*.05}l.forEach((K,ye)=>{const fe=a[ye];fe&&fe.readyState>=2&&!fe.paused&&(K.needsUpdate=!0)});const ee=r.animatedRotationY+T;r.rotation.y=ee,o.forEach(K=>{K.material.uniforms&&(K.material.uniforms.aspectRatio.value=f,K.material.uniforms.windowWidth.value=c)}),n.render(e,t)}function N(ee,K){const ye=ee/c*2-1,fe=-(K/u)*2+1;p.setFromCamera(new ot(ye,fe),t);const ve=o.map(L=>L.hitbox),Je=p.intersectObjects(ve,!1);return Je.length>0?Je[0].object.userData.chapterIdx:-1}function U(ee){if(h.x=ee.clientX/c,h.y=ee.clientY/u,!g||m!==-1)return;const K=N(ee.clientX,ee.clientY);K!==_&&(_!==-1&&(G(_),x&&x(_,!1)),_=K,K!==-1&&(O(K),x&&x(K,!0)))}function O(ee){o.filter(fe=>fe.chapterIdx===ee).forEach(fe=>{Zn.to(fe.material.uniforms.blendFactor,{value:2,duration:1,ease:"power2.inOut",overwrite:!0}),Zn.to(fe.mesh.position,{y:fe.baseY+7,duration:1,ease:"power2.inOut",overwrite:!0})});const ye=a[ee];ye&&ye.play().catch(()=>{})}function G(ee){o.filter(fe=>fe.chapterIdx===ee).forEach(fe=>{Zn.to(fe.material.uniforms.blendFactor,{value:0,duration:1,ease:"power2.inOut",overwrite:!0}),Zn.to(fe.mesh.position,{y:fe.baseY,duration:1,ease:"power2.inOut",overwrite:!0})});const ye=a[ee];ye&&ye.pause()}function ne(ee){if(!g||m!==-1)return;const K=N(ee.clientX,ee.clientY);K!==-1&&ge(K)}function ge(ee){m=ee,R&&R(ee);const K=Zn.timeline(),ye=o.find(fe=>fe.chapterIdx===ee);if(ye){const fe=-(ye.intRotationY*Math.PI/180),ve={val:r.animatedRotationY};K.to(ve,{val:fe,duration:3,ease:"power3.inOut",onUpdate:()=>{r.animatedRotationY=ve.val}},0)}K.to(r.position,{y:E,duration:3,ease:"power3.inOut"},0),K.to(i.rotation,{x:0,y:0,z:0,duration:3,ease:"power3.inOut"},0),o.filter(fe=>fe.chapterIdx===ee).forEach(fe=>{K.to(fe.material.uniforms.blendFactor,{value:1,duration:2,ease:"power3.inOut"},0),K.to(fe.material.uniforms.progress,{value:1,duration:2,ease:"power3.inOut"},0);const ve=f*2.07;K.to(fe.mesh.scale,{x:ve,y:ve,z:1,duration:2,ease:"power3.inOut"},0)}),o.filter(fe=>fe.chapterIdx!==ee).forEach((fe,ve)=>{K.to(fe.mesh.position,{y:-30-ve*8,duration:2,ease:"power3.inOut"},0)})}function Ee(){if(m===-1)return;const ee=Zn.timeline({onComplete:()=>{m=-1}});y?ee.to(i.rotation,{x:on(22),y:0,z:0,duration:2.5,ease:"power3.inOut"},0):ee.to(i.rotation,{x:on(25),y:on(70),z:on(15),duration:2.5,ease:"power3.inOut"},0),ee.to(r.position,{y:0,duration:2.5,ease:"power3.inOut"},0),o.forEach(K=>{ee.to(K.material.uniforms.blendFactor,{value:0,duration:1.5,ease:"power3.inOut"},0),ee.to(K.material.uniforms.progress,{value:0,duration:1.5,ease:"power3.inOut"},0),ee.to(K.mesh.scale,{x:1,y:1,z:1,duration:1.5,ease:"power3.inOut"},0),ee.to(K.mesh.position,{y:K.baseY,duration:1.5,ease:"power3.inOut"},0)}),_=-1}function Te(ee){!g||m!==-1||(T-=ee*8e-4)}function Ye(ee,K){c=ee,u=K,f=ee/K,y=f<1,t.aspect=f,t.updateProjectionMatrix(),n.setSize(ee,K),y&&m===-1?i.rotation.set(on(22),0,0):!y&&m===-1&&i.rotation.set(on(25),on(70),on(15))}function We(){s&&cancelAnimationFrame(s),a.forEach(ee=>{ee.pause(),ee.src="",ee.parentNode&&ee.parentNode.removeChild(ee)}),n==null||n.dispose()}function Be(ee){R=ee}function le(ee){x=ee}return{init:P,onMouseMove:U,onClick:ne,onScroll:Te,onResize:Ye,destroy:We,onSelect:Be,onHover:le,deselectChapter:Ee,getState:()=>({selectedIndex:m,hoveredIndex:_,introComplete:g})}}const i3={__name:"WebGLScene",emits:["chapter-select","chapter-hover","chapter-unhover"],setup(n,{expose:e,emit:t}){const i=t,r=kt(null),s=n3();let o=null;lo(async()=>{if(r.value){await s.init(r.value),s.onSelect(l=>{i("chapter-select",l)}),s.onHover((l,c)=>{i(c?"chapter-hover":"chapter-unhover",l)}),window.addEventListener("mousemove",s.onMouseMove),r.value.addEventListener("click",s.onClick);try{const l=(await Rl(async()=>{const{default:c}=await import("./BzeNZSVD.js").then(u=>u.i);return{default:c}},__vite__mapDeps([0,1]),import.meta.url)).default;o=new l({touchMultiplier:25,firefoxMultiplier:50}),o.on(c=>s.onScroll(c.deltaY))}catch{window.addEventListener("wheel",c=>s.onScroll(c.deltaY),{passive:!0})}window.addEventListener("resize",a)}});function a(){s.onResize(window.innerWidth,window.innerHeight)}return ha(()=>{window.removeEventListener("mousemove",s.onMouseMove),window.removeEventListener("resize",a),o==null||o.destroy(),s.destroy()}),e({scene:s}),(l,c)=>(Tt(),zn("canvas",{ref_key:"canvasRef",ref:r,id:"webgl-canvas"},null,512))}},r3={class:"!fixed z-20 top-0 w-full"},s3={class:"container flex justify-between mt-2 md:mt-6"},o3={class:"!fixed z-20 top-3 w-full pointer-events-none"},a3={class:"container flex justify-center mt-2 md:mt-6"},l3={class:"logo w-[136px] lg:w-[204px] h-[26px] lg:h-[37.5px]"},c3={key:0,class:"text-accent uppercase text-[11px] lg:text-sm tracking-wider mt-1 lg:mt-2"},u3={class:"!fixed z-20 bottom-0 w-full pointer-events-none"},f3={class:"container flex justify-between pb-2 md:pb-6"},h3={width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{fill:"var(--accent)"}},d3={key:0,d:"M10 7.22006L6.60282 9.99957H3V13.9996H6.60282L10 16.7791V7.22006ZM5.88889 15.9996H2C1.44772 15.9996 1 15.5519 1 14.9996V8.99958C1 8.44729 1.44772 7.99958 2 7.99958H5.88889L11.1834 3.66772C11.3971 3.49286 11.7121 3.52436 11.887 3.73808C11.9601 3.82741 12 3.93928 12 4.0547V19.9445C12 20.2206 11.7761 20.4445 11.5 20.4445C11.3846 20.4445 11.2727 20.4046 11.1834 20.3315L5.88889 15.9996ZM15.5 8.76041C16.9478 9.94291 17.9 11.8611 17.9 13.9996C17.9 16.1381 16.9478 18.0563 15.5 19.2388L14.1823 17.6983C15.2806 16.8209 16 15.4898 16 13.9996C16 12.5094 15.2806 11.1783 14.1823 10.3009L15.5 8.76041ZM19.002 5.3645C21.4418 7.39706 23 10.5222 23 13.9996C23 17.477 21.4418 20.6022 19.002 22.6348L17.6664 21.1089C19.7473 19.4295 21.1 16.8717 21.1 13.9996C21.1 11.1275 19.7473 8.56979 17.6664 6.89037L19.002 5.3645Z"},p3={key:1,d:"M10 7.22006L6.60282 9.99957H3V13.9996H6.60282L10 16.7791V7.22006ZM5.88889 15.9996H2C1.44772 15.9996 1 15.5519 1 14.9996V8.99958C1 8.44729 1.44772 7.99958 2 7.99958H5.88889L11.1834 3.66772C11.3971 3.49286 11.7121 3.52436 11.887 3.73808C11.9601 3.82741 12 3.93928 12 4.0547V19.9445C12 20.2206 11.7761 20.4445 11.5 20.4445C11.3846 20.4445 11.2727 20.4046 11.1834 20.3315L5.88889 15.9996ZM20.4142 11.9996L23.9497 15.5351L22.5355 16.9494L19 13.4138L15.4645 16.9494L14.0503 15.5351L17.5858 11.9996L14.0503 8.46404L15.4645 7.04983L19 10.5854L22.5355 7.04983L23.9497 8.46404L20.4142 11.9996Z"},m3={__name:"SiteNav",props:{isHome:{type:Boolean,default:!0},accentColor:{type:String,default:"#b32c05"},soundOn:{type:Boolean,default:!1}},emits:["toggle-about","go-home","toggle-sound"],setup(n){return(e,t)=>(Tt(),zn("div",null,[Ke("div",r3,[Ke("div",s3,[Ke("div",null,[Ke("div",{class:"menu-item",onClick:t[0]||(t[0]=i=>e.$emit("toggle-about"))},[...t[3]||(t[3]=[Ke("span",{class:"hidden md:block"},"About",-1)])])]),t[4]||(t[4]=Ke("div",null,[Ke("a",{href:"https://millanova.com/collection/chapter-bride",rel:"noopener noreferrer",target:"_blank",class:"menu-item"},[Ke("span",null,"Collection"),Ke("svg",{class:"h-[12px] w-[12px] lg:h-[14px] lg:w-[14px]",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[Ke("path",{d:"M10.6688 6.27614L4.93109 12.0139L3.98828 11.0711L9.72601 5.33333H4.66883V4H12.0021V11.3333H10.6688V6.27614Z"})])])],-1))])]),Ke("div",o3,[Ke("div",a3,[Ke("div",{class:"text-center pointer-events-auto",onClick:t[1]||(t[1]=i=>e.$emit("go-home"))},[Ke("div",l3,[(Tt(),zn("svg",{width:"100%",height:"100%",viewBox:"0 0 204 40",fill:"black",xmlns:"http://www.w3.org/2000/svg",style:ca({fill:n.accentColor})},[...t[5]||(t[5]=[CS('<g clip-path="url(#clip0_2286_815)" data-v-4eda7cd6><path d="M19.2462 26.8109L11.9211 17.5107C11.8855 17.5467 11.8527 17.5799 11.8171 17.5799V31.5467H8V8.10547H8.76343C12.3726 12.7389 15.9845 17.3005 19.6293 21.9312C21.3996 19.4748 28.6536 10.5619 30.4595 8.10547H31.1545V31.5467H27.3347C27.3347 26.5287 27.3702 22.4927 27.3702 17.4388C27.3347 17.4028 27.2663 17.3696 27.2307 17.3696L19.974 26.8109H19.2462Z" data-v-4eda7cd6></path><path d="M38.2734 31.5458V8.38672H42.2657V31.5485H38.2734V31.5458Z" data-v-4eda7cd6></path><path d="M89.8657 27.1251H79.8344L78.0285 31.5455H74.1758L84.6257 8.06836H85.3536L95.6968 31.5455H91.7045L89.8657 27.1251ZM80.9782 24.2814H88.7548L84.9376 15.1583H84.7981L80.9782 24.2814Z" data-v-4eda7cd6></path><path d="M107.137 31.5463V8H107.9C110.262 10.3873 120.569 21.195 122.966 23.5795H123.106V8.38728H127.03V31.8285H126.335C123.661 28.8797 113.838 19.0539 111.2 16.0719H111.096V31.5463H107.137Z" data-v-4eda7cd6></path><path d="M166.653 31.8611C165.055 27.9663 158.184 12.3148 156.586 8.41992H160.786C161.238 9.61218 164.362 17.4739 166.929 23.8943H167.102C168.281 20.8072 172.03 11.366 173.176 8.41992H177.272L167.416 31.8611H166.653Z" data-v-4eda7cd6></path><path d="M190.17 27.1251H180.139L178.333 31.5455H174.48L184.93 8.06836H185.658L196.001 31.5455H192.009L190.17 27.1251ZM181.286 24.2814H189.062L185.245 15.1583H185.106L181.286 24.2814Z" data-v-4eda7cd6></path><path d="M131.426 20.034C131.426 13.3314 136.701 8.03125 143.575 8.03125C150.621 8.03125 155.62 13.3286 155.62 20.034C155.62 26.8058 150.621 32.0008 143.539 32.0008C135.973 32.0008 131.426 26.8058 131.426 20.034ZM135.454 20.034C135.454 24.9469 138.578 28.7007 143.575 28.7007C148.503 28.7007 151.663 24.8058 151.663 20.034C151.663 15.2954 148.435 11.4365 143.575 11.4365C138.751 11.4365 135.454 15.2263 135.454 20.034Z" data-v-4eda7cd6></path><path d="M71.8792 28.3535H66.4778V8.38672H62.4883V31.5458H71.2088L71.8792 30.3591V28.3535Z" data-v-4eda7cd6></path><path d="M58.7726 28.3535H53.3712V8.38672H49.3789V31.5458H58.1022L58.7726 30.3591V28.3535Z" data-v-4eda7cd6></path></g><defs data-v-4eda7cd6><clipPath id="clip0_2286_815" data-v-4eda7cd6><rect width="188" height="24" transform="translate(8 8)" data-v-4eda7cd6></rect></clipPath></defs>',2)])],4))]),n.isHome?(Tt(),zn("div",c3," Chapter the bride ")):da("",!0)])])]),Ke("div",u3,[Ke("div",f3,[t[6]||(t[6]=Ke("a",{href:"https://sarakuz.com",rel:"noopener noreferrer",target:"_blank",class:"pointer-events-auto"},[Ke("div",{class:"flex items-center menu-item"},[Ke("div",{class:"text-[8px]"},[Ke("span",{class:"opacity-40"},"Made by "),_h("Sarakuz ")])])],-1)),Ke("div",{class:"menu-item pointer-events-auto",onClick:t[2]||(t[2]=i=>e.$emit("toggle-sound"))},[Ke("span",null,nh(n.soundOn?"On":"Off"),1),(Tt(),zn("svg",h3,[n.soundOn?(Tt(),zn("path",d3)):(Tt(),zn("path",p3))]))])])])]))}},_3=Ah(m3,[["__scopeId","data-v-4eda7cd6"]]),g3={key:0,class:"about-overlay"},v3={__name:"AboutPanel",props:{isOpen:{type:Boolean,default:!1}},emits:["close"],setup(n){return(e,t)=>(Tt(),_i(dg,{name:"slide"},{default:jl(()=>[n.isOpen?(Tt(),zn("div",g3,[t[1]||(t[1]=Ke("div",{class:"container my text-center"},[Ke("div",{class:"min-h-14"}),Ke("div",{class:"star mb-8"},[Ke("svg",{class:"mx-auto w-3 h-3 md:w-5 md:h-5",viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[Ke("path",{d:"M9.5 0L11.5287 7.47131L19 9.5L11.5287 11.5287L9.5 19L7.47131 11.5287L0 9.5L7.47131 7.47131L9.5 0Z",fill:"var(--accent)"})])]),Ke("div",{class:"w-full md:w-10/12 lg:w-8/12 mx-auto mt-4 lg:mt-8"},[Ke("div",{class:"movie text-accent"}," IMMERSE YOURSELF into the CINEMATOGRAPHICAL-LIKE EXPERIENCE "),Ke("div",{class:"movie text-accent mb-6"},' to DISCOVER our NEWEST COLLECTION "CHAPTER BRIDE". '),Ke("div",{class:"movie text-accent"}," the COLLECTION SHOWCASE COMPRISES FOUR DISTINCT FILMS about ITALIAN-INSPIRED WEDDINGS, EACH WITH ITS OWN STORYLINE and WEDDING THEME, yet all CENTERED AROUND the MAIN FOCUS: the BRIDE, who BECOMES the FOCAL POINT of the ENTIRE WEDDING JOURNEY. ")])],-1)),Ke("button",{class:"close-about menu-item",onClick:t[0]||(t[0]=i=>e.$emit("close"))}," ✕ ")])):da("",!0)]),_:1}))}},x3=Ah(v3,[["__scopeId","data-v-8436df57"]]),S3={__name:"app",setup(n){const e=kt(null),t=kt(null),i=kt(null),r=kt(!1),s=kt(null),o=kt(!1),a=kt(!0),l=kt(!1);let c=null,u=[],f=null,h=!1;const d=Fo(()=>s.value!==null?zl[s.value]:null),p=Fo(()=>{var b;return((b=d.value)==null?void 0:b.accent)||"#b32c05"}),_=Fo(()=>s.value!==null&&d.value?`--${d.value.slug}`:"");function m(){l.value=!0}async function g(){if(!h){h=!0;try{const{Howl:b,Howler:C}=await Rl(async()=>{const{Howl:P,Howler:D}=await import("./CHSvhzML.js").then(B=>B.h);return{Howl:P,Howler:D}},__vite__mapDeps([2,1]),import.meta.url);c=C,f=new b({src:["/audio/tick.mp3"],volume:.4}),u=zl.map(P=>new b({src:[P.audio],loop:!0,volume:0,html5:!0}))}catch(b){console.warn("Audio init failed:",b)}}}function y(b){s.value=b,a.value=!1,d.value&&(document.title=`${d.value.title} — Chapter Milla Nova`),o.value&&u[b]&&u.forEach((C,P)=>{P===b?(C.volume(.5),C.playing()||C.play()):C.volume(0)})}function v(b){var C;(C=t.value)==null||C.activate(),o.value&&u.length&&u.forEach((P,D)=>{D===b?(P.volume(.12),P.playing()||P.play()):P.volume(0)})}function S(){var b;(b=t.value)==null||b.deactivate(),u.length&&u.forEach(C=>C.volume(0))}function E(){r.value=!r.value}function T(){var b,C;(C=(b=i.value)==null?void 0:b.scene)==null||C.deselectChapter(),s.value=null,a.value=!0,document.title="Chapter — Milla Nova",u.forEach(P=>P.volume(0))}function R(){o.value=!o.value,c&&c.mute(!o.value)}const x=()=>g();return lo(()=>{window.addEventListener("click",x,{once:!0}),window.addEventListener("touchstart",x,{once:!0})}),ha(()=>{u.forEach(b=>b.unload()),f==null||f.unload()}),(b,C)=>{const P=dE,D=pE,B=i3,z=_3,N=x3;return Tt(),zn("div",{class:oo(["app-root",_.value]),ref_key:"appRoot",ref:e},[l.value?da("",!0):(Tt(),_i(P,{key:0,onComplete:m})),yt(D,{ref_key:"cursorRef",ref:t},null,512),yt(B,{ref_key:"webglSceneRef",ref:i,onChapterSelect:y,onChapterHover:v,onChapterUnhover:S},null,512),yt(z,{"is-home":a.value,"accent-color":p.value,"sound-on":o.value,onToggleAbout:E,onGoHome:T,onToggleSound:R},null,8,["is-home","accent-color","sound-on"]),yt(N,{"is-open":r.value,onClose:E},null,8,["is-open"])],2)}}},y3={__name:"nuxt-error-page",props:{error:Object},setup(n){const t=n.error;t.stack&&t.stack.split(`
`).splice(1).map(f=>({text:f.replace("webpack:/","").replace(".vue",".js").trim(),internal:f.includes("node_modules")&&!f.includes(".cache")||f.includes("internal")||f.includes("new Promise")})).map(f=>`<span class="stack${f.internal?" internal":""}">${f.text}</span>`).join(`
`);const i=Number(t.statusCode||500),r=i===404,s=t.statusMessage??(r?"Page Not Found":"Internal Server Error"),o=t.message||t.toString(),a=void 0,u=r?Cd(()=>Rl(()=>import("./CWRteeAo.js"),__vite__mapDeps([3,4,5]),import.meta.url)):Cd(()=>Rl(()=>import("./VcKin3Qu.js"),__vite__mapDeps([6,4,7]),import.meta.url));return(f,h)=>(Tt(),_i(Nt(u),qv(og({statusCode:Nt(i),statusMessage:Nt(s),description:Nt(o),stack:Nt(a)})),null,16))}},M3={key:0},km={__name:"nuxt-root",setup(n){const e=()=>null,t=Jt(),i=t.deferHydration();if(t.isHydrating){const l=t.hooks.hookOnce("app:error",i);rs().beforeEach(l)}const r=!1;S_(Ug,Ng()),t.hooks.callHookWith(l=>l.map(c=>c()),"vue:setup");const s=Mh(),o=!1;D_((l,c,u)=>{if(t.hooks.callHook("vue:error",l,c,u).catch(f=>console.error("[nuxt] Error in `vue:error` hook",f)),GM(l)&&(l.fatal||l.unhandled))return t.runWithContext(()=>zM(l)),!1});const a=!1;return(l,c)=>(Tt(),_i(MS,{onResolve:Nt(i)},{default:jl(()=>[Nt(o)?(Tt(),zn("div",M3)):Nt(s)?(Tt(),_i(Nt(y3),{key:1,error:Nt(s)},null,8,["error"])):Nt(a)?(Tt(),_i(Nt(e),{key:2,context:Nt(a)},null,8,["context"])):Nt(r)?(Tt(),_i(Kx(Nt(r)),{key:3})):(Tt(),_i(Nt(S3),{key:4}))]),_:1},8,["onResolve"]))}};let Hm;{let n;Hm=async function(){var o,a;if(n)return n;const i=!!(((o=window.__NUXT__)==null?void 0:o.serverRendered)??((a=document.getElementById("__NUXT_DATA__"))==null?void 0:a.dataset.ssr)==="true")?_y(km):my(km),r=TM({vueApp:i});async function s(l){await r.callHook("app:error",l),r.payload.error=r.payload.error||bh(l)}i.config.errorHandler=s;try{await RM(r,oE)}catch(l){s(l)}try{await r.hooks.callHook("app:created",i),await r.hooks.callHook("app:beforeMount",i),i.mount(MM),await r.hooks.callHook("app:mounted",i),await uh()}catch(l){s(l)}return i.config.errorHandler===s&&(i.config.errorHandler=void 0),i},n=Hm().catch(e=>{throw console.error("Error while mounting app:",e),e})}export{nh as A,Jt as B,rs as C,jo as D,gc as E,E3 as F,jl as G,Uu as H,Sh as I,Ah as _,Fo as a,Ke as b,R3 as c,zn as d,_h as e,yt as f,C_ as g,Ql as h,cg as i,co as j,w3 as k,ec as l,A3 as m,kM as n,zx as o,L_ as p,Vx as q,lo as r,Th as s,Tt as t,gg as u,kt as v,vp as w,T3 as x,HM as y,Gu as z};
