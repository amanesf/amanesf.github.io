import{$ as e,A as t,B as n,C as r,D as i,E as a,F as o,G as s,H as c,I as l,J as u,K as d,L as f,M as p,N as m,O as h,P as g,Q as _,R as v,S as y,T as b,U as x,V as S,W as C,X as w,Y as T,Z as E,_ as D,a as O,at as k,b as A,c as j,d as ee,et as te,f as M,g as ne,h as re,i as N,it as P,j as F,k as I,l as ie,m as L,n as ae,nt as oe,o as R,ot as se,p as z,q as ce,r as le,rt as ue,s as B,t as de,tt as fe,u as pe,v as me,w as he,x as ge,y as _e,z as ve}from"./three.module-B3HqzI6R.js";import{a as ye,i as be,n as V,o as H,r as U,t as xe}from"./spatialHash-BTomc6Dh.js";var Se={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Ce=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},we=new l(-1,1,1,-1,0,1),Te=new class extends R{constructor(){super(),this.setAttribute(`position`,new _e([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new _e([0,2,0,0,2,0],2))}},Ee=class{constructor(e){this._mesh=new F(Te,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,we)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},De=class extends Ce{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ce?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=fe.clone(e.uniforms),this.material=new ce({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ee(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Oe=class extends Ce{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},ke=class extends Ce{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Ae=class{constructor(t,n){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),n===void 0){let e=t.getSize(new ue);this._width=e.width,this._height=e.height,n=new se(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ge}),n.texture.name=`EffectComposer.rt1`}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new De(Se),this.copyPass.material.blending=0,this.timer=new e}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Oe!==void 0&&(r instanceof Oe?n=!0:r instanceof ke&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new ue);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},je=class extends Ce{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new M}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},W=.072,Me=.006,Ne=new M(`#b8a578`),Pe=new M(`#5e7a3f`),Fe=new M(`#d6a855`),Ie=new M(`#b3a077`),Le=new M(`#9a9a5b`),Re=new M(`#b09a55`),ze=new M(`#7d5c3e`),Be=new M(`#6b5540`),Ve=new M(`#7d7d8c`),He=new M(`#4e5058`),Ue=new M(`#3d5c3a`),We=new M(`#7a4a2c`),Ge=new M(`#e7eef2`),Ke=new M(`#2f95c2`),qe=new M(`#928d5c`),Je=new M(`#dce8ee`),Ye=new M(`#5d7888`),Xe=new M(`#7d6248`),Ze=new M(`#a8916c`),Qe=new M(`#68482f`),$e=new M(`#0f5c93`),et=new M(`#1f92c4`),tt=new M(`#3ecfe0`),nt=new M(`#1d8fc4`),rt=new M(`#0f4a52`),it=new M(`#96917a`),at=new M(`#4a6357`),ot=new M(`#2b3d47`),st=[new M(`#e0925f`),new M(`#c37cab`),new M(`#74bfb8`),new M(`#cdab52`)],ct=new M(`#ded2c4`),lt=new M(`#8c7c68`),ut=new M(`#1c1815`),dt=new M(`#ff5a1f`),ft=new M(`#2f6f8a`),pt=new M(`#3187b2`),mt=new M(`#a99568`),ht=new M(`#eef6f2`),gt=new M(`#e4f2f1`);function G(e,t,n){let r=Math.min(Math.max((e-t)/(n-t),0),1);return r*r*(3-2*r)}function _t(e,t,n){let r=I.clamp(e.dot(t),-1,1),i=Math.acos(r)*n;if(i===0)return e.clone();let a=t.clone().addScaledVector(e,-r).normalize();return e.clone().multiplyScalar(Math.cos(i)).addScaledVector(a,Math.sin(i))}function vt(e,t){let n=[];for(let r=0;r<e.length-1;r++)for(let i=0;i<=t;i++)n.push(_t(e[r],e[r+1],i/t));return n}function K(e,t){let n=(t+180)/360*Math.PI*2,r=(90-e)/180*Math.PI;return new P(-Math.cos(n)*Math.sin(r),Math.cos(r),Math.sin(n)*Math.sin(r))}var yt=[K(46,8),K(35,48),K(29,84),K(22,98),K(-2,121)],bt=[K(62,-151),K(39,-106),K(17,-95),K(-5,-77),K(-33,-70),K(-50,-73)],xt=[...vt(yt,5),...vt(bt,5)],St=[{center:K(19.42,-155.29),radius:.052,craterRadius:.016,active:!0},{center:K(40.82,14.43),radius:.048,craterRadius:.015,active:!1},{center:K(-.68,-78.44),radius:.05,craterRadius:.015,active:!0},{center:K(35.36,138.73),radius:.046,craterRadius:.014,active:!1}];function Ct(e){let t=null;for(let n of St){let r=e.angleTo(n.center);if(r>n.radius)continue;let i=(1-r/n.radius)**1.7,a=r<n.craterRadius?1-r/n.craterRadius:0;(!t||i>t.cone)&&(t={cone:i,crater:a,active:n.active})}return t}function wt(e){let t=Math.PI;for(let n=0;n<xt.length;n++){let r=I.clamp(e.dot(xt[n]),-1,1),i=Math.acos(r);i<t&&(t=i)}return t}function Tt(e){return 1-G(wt(e),.06,.26)}var Et=null;function Dt(){if(Et)return Et;let e=new Float32Array(18432),t=new P;for(let n=0;n<96;n++)for(let r=0;r<192;r++)qr(r,n,192,96,t),e[n*192+r]=Tt(t);return Et={grid:e,width:192,height:96},Et}function Ot(e){let{grid:t,width:n,height:r}=Dt(),i=Math.acos(I.clamp(e.y,-1,1)),a=Math.atan2(e.z,-e.x);a<0&&(a+=Math.PI*2);let o=a/(Math.PI*2)*n,s=i/Math.PI*r,c=Math.floor(o),l=I.clamp(Math.floor(s),0,r-1),u=o-c,d=s-l,f=(c%n+n)%n,p=(f+1)%n,m=Math.min(l+1,r-1),h=t[l*n+f],g=t[l*n+p],_=t[m*n+f],v=t[m*n+p];return I.lerp(I.lerp(h,g,u),I.lerp(_,v,u),d)}var kt=null;async function At(e){let t=await new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`failed to load elevation data: ${e}`)),r.src=e}),n=document.createElement(`canvas`);n.width=t.width,n.height=t.height;let r=n.getContext(`2d`);r.drawImage(t,0,0);let{data:i}=r.getImageData(0,0,t.width,t.height);kt={data:i,width:t.width,height:t.height}}var jt=143,Mt=1.8,Nt=.35;function Pt(e){if(e<=jt)return I.mapLinear(e,0,jt,-.45,W);let t=(e-jt)/112;return .078+I.lerp(t**+Mt,t,Nt)*.322}function Ft(e){if(!kt)return W;let{data:t,width:n,height:r}=kt,i=Math.acos(I.clamp(e.y,-1,1)),a=Math.atan2(e.z,-e.x);a<0&&(a+=Math.PI*2);let o=a/(Math.PI*2)*n,s=i/Math.PI*r,c=Math.floor(o),l=I.clamp(Math.floor(s),0,r-1),u=o-c,d=s-l,f=(c%n+n)%n,p=(f+1)%n,m=Math.min(l+1,r-1),h=t[(l*n+f)*4],g=t[(l*n+p)*4],_=t[(m*n+f)*4],v=t[(m*n+p)*4];return Pt(I.lerp(I.lerp(h,g,u),I.lerp(_,v,u),d))}function It(e){return Ft(e)}var Lt=[{name:`Caspian`,spine:[[46.5,51.5],[42,50.5],[38,52.5]],width:.055},{name:`Superior`,spine:[[47.3,-91],[47.8,-85.5]],width:.042},{name:`Michigan`,spine:[[45.7,-86.6],[42.1,-87.2]],width:.032},{name:`Huron`,spine:[[45.9,-83.4],[43.7,-82]],width:.038},{name:`Erie`,spine:[[41.9,-83.1],[42.6,-79.6]],width:.03},{name:`Ontario`,spine:[[43.5,-79.3],[44,-76.6]],width:.03},{name:`Baikal`,spine:[[55.7,109.5],[51.7,104.6]],width:.03},{name:`Victoria`,spine:[[-1,33]],width:.045},{name:`Tanganyika`,spine:[[-3.4,29.2],[-8.8,31]],width:.03},{name:`Malawi`,spine:[[-9.5,34.1],[-14.4,35.2]],width:.03},{name:`GreatBear`,spine:[[66,-121]],width:.034},{name:`GreatSlave`,spine:[[62.5,-110.8],[61.3,-116.5]],width:.03},{name:`Winnipeg`,spine:[[53.8,-98.1],[50.6,-96.7]],width:.03},{name:`Ladoga`,spine:[[60.8,31.4]],width:.03},{name:`Balkhash`,spine:[[46.7,74.5],[45.6,78.5]],width:.03},{name:`Aral`,spine:[[45,59.5]],width:.03},{name:`Chad`,spine:[[13.2,14.2]],width:.03},{name:`Turkana`,spine:[[4.5,36],[2.5,36.6]],width:.03},{name:`Maracaibo`,spine:[[9.8,-71.5]],width:.032}];function Rt(e,t){let n=(90-e)*Math.PI/180,r=(t+180)*Math.PI/180;return new P(-Math.sin(n)*Math.cos(r),Math.cos(n),Math.sin(n)*Math.sin(r))}var zt=Lt.map(e=>{let t=e.spine.map(([e,t])=>Rt(e,t)),n=[];for(let e=0;e+1<t.length;e++){let r=t[e],i=t[e+1];n.push({a:r,b:i,n:new P().crossVectors(r,i).normalize(),cosSpan:r.dot(i)})}let r=new P;for(let e of t)r.add(e);r.normalize();let i=0;for(let e of t)i=Math.max(i,r.angleTo(e));return{segments:n,points:t,width:e.width,centre:r,reach:i+e.width*2,cosReach:Math.cos(i+e.width*2)}}),Bt=null;function Vt(e){if(!Bt){let e=Array.from({length:Ai*ji},()=>[]),t=new P,n=.087*Math.SQRT2*.5+.001;for(let r=0;r<Ai;r++){let i=90-(r+.5)*(180/Ai);for(let a=0;a<ji;a++){let o=-180+(a+.5)*(360/ji);t.copy(Rt(i,o));let s=e[r*ji+a];for(let e=0;e<zt.length;e++)t.angleTo(zt[e].centre)<zt[e].reach+n&&s.push(e)}}Bt=e.map(e=>Int32Array.from(e))}return Bt[Ki(e)]}function Ht(e,t){let n=1/0;for(let r of t.points)n=Math.min(n,e.angleTo(r));for(let r of t.segments){let t=e.dot(r.n),i=e.x-r.n.x*t,a=e.y-r.n.y*t,o=e.z-r.n.z*t,s=Math.hypot(i,a,o);if(s<=1e-9)continue;let c=1/s,l=(i*r.a.x+a*r.a.y+o*r.a.z)*c,u=(i*r.b.x+a*r.b.y+o*r.b.z)*c;l>=r.cosSpan&&u>=r.cosSpan&&(n=Math.min(n,Math.asin(I.clamp(Math.abs(t),0,1))))}return n}function Ut(e){let t=Vt(e);if(t.length===0)return 1/0;let n=1/0;for(let r=0;r<t.length;r++){let i=zt[t[r]];if(e.dot(i.centre)<i.cosReach)continue;let a=(H(e.x*90+511,e.y*90+511,e.z*90+511,3)-.5)*.75,o=Ht(e,i)/i.width-a;o<n&&(n=o)}return n}function Wt(e){return G(Ut(e),Jt,.4)}function Gt(e){return G(Wt(e),Yt,1)}function Kt(e){return G(Ut(e),Xt,1.05)}var qt=-.05,Jt=1.55,Yt=.42,Xt=1.9;function Zt(e){let t=It(e),n=Ot(e),r=G(t,.11199999999999999-n*.05,.292-n*.12),i=t+(r>0?H(e.x*6.5+4.1,e.y*6.5+4.1,e.z*6.5+4.1,4):0)*.2*r*(1+n*.9),a=G(t,W,.172),o=a>0?H(e.x*3.4+17.7,e.y*3.4+17.7,e.z*3.4+17.7,3):0;i+=o*.145*a;let s=G(Math.abs(e.y),.86,.98);if(s>0){let t=.102+H(e.x*5+222,e.y*5+222,e.z*5+222,3)*.06;i=I.lerp(i,t,s*.62)}let c=Ct(e);if(c){let e=W+ar*1.05,t=I.lerp(W,e,c.cone);if(c.crater>0){let e=W+ar*.62;t=I.lerp(t,e,G(c.crater,0,1))}i=I.lerp(i,t,G(c.cone,.05,.3))}let l=Gt(e);return l>0&&(i=Math.min(i,I.lerp(.074,qt,l))),Math.max(i,-.2)}var Qt=30,$t=[.34,.1,.14,.36,.97,.9,.64,.58,.48,.44,.42,.3,.28,.28,.18,.16,.18,.44,.42,.4,.4,.32,.3,.28,.28,.2,.18,.18,.2,.36,.42],en=[.35,1,.95,.5,0,.02,.1,.14,.4,.55,.45,.6,.68,.5,.82,.9,.72,.5,.55,.5,.4,.6,.68,.7,.45,.85,.9,.85,.5,.05,0],tn=Array.from({length:31},(e,t)=>t>=17),nn=[0,0,0,0,.5,1,.45,.85,.2,.1,.05,0,0,0,0,0,0,.5,.5,.35,.2,.12,.1,.05,.05,0,0,0,0,.05,0],rn=[.15,.1,.32,.5,.03,.03,.26,.24,.85,.8,.35,.95,.68,.3,1,1,.45,.38,.34,.14,.05,.7,.44,.1,.03,.68,.58,.06,.02,.02,0],an=`none.Af.Am.Aw.BW.BW.BS.BS.Cs.Cs.Cs.Cw.Cw.Cw.Cf.Cf.Cf.Ds.Ds.Ds.Ds.Dw.Dw.Dw.Dw.Df.Df.Df.Df.ET.EF`.split(`.`),on=null;async function sn(e){let t=await new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`failed to load climate data: ${e}`)),r.src=e}),n=document.createElement(`canvas`);n.width=t.width,n.height=t.height;let r=n.getContext(`2d`);r.drawImage(t,0,0);let{data:i}=r.getImageData(0,0,t.width,t.height);on={data:i,width:t.width,height:t.height}}function cn(e){if(!on)return 0;let{data:t,width:n,height:r}=on,i=Math.acos(I.clamp(e.y,-1,1)),a=Math.atan2(e.z,-e.x);a<0&&(a+=Math.PI*2);let o=Math.min(n-1,Math.floor(a/(Math.PI*2)*n)),s=Math.min(r-1,Math.floor(i/Math.PI*r));for(let e=0;e<=6;e++)for(let i=-e;i<=e;i++){let a=s+i;if(!(a<0||a>=r))for(let r=-e;r<=e;r++){if(e>0&&Math.abs(r)!==e&&Math.abs(i)!==e)continue;let s=((o+r)%n+n)%n,c=t[(a*n+s)*4];if(c>0&&c<=Qt)return c}}return 0}function ln(e){let t=$t[cn(e)],n=H(e.x*2.6+51.3,e.y*2.6+51.3,e.z*2.6+51.3,3),r=Math.abs(t-.5)*2;return t+n*.22*(1-r)}var un=null;function dn(e){return un??=vn(yn,bn,e=>en[cn(e)]),Sn(un,e)*(1-.88*gn(e))}var fn=[.3,.02,.05,.55,.02,.06,.85,.85,.45,.14,.12,.3,.25,.22,.16,.12,.14,.4,.22,.18,.18,.28,.2,.12,.14,.18,.14,.08,.1,.25,0],pn=.0096;function mn(e){let t=new P(0,1,0).cross(e);t.lengthSq()<1e-8&&t.set(1,0,0),t.normalize();let n=new P().crossVectors(e,t).normalize(),r=new P,i=1/0,a=-1/0;for(let o=0;o<8;o++){let s=o/8*Math.PI*2;r.copy(e).addScaledVector(t,Math.cos(s)*pn).addScaledVector(n,Math.sin(s)*pn).normalize();let c=Zt(r);c<i&&(i=c),c>a&&(a=c)}return a-i}var hn=null;function gn(e){return hn??=vn(yn,bn,e=>{let t=Zt(e);if(t<=.072)return 0;let n=fn[cn(e)],r=1-G(mn(e),.004,.015),i=G(ra(e,t),.25,.7);return Math.max(n,r*i)}),Sn(hn,e)}function _n(e){let t=cn(e);return{group:an[t],coniferous:tn[t]}}function vn(e,t,n){let r=new Float32Array(e*t),i=new P;for(let a=0;a<t;a++)for(let o=0;o<e;o++)qr(o,a,e,t,i),r[a*e+o]=n(i);return r}var yn=384,bn=192;function xn(e,t,n,r){let i=Math.acos(I.clamp(r.y,-1,1)),a=Math.atan2(r.z,-r.x);a<0&&(a+=Math.PI*2);let o=a/(Math.PI*2)*t,s=i/Math.PI*n,c=Math.floor(o),l=I.clamp(Math.floor(s),0,n-1),u=o-c,d=s-l,f=(c%t+t)%t,p=(f+1)%t,m=Math.min(l+1,n-1),h=e[l*t+f],g=e[l*t+p],_=e[m*t+f],v=e[m*t+p];return I.lerp(I.lerp(h,g,u),I.lerp(_,v,u),d)}function Sn(e,t){return xn(e,yn,bn,t)}var Cn=[{lat:20,lon:51,radiusDeg:8},{lat:30,lon:2,radiusDeg:6},{lat:25,lon:-2,radiusDeg:5},{lat:-24,lon:15,radiusDeg:4},{lat:39,lon:82,radiusDeg:6},{lat:-25,lon:137,radiusDeg:5}].map(e=>({dir:K(e.lat,e.lon),radius:e.radiusDeg*Math.PI/180}));function wn(e){let t=0;for(let n of Cn){let r=1-G(e.angleTo(n.dir),n.radius*.7,n.radius);r>t&&(t=r)}return t}function Tn(e){let t=wn(e);return t<=0?0:t*(.35+.65*((H(e.x*2.1+913,e.y*2.1+913,e.z*2.1+913,2)+1)*.5))}var En=null;function Dn(e){return En??=vn(yn,bn,Tn),Sn(En,e)}var On=null;function kn(e){return On??=vn(yn,bn,ln),Sn(On,e)}var An=[.35,1,.92,.58,.02,.05,.22,.25,.34,.42,.44,.62,.6,.54,.72,.68,.66,.3,.33,.34,.28,.5,.48,.42,.34,.6,.58,.46,.38,.2,.06],jn=[.3,.08,.55,.85,.5,.5,.7,.6,.8,.75,.7,.8,.78,.7,.15,.12,.15,.7,.68,.6,.6,.72,.7,.62,.6,.18,.15,.2,.25,.35,.3],Mn=[0,0,.8,1,.2,.1,.7,.2,-1,-1,-1,1,1,1,.2,-.4,-.5,-.9,-.9,-.8,-.8,1,1,.9,.9,.4,.3,.4,.3,.3,.2];function Nn(e){let t=Math.asin(I.clamp(e,-1,1))*(180/Math.PI),n=(e,n,r)=>r*Math.exp(-(((t-e)/n)**2));return I.clamp(.12+n(0,11,.78)+n(50,17,.42)+n(-50,17,.42),0,1)}function Pn(e){let t=cn(e),n=J(e).raw<.072||t===0?Nn(e.y):An[t],r=H(e.x*2.9-314.1,e.y*2.9-314.1,e.z*2.9-314.1,3),i=Math.abs(n-.5)*2;return I.clamp(n+r*.24*(1-i),0,1)}var Fn=null,In=null,Ln=null;function Rn(e){return Fn??=vn(yn,bn,Pn),Sn(Fn,e)}var zn=181,Bn=null;function Vn(e){if(!Bn){Bn=new Float32Array(zn);let e=new P;for(let t=0;t<zn;t++){let n=t/180*2-1,r=Math.sqrt(Math.max(0,1-n*n)),i=0;for(let t=0;t<180;t++){let a=t/180*Math.PI*2;e.set(r*Math.cos(a),n,r*Math.sin(a)),i+=Rn(e)}Bn[t]=i/180}}let t=(I.clamp(e,-1,1)+1)*.5*180,n=Math.min(179,Math.floor(t));return I.lerp(Bn[n],Bn[n+1],t-n)}function Hn(e){return In??=vn(yn,bn,e=>jn[J(e).raw<.072?0:cn(e)]),Ln??=vn(yn,bn,e=>Mn[J(e).raw<.072?0:cn(e)]),{amount:Rn(e),seasonality:Sn(In,e),summerBias:Sn(Ln,e)}}function Un(e,t){let n=Hn(e),r=e.y>=0?t:-t,i=n.seasonality*n.summerBias*r;return I.clamp(n.amount*(1+i),0,1)}var Wn=null;function Gn(e){return Wn??=vn(yn,bn,e=>{let t=nn[cn(e)];if(t<=0)return 0;let n=H(e.x*2.6+555,e.y*2.6+555,e.z*2.6+555,3);return I.clamp(t*(Kn+(n-.14)*2),0,1)}),Sn(Wn,e)}var Kn=.28,qn=null;function Jn(e){return qn??=vn(yn,bn,e=>H(e.x*1.3+909,e.y*1.3+909,e.z*1.3+909,2)),Sn(qn,e)}var Yn=.32,Xn=null;function Zn(e,t){Xn??=vn(yn,bn,e=>H(e.x*1.1+700,e.y*1.1+700,e.z*1.1+700,2)*.085);let n=1-Math.abs(e.y),r=Math.max(t,0)*1.6;return n+Sn(Xn,e)-r}var Qn=-.04,$n=.14;function er(e){return Ot(e)*(.5+H(e.x*2.2+900,e.y*2.2+900,e.z*2.2+900,3)*.5)}var tr=.28,nr=1,rr=.026999999999999996,ir=.049999999999999996,ar=.3,or=.32;function sr(e){let t=e*6,n=Math.floor(t),r=t-n,i;return i=r<or?.5*G(r/or,0,1):r>.6799999999999999?.5+.5*G((r-.6799999999999999)/or,0,1):.5,(Math.min(n,5)+i)/6}var cr=.055;function lr(e){if(e<.072)return 0;let t=e-W,n=sr(Math.min(t/ar,1))*ar;return I.lerp(t,n,G(t,0,cr))}function ur(e){let t=G(Ot(e),.12,.45),n=G(H(e.x*1.7+808,e.y*1.7+808,e.z*1.7+808,2),.05,.22);return Math.max(t,n*.85)}function dr(e,t){if(e<.072)return rr;let n=1+G(er(t),tr,.4)*1.3,r=G(Wt(t),.05,.4),i=(.028+ur(t)*.15)*(1-.8*r),a=n,o=Ct(t);if(o){let e=1+o.cone*(1-o.crater)*1.9;a=Math.max(a,e)}let s=G(kn(t),.62,.82),c=0;if(s>0){let n=H(t.x*9+517,t.y*9+517,t.z*9+517,2),r=.3+.7*G(Dn(t),.42,.62),i=G(lr(e),.002,.009);c=n*.045*s*r*i}return W+i+lr(e)*nr*a+c}function fr(e,t){return e+ir*t}var q=new M,pr=new M,mr=new M,hr=new P;function gr(e){let t=H(e.x*38+1301,e.y*38+1301,e.z*38+1301,2),n=H(e.x*38+2609,e.y*38+2609,e.z*38+2609,2);return hr.set(e.x+t*.02,e.y+n*.02,e.z+t*n*.02).normalize()}function _r(e){return H(e.x*55+71,e.y*55+71,e.z*55+71,2)*.008}function vr(e){return H(e.x*180+13,e.y*180+13,e.z*180+13,1)*.05}function yr(e){let t=Math.sin(e*95)*.5+.5,n=Math.sin(e*230+1.7)*.5+.5;return pr.copy(Xe).lerp(Ze,t),pr.lerp(Qe,n*.4)}function br(e){let t=H(e.x*130+4040,e.y*130+4040,e.z*130+4040,2),n=1-G(Math.abs(t),0,.06);return mr.copy(ct).lerp(lt,n*.6)}function xr(e,t,n){let r=G(H(n.x*90+5050,n.y*90+5050,n.z*90+5050,2),.15,.5)*t;e.lerp(dt,r*.7)}function Sr(e,t,n,r,i,a,o,s){let c=1-G(n,Qn,.09);if(c>.995){q.copy(Je);let e=1-G(Math.abs(s),0,.035);return e>0&&q.lerp(Ye,e*.55),q}let l=G(t,.66,.86),u=G(n,.62,.88),d=1-G(n,$n,.45);if(e<.15)if(n<$n){let e=G(n,$n,Qn);q.copy(Pe).lerp(qe,e),q.lerp(Ie,l*(1-e))}else{let n=e/.003;q.copy(Ne).lerp(Pe,Math.min(Math.max(n,0),1)),q.lerp(We,u*.42*G(t,.16,.34)*(1-l)),q.lerp(Ue,d*.7);let r=q.clone().copy(Le).lerp(Re,u);q.lerp(r,a*(.72+s*.16)),q.lerp(Ie,l);let i=G(t,.78,.93);q.lerp(Fe,i*G(o,.42,.62)),q.lerp(Be,i*(1-G(o,.3,.5))*G(s,.1,.45))}else if(e<.22){let t=(e-.15)/.07;q.copy(Pe).lerp(ze,t),q.lerp(Ue,d*.5*(1-t)),q.lerp(Ie,l*(1-t)*.6)}else if(e<ar){let t=(e-.22)/.07999999999999999;q.copy(ze).lerp(Ve,G(t,0,.55)),q.lerp(He,G(t,.1,.45)*.35),q.lerp(Ge,G(t,.62,1))}else q.copy(Ge);let f=G(r,Kn,.43000000000000005)*(1-G(i,.15,.4))*G(t,-.05,.15)*(1-G(e,.2,.28))*G(n,.09000000000000001,.19);return f>.001&&q.lerp(yr(e),f*.3),c>0&&q.lerp(Je,c),q}var Cr=6.5;function wr(e,t,n,r){let i=Cr*r*2.2;if(t<=0||t>i)return 0;let a=H(e.x*14+4242,e.y*14+4242,e.z*14+4242,3),o=Cr*r*(.4+n*.9+a*.8);return t>o?0:(1-G(t,o*.08,o))*(.07+n*.2+Math.max(a,0)*.13)}function Tr(e,t){if(t<.072)return 0;let n=lr(t),r=Zn(e,n),i=1-G(r,Qn,.1),a=G(n,.27,ar)*(1-G(r,.1,.42));return Math.max(i,a)}var Er=new M(`#241a11`),Dr=new M(`#cdc4b1`),Or=new M(`#6a5a49`),kr=new M(`#7e9ac0`),Ar=new M(`#ffffff`),jr=null;function J(e){let t=jr;if(!t){let t=Zt(e);return{raw:t,display:dr(t,e)}}let n=Math.acos(I.clamp(e.y,-1,1)),r=Math.atan2(e.z,-e.x);r<0&&(r+=Math.PI*2);let i=r/(Math.PI*2)*t.width,a=n/Math.PI*t.height,o=Math.floor(i),s=I.clamp(Math.floor(a),0,t.height-1),c=i-o,l=a-s,u=(o%t.width+t.width)%t.width,d=(u+1)%t.width,f=Math.min(s+1,t.height-1),p=s*t.width+u,m=s*t.width+d,h=f*t.width+u,g=f*t.width+d,_=(e,t,n,r)=>I.lerp(I.lerp(e,t,c),I.lerp(n,r,c),l);return{raw:_(t.raw[p],t.raw[m],t.raw[h],t.raw[g]),display:_(t.display[p],t.display[m],t.display[h],t.display[g])}}function Mr(e,t){if(jr&&jr.width===e&&jr.height===t)return jr;let n=e*t,r=new Float32Array(n),i=new Float32Array(n),a=new P;for(let n=0;n<t;n++)for(let o=0;o<e;o++){qr(o,n,e,t,a);let s=Zt(a),c=n*e+o;r[c]=s,i[c]=dr(s,a)}return jr={width:e,height:t,raw:r,display:i},jr}function Nr(e,t){let n=e*t,r=Mr(e,t).display,i=new Float32Array(n),a=new Float32Array(n);for(let n=0;n<t;n++){let o=(n+.5)/t*Math.PI,s=Math.max(Math.sin(o),.15),c=Math.max(n-1,0),l=Math.min(n+1,t-1);for(let t=0;t<e;t++){let o=n*e+t,u=r[o],d=r[n*e+(t-1+e)%e],f=r[n*e+(t+1)%e],p=r[c*e+t],m=r[l*e+t],h=(f-d)/(2*s),g=(m-p)/2;a[o]=Math.min(Math.sqrt(h*h+g*g)*Fr,1);let _=(d+f-2*u)/(s*s)+(p+m-2*u);i[o]=I.clamp(-_*Pr,-1,1)}}return{width:e,height:t,convexity:i,slope:a}}var Pr=11,Fr=7;function Ir(e,t,n,r){n>.01&&e.lerp(Or,n*.7*(1-r));let i=1-n*.8,a=G(t,.55,1);if(a>0&&e.lerp(Dr,a*.45*(1-r*.4)),t<0){let n=Math.min(-t,1)*i;e.lerp(Er,n*.33*(1-r)),e.lerp(kr,n*.62*r)}else{let n=Math.min(t,1)*i;e.lerp(Dr,n*.3*(1-r)),e.lerp(Ar,n*.45*r)}return e}function Lr(e,t,n,r,i){let a=t+_r(e),o=Zn(e,lr(Math.max(a,W))),s=G(o,Qn,-.12),c=Ot(e),l;if(a<.06599999999999999){let t=G(a,.03699999999999999,W),n=1-G(a,-.14,.021999999999999992);l=q.copy(at).lerp(it,t),l.lerp(ot,n);let r=H(e.x*22+61,e.y*22+61,e.z*22+61,3);l.offsetHSL(0,0,r*.12);let i=G(a,.041999999999999996,.06599999999999999);if(i>0){let t=G(o,.58,.78);if(t>0){let n=H(e.x*26+7070,e.y*26+7070,e.z*26+7070,3),r=i*t*G(n,.05,.35);if(r>.01){let t=H(e.x*60+8080,e.y*60+8080,e.z*60+8080,2),n=Math.min(st.length-1,Math.floor((t+1)/2*st.length));l.lerp(st[n],r*.55)}}}let c=Gt(e);c>0&&l.lerp(pt,G(c,0,.45)*.92),l.lerp(Je,s)}else if(a<.0741)l=q.copy(Ne).lerp(Dr,.55),l.lerp(Je,s);else if(a<.078){if(c>.35){let e=G(a,W-Me*.4,.078);l=q.copy(et).lerp(ze,e),l.offsetHSL(0,0,-.05)}else l=q.copy(et).lerp(Ne,(a-.06599999999999999)/(Me*2));l.lerp(Je,s)}else{let t=lr(a),s=kn(e);l=Sr(t,s,o,Gn(e),c,gn(e),Dn(e),H(e.x*17+2255,e.y*17+2255,e.z*17+2255,3));let u=1-G(a,W,.07999999999999999);if(n>.35&&u>0&&l.lerp(mt,n*u*.55),n>0&&l.lerp(Ke,n),s>.72&&t<.045){let t=Jn(e);t>Yn&&l.lerp(br(e),G(t,Yn,.44))}let d=Wi(e);d>0&&l.lerp(Fi,d*.5);let f=Ji(e);f>0&&l.lerp(vi,f*.62);let p=dn(gr(e));if(p>.04){let n=H(e.x*16.5+907,e.y*16.5+907,e.z*16.5+907,3),r=p*(1-G(t,.13,.26))*(1-f)*(.78+n*.55);l.multiplyScalar(1-.3*r),l.offsetHSL(.004*r,.05*r,0)}let m=Ct(e);if(m){if(m.crater>0)l.lerp(m.active?ut:ft,G(m.crater,0,.4)),m.active&&xr(l,m.crater,e);else if(m.active){let t=G(H(e.x*40+6060,e.y*40+6060,e.z*40+6060,3),.1,.35)*G(m.cone,.06,.35)*(1-G(m.cone,.55,.9));t>.01&&(l.lerp(ut,t*.7),xr(l,t,e))}}let h=wr(e,r+_r(e)*220*i,ur(e),i);h>0&&l.multiplyScalar(1-h)}return l.offsetHSL(0,0,vr(e))}var Rr=3.4;function zr(e,t,n,r=`sea`){let i=t*n,a=new Float32Array(i),o=r===`sea`?e=>e>=W:e=>e<W;for(let t=0;t<i;t++)a[t]=o(e[t])?0:1e9;let s=Math.SQRT2,c=(e,n)=>a[n*t+(e%t+t)%t];for(let e=0;e<n;e++)for(let n=0;n<t;n++){let r=e*t+n;if(a[r]===0)continue;let i=a[r];e>0&&(i=Math.min(i,c(n,e-1)+1,c(n-1,e-1)+s,c(n+1,e-1)+s)),i=Math.min(i,c(n-1,e)+1),a[r]=i}for(let e=n-1;e>=0;e--)for(let r=t-1;r>=0;r--){let i=e*t+r;if(a[i]===0)continue;let o=a[i];e<n-1&&(o=Math.min(o,c(r,e+1)+1,c(r-1,e+1)+s,c(r+1,e+1)+s)),o=Math.min(o,c(r+1,e)+1),a[i]=o}return a}function Br(e,t,n){if(t<=0||t>Rr*2.6*n)return 0;let r=ur(e),i=H(e.x*14+4242,e.y*14+4242,e.z*14+4242,3),a=Rr*n*(.5+r*1+i*1.9);if(t>a)return 0;let o=1-G(t,a*.15,a),s=.45+r*.55+i*.7;return I.clamp(o*s,0,1)}var Vr=5;function Hr(e,t,n){let r=Vr*n*2;if(t<=0||t>r)return 0;let i=ur(e),a=H(e.x*14+4242,e.y*14+4242,e.z*14+4242,3),o=Vr*n*(.45+i*.8+a*.7);return t>o?0:(1-G(t,o*.1,o))*(.05+i*.13+Math.max(a,0)*.08)}var Ur=[{warm:!0,width:.026,spine:[[22,122],[26,127],[30,132],[33,138],[35.5,142],[38,148],[40.5,155]]},{warm:!0,width:.028,spine:[[25,-80],[29,-79.5],[33,-77],[36.5,-73],[40,-67],[43.5,-56],[48,-42],[52,-30]]},{warm:!1,width:.02,spine:[[48,-128],[42,-125.5],[36,-122.5],[30,-118],[24,-112]]},{warm:!1,width:.02,spine:[[-34,17.5],[-29,15],[-23,13],[-17,11.5]]}].map(e=>{let t=e.spine.map(([e,t])=>K(e,t)),n=[];for(let e=0;e+1<t.length;e++){let r=t[e],i=t[e+1];n.push({a:r,b:i,n:new P().crossVectors(r,i).normalize(),cosSpan:r.dot(i)})}let r=new P;for(let e of t)r.add(e);r.normalize();let i=0;for(let e of t)i=Math.max(i,r.angleTo(e));return{segments:n,width:e.width,warm:e.warm,centre:r,cosReach:Math.cos(i+e.width*3)}});function Wr(e,t){let n=Math.PI;for(let r of t){let t=e.dot(r.n),i=e.x-r.n.x*t,a=e.y-r.n.y*t,o=e.z-r.n.z*t,s=Math.hypot(i,a,o);if(s>1e-9){let e=1/s,c=(i*r.a.x+a*r.a.y+o*r.a.z)*e,l=(i*r.b.x+a*r.b.y+o*r.b.z)*e;if(c>=r.cosSpan&&l>=r.cosSpan){let e=Math.asin(I.clamp(Math.abs(t),0,1));e<n&&(n=e);continue}}let c=Math.min(e.angleTo(r.a),e.angleTo(r.b));c<n&&(n=c)}return n}function Gr(e){let t=null;for(let n of Ur){if(e.dot(n.centre)<n.cosReach)continue;let r=Wr(e,n.segments),i=H(e.x*40+7171,e.y*40+7171,e.z*40+7171,2),a=n.width*(.55+.6*Math.abs(i));if(r>a)continue;let o=1-G(r,0,a);(!t||o>t.strength)&&(t={strength:o,warm:n.warm})}return t}function Kr(e,t,n,r){let i=G(t,-.2,W);i<.86?q.copy($e).lerp(et,i/.86):q.copy(et).lerp(tt,(i-.86)/.14);let a=H(e.x*4.5+611,e.y*4.5+611,e.z*4.5+611,3);q.offsetHSL(a*.02,a*.1,a*.07);let o=Gr(e);if(o){let e=o.warm?nt:rt;q.lerp(e,o.strength*(o.warm?.2:.14))}let s=G(Zn(e,0),Qn,-.12);return q.lerp(Je,s),r>0&&q.multiplyScalar(1-r),n>0&&q.lerp(gt,n*.92),q.offsetHSL(0,0,vr(e)*.6)}function qr(e,t,n,r,i){let a=e/n,o=t/r,s=a*Math.PI*2,c=o*Math.PI;return i.set(-Math.cos(s)*Math.sin(c),Math.cos(c),Math.sin(s)*Math.sin(c))}var Jr=.3;function Yr(e,t){let n=e*t,r=new Float32Array(n),i=new Uint8Array(n),a=new Float32Array(n),o=new P;for(let n=0;n<t;n++){let s=Math.sin(n/t*Math.PI);for(let c=0;c<e;c++){let l=n*e+c;qr(c,n,e,t,o);let u=It(o);r[l]=u,!(u<.072)&&(i[l]=1,a[l]=Math.max(0,Rn(o)-Jr)*s)}}let s=[-1,0,1,-1,1,-1,0,1],c=[-1,-1,-1,0,0,1,1,1],l=new Uint8Array(n),u=[],d=e=>{u.push(e);let t=u.length-1;for(;t>0;){let e=t-1>>1;if(r[u[e]]<=r[u[t]])break;let n=u[e];u[e]=u[t],u[t]=n,t=e}},f=()=>{let e=u[0],t=u.pop();if(u.length>0){u[0]=t;let e=0;for(;;){let t=e*2+1,n=t+1,i=e;if(t<u.length&&r[u[t]]<r[u[i]]&&(i=t),n<u.length&&r[u[n]]<r[u[i]]&&(i=n),i===e)break;let a=u[i];u[i]=u[e],u[e]=a,e=i}}return e};for(let n=0;n<t;n++)for(let r=0;r<e;r++){let a=n*e+r;if(i[a])for(let o=0;o<8;o++){let u=(r+s[o]+e)%e,f=n+c[o];if(!(f<0||f>=t)&&!i[f*e+u]){l[a]=1,d(a);break}}}for(;u.length>0;){let n=f(),a=n%e,o=n/e|0;for(let u=0;u<8;u++){let f=(a+s[u]+e)%e,p=o+c[u];if(p<0||p>=t)continue;let m=p*e+f;l[m]||!i[m]||(l[m]=1,r[m]=Math.max(r[m],r[n]+1e-6),d(m))}}let p=new Int32Array(n).fill(-1),m=[];for(let n=0;n<t;n++)for(let a=0;a<e;a++){let o=n*e+a;if(!i[o])continue;m.push(o);let l=r[o],u=-1;for(let i=0;i<8;i++){let o=(a+s[i]+e)%e,d=n+c[i];if(d<0||d>=t)continue;let f=d*e+o;r[f]<l&&(l=r[f],u=f)}p[o]=u}m.sort((e,t)=>r[t]-r[e]);for(let e of m){let t=p[e];t>=0&&(a[t]+=a[e])}let h=new Float32Array(m.length);for(let e=0;e<m.length;e++)h[e]=a[m[e]];h.sort();let g=e=>h[Math.min(h.length-1,Math.floor(e*h.length))],_=384/e;return{flow:a,downhill:p,isLand:i,width:e,height:t,logLo:Math.log(g(1-.03*_)+1),logHi:Math.log(g(1-5e-4*_)+1)}}var Xr=.6,Zr=1.9;function Qr(e,t,n,r){let i=new Uint8Array(t*n),a=t/e.width,o=n/e.height,s=t/1536,{flow:c,downhill:l,isLand:u,logLo:d,logHi:f}=e;for(let p=0;p<e.height;p++)for(let m=0;m<e.width;m++){let h=p*e.width+m;if(!u[h])continue;let g=l[h];if(g<0)continue;let _=G((Math.log(c[h]+1)-d)/(f-d),0,1);if(_<=0)continue;let v=g%e.width,y=g/e.width|0,b=m*a,x=p*o,S=(v-m)*a;S>t/2&&(S-=t),S<-t/2&&(S+=t);let C=(y-p)*o,w=b+S,T=x+C,E=I.lerp(Xr,Zr,_)*s*r,D=r>1?1:.62+.38*_,O=r>1?E*.6:.5*s,k=E+O+1,A=Math.floor(Math.min(b,w)-k),j=Math.ceil(Math.max(b,w)+k),ee=Math.max(0,Math.floor(Math.min(x,T)-k)),te=Math.min(n-1,Math.ceil(Math.max(x,T)+k)),M=S*S+C*C;for(let e=ee;e<=te;e++)for(let n=A;n<=j;n++){let r=n-b,a=e-x,o=M>0?I.clamp((r*S+a*C)/M,0,1):0,s=r-S*o,c=a-C*o,l=G(Math.sqrt(s*s+c*c),E+O,E-O);if(l<=0)continue;let u=(n%t+t)%t,d=e*t+u,f=Math.round(l*D*255);f>i[d]&&(i[d]=f)}}return i}var $r=768,ei=384,ti=2048,ni=1024,ri=5,ii=null,ai=null;function oi(){if(ii)return;let e=Yr($r,ei);ii=Qr(e,ti,ni,1),ai=Qr(e,ti,ni,ri)}function si(e,t){let n=Math.acos(I.clamp(t.y,-1,1)),r=Math.atan2(t.z,-t.x);r<0&&(r+=Math.PI*2);let i=r/(Math.PI*2)*ti,a=n/Math.PI*ni,o=Math.floor(i),s=I.clamp(Math.floor(a),0,1023),c=i-o,l=a-s,u=(o%ti+ti)%ti,d=(u+1)%ti,f=Math.min(s+1,1023),p=e[s*ti+u],m=e[s*ti+d],h=e[f*ti+u],g=e[f*ti+d];return I.lerp(I.lerp(p,m,c),I.lerp(h,g,c),l)/255}function ci(e){return oi(),si(ii,e)}function li(e){return oi(),si(ai,e)}var ui=4096,di=null;function fi(){let e=new Float32Array(ui),t=new M;for(let n=0;n<ui;n++){let r=n/4095;t.setRGB(r,r,r,h).convertLinearToSRGB(),e[n]=t.r}return e}function pi(e){di??=fi();let t=I.clamp(e,0,1)*4095,n=Math.floor(t),r=Math.min(4095,n+1);return I.lerp(di[n],di[r],t-n)}function mi(e,t,n){e[t]=Math.round(pi(n.r)*255),e[t+1]=Math.round(pi(n.g)*255),e[t+2]=Math.round(pi(n.b)*255),e[t+3]=255}function hi(e=1536,t=768){let n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`),i=r.createImageData(e,t),a=new P,o=Nr(e,t),c=Mr(e,t).raw,l=zr(c,e,t,`land`),u=e/1536;for(let n=0;n<t;n++)for(let r=0;r<e;r++){qr(r,n,e,t,a);let s=c[n*e+r],d=s>=.072?ci(a):0,f=Lr(a,s,d,l[n*e+r],u);if(s>=.072){let t=n*e+r;if(Ir(f,o.convexity[t],o.slope[t],Tr(a,s)),d>.4&&o.slope[t]>.35){let e=G(o.slope[t],.35,.7)*G(d,.4,.7);f.lerp(ht,e*.75)}}let p=(n*e+r)*4;mi(i.data,p,f)}r.putImageData(i,0,0);let d=new B(n);return d.colorSpace=s,d.anisotropy=4,d.needsUpdate=!0,d}var gi=[[35.68,139.69,1],[34.69,135.5,.75],[35.18,136.91,.6],[33.59,130.4,.45],[43.06,141.35,.4],[38.27,140.87,.35],[37.57,126.98,.85],[35.18,129.08,.5],[39.02,125.75,.35],[39.9,116.4,.95],[39.13,117.2,.7],[31.23,121.47,1],[32.06,118.8,.6],[30.27,120.16,.6],[30.59,114.31,.7],[29.56,106.55,.8],[30.57,104.07,.75],[34.34,108.94,.6],[34.75,113.63,.55],[36.07,120.38,.5],[41.8,123.43,.55],[45.8,126.53,.5],[23.13,113.26,.9],[22.54,114.06,.85],[22.32,114.17,.7],[25.03,121.57,.55],[25.04,102.72,.4],[43.83,87.62,.3],[29.65,91.1,.25],[47.89,106.91,.3],[14.6,120.98,.8],[10.32,123.89,.3],[-6.21,106.85,.9],[-7.25,112.75,.5],[-6.91,107.61,.45],[3.59,98.67,.35],[-5.15,119.43,.3],[13.75,100.5,.8],[10.82,106.63,.7],[21.03,105.85,.6],[1.35,103.82,.6],[3.14,101.69,.55],[16.87,96.2,.5],[11.56,104.93,.35],[28.61,77.21,1],[19.08,72.88,.95],[22.57,88.36,.85],[13.08,80.27,.7],[12.97,77.59,.75],[17.38,78.49,.7],[23.03,72.58,.6],[18.52,73.86,.55],[21.17,72.83,.45],[26.91,75.79,.45],[26.85,80.95,.45],[25.59,85.14,.4],[21.15,79.09,.4],[23.81,90.41,.9],[22.36,91.78,.5],[24.86,67.01,.9],[31.55,74.34,.8],[33.68,73.05,.4],[34.53,69.17,.45],[6.93,79.86,.35],[27.72,85.32,.35],[35.69,51.39,.8],[36.3,59.61,.45],[33.31,44.37,.65],[24.71,46.68,.55],[21.49,39.19,.45],[25.2,55.27,.55],[41.01,28.98,.8],[39.93,32.86,.5],[32.08,34.78,.45],[41.3,69.24,.45],[43.24,76.89,.4],[40.41,49.87,.4],[55.76,37.62,.85],[59.94,30.31,.55],[56.84,60.61,.4],[55.03,82.92,.4],[43.12,131.89,.3],[50.45,30.52,.5],[53.9,27.57,.35],[52.23,21.01,.45],[52.52,13.4,.6],[53.55,9.99,.45],[51.4,7,.6],[50.11,8.68,.45],[48.14,11.58,.45],[48.21,16.37,.45],[50.08,14.44,.4],[47.5,19.04,.4],[44.43,26.1,.4],[52.1,4.6,.5],[50.85,4.35,.4],[48.86,2.35,.85],[51.51,-.13,.9],[53.48,-2.24,.5],[53.35,-6.26,.3],[40.42,-3.7,.6],[41.39,2.17,.5],[38.72,-9.14,.4],[41.9,12.5,.6],[45.46,9.19,.55],[40.85,14.27,.4],[37.98,23.73,.45],[59.33,18.07,.35],[59.91,10.75,.3],[55.68,12.57,.35],[60.17,24.94,.3],[30.04,31.24,.9],[31.2,29.92,.5],[33.57,-7.59,.5],[36.75,3.06,.45],[36.81,10.18,.35],[6.52,3.38,.85],[12,8.52,.4],[5.36,-4.01,.5],[5.6,-.19,.45],[14.72,-17.47,.4],[-4.32,15.31,.8],[-8.84,13.23,.5],[-1.29,36.82,.55],[9.03,38.74,.55],[-6.79,39.21,.5],[15.5,32.56,.5],[.35,32.58,.4],[-17.83,31.05,.3],[-18.88,47.51,.35],[-26.2,28.05,.6],[-33.92,18.42,.45],[-29.86,31.02,.35],[40.71,-74.01,1],[39.95,-75.17,.5],[38.9,-77.04,.55],[42.36,-71.06,.5],[43.65,-79.38,.6],[45.5,-73.57,.45],[49.28,-123.12,.4],[51.05,-114.07,.3],[41.88,-87.63,.7],[42.33,-83.05,.45],[33.75,-84.39,.5],[25.77,-80.19,.5],[29.76,-95.37,.55],[32.78,-96.8,.55],[39.74,-104.99,.4],[33.45,-112.07,.45],[47.61,-122.33,.45],[37.77,-122.42,.55],[34.05,-118.24,.9],[19.43,-99.13,.95],[20.67,-103.35,.5],[25.67,-100.32,.45],[23.11,-82.37,.4],[14.63,-90.51,.4],[18.49,-69.93,.35],[8.98,-79.52,.35],[-23.55,-46.63,.95],[-22.91,-43.17,.8],[-19.92,-43.94,.5],[-15.79,-47.88,.45],[-12.97,-38.5,.45],[-3.73,-38.52,.4],[-8.05,-34.88,.4],[-30.03,-51.23,.4],[-3.12,-60.02,.35],[-34.6,-58.38,.8],[-31.42,-64.18,.35],[-34.9,-56.16,.35],[-25.28,-57.64,.3],[-33.45,-70.67,.6],[-12.05,-77.04,.65],[4.71,-74.07,.7],[6.24,-75.58,.4],[10.49,-66.9,.5],[-.18,-78.47,.4],[-2.19,-79.88,.35],[-16.5,-68.15,.35],[-33.87,151.21,.6],[-37.81,144.96,.55],[-27.47,153.03,.4],[-31.95,115.86,.35],[-34.93,138.6,.3],[-36.85,174.76,.35]],_i=[[35.68,139.69,34.69,135.5,.011,.72],[34.69,135.5,33.59,130.4,.009,.5],[38.9,-77.04,42.36,-71.06,.011,.75],[51.4,7,52.1,5.4,.012,.7],[50.11,8.68,51.4,7,.01,.6],[51.51,-.13,53.48,-2.24,.01,.55],[28.61,77.21,22.57,88.36,.012,.65],[30.04,31.24,24.09,32.9,.007,.6],[30.04,31.24,30.5,30.6,.008,.65],[30.04,31.24,30.6,31.4,.007,.55],[31.23,121.47,32.06,118.8,.01,.7],[22.32,114.17,22.65,114.1,.009,.7],[22.54,114.06,23,113.6,.01,.72],[24.86,67.01,31.55,74.34,.009,.5],[-6.91,107.61,-7.5,110.4,.008,.5],[-7.5,110.4,-7.4,112.2,.008,.5],[-23.55,-46.63,-22.91,-43.17,.009,.55]],vi=new M(`#8b8778`),yi=e=>.022+e*.034;function bi(e){let t=new P().crossVectors(new P(0,1,0),e);return t.lengthSq()<1e-8&&t.set(1,0,0),t.normalize(),{east:t,north:new P().crossVectors(e,t).normalize()}}function xi(e,t,n){let r=K(e,t);if(Zt(r)<.072)return!1;let{east:i,north:a}=bi(r);for(let e=0;e<8;e++){let t=e/8*Math.PI*2;if(Zt(r.clone().addScaledVector(i,Math.cos(t)*n).addScaledVector(a,Math.sin(t)*n).normalize())<.072)return!1}return!0}function Si(e,t,n){let r=yi(n)*.62,i=r*.6,a=r*.78*.6,o=(e,t)=>xi(e,t,i)||xi(e,t,a);if(o(e,t))return[e,t];let s=1/Math.max(.15,Math.cos(e*Math.PI/180));for(let n=.35;n<=7.01;n+=.35)for(let r=0;r<32;r++){let i=r/32*Math.PI*2,a=e+Math.sin(i)*n,c=t+Math.cos(i)*n*s;if(!(Math.abs(a)>84)&&o(a,c))return[a,c]}return[e,t]}var Ci=null;function wi(){return Ci||(Ci=gi.map(([e,t,n])=>{let[r,i]=Si(e,t,n);return[r,i,n]}),Ci)}var Ti=.01;function Ei(e){if(ci(e)<.25)return null;let{east:t,north:n}=bi(e),r=0,i=-1,a=new P,o=new P;for(let s=0;s<8;s++){let c=s/8*Math.PI,l=Math.cos(c)*Ti,u=Math.sin(c)*Ti;a.copy(e).addScaledVector(t,l).addScaledVector(n,u).normalize(),o.copy(e).addScaledVector(t,-l).addScaledVector(n,-u).normalize();let d=ci(a)+ci(o);d>i&&(i=d,r=c)}return t.clone().multiplyScalar(Math.cos(r)).addScaledVector(n,Math.sin(r))}var Di=(e,t,n)=>{let r=K(e,t),i=yi(n),a=.55+n*.45,o=Ei(r);if(o){let e=i*.55,t=r.clone().addScaledVector(o,e).normalize(),n=r.clone().addScaledVector(o,-e).normalize(),s=new P().crossVectors(t,n);if(s.lengthSq()>1e-10)return{a:t,b:n,n:s.normalize(),cosSpan:t.dot(n),radius:i*.85,peak:a}}return{a:r,b:null,n:null,cosSpan:1,radius:i,peak:a}},Oi=null;function ki(){if(Oi)return Oi;let e=wi().map(([e,t,n])=>Di(e,t,n));for(let[t,n,r,i,a,o]of _i){let s=K(t,n),c=K(r,i);e.push({a:s,b:c,n:new P().crossVectors(s,c).normalize(),cosSpan:s.dot(c),radius:a,peak:o})}return Oi=e,e}var Ai=36,ji=72,Mi=()=>{let e=ki(),t=Array.from({length:2592},()=>[]),n=new P,r=.087*Math.SQRT2*.5+.001;for(let i=0;i<Ai;i++){let a=90-(i+.5)*(180/Ai);for(let o=0;o<ji;o++){let s=-180+(o+.5)*(360/ji);n.copy(K(a,s));let c=t[i*ji+o];for(let t=0;t<e.length;t++)Gi(n,e[t])<e[t].radius+r&&c.push(t)}}return t.map(e=>Int32Array.from(e))},Ni=null;function Pi(){return Ni??=Mi(),Ni}var Fi=new M(`#9a8b72`),Ii=.13,Li=3,Ri=()=>{let e=wi(),t=e.map(([e,t])=>K(e,t)),n=[],r=new Set,i=new P,a=(e,t)=>{for(let n=1;n<16;n++)if(i.copy(e).lerp(t,n/16).normalize(),Zt(i)<.072)return!1;return!0};return e.forEach(([,,i],o)=>{let s=[];e.forEach((e,n)=>{if(o===n)return;let r=t[o].angleTo(t[n]);r<Ii&&s.push({j:n,d:r})}),s.sort((e,t)=>e.d-t.d);let c=0;for(let{j:l}of s){if(c>=Li)break;let s=o<l?`${o}:${l}`:`${l}:${o}`;if(r.has(s)){c++;continue}if(!a(t[o],t[l]))continue;r.add(s),c++;let u=e[l][2],d=Math.min(i,u);n.push({a:t[o],b:t[l],n:new P().crossVectors(t[o],t[l]).normalize(),cosSpan:t[o].dot(t[l]),radius:.0042+d*.0026,weight:d})}}),n},zi=null;function Bi(){return zi??=Ri(),zi}var Vi=null;function Hi(){if(Vi)return Vi;let e=Bi(),t=Array.from({length:2592},()=>[]),n=new P,r=.087*Math.SQRT2*.5+.001;for(let i=0;i<Ai;i++){let a=90-(i+.5)*(180/Ai);for(let o=0;o<ji;o++){let s=-180+(o+.5)*(360/ji);n.copy(K(a,s));let c=t[i*ji+o];for(let t=0;t<e.length;t++)Ui(n,e[t])<e[t].radius+r&&c.push(t)}}return Vi=t.map(e=>Int32Array.from(e)),Vi}function Ui(e,t){let n=e.dot(t.n),r=e.x-t.n.x*n,i=e.y-t.n.y*n,a=e.z-t.n.z*n,o=Math.hypot(r,i,a);if(o>1e-9){let e=1/o,s=(r*t.a.x+i*t.a.y+a*t.a.z)*e,c=(r*t.b.x+i*t.b.y+a*t.b.z)*e;if(s>=t.cosSpan&&c>=t.cosSpan)return Math.asin(I.clamp(Math.abs(n),0,1))}return Math.min(e.angleTo(t.a),e.angleTo(t.b))}function Wi(e){let t=Hi()[Ki(e)];if(t.length===0)return 0;let n=Bi(),r=0;for(let i=0;i<t.length;i++){let a=n[t[i]],o=Ui(e,a);if(o>=a.radius)continue;let s=G(1-o/a.radius,0,.65)*(.55+a.weight*.45);s>r&&(r=s)}if(r<=0||J(e).raw<.072)return 0;let i=H(e.x*55+3131,e.y*55+3131,e.z*55+3131,2);return I.clamp(r*(1+i*.5),0,1)}function Gi(e,t){if(!t.b||!t.n)return e.angleTo(t.a);let n=e.dot(t.n),r=e.x-t.n.x*n,i=e.y-t.n.y*n,a=e.z-t.n.z*n,o=Math.hypot(r,i,a);if(o>1e-9){let e=1/o,s=(r*t.a.x+i*t.a.y+a*t.a.z)*e,c=(r*t.b.x+i*t.b.y+a*t.b.z)*e;if(s>=t.cosSpan&&c>=t.cosSpan)return Math.asin(I.clamp(Math.abs(n),0,1))}return Math.min(e.angleTo(t.a),e.angleTo(t.b))}function Ki(e){let t=Math.acos(I.clamp(e.y,-1,1)),n=Math.atan2(e.z,-e.x);n<0&&(n+=Math.PI*2);let r=Math.min(35,Math.floor(t/Math.PI*Ai)),i=Math.min(71,Math.floor(n/(Math.PI*2)*ji));return r*ji+i}function qi(e){return Pi()[Ki(e)]}function Ji(e){let t=qi(e);if(t.length===0)return 0;let n=ki(),r=0;for(let i=0;i<t.length;i++){let a=n[t[i]],o=Gi(e,a);if(o>=a.radius)continue;let s=(1-o/a.radius)**1.9*a.peak;s>r&&(r=s)}if(r<=0||J(e).raw<.072)return 0;let i=H(e.x*70+1212,e.y*70+1212,e.z*70+1212,2);return I.clamp(r*(1+i*1.6),0,1)}function Yi(e,t,n){return`${Math.round(I.lerp(t[0],e[0],n))}, ${Math.round(I.lerp(t[1],e[1],n))}, ${Math.round(I.lerp(t[2],e[2],n))}`}function Xi(e,t,n,r,i,a=1){let o=e.createRadialGradient(t,n,0,t,n,r);o.addColorStop(0,`rgba(${Yi([255,244,214],[222,232,255],a)}, ${i})`),o.addColorStop(.35,`rgba(${Yi([255,206,128],[178,202,255],a)}, ${i*.55})`),o.addColorStop(1,`rgba(${Yi([255,170,80],[150,182,255],a)}, 0)`),e.fillStyle=o,e.beginPath(),e.arc(t,n,r,0,Math.PI*2),e.fill()}var Zi=192,Qi=96,$i=.13,ea=null;function ta(e){return ea??=vn(Zi,Qi,e=>{let t=1;for(let n of ki()){let r=Gi(e,n),i=$i+n.radius*2;if(r>i*2.2)continue;let a=n.peak*Math.exp(-((r/i)**2));t*=1-I.clamp(a,0,.97)}return 1-t}),xn(ea,Zi,Qi,e)}var na=null;function ra(e,t){if(t<.072||Zn(e,t)<.02)return 0;let n=G(t-W,.05,.22);na??=vn(yn,bn,e=>rn[cn(e)]);let r=Sn(na,e),i=ta(e),a=.3+.7*G(V(e,8123,2.2),.3,.62);return r*(.14+.86*i)*(1-n)*a}function ia(e=1024,t=512){let n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`);r.fillStyle=`#000000`,r.fillRect(0,0,e,t),r.globalCompositeOperation=`lighter`;let i=be(60607),a=new P,o=e=>.5+.5*H(e.x*2.4+9001,e.y*2.4+9001,e.z*2.4+9001,2),c=e=>.82+.36*(.5+.5*H(e.x*400+555,e.y*400+555,e.z*400+555,2)),l=e*t*.12;for(let n=0;n<l;n++){let n=i(),s=Math.acos(1-2*i())/Math.PI;qr(n*e,s*t,e,t,a);let c=J(a).raw,l=ra(a,c);l<=0||i()>l*l||Xi(r,n*e,s*t,.9+i()*2,.05+l*.17,o(a))}let u=e/1024,d=(n,i,a)=>{let s=Math.atan2(n.z,-n.x);s<0&&(s+=Math.PI*2);let l=s/(Math.PI*2)*e,d=Math.acos(I.clamp(n.y,-1,1))/Math.PI*t,f=o(n),p=c(n);if(Xi(r,l,d,(2.6+i*4.5)*u,.22*i*a*p,f),Xi(r,l,d,(.9+i*1.4)*u,.8*i*a*p,f),i>.4){let e=Math.round(2+i*4);for(let t=0;t<e;t++){let e=H(n.x*55+t*17.3,n.y*55+t*17.3,n.z*55+t*17.3,2)*Math.PI*2,o=(.5+.5*H(n.x*83+t*31.7,n.y*83+t*31.7,n.z*83+t*31.7,2))*(1.6+i*2.2)*u,s=l+Math.cos(e)*o,c=d+Math.sin(e)*o;Xi(r,s,c,(.45+i*.55)*u,.32*i*a*p,f)}}},f=new P;for(let e of ki()){if(!e.b){d(e.a,(e.peak-.55)/.45,1);continue}let t=Math.acos(I.clamp(e.cosSpan,-1,1)),n=Math.max(2,Math.ceil(t/(e.radius*.6)));for(let t=0;t<=n;t++){f.copy(e.a).lerp(e.b,t/n).normalize();let r=.65+.35*H(f.x*90,f.y*90,f.z*90,2),i=t/n,a=G(Math.min(i,1-i),0,.18);d(f,e.peak*.5,r*.55*(.35+.65*a))}}for(let e of Bi()){let t=Math.acos(I.clamp(e.cosSpan,-1,1)),n=Math.max(2,Math.ceil(t/.006));for(let t=0;t<=n;t++){if(f.copy(e.a).lerp(e.b,t/n).normalize(),Zt(f)<.072)continue;let r=H(f.x*130+55,f.y*130+55,f.z*130+55,2);if(r<-.1)continue;let i=t/n,a=G(Math.min(i,1-i),0,.12);d(f,.1+e.weight*.12,.24*(.4+.6*a)*(.6+r))}}r.globalCompositeOperation=`source-over`;let p=new B(n);return p.colorSpace=s,p.needsUpdate=!0,p}function aa(e=1536,t=768){let n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`),i=r.createImageData(e,t),a=new P,o=new Float32Array(e*t);for(let n=0;n<t;n++)for(let r=0;r<e;r++)o[n*e+r]=J(qr(r,n,e,t,a)).raw;let c=zr(o,e,t),l=e/1536;for(let n=0;n<t;n++)for(let r=0;r<e;r++){qr(r,n,e,t,a);let s=o[n*e+r],u=c[n*e+r],d=u>0?u+_r(a)*220*l:0,f=1-G(Wt(a),.42,.62),p=u>0?Br(a,d,l)*f:0,m=Kr(a,s,p,u>0?Hr(a,d,l):0),h=(n*e+r)*4;mi(i.data,h,m);let g=1-G(s,-.13,W),_=I.lerp(.26,.93,g);i.data[h+3]=Math.round(Math.max(_,p*.96)*255)}r.putImageData(i,0,0);let u=be(31337),d=new P;for(let n=0;n<900;n++){let n=u()*e,i=t*(.1+u()*.8);qr(n,i,e,t,d);let a=H(d.x*9+313,d.y*9+313,d.z*9+313,2);if(u()>a*2.4+.55)continue;let o=1.6+u()*u()*6,s=r.createRadialGradient(n-o*.3,i-o*.3,0,n,i,o);s.addColorStop(0,`rgba(255,255,255,0.3)`),s.addColorStop(.45,`rgba(220,240,255,0.1)`),s.addColorStop(1,`rgba(200,230,255,0)`),r.fillStyle=s,r.beginPath(),r.arc(n,i,o,0,Math.PI*2),r.fill()}let f=new B(n);return f.colorSpace=s,f.anisotropy=4,f.needsUpdate=!0,f}function oa(e=1024,t=512){let n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`),i=r.createImageData(e,t),a=new P;for(let n=0;n<t;n++)for(let r=0;r<e;r++){qr(r,n,e,t,a);let o=Math.sin(a.x*42+a.z*17+a.y*9)*.5+.5,s=H(a.x*30+8,a.y*30+8,a.z*30+8,3),c=.5+(o-.5)*.1+s*.07,l=Math.round(Math.min(Math.max(c,0),1)*255),u=(n*e+r)*4;i.data[u]=l,i.data[u+1]=l,i.data[u+2]=l,i.data[u+3]=255}r.putImageData(i,0,0);let o=new B(n);return o.wrapS=C,o.wrapT=pe,o.anisotropy=4,o.needsUpdate=!0,o}function sa(e=1536,t=768){let n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`),i=r.createImageData(e,t),a=new P;for(let n=0;n<t;n++)for(let r=0;r<e;r++){qr(r,n,e,t,a);let o=J(a).raw,s;if(o<.072)s=.5+H(a.x*90,a.y*90,a.z*90,2)*.08;else{let e=G(o,W,.102),t=H(a.x*45+8,a.y*45+8,a.z*45+8,2),n=H(a.x*140+22,a.y*140+22,a.z*140+22,2);s=.5+(t*.18+n*.11)*e;let r=G(kn(a),.5,.7);if(r>0){let e=H(a.x*4+88,a.y*4+88,a.z*4+88,2),t=Math.sin(a.x*150+a.z*95+a.y*40+e*14)*.5+.5;s=s*(1-r)+(.5+(t-.5)*.34)*r}let i=Tr(a,o);if(i>0){let e=H(a.x*62+41,a.y*62+41,a.z*62+41,3),t=H(a.x*330+91,a.y*330+91,a.z*330+91,2);s=s*(1-i)+(.5+e*.2+t*.16)*i}}let c=Math.round(Math.min(Math.max(s,0),1)*255),l=(n*e+r)*4;i.data[l]=c,i.data[l+1]=c,i.data[l+2]=c,i.data[l+3]=255}r.putImageData(i,0,0);let o=new B(n);return o.anisotropy=4,o.needsUpdate=!0,o}function ca(e,t,n){let r=e.attributes.position,i=new P;for(let e=0;e<r.count;e++){i.fromBufferAttribute(r,e).normalize();let a=dr(Zt(i),i),o=i.multiplyScalar(t+a*n);r.setXYZ(e,o.x,o.y,o.z)}e.computeVertexNormals()}function la(e,t,n){let r=e.attributes.position,i=new P;for(let e=0;e<r.count;e++){i.fromBufferAttribute(r,e).normalize();let a=H(i.x*26+5.5,i.y*26+5.5,i.z*26+5.5,2),o=i.clone().multiplyScalar(t+a*n);r.setXYZ(e,o.x,o.y,o.z)}e.computeVertexNormals()}function ua(e,t){let n=e.attributes.position,r=new P,i=new P,a=.03;for(let e=0;e<n.count;e++){i.fromBufferAttribute(n,e);let o=i.length();r.copy(i).normalize();let s=W-Zt(r);if(s<0||s>=a)continue;let c=(1-s/a)*t,l=r.multiplyScalar(o+c);n.setXYZ(e,l.x,l.y,l.z)}e.computeVertexNormals()}function da(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new R,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=fa(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=fa(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function fa(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new O(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var pa=new Set([`dune`,`butte`,`seaStack`,`iceFloe`,`glacier`,`snowDrift`,`geyser`]),ma=new Set([`conifer`,`cypress`,`redwood`]);function ha(e){let t=J(e).raw,n=W-t;if(n>.045)return null;let r=lr(t),{group:i,coniferous:a}=_n(e);return{dir:e,height:t,elevation:r,temperature:Zn(e,r),snow:Tr(e,t),arid:kn(e),belt:Ot(e),badlands:Gn(e),canopy:dn(e),coniferous:a,group:i,underwater:t<W,shelfDepth:n}}function ga(e,t){let{dir:n,elevation:r,temperature:i,snow:a,belt:o,badlands:s,group:c,underwater:l,shelfDepth:u}=e;if(l)return i<.06?t()<.55*V(n,11)?`iceFloe`:null:i>.62&&u<.02?t()<.5*V(n,23)?`mangrove`:null:o>.2&&u<.03&&t()<.35*V(n,37)?`seaStack`:null;if(a>.5||c===`EF`)return r>.2&&o>.25?t()<.4*V(n,41)?`glacier`:null:t()<.3*V(n,53)?`snowDrift`:null;if(o>.55&&r>.16&&t()<.06*V(n,61))return`geyser`;if(s>.32&&t()<.05*V(n,71))return`butte`;if(r>.15)return t()<.18*V(n,101)?`deadTree`:null;switch(c){case`Af`:case`Am`:return r<.02&&t()<.42*V(n,113)?`palm`:t()>=.55*V(n,127)?null:t()<.3?`bamboo`:`broadleaf`;case`Aw`:return t()>=.5*V(n,163)?null:t()<.85?`acacia`:`deadTree`;case`BW`:return Dn(n)>.56&&r<.07?null:t()<.006*V(n,173)?`butte`:i>.55&&t()<.06*V(n,83)?`cactus`:null;case`BS`:return t()>=.5*V(n,97)?null:i>.6?t()<.35?`cactus`:`desertScrub`:t()<.4?`shrub`:`desertScrub`;case`Cs`:return t()>=.55*V(n,131)?null:t()<.45?`cypress`:`shrub`;case`Cw`:return t()>=.55*V(n,137)?null:t()<.4?`bamboo`:`broadleaf`;case`Cf`:return t()>=.6*V(n,139)?null:t()<.7?`broadleaf`:`shrub`;case`Ds`:{if(t()>=.5*V(n,149))return null;let e=t();return e<.5?`conifer`:e<.85?`shrub`:`deadTree`}case`Dw`:case`Df`:return t()>=.7*V(n,151)?null:t()<.88?`conifer`:`deadTree`;case`ET`:return t()>=.6*V(n,157)?null:t()<.78?`tussock`:`snowDrift`;default:return t()<.35*V(n,173)?`shrub`:null}}var _a=[{species:`baobab`,areas:[[-19,45,.13],[14,-11,.1],[13,3,.1],[12,20,.1]],replaces:[`acacia`,`deadTree`,`desertScrub`,`broadleaf`],takeover:.6,seed:.05},{species:`eucalyptus`,areas:[[-25,134,.33],[-42,147,.05]],replaces:[`broadleaf`,`shrub`,`acacia`,`conifer`,`cypress`],takeover:.7,seed:.03},{species:`sakura`,areas:[[36,138,.1],[33,131,.05],[43,142,.06],[36.5,127.8,.05]],replaces:[`broadleaf`,`shrub`],takeover:.7,seed:.12},{species:`bambooGrove`,areas:[[25,110,.13],[30,104,.08],[34.5,134,.07]],replaces:[`bamboo`,`broadleaf`],takeover:.55,seed:.03},{species:`saguaro`,areas:[[32,-112,.075],[29,-113.5,.05]],replaces:[`cactus`,`desertScrub`,`shrub`],takeover:.85,seed:.2},{species:`redwood`,areas:[[40.5,-123.4,.07],[46,-122.8,.07]],replaces:[`conifer`,`deadTree`,`broadleaf`,`shrub`,`cypress`],takeover:.75,seed:.12}].map(e=>({region:e,circles:e.areas.map(([e,t,n])=>({at:K(e,t),cosOuter:Math.cos(n),cosInner:Math.cos(n*.72)}))}));function va(e,t,n){if(t!==null&&pa.has(t))return t;for(let{region:r,circles:i}of _a){let a=0;for(let t of i){let n=e.dir.dot(t.at);n<=t.cosOuter||(a=Math.max(a,ye(n,t.cosOuter,t.cosInner)))}if(a!==0){if(t!==null){if(!r.replaces.includes(t))continue;return n()<r.takeover*a?r.species:t}if(!e.underwater&&e.snow<=.5&&e.elevation<=.15&&e.badlands<=.28&&e.temperature>=Da&&n()<r.seed*a)return r.species}}return t}function ya(e,t,n,r=6){return new z(e,t,r).translate(0,n+t/2,0)}function ba(e,t,n,r,i=6){return new L(t,e,n,i).translate(0,r+n/2,0)}function xa(e,t){let n=[];switch(e){case`conifer`:n.push(ba(.006,.004,.02,0,5));for(let e=0;e<3;e++){let t=e/3;n.push(ya(.026*(1-t*.55),.038,.016+t*.026,7))}break;case`cypress`:{n.push(ba(.005,.004,.016,0,5));let e=new L(.002,.011,.062,6);e.translate(0,.045,0),n.push(e);break}case`broadleaf`:{n.push(ba(.007,.005,.022,0,5));let e=new T(.03,7,5);U(e,.22,3.5,t()*500),e.scale(1.15,.82,1.15),e.translate(0,.042,0),n.push(e);break}case`acacia`:{let e=ba(.006,.003,.03,0,5);e.rotateZ(.07),n.push(e);let r=new L(.036,.022,.012,8);U(r,.16,5,t()*500),r.translate(0,.034,0),n.push(r);break}case`tussock`:for(let e=0;e<5;e++){let e=new z(.005,.016+t()*.008,4);e.translate(0,.008,0),e.rotateZ((t()-.5)*.8),e.rotateY(t()*Math.PI*2),e.translate((t()-.5)*.02,0,(t()-.5)*.02),n.push(e)}break;case`palm`:{let e=ba(.005,.004,.07,0,5);e.rotateZ(.18),n.push(e);for(let e=0;e<5;e++){let r=new z(.012,.05,4);r.translate(0,.025,0),r.rotateZ(Math.PI*.42),r.rotateY(e/5*Math.PI*2+t()),r.translate(.012,.07,0),n.push(r)}break}case`deadTree`:n.push(ba(.006,.002,.055,0,5));for(let e=0;e<3;e++){let r=new L(.0012,.003,.03,4);r.translate(0,.015,0),r.rotateZ(.7+t()*.5),r.rotateY(t()*Math.PI*2),r.translate(0,.036+e*.008,0),n.push(r)}break;case`bamboo`:for(let e=0;e<6;e++){let e=ba(.0035,.0025,.055+t()*.03,0,4);e.rotateZ((t()-.5)*.22),e.translate((t()-.5)*.026,0,(t()-.5)*.026),n.push(e)}break;case`mangrove`:n.push(ya(.028,.03,.022,7));for(let e=0;e<5;e++){let t=new L(.002,.003,.03,4);t.translate(0,.015,0),t.rotateZ(.5),t.rotateY(e/5*Math.PI*2),n.push(t)}break;case`shrub`:{let e=new y(.024,1);U(e,.3,3,t()*500),e.scale(1.1,.7,1.1),e.translate(0,.014,0),n.push(e);break}case`cactus`:n.push(ba(.008,.007,.06,0,7));for(let e=0;e<2;e++){let t=new L(.005,.005,.028,6);t.translate(0,.014,0),t.rotateZ(e===0?1.2:-1.2),t.translate(0,.034,0),n.push(t);let r=new L(.005,.005,.018,6);r.translate(0,.009,0),r.translate(e===0?.017:-.017,.042,0),n.push(r)}break;case`desertScrub`:for(let e=0;e<4;e++){let e=new z(.004,.022,4);e.translate(0,.011,0),e.rotateZ((t()-.5)*1.1),e.rotateY(t()*Math.PI*2),n.push(e)}break;case`butte`:{let e=new L(.03,.045,.055,7);U(e,.12,8,t()*500),e.translate(0,.02,0),n.push(e);break}case`seaStack`:{let e=new L(.014,.026,.075,6);U(e,.2,7,t()*500),e.translate(0,.03,0),n.push(e);break}case`iceFloe`:{let e=new L(.055,.05,.012,7);U(e,.25,6,t()*500),e.scale(1,1,.7),n.push(e);break}case`glacier`:{let e=new N(.05,.02,.11,2,1,3);U(e,.18,9,t()*500),e.translate(0,.008,0),n.push(e);break}case`snowDrift`:{let e=new T(.045,7,5);U(e,.3,4,t()*500),e.scale(1.3,.4,1),n.push(e);break}case`baobab`:{let e=ba(.017,.009,.044,0,7);n.push(e);let r=new T(.031,8,5);U(r,.26,3.5,t()*500),r.scale(1,.42,1),r.translate(0,.052,0),n.push(r);for(let e=0;e<3;e++){let r=new L(.0035,.005,.022,4);r.translate(0,.011,0),r.rotateZ(.9),r.rotateY(e/3*Math.PI*2+t()),r.translate(0,.042,0),n.push(r)}break}case`eucalyptus`:{let e=ba(.0075,.005,.07,0,6);e.rotateZ(.05),n.push(e);for(let e=0;e<3;e++){let e=new T(.016+t()*.005,6,4);U(e,.3,4,t()*500),e.translate((t()-.5)*.03,.078+t()*.014,(t()-.5)*.03),n.push(e)}break}case`sakura`:{n.push(ba(.006,.004,.016,0,5));let e=new T(.036,8,5);U(e,.24,3.2,t()*500),e.scale(1,.55,1),e.translate(0,.03,0),n.push(e);break}case`bambooGrove`:for(let e=0;e<9;e++){let e=ba(.004,.003,.072+t()*.026,0,4);e.rotateZ((t()-.5)*.16),e.translate((t()-.5)*.02,0,(t()-.5)*.02),n.push(e)}for(let e=0;e<3;e++){let e=new T(.014,6,4);e.scale(1,.7,1),e.translate((t()-.5)*.018,.086+t()*.014,(t()-.5)*.018),n.push(e)}break;case`saguaro`:n.push(ba(.012,.011,.085,0,8));for(let e=0;e<2;e++){let t=e===0?1:-1,r=new L(.01,.01,.03,6);r.rotateZ(Math.PI/2),r.translate(t*.017,.04+e*.012,0),n.push(r);let i=new L(.01,.01,.03,6);i.translate(t*.028,.055+e*.012,0),n.push(i)}break;case`redwood`:n.push(ba(.009,.005,.135,0,6));for(let e=0;e<3;e++){let t=e/3;n.push(ya(.022*(1-t*.5),.05,.06+t*.03,6))}break;case`geyser`:for(let e=0;e<4;e++){let r=new T(.012+e*.004,6,4);r.translate((t()-.5)*.012,.02+e*.022,(t()-.5)*.012),n.push(r)}}let r=da(n,!1);return n.forEach(e=>e.dispose()),r.computeVertexNormals(),r}var Sa=.032;function Ca(e){let t=new P().crossVectors(new P(0,1,0),e);return t.lengthSq()<1e-8&&t.set(1,0,0),t.normalize(),{east:t,north:new P().crossVectors(e,t).normalize()}}function wa(e){return H(e.x*1.6+71,e.y*1.6+71,e.z*1.6+71,2)*Math.PI*2}function Ta(e){let{east:t,north:n}=Ca(e),r=.055,i=new P,a=0;for(let o=0;o<8;o++){let s=o/8*Math.PI*2;i.copy(e).addScaledVector(t,Math.cos(s)*r).addScaledVector(n,Math.sin(s)*r).normalize(),J(i).raw>=.072&&a++}return a/8}function Ea(e,t,n){switch(e){case`conifer`:return n.setHSL(.31,.44,.24,s);case`cypress`:return n.setHSL(.33,.5,.17,s);case`broadleaf`:return n.setHSL(.24,.52,.3,s);case`acacia`:return n.setHSL(.17,.44,.36,s);case`tussock`:return n.setHSL(.13,.28,.38,s);case`dune`:return n.setHSL(.11,.38,.66,s);case`palm`:return n.setHSL(.22,.58,.32,s);case`bamboo`:return n.setHSL(.19,.6,.35,s);case`mangrove`:return n.setHSL(.25,.5,.33,s);case`shrub`:return n.setHSL(.16+t*.06,.5,.35,s);case`deadTree`:return n.setHSL(.08,.1,.55,s);case`cactus`:return n.setHSL(.29,.36,.3,s);case`desertScrub`:return n.setHSL(.11,.22,.3,s);case`butte`:return n.setHSL(.07,.26,.4,s);case`seaStack`:return n.setHSL(.08,.12,.38,s);case`iceFloe`:return n.setHSL(.55,.1,.82,s);case`glacier`:return n.setHSL(.55,.14,.76,s);case`snowDrift`:return n.setHSL(.58,.05,.88,s);case`geyser`:return n.setHSL(.55,.04,.9,s);case`baobab`:return n.setHSL(.09,.16,.5,s);case`eucalyptus`:return n.setHSL(.38,.16,.44,s);case`sakura`:return n.setHSL(.95,.42,.74,s);case`bambooGrove`:return n.setHSL(.2,.62,.42,s);case`saguaro`:return n.setHSL(.3,.34,.27,s);case`redwood`:return n.setHSL(.34,.4,.19,s)}}var Da=.02,Oa=.78,ka=.9;function Aa(e,t){let n=Zn(e,t),r=ye(n,.6,.86),i=1-ye(n,.22,.48),a=.215,o=.56,s=.32;a=I.lerp(a,.195,r),o=I.lerp(o,.66,r),s=I.lerp(s,.36,r),a=I.lerp(a,.3,i),o=I.lerp(o,.38,i),s=I.lerp(s,.2,i);let c=ye(t,.09,.16);return o*=1-c*.35,s*=1-c*.3,{hue:a,saturation:o,lightness:s}}function ja(e,t){let n=new z(.05,.1,t>=2?9:7,3);return n.translate(0,.028,0),U(n,.16,2.6,e()*500),U(n,.08,7,e()*500+300),n.computeVertexNormals(),n}function Ma(e,t){let n=new y(.05,t);return U(n,t>=2?.42:.3,2.4,e()*500),U(n,.13,7,e()*500+300),n.scale(1,.78,1),n.computeVertexNormals(),n}var Y=new o,Na=new P(0,1,0);function Pa(e,t,n,r=0,i=0){Y.position.copy(e);let a=new S().setFromUnitVectors(Na,t),o=new S().setFromAxisAngle(t,n);if(Y.quaternion.copy(o).multiply(a),r!==0){let e=new P(Math.cos(i),0,Math.sin(i)).applyQuaternion(Y.quaternion).normalize(),t=new S().setFromAxisAngle(e,r);Y.quaternion.premultiply(t)}}function Fa(e){let t=e.onBeforeCompile.bind(e);e.onBeforeCompile=(e,n)=>{t(e,n),e.fragmentShader=e.fragmentShader.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
      {
        // pow'd down to 0.5 to widen how far in from the edge this reaches
        // (see main.ts's matching note), rather than just raising the mix
        // strength, on the follow-up "空気遠近法弱くない？" request.
        float aerialRim = pow(1.0 - clamp(dot(normalize(vViewPosition), normalize(normal)), 0.0, 1.0), 1.5);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.62, 0.7, 0.82), pow(aerialRim, 0.5) * 0.55);
      }`)}}function Ia(e,t,n=!1){e.onBeforeCompile=e=>{e.uniforms.uSeasonTilt=t.uSeasonTilt,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying float vSeasonLat;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        // the instance's own placement on the sphere, not the local blade/
        // leaf geometry around it — instanceMatrix's translation column is
        // this instance's ground point, and every one of these materials is
        // only ever drawn via InstancedMesh
        vSeasonLat = normalize((instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz).y;`);let r=n?`0.0`:`1.0`,i=n?`0.35`:`1.0`;e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uSeasonTilt;
varying float vSeasonLat;`).replace(`#include <color_fragment>`,`#include <color_fragment>
        {
          float seasonalFactor = uSeasonTilt * vSeasonLat;
          float fade = clamp(-seasonalFactor, 0.0, 1.0);
          vec3 autumnTint = vec3(0.62, 0.42, 0.12);
          vec3 frostTint = vec3(0.75, 0.8, 0.82);
          vec3 seasoned = mix(diffuseColor.rgb, autumnTint, smoothstep(0.0, 0.55, fade) * ${r});
          seasoned = mix(seasoned, frostTint, smoothstep(0.55, 1.0, fade) * ${i});
          diffuseColor.rgb = mix(diffuseColor.rgb, seasoned, smoothstep(0.15, 0.7, abs(vSeasonLat)));
        }`)}}function La(e,t,n){let r=new A,i=be(515151),a=new xe(.022),o=[],c=.055,l=new xe(c),u=[],d=.034,f=new xe(d),p=[],h=.045,_=h*h,v=new xe(h),b=[],x=new xe(.013),C=[],w=new P;for(let e=0;e<9e5;e++){let e=i()*2-1,t=i()*Math.PI*2,n=Math.sqrt(1-e*e);w.set(n*Math.cos(t),e,n*Math.sin(t));let r=ha(w);if(!r)continue;let s=Math.min(1,Ji(w)*3.4),m=e=>e>0&&i()<e,h=Math.min(1,Wi(w)*1.9),g=Math.min(1,li(w)*1.35),y=Kt(w),S=Math.min(1,ci(w)*2.4),T=va(r,ga(r,i),i);if(T&&!m(s)&&!m(h)&&!m(g)&&!m(y)&&!a.hasNeighborWithin(w,.00048399999999999995)){let e=w.clone();a.add(e),o.push({dir:e,height:r.height,species:T})}if(!r.underwater){if(r.elevation<=.15&&r.temperature>=Da&&r.badlands<=.28){let e=H(w.x*9+77,w.y*9+77,w.z*9+77,2),t=ye(H(w.x*3.5+401,w.y*3.5+401,w.z*3.5+401,2),.33,.44),n=I.smoothstep(r.temperature,.045,.175),a=r.canopy*(1.5+e*1.5)*(.55+t*.75)*n,o=I.smoothstep(r.canopy,.05,.7),d=I.lerp(c,.014,o)/Math.max(.2,n);if(i()<a&&!m(s)&&!m(h)&&!m(g)&&!m(y)&&!l.hasNeighborWithin(w,d*d)){let e=w.clone();l.add(e),u.push({dir:e,height:r.height,coniferous:r.coniferous})}}if(r.elevation<=.16&&r.temperature>=Da&&r.badlands<=ka&&r.arid<=Oa){let e=1-I.clamp(r.canopy,0,1),t=I.lerp(d,.016,I.smoothstep(e,.25,.85));if(i()<e*V(w,199)&&!m(s*.55)&&!m(S)&&!f.hasNeighborWithin(w,t*t)){let e=w.clone();f.add(e),p.push({dir:e,height:r.height})}}if(r.elevation<.15){if(r.temperature>=Da&&r.badlands<=.28&&r.arid<=.52){let e=ye(r.canopy,.06,.28)*(1-ye(r.canopy,.45,.78));if(i()<e*V(w,163)&&!m(s)&&!m(g)&&!m(y)&&!v.hasNeighborWithin(w,_)){let e=w.clone();v.add(e),b.push({dir:e,height:r.height,kind:`tree`})}}}else if(r.snow<=.35&&i()<V(w,179)&&!v.hasNeighborWithin(w,_)){let e=w.clone();v.add(e),b.push({dir:e,height:r.height,kind:`rock`})}if(r.elevation>=.15&&r.snow<=.35&&i()<V(w,191)&&!x.hasNeighborWithin(w,169e-6)){let e=w.clone();x.add(e),C.push({dir:e,height:r.height})}}}let T=new m({color:`#ffffff`,roughness:.93,clearcoat:.18,clearcoatRoughness:.22,envMapIntensity:.22});Ia(T,n),Fa(T);let E=new m({color:`#ffffff`,roughness:.93,clearcoat:.18,clearcoatRoughness:.22,envMapIntensity:.22});Ia(E,n,!0),Fa(E);let D=new m({color:`#ffffff`,roughness:.85,flatShading:!0,clearcoat:.1,clearcoatRoughness:.35,envMapIntensity:.2});Fa(D);let O=new Map;o.forEach(e=>{let t=O.get(e.species);t?t.push(e):O.set(e.species,[e])});let k=new M;O.forEach((n,a)=>{let o=xa(a,i),s=pa.has(a)?D:ma.has(a)?E:T,c=new he(o,s,n.length);n.forEach((n,r)=>{let o=n.species===`iceFloe`||n.species===`mangrove`?e+(W-.015)*t:e+J(n.dir).display*t-.004;Y.position.copy(n.dir).multiplyScalar(o);let s=new S().setFromUnitVectors(Na,n.dir),l=a===`dune`?wa(n.dir)+(i()-.5)*.45:i()*Math.PI*2,u=new S().setFromAxisAngle(n.dir,l);Y.quaternion.copy(u).multiply(s);let d=.6+i()*i()*.85;Y.scale.set(d,d*(.85+i()*.4),d),Y.updateMatrix(),c.setMatrixAt(r,Y.matrix),Ea(a,Zn(n.dir,lr(n.height)),k),k.offsetHSL(0,(i()-.5)*.05,(i()-.5)*.09),c.setColorAt(r,k)}),c.instanceMatrix.needsUpdate=!0,c.instanceColor&&(c.instanceColor.needsUpdate=!0),c.castShadow=!0,c.receiveShadow=!0,r.add(c)});let j=b.filter(e=>e.kind===`tree`),ee=b.filter(e=>e.kind===`rock`),te=.014,ne=new y(.02,1);ne.scale(1,.72,1),ne.translate(0,.025,0);let re=new z(.016,.05,6);re.translate(0,.031,0);let N=da([(()=>{let e=new y(.015,1);return e.translate(-.011,.027,.004),e})(),(()=>{let e=new y(.017,1);return e.translate(.01,.03,-.006),e})()],!1),ie=new L(.004,.006,te,5);ie.translate(0,te/2,0);let ae=new m({color:`#8a5a3a`,roughness:.95,clearcoat:.14,clearcoatRoughness:.3,envMapIntensity:.2});Fa(ae);let oe=new m({color:`#ffffff`,roughness:.9,clearcoat:.18,clearcoatRoughness:.22,envMapIntensity:.22});Ia(oe,n),Fa(oe);let se=new m({color:`#ffffff`,roughness:.9,clearcoat:.18,clearcoatRoughness:.22,envMapIntensity:.22});Ia(se,n,!0),Fa(se);let ce=[{geometry:ne,hue:[.235,.045],material:oe},{geometry:re,hue:[.28,.025],material:se},{geometry:N,hue:[.225,.04],material:oe}],le=ce.map(()=>[]);j.forEach(e=>{let t=Math.abs(e.dir.y),n=i()<.35?2:0;i()<t*.8+.05&&(n=1),le[n].push(e)});let ue=new he(ie,ae,j.length),B=0,de=new M;ce.forEach((n,a)=>{let o=le[a];if(o.length===0)return;let c=new he(n.geometry,n.material,o.length);o.forEach((r,a)=>{let o=e+J(r.dir).display*t,l=r.dir.clone().multiplyScalar(o),u=.42+i()*.45;Pa(l,r.dir,i()*Math.PI*2),Y.scale.setScalar(u),Y.updateMatrix(),ue.setMatrixAt(B++,Y.matrix),c.setMatrixAt(a,Y.matrix),de.setHSL(n.hue[0]+i()*n.hue[1],.48+i()*.14,.26+i()*.12,s),c.setColorAt(a,de)}),c.instanceMatrix.needsUpdate=!0,c.instanceColor&&(c.instanceColor.needsUpdate=!0),r.add(c)}),ue.instanceMatrix.needsUpdate=!0,r.add(ue);let fe=new y(.026,0),pe=new y(.028,0);pe.scale(1.15,.6,1);let me=new m({color:`#ffffff`,roughness:.95,flatShading:!0,clearcoat:.08,clearcoatRoughness:.4,envMapIntensity:.18});Fa(me);let ge=[fe,pe],ve=ge.map(()=>[]);ee.forEach(e=>ve[+(i()<.4)].push(e));let U=new M;ge.forEach((n,a)=>{let o=ve[a];if(o.length===0)return;let c=new he(n,me,o.length);o.forEach((n,r)=>{let a=e+J(n.dir).display*t-.016;Pa(n.dir.clone().multiplyScalar(a),n.dir,i()*Math.PI*2,(i()-.5)*.7,i()*Math.PI*2),Y.scale.set(.5+i()*1,.4+i()*.5,.5+i()*1),Y.updateMatrix(),c.setMatrixAt(r,Y.matrix),U.setHSL(.08+i()*.03,.13+i()*.06,.36+i()*.1,s),c.setColorAt(r,U)}),c.instanceMatrix.needsUpdate=!0,c.instanceColor&&(c.instanceColor.needsUpdate=!0),r.add(c)});let Se=new y(.008,0),Ce=new m({color:`#ffffff`,roughness:.97,flatShading:!0,clearcoat:.06,clearcoatRoughness:.45,envMapIntensity:.16});Fa(Ce);let we=new he(Se,Ce,C.length),Te=new M;C.forEach((n,r)=>{let a=e+J(n.dir).display*t-.004;Pa(n.dir.clone().multiplyScalar(a),n.dir,i()*Math.PI*2,(i()-.5)*.5,i()*Math.PI*2),Y.scale.set(.6+i()*1,.5+i()*.7,.6+i()*1),Y.updateMatrix(),we.setMatrixAt(r,Y.matrix),Te.setHSL(.075+i()*.03,.14+i()*.06,.32+i()*.1,s),we.setColorAt(r,Te)}),we.instanceMatrix.needsUpdate=!0,we.instanceColor&&(we.instanceColor.needsUpdate=!0),r.add(we);let Ee=Array.from({length:3},(e,t)=>t===2?ja(i,1):Ma(i,1)),De=Array.from({length:2},(e,t)=>t===1?ja(i,2):Ma(i,2)),Oe=new m({color:`#ffffff`,roughness:.92,clearcoat:.18,clearcoatRoughness:.22,envMapIntensity:.22});Ia(Oe,n),Fa(Oe);let ke=new m({color:`#ffffff`,roughness:.92,clearcoat:.18,clearcoatRoughness:.22,envMapIntensity:.22});Ia(ke,n,!0),Fa(ke);let Ae=Array.from({length:3},()=>[]),je=Array.from({length:2},()=>[]);u.forEach((e,t)=>{let n=i(),r=.42+n*n*n*1.3,a=r>1?r*(.4+.6*Ta(e.dir)):r,o={point:e,scale:a};a>=1.1?je[+!!e.coniferous].push(o):e.coniferous?Ae[2].push(o):Ae[t%2].push(o)});let Me=new M,Ne=(n,a,o)=>{a.forEach((a,c)=>{if(a.length===0)return;let l=new he(n[c],c===o?ke:Oe,a.length);a.forEach(({point:n,scale:r},a)=>{let o=e+J(n.dir).display*t;Pa(n.dir.clone().multiplyScalar(o),n.dir,i()*Math.PI*2),n.coniferous?Y.scale.set(r*.62,r*.95,r*.62):Y.scale.setScalar(r),Y.updateMatrix(),l.setMatrixAt(a,Y.matrix);let c=Aa(n.dir,lr(n.height));Me.setHSL(c.hue+i()*.03,c.saturation+i()*.12,c.lightness-.05+i()*.22,s);let u=dn(n.dir);if(u>.05){let e=1-ye(r,.55,1.35),t=H(n.dir.x*13+5150,n.dir.y*13+5150,n.dir.z*13+5150,2),i=u*e*(.62+t*.5);Me.multiplyScalar(1-.42*Math.max(i,0))}l.setColorAt(a,Me)}),l.instanceMatrix.needsUpdate=!0,l.instanceColor&&(l.instanceColor.needsUpdate=!0),r.add(l)})};Ne(Ee,Ae,2),Ne(De,je,1);{let n=be(90210),i=Sa*2/e*.86,a=.023,o=new xe(a),s=[],c=e=>{let t=J(e);return t.raw<.072||Dn(e)<=.46||kn(e)<.74?!1:lr(t.raw)<.07},l=new P;for(let e=0;e<9e4;e++){let t=1-2*e/89999,r=Math.sqrt(Math.max(0,1-t*t)),u=e*2.399963229728653;if(l.set(Math.cos(u)*r,t,Math.sin(u)*r),!c(l)||o.hasNeighborWithin(l,a*a))continue;let d=.85+n()*.5,f=[],p=[];for(let e of[1,-1]){let t=l.clone(),n=e>0?p:f;for(let r=0;r<3;r++){let r=wa(t),{east:a,north:o}=Ca(t);if(t.addScaledVector(a,Math.cos(r)*i*d*e).addScaledVector(o,Math.sin(r)*i*d*e).normalize(),!c(t))break;n.push(t.clone())}}let m=[...f.reverse(),l.clone(),...p];if(m.forEach(e=>o.add(e.clone())),m.length<2)continue;let h=[];for(let e=0;e+1<m.length;e++)for(let t=0;t<3;t++)h.push(m[e].clone().lerp(m[e+1],t/3).normalize());h.push(m[m.length-1].clone()),h.length>=9&&s.push({path:h,scale:d})}if(s.length>0){let n=[[-1,0],[-.72,.34],[-.4,.72],[0,1],[.26,.72],[.46,.34],[.55,0]],i=[],a=[],o=[],c=new M,l=new P;s.forEach(({path:r,scale:s})=>{let u=[];r.forEach((o,d)=>{let f=r[Math.min(d+1,r.length-1)],p=r[Math.max(d-1,0)],m=l.copy(f).sub(p),h=o.clone().normalize(),g=new P().crossVectors(h,m).normalize();g.lengthSq()<.5&&g.copy(Ca(h).east);let _=Math.min(9,Math.max(2,r.length*.15)),v=Math.min(1,(d+1)/_,(r.length-d)/_),y=.82+.36*(H(o.x*24+611,o.y*24+611,o.z*24+611,2)+.5),b=e+J(o).display*t-.004,x=[];n.forEach(([e,t])=>{let n=e*.018*s,r=t*.021*s*v*y,l=h.clone().multiplyScalar(b+r).addScaledVector(g,n);x.push(i.length/3),i.push(l.x,l.y,l.z),Ea(`dune`,Zn(o,lr(J(o).raw)),c);let u=e>0?.9:1;a.push(c.r*u,c.g*u,c.b*u)}),u.push(x)});for(let e=0;e+1<u.length;e++){let t=u[e],r=u[e+1];for(let e=0;e+1<n.length;e++)o.push(t[e],r[e],t[e+1]),o.push(t[e+1],r[e],r[e+1])}});let u=new R;u.setAttribute(`position`,new _e(i,3)),u.setAttribute(`color`,new _e(a,3)),u.setIndex(o),u.computeVertexNormals();let d=new F(u,new g({vertexColors:!0,roughness:.92,metalness:.02,flatShading:!1}));d.castShadow=!0,d.receiveShadow=!0,r.add(d)}}let Pe=new z(.012,.026,5);Pe.translate(0,.013,0);let Fe=new m({color:`#ffffff`,roughness:.9,clearcoat:.12,clearcoatRoughness:.3,envMapIntensity:.18});Ia(Fe,n),Fa(Fe);let Ie=new he(Pe,Fe,p.length),Le=new M;return p.forEach((n,r)=>{let a=e+J(n.dir).display*t;Pa(n.dir.clone().multiplyScalar(a),n.dir,i()*Math.PI*2),Y.scale.set(.7+i()*.9,.5+i()*1,.7+i()*.9),Y.updateMatrix(),Ie.setMatrixAt(r,Y.matrix);let o=Aa(n.dir,lr(n.height));Le.setHSL(o.hue+i()*.03,o.saturation*.92+i()*.1,o.lightness*.92+i()*.08,s),Ie.setColorAt(r,Le)}),Ie.instanceMatrix.needsUpdate=!0,Ie.instanceColor&&(Ie.instanceColor.needsUpdate=!0),r.add(Ie),r}function Ra(e){return H(e.x*1.1+150,e.y*1.1+150,e.z*1.1+150,2)}function za(e,t){let n=1-.8*I.smoothstep(Math.abs(t),.62,.93);return I.smoothstep(e/n,.16,.46)}function Ba(e,t){return .35+.8*za(e,t)}var Va={cumulus:{layout:`cluster`,arc:[.05,.095],hoverBase:.16,hoverBulk:.11,sizeBase:.036,sizeBulk:.058,clusterBulk:2,clusterBase:1,flatten:1,haloOpacity:.13,haloScale:1.32,undersideFloor:.52,tipFloor:.42,comb:.34,drawOut:1.85,tuft:.85},stratus:{layout:`band`,arc:[.22,.4],hoverBase:.09,hoverBulk:.03,sizeBase:.05,sizeBulk:.02,clusterBulk:1.1,clusterBase:1,flatten:.45,haloOpacity:.16,haloScale:1.5,undersideFloor:.62,tipFloor:.68,comb:.55,drawOut:2.1,tuft:.6},cirrus:{layout:`band`,arc:[.32,.55],hoverBase:.34,hoverBulk:.06,sizeBase:.018,sizeBulk:.014,clusterBulk:.4,clusterBase:0,flatten:.32,haloOpacity:.06,haloScale:1.6,undersideFloor:.78,tipFloor:.3,comb:.9,drawOut:3,tuft:.75},typhoon:{layout:`band`,arc:[0,0],hoverBase:.13,hoverBulk:.16,sizeBase:.026,sizeBulk:.034,clusterBulk:0,clusterBase:1,flatten:.8,haloOpacity:.12,haloScale:1.3,undersideFloor:.3,tipFloor:1,comb:1,drawOut:2,tuft:0},storm:{layout:`cluster`,arc:[.045,.075],hoverBase:.14,hoverBulk:.2,sizeBase:.05,sizeBulk:.09,clusterBulk:2.6,clusterBase:1,flatten:1.15,haloOpacity:.1,haloScale:1.24,undersideFloor:.22,tipFloor:.5,comb:.2,drawOut:1.5,tuft:.9}};function Ha(e,t){return{...t,lat:no(e),lon:ro(e),live:e.clone(),grain:new P(1,0,0),bearingCos:Math.cos(t.bearing),bearingSin:Math.sin(t.bearing),liveScale:1}}function Ua(e){return e**-.42}function Wa(e,t,n){let r=Math.sqrt(e.x*e.x+e.z*e.z);return r<1e-4?!1:(t.set(e.z/r,0,-e.x/r),n.crossVectors(e,t),!0)}var Ga=new P,Ka=new P;function qa(e,t){return Wa(e,Ga,Ka)?Math.atan2(t.dot(Ga),t.dot(Ka)):0}function Ja(e,t,n,r,i){let a=new P(r()-.5,r()-.5,r()-.5);a.addScaledVector(e,-a.dot(e)).normalize();let o=new P().crossVectors(e,a).normalize(),s=n.arc[0]+r()*(n.arc[1]-n.arc[0]),c=I.clamp(Math.round(s/.028),6,26),l=(r()-.5)*.5,u=new P,d=new P;for(let f=0;f<=c;f++){let p=f/c,m=Math.sin(p*Math.PI),h=(p-.5)*s,g=Math.sin(p*Math.PI*1.3+l*6)*l;u.copy(e).multiplyScalar(Math.cos(h)).addScaledVector(a,Math.sin(h)).addScaledVector(o,g*.35).normalize(),d.copy(e).multiplyScalar(-Math.sin(h)).addScaledVector(a,Math.cos(h)),d.addScaledVector(u,-d.dot(u)).normalize();let _=qa(u,d),v=(1-n.comb)*Math.PI,y=n.tipFloor+(1-n.tipFloor)*m**.55,b=(1-m)*(1-m)*(1-n.tipFloor)*1.6,x=n.clusterBase+Math.floor(m*n.clusterBulk+r()*1),S=.014+m*.03;for(let e=0;e<x;e++){if(r()<b)continue;let s=.72**e,c=(r()-.5)*S*1.3+(e===0?0:(r()<.5?-1:1)*S*e*.85),l=(r()-.5)*.022,d=u.clone().addScaledVector(o,c).addScaledVector(a,l).normalize(),f=.85+r()*r()*1.5,p=1+r()**1.5*(n.drawOut*1.35-1);i.push(Ha(d,{hover:n.hoverBase+m*n.hoverBulk+r()*.022-e*.013,size:(n.sizeBase+m*n.sizeBulk)*y*s*f,bearing:_+(r()-.5)*2*v+(r()<.5?Math.PI:0),sx:p,sy:.92+r()*.34,sz:Ua(p)*(.9+r()*.26),band:t}))}let C=Math.floor(n.tuft+r());for(let e=0;e<C;e++){let e=(r()<.5?-1:1)*S*(1.3+r()*1.5),s=(1-m)*(1-m)*(p<.5?-1:1)*r()*.11,c=(r()-.5)*.04+s,l=u.clone().addScaledVector(o,e).addScaledVector(a,c).normalize(),d=1.35+r()*(n.drawOut*1.2-1.35);i.push(Ha(l,{hover:n.hoverBase+m*n.hoverBulk*.6+r()*.03,size:(n.sizeBase+n.sizeBulk*.3)*(.3+r()*r()*.55),bearing:_+(r()-.5)*v*.5+(r()<.5?Math.PI:0),sx:d,sy:.85+r()*.25,sz:Ua(d)*(.82+r()*.26),band:t}))}}}function Ya(e,t,n,r,i){let a=new P,o=new P;if(!Wa(e,a,o)){let t=Math.abs(e.y)<.9?new P(0,1,0):new P(1,0,0);a.crossVectors(t,e).normalize(),o.crossVectors(e,a).normalize()}let s=n.arc[0]+r()*(n.arc[1]-n.arc[0]),c=n.clusterBase+2+Math.floor(r()*3),l=[];for(let e=0;e<c;e++){let e=r()*Math.PI*2,t=r()**.6*s;l.push({x:Math.cos(e)*t,y:Math.sin(e)*t})}l[0].x*=.25,l[0].y*=.25,l.sort((e,t)=>e.x*e.x+e.y*e.y-(t.x*t.x+t.y*t.y));let u=new P;l.forEach((c,l)=>{let d=Math.sqrt(c.x*c.x+c.y*c.y)/Math.max(s,1e-4),f=.75**l,p=1-d*.6;u.copy(e).addScaledVector(a,c.x).addScaledVector(o,c.y).normalize();let m=1+Math.floor(r()*2);for(let e=0;e<m;e++){let e=.85+r()*r()*1.5,s=1+r()**1.5*(n.drawOut*.75-1),c=u.clone().addScaledVector(a,(r()-.5)*.012).addScaledVector(o,(r()-.5)*.012).normalize();i.push(Ha(c,{hover:n.hoverBase+p*n.hoverBulk+r()*.022,size:(n.sizeBase+p*n.sizeBulk)*f*e*(.75+r()*.4),bearing:r()*Math.PI*2,sx:s,sy:.92+r()*.34,sz:Ua(s)*(.9+r()*.26),band:t}))}});let d=Math.floor(n.tuft*1.2+r());for(let c=0;c<d;c++){let c=r()*Math.PI*2,l=s*(1.05+r()*.55),u=e.clone().addScaledVector(a,Math.cos(c)*l).addScaledVector(o,Math.sin(c)*l).normalize(),d=1.2+r()*Math.max(.1,n.drawOut*.7-1.2);i.push(Ha(u,{hover:n.hoverBase+r()*.03,size:(n.sizeBase+n.sizeBulk*.25)*(.3+r()*r()*.5),bearing:r()*Math.PI*2,sx:d,sy:.85+r()*.25,sz:Ua(d)*(.82+r()*.26),band:t}))}}function Xa(e,t,n){let r=new T(1,12,5);U(r,.46,2.6,e()*500),r.scale(1,.72*t,1),r.computeVertexNormals();let i=r.attributes.position,a=new Float32Array(i.count*3),o=1-n;for(let e=0;e<i.count;e++){let r=n+(I.clamp(i.getY(e)/(.72*t),-1,1)*.5+.5)*o;a[e*3]=r,a[e*3+1]=r,a[e*3+2]=Math.min(1,r*1.04)}return r.setAttribute(`color`,new O(a,3)),r}var Za=.05;function Qa(e){let t=180/Math.PI*Math.abs(e);return t<30?-.85*Za*Math.sin(Math.PI*t/30):t<60?1.35*Za*Math.sin(Math.PI*(t-30)/30):-.6*Za*Math.sin(Math.PI*(t-60)/30)}function $a(e){return Qa(e)/Math.max(Math.cos(e),.22)}function eo(e){let t=180/Math.PI*Math.abs(e);return t<20||t>75?0:.085*Math.sin(Math.PI*(t-20)/55)}var to=Math.PI/2;function no(e){return Math.asin(I.clamp(e.y,-1,1))}function ro(e){return Math.atan2(e.z,-e.x)}function io(e,t,n){let r=Math.cos(e);return n.set(-r*Math.cos(t),Math.sin(e),r*Math.sin(t))}function ao(e){return(e+180)*Math.PI/180}var oo=[{lonDeg:132,hemi:1},{lonDeg:-52,hemi:1},{lonDeg:168,hemi:-1},{lonDeg:63,hemi:-1}],so=.55;function co(e,t){let n=((t/e.period+e.phase)%1+1)%1;return n<so?n/so:-1}function lo(e){return e<0?0:Math.sin(e*Math.PI)**.7}function uo(e,t,n){let r=Math.max(t,0);return io((.21+.38*r**1.7)*e.hemi,e.lon0-.95*r+1.7*r**3,n)}var fo=3.1;function po(e,t,n){let r=Va.typhoon;for(let i=0;i<56;i++){let a=i/56*Math.PI*2,o=e.eye*(1+t()*.16);n.push(mo(e,o,a,1,0,t,r))}for(let i=0;i<5;i++){let a=i/5*Math.PI*2+t()*.3;for(let i=1;i<=40;i++){let o=i/40,s=e.eye*1.1+(e.reach-e.eye*1.1)*o**.9,c=a-e.hemi*fo*Math.log(s/e.eye);if(o>.8&&t()<(o-.8)*2.6)continue;let l=3-Math.floor(o*2);for(let i=0;i<l;i++){let a=Math.abs(i-(l-1)/2);n.push(mo(e,s*(1+((i-(l-1)/2)*.05+(t()-.5)*.03)),c+(t()-.5)*.12,1-o*.6,a,t,r))}}}}function mo(e,t,n,r,i,a,o){let s=1.2+a()*(o.drawOut-1.2),c=Ha(new P(0,1,0),{hover:o.hoverBase+r*o.hoverBulk+a()*.03-i*.012,size:(o.sizeBase+r*o.sizeBulk)*.72**i*(.78+a()*a()*1),bearing:a()<.5?0:Math.PI,sx:s,sy:.9+a()*.3,sz:Ua(s)*(.88+a()*.26),band:e.band});return c.spiral={radius:t,theta:n},c}var ho=`
  // Raw coverage, 0..1, at this point right now — same lookup cloudShade
  // itself uses, pulled out so a caller that wants the coverage number
  // (G38's fresh snow, below) rather than a pre-shaded multiplier does
  // not have to hand-transcribe the lat/lon/drift decode a third time.
  float cloudCoverAt(vec3 objNormal) {
    float lat = asin(clamp(objNormal.y, -1.0, 1.0));
    float v = lat / 3.14159265 + 0.5;
    // green is row-constant: this latitude's drift rate, encoded
    float omega = (texture2D(uCloudShadow, vec2(0.5, v)).g - 0.5) * uOmegaScale;
    float lon = atan(objNormal.z, -objNormal.x);
    // a nodule now at this longitude started at lon - omega*t
    float u = (lon - omega * uCloudTime) / 6.28318530718 + 0.5;
    return texture2D(uCloudShadow, vec2(fract(u), v)).r;
  }

  float cloudShade(vec3 objNormal, float strength) {
    return 1.0 - cloudCoverAt(objNormal) * strength;
  }

  // How wet the ground here is, 0..1.
  //
  // The blue channel of the same map marks the cells that have rain
  // falling out of them, so this is one more fetch of a texture already
  // being sampled and no new state anywhere. Read a little *ahead* of
  // where the cell is now — the lookup is offset against the drift — so
  // the dark patch trails out from under the storm rather than sitting
  // exactly beneath it: ground that has just been rained on, which is
  // what is actually visible from outside. Under the cell itself the
  // shade is doing the work anyway.
  float rainWet(vec3 objNormal) {
    float lat = asin(clamp(objNormal.y, -1.0, 1.0));
    float v = lat / 3.14159265 + 0.5;
    float omega = (texture2D(uCloudShadow, vec2(0.5, v)).g - 0.5) * uOmegaScale;
    float lon = atan(objNormal.z, -objNormal.x);
    float u = (lon - omega * uCloudTime) / 6.28318530718 + 0.5;
    // one and a half cell-widths downwind, in the direction the deck came
    // from — sign carried by omega so it works in both wind belts
    float trail = sign(omega) * 0.022;
    return texture2D(uCloudShadow, vec2(fract(u + trail), v)).b;
  }
`;function go(e,t,n,r,a){let o=new Uint8Array(r*a*4),s=1e-6;for(let e=0;e<a;e++){let t=((e+.5)/a-.5)*Math.PI;s=Math.max(s,Math.abs($a(t)))}let l=s*2;for(let e=0;e<a;e++){let t=((e+.5)/a-.5)*Math.PI,n=Math.round(($a(t)/l+.5)*255);for(let t=0;t<r;t++)o[(e*r+t)*4+1]=n,o[(e*r+t)*4+3]=255}e.forEach(e=>{if(e.spiral)return;let i=t(e),s=e.size*Math.sqrt(e.sx*e.sz)/n,c=(e.lat/Math.PI+.5)*a,l=(e.lon/(Math.PI*2)+.5)*r,u=s/Math.PI*a,d=r/a*u/Math.max(Math.cos(e.lat),.12),f=Math.max(0,Math.floor(c-u)),p=Math.min(a-1,Math.ceil(c+u)),m=Math.floor(l-d),h=Math.ceil(l+d);for(let e=f;e<=p;e++)for(let t=m;t<=h;t++){let n=(t+.5-l)/d,a=(e+.5-c)/u,s=n*n+a*a;if(s>=1)continue;let f=(1-s)*(1-s),p=(t%r+r)%r,m=(e*r+p)*4;o[m]=Math.min(255,o[m]+f*190),i&&(o[m+2]=Math.min(255,o[m+2]+f*210))}});let u=new re(o,r,a,c);return u.wrapS=C,u.wrapT=pe,u.minFilter=i,u.magFilter=i,u.needsUpdate=!0,{texture:u,omegaScale:l}}function _o(e,n,i,a=0){let o=new A,s=be(4242),c=[],l=new P;for(let e of[{loDeg:0,hiDeg:12,slots:9},{loDeg:12,hiDeg:30,slots:9},{loDeg:30,hiDeg:55,slots:8},{loDeg:55,hiDeg:78,slots:4},{loDeg:78,hiDeg:90,slots:2}])for(let t of[1,-1]){let n=0;for(let r=0;r<400&&n<e.slots;r++){let i=Math.sin(e.loDeg*Math.PI/180),a=Math.sin(e.hiDeg*Math.PI/180),o=t*(i+s()*(a-i)),u=s()*Math.PI*2,d=Math.sqrt(Math.max(0,1-o*o));if(l.set(d*Math.cos(u),o,d*Math.sin(u)),Ra(l)<.16)continue;let f=za(Vn(l.y),l.y);if(!(r>260)&&s()>f||c.some(e=>e.dir.dot(l)>.9))continue;let p=Math.abs(l.y),m,h=s();m=p<.35?h<.15+.5*f?`storm`:`cumulus`:p<.72?h<.2+.4*f?`stratus`:`cumulus`:h<.7-.4*f?`cirrus`:`stratus`,c.push({dir:l.clone(),type:m}),n++}}let u=[],d=[];c.forEach((e,t)=>{d.push(e.type);let n=Va[e.type];n.layout===`cluster`?Ya(e.dir,t,n,s,u):Ja(e.dir,t,n,s,u)});let f=[oo[Math.floor(s()*oo.length)]].map(e=>({band:c.length,lon0:ao(e.lonDeg)+(s()-.5)*.3,hemi:e.hemi,period:210+s()*60,phase:s()*.15,eye:.042,reach:.22,spin:.55,intensity:0,nodules:[]}));if(f.forEach(e=>{d[e.band]=`typhoon`,po(e,s,e.nodules),u.push(...e.nodules)}),a>0){let e=new P;for(let t of u)io(t.lat,t.lon,e),t.hover+=J(e).display*a}let p=d.map(()=>s()*Math.PI*2),m=d.map(()=>.06+s()*.05),h=d.map(()=>s()*Math.PI*2),_=Array.from({length:2},()=>Xa(s,1,Va.cumulus.undersideFloor)),v=Xa(s,Va.stratus.flatten,Va.stratus.undersideFloor),y=Xa(s,Va.cirrus.flatten,Va.cirrus.undersideFloor),b=e=>{let t=e.clone(),n=t.attributes.position.count,r=new Float32Array(n*3).fill(.97);return t.setAttribute(`color`,new O(r,3)),t},x=_.map(b),C=b(v),w=b(y),T=new g({color:`#f2f0ee`,vertexColors:!0,roughness:.96,emissive:`#ffffff`,emissiveIntensity:.08,envMapIntensity:.15}),E=new g({color:`#ffffff`,roughness:1,vertexColors:!0,emissive:`#ffffff`,emissiveIntensity:.14,transparent:!0,opacity:.13,depthWrite:!1,envMapIntensity:.1}),D=E.clone();D.opacity=Va.cirrus.haloOpacity;let k=new t,j=new P,ee=new P,te=new P,M=[],ne=(e,t,n,r,i)=>{if(e.length===0)return null;let a=new he(t,n,e.length);return a.castShadow=i,M.push({mesh:a,list:e,sizeScale:r}),o.add(a),a},re=Array.from({length:2},()=>[]),N=[],F=[],ie=new Map,ae=0;u.forEach(e=>{let t=d[e.band];if(t===`storm`||t===`typhoon`){let t=ie.get(e.band)??[];t.push(e),ie.set(e.band,t)}else t===`stratus`?N.push(e):t===`cirrus`?F.push(e):re[ae++%2].push(e)}),re.forEach((e,t)=>{ne(e,_[t],T,1,!0),ne(e,x[t],E,Va.cumulus.haloScale,!1)}),ne(N,v,T,1,!0),ne(N,C,E,Va.stratus.haloScale,!1),ne(F,y,T,1,!1),ne(F,w,D,Va.cirrus.haloScale,!1);let oe=[];ie.forEach((e,t)=>{let n=T.clone();n.emissiveIntensity=.08,ne(e,_[t%2],n,1,!0),ne(e,x[t%2],E,Va.storm.haloScale,!1);let r=d[t]===`typhoon`;oe.push({band:t,coreMaterial:n,nextFlashAt:2+s()*6,flashUntil:0,flashGap:r?.5:3,flashSpread:r?1.6:9})});let R=[];{let e=0;u.forEach(t=>{let n=d[t.band];(n===`storm`||n===`typhoon`)&&e++%5==0&&R.push(t)})}let se=new Float32Array(R.length),z=new Float32Array(R.length),le=new L(.42,1,1,6,1,!0);le.setAttribute(`aStrength`,new r(se,1)),le.setAttribute(`aSunlit`,new r(z,1));let ue=new ce({uniforms:{uTime:{value:0}},transparent:!0,depthWrite:!1,side:2,vertexShader:`
      attribute float aStrength;
      attribute float aSunlit;
      uniform float uTime;
      varying float vStrength;
      varying float vSunlit;
      varying vec2 vFall;
      varying float vY;
      void main() {
        vStrength = aStrength;
        vSunlit = aSunlit;
        // uv.y runs 0 at the bottom of the cone to 1 at the top; uv.x goes
        // round it. The fall is a scroll in y, so the fibres read as
        // moving water rather than as a static cone — kept separate from
        // vY, which has to stay put because it says where on the shaft
        // this fragment is.
        vY = uv.y;
        vFall = vec2(uv.x, uv.y + uTime * 0.55);
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying float vStrength;
      varying float vSunlit;
      varying vec2 vFall;
      varying float vY;
      void main() {
        if (vStrength <= 0.002) discard;
        // Vertical striation. Two frequencies that do not divide into each
        // other, so the veil never resolves into a comb of even stripes —
        // the failure the cloud grain had to be rescued from.
        float streak =
          0.55 +
          0.3 * sin(vFall.x * 44.0 + vFall.y * 9.0) +
          0.15 * sin(vFall.x * 17.0 - vFall.y * 21.0);
        // Attached at the top, gone before the bottom. Rain that arrives
        // at the ground in a hard line reads as a rod holding the cloud
        // up, which is the one thing a globe on a stand cannot afford.
        float fade = smoothstep(0.04, 0.45, vY);
        vec3 rainColor = vec3(0.62, 0.66, 0.72);
        // G41: a rainbow, simplified rather than chasing the real 42-
        // degree antisolar geometry — on a shaft this small that cone
        // would almost never land in the camera's current view, which is
        // exactly the "shipped an effect nobody ever sees" failure
        // gap-analysis §2-21 hit chasing real lightning bolts at this
        // scale. Instead: any sunlit shaft gets a faint spectrum band
        // low in the veil, which is where backlit rain actually shows
        // color from outside — a stylised but always-visible stand-in
        // for the real optics, the same trade this file already makes
        // for the shaft itself (a cone standing in for individual drops).
        float bowBand = smoothstep(0.1, 0.24, vY) * (1.0 - smoothstep(0.3, 0.5, vY)) * vSunlit;
        vec3 spectrum = 0.5 + 0.5 * cos(6.2831 * (vFall.x * 2.0 + vec3(0.0, 0.33, 0.67)));
        rainColor = mix(rainColor, spectrum, bowBand * 0.55);
        gl_FragColor = vec4(rainColor, vStrength * streak * 0.3 * fade);
      }
    `}),B=new he(le,ue,Math.max(1,R.length));B.count=R.length,B.frustumCulled=!1,R.length>0&&o.add(B);let de=new P,fe=new P,pe=new P,me=new P,ge=new P,_e=e=>{f.forEach(t=>{let n=co(t,e);uo(t,n,de),pe.set(0,1,0).addScaledVector(de,-de.y).normalize(),fe.crossVectors(pe,de).normalize(),t.intensity=lo(n),t.nodules.forEach(r=>{let i=r.spiral.radius*(.4+t.intensity*.6),a=t.spin/(.45+i/t.reach)*-t.hemi,o=r.spiral.theta+a*e,s=Math.cos(o),c=Math.sin(o),l=Math.sin(i),u=Math.cos(i);r.live.copy(de).multiplyScalar(u).addScaledVector(pe,l*s).addScaledVector(fe,l*c).normalize();let d=-t.hemi*fo;r.grain.copy(de).multiplyScalar(-l).addScaledVector(pe,u*s-d*c).addScaledVector(fe,u*c+d*s).normalize().multiplyScalar(r.bearingCos),r.liveScale=n<0?0:.6+t.intensity*.4})}),u.forEach(t=>{if(t.spiral)return;let r=t.lon+$a(t.lat)*e,i=t.lat+eo(t.lat)*Math.sin(r*3+e*.05+h[t.band]);io(I.clamp(i,-to,to),r,t.live),Wa(t.live,me,ge)?t.grain.copy(ge).multiplyScalar(t.bearingCos).addScaledVector(me,t.bearingSin):t.grain.set(1,0,0).addScaledVector(t.live,-t.live.x).normalize(),t.liveScale=(1+Math.sin(e*m[t.band]+p[t.band])*.09)*Ba(Un(t.live,n.uSeasonTilt.value),t.live.y)})},ve=new S,ye=new P,V={value:0},H=t=>{V.value=t,_e(t),R.length>0&&(ue.uniforms.uTime.value=t,i&&o.getWorldQuaternion(ve),R.forEach((t,r)=>{let a=Un(t.live,n.uSeasonTilt.value),o=I.smoothstep(a,.3,.72)*Math.min(1,t.liveScale);if(se[r]=o,i){ye.copy(t.live).applyQuaternion(ve);let e=ye.dot(i);z[r]=I.clamp((e-.05)/.2,0,1)}if(o<=.002){k.makeScale(0,0,0),B.setMatrixAt(r,k);return}let s=t.live;ee.copy(s).addScaledVector(t.grain,.4).normalize(),te.crossVectors(ee,t.grain).normalize(),j.crossVectors(te,ee);let c=e+t.hover,l=t.hover,u=t.size*t.liveScale*1.25,d=c-l*.5,f=t.size*t.liveScale*1.15,p=s.x*d+t.grain.x*f,m=s.y*d+t.grain.y*f,h=s.z*d+t.grain.z*f;k.set(te.x*u,ee.x*l,j.x*u,p,te.y*u,ee.y*l,j.y*u,m,te.z*u,ee.z*l,j.z*u,h,0,0,0,1),B.setMatrixAt(r,k)}),B.instanceMatrix.needsUpdate=!0,le.getAttribute(`aStrength`).needsUpdate=!0,i&&(le.getAttribute(`aSunlit`).needsUpdate=!0)),M.forEach(({mesh:t,list:n,sizeScale:r})=>{n.forEach((n,i)=>{let a=n.live,o=n.grain;j.crossVectors(o,a);let s=n.size*r*n.liveScale,c=s*n.sx,l=s*.8*n.sy,u=s*n.sz,d=e+n.hover;k.set(o.x*c,a.x*l,j.x*u,a.x*d,o.y*c,a.y*l,j.y*u,a.y*d,o.z*c,a.z*l,j.z*u,a.z*d,0,0,0,1),t.setMatrixAt(i,k)}),t.instanceMatrix.needsUpdate=!0}),oe.forEach(e=>{if(t>=e.nextFlashAt&&(e.flashUntil=t+.09+s()*.06,e.nextFlashAt=e.flashUntil+e.flashGap+s()*e.flashSpread),t<e.flashUntil){let n=Math.sin((e.flashUntil-t)*90)>0?1:.35;e.coreMaterial.emissiveIntensity=1.4*n}else e.coreMaterial.emissiveIntensity=.08})},{texture:U,omegaScale:xe}=go(u,e=>{let t=d[e.band];return t!==`storm`&&t!==`typhoon`?!1:Un(e.live,0)>.4},e,512,256);return T.onBeforeCompile=e=>{e.uniforms.uCloudShadow={value:U},e.uniforms.uCloudTime=V,e.uniforms.uOmegaScale={value:xe},e.uniforms.uSunDir={value:i??new P(0,1,0)},e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vNoduleDir;
varying vec3 vCloudWorldDir;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        vNoduleDir = normalize(transformed);
        // World-space version of the same direction, the way the globe
        // material's vGlobeNormal is derived from its own local position —
        // this group sits under the same rotating parent as the terrain,
        // so this is directly comparable to uSunDir for a per-nodule
        // "local sun elevation", the same day/night test the ground uses.
        vCloudWorldDir = normalize(mat3(modelMatrix) * transformed);`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform sampler2D uCloudShadow;
uniform float uCloudTime;
uniform float uOmegaScale;
uniform vec3 uSunDir;
varying vec3 vNoduleDir;
varying vec3 vCloudWorldDir;`+ho).replace(`#include <color_fragment>`,`#include <color_fragment>
      diffuseColor.rgb *= cloudShade(vNoduleDir, 0.3);`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
        {
          // Headroom-gated, on request after a reported white-blowout —
          // cotton cloud tops are already close to (1,1,1) before this
          // term runs (coreMaterial's own base colour is #f2f0ee), so an
          // unconditional addition here had nowhere to go but straight
          // through ACES's whitepoint. Scaling by how much headroom the
          // fragment's own albedo still has left (the same technique
          // main.ts's globe/ocean rim terms now use) keeps the rim visible
          // on a shaded/underside fragment while leaving an already-bright
          // sunlit crown alone.
          float underside = 1.0 - clamp(dot(diffuseColor.rgb, vec3(0.333)), 0.0, 1.0);
          float cloudRim = pow(1.0 - clamp(dot(normalize(vViewPosition), normal), 0.0, 1.0), 2.0);
          totalEmissiveRadiance += vec3(1.0, 0.97, 0.9) * cloudRim * 0.22 * underside;

          float cloudSun = dot(vCloudWorldDir, uSunDir);
          float duskBand = smoothstep(0.35, 0.0, abs(cloudSun));
          totalEmissiveRadiance += vec3(1.0, 0.55, 0.22) * duskBand * underside * 0.35;
        }`)},{group:o,tick:H,shadowTexture:U,omegaScale:xe}}var vo=30,yo=11,bo=4,xo=.52,So=.07,Co=.36,wo=1.15;function To(e,t){let n=be(5077),r=3600,i=new Float32Array(r*3),a=new Float32Array(r*3),o=new Float32Array(r*3),s=new Float32Array(r*3),c=new Float32Array(r),l=new Float32Array(r),u=new Float32Array(r),d=new Float32Array(r),f=new Float32Array(r),p=[],m=(90-80.6)*Math.PI/180,h=107.4*Math.PI/180,g=new P(-Math.sin(m)*Math.cos(h),Math.cos(m),Math.sin(m)*Math.sin(h)).normalize(),_=new P,v=new P,y=new P,b=new P,x=new P,S=new P,C=new P,w=new P,T=0;for(let t=0;t<2;t++){_.copy(g).multiplyScalar(t===0?1:-1),v.set(0,0,1).cross(_).normalize(),y.copy(_).cross(v).normalize();for(let t=0;t<vo;t++){let r=n(),m=T,h=Math.PI*2*(t+.5)/vo,g=Math.PI*2/vo*1.22;for(let t=0;t<=yo;t++){let p=t/yo,m=h+(p-.5)*g,E=xo+So*Math.cos(2*m-.9),D=Math.sin(E),O=Math.cos(E);C.copy(v).multiplyScalar(Math.cos(m)).addScaledVector(y,Math.sin(m)),w.copy(v).multiplyScalar(-Math.sin(m)).addScaledVector(y,Math.cos(m)),b.copy(_).multiplyScalar(O).addScaledVector(C,D),x.copy(_).multiplyScalar(-D).addScaledVector(C,O),S.copy(w).multiplyScalar(D*e);let k=n();for(let t=0;t<=bo;t++){let n=t/bo,h=T*3,g=e+Co+.7899999999999999*n;i[h]=b.x*g,i[h+1]=b.y*g,i[h+2]=b.z*g,a[h]=b.x,a[h+1]=b.y,a[h+2]=b.z,o[h]=S.x,o[h+1]=S.y,o[h+2]=S.z,s[h]=x.x,s[h+1]=x.y,s[h+2]=x.z,c[T]=m,l[T]=n,u[T]=p,d[T]=r,f[T]=k,T++}}for(let e=0;e<yo;e++)for(let t=0;t<bo;t++){let n=m+e*5+t,r=n+1,i=n+5,a=i+1;p.push(n,i,r,r,i,a)}}}let E=new R;E.setAttribute(`position`,new O(i,3)),E.setAttribute(`aDir`,new O(a,3)),E.setAttribute(`aTan`,new O(o,3)),E.setAttribute(`aOut`,new O(s,3)),E.setAttribute(`aArc`,new O(c,1)),E.setAttribute(`aUp`,new O(l,1)),E.setAttribute(`aCol`,new O(u,1)),E.setAttribute(`aSeed`,new O(d,1)),E.setAttribute(`aJag`,new O(f,1)),E.setIndex(p);let D={uTime:{value:0},uSunDir:t.uSunDir,uRadius:{value:e},uBase:{value:Co},uTop:{value:wo},uFloorY:{value:-.9},uFloorFade:{value:.35}},k=new ce({uniforms:D,transparent:!0,depthWrite:!1,depthTest:!0,side:2,blending:2,vertexShader:`
      attribute vec3 aDir;
      attribute vec3 aTan;
      attribute vec3 aOut;
      attribute float aArc;
      attribute float aUp;
      attribute float aCol;
      attribute float aSeed;
      attribute float aJag;

      uniform float uTime;
      uniform vec3 uSunDir;
      uniform float uRadius;
      uniform float uBase;
      uniform float uTop;
      uniform float uFloorY;
      uniform float uFloorFade;

      varying vec3 vColor;
      varying float vAlpha;
      varying float vArc;
      varying float vUp;
      varying float vJag;
      varying float vPhase;

      void main() {
        float s = aArc;
        float ph = aSeed * 6.2831;

        // Is this foot on the night side? This is the same soft terminator
        // the city lights and the volcano vents use, so the curtains do not
        // come up a beat before or after the lights beneath them. The globe
        // only rotates, so a mat3 of the model matrix is the whole
        // transform into the room's frame.
        vec3 nWorld = normalize(mat3(modelMatrix) * aDir);
        float night = clamp((0.16 - dot(nWorld, uSunDir)) / 0.28, 0.0, 1.0);

        // The folds. Three harmonics along the band, each drifting at its
        // own rate, so the band never quite repeats while anyone is
        // watching. They total about 0.10 world units of swing ≈ 11 px in
        // plan, which at the limb reads mostly as the sheet turning toward
        // and away from the camera. Tops sway more than feet, which is the
        // difference between a hanging curtain and a corrugated fence.
        float sway = 0.32 + 0.68 * aUp;
        float f =
            sin(s * 9.0 + ph - uTime * 0.33) * 0.055
          + sin(s * 17.0 - uTime * 0.21 + ph * 0.5) * 0.028
          + sin(s * 31.0 + uTime * 0.47) * 0.013;
        // and its exact derivative, which the facing direction below needs
        float df =
            cos(s * 9.0 + ph - uTime * 0.33) * 0.495
          + cos(s * 17.0 - uTime * 0.21 + ph * 0.5) * 0.476
          + cos(s * 31.0 + uTime * 0.47) * 0.403;
        f *= sway;
        df *= sway;

        // The band widens and brightens toward magnetic midnight. That
        // offset is fixed to the sun and the geometry is fixed to the
        // planet, so it cannot be baked; it is done here off the same sun
        // direction. Over the southern band, which is in permanent night,
        // this is close to saturated everywhere — it earns its keep on the
        // northern band, whose lit half is cut away by the night term anyway.
        float midnight = smoothstep(0.15, 0.85, night);

        // Each column stops at its own height, from per-column noise baked
        // at build time: the silhouette is ragged but *fixed* while the
        // folds move, which is what real rays do — they keep their
        // identity and drift rather than boiling.
        float reach = mix(0.58, 1.0, aJag) * (0.85 + 0.30 * midnight);
        float height = uBase + (uTop - uBase) * aUp * reach;

        // 0.16·aUp is the lean of the field line: a dipole's lines arch
        // equatorward as they rise, about 17° from vertical at this
        // magnetic latitude, and a curtain standing perfectly radial
        // instead looks like a fence post.
        vec3 dir = normalize(
          aDir
          + aOut * (f + 0.30 * aUp + 0.05 * midnight)
        );

        vec4 mvPosition = modelViewMatrix * vec4(dir * (uRadius + height), 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Edge-on brightening. A curtain is a sheet of emitting gas, so a
        // line of sight running along the sheet gathers far more of it than
        // one crossing it, and that is why real folds show up as bright
        // vertical creases. The facing direction has to be the one *after*
        // folding, which is why aTan carries the derivative of the band
        // rather than a unit tangent.
        vec3 fold = normalize(aTan + aOut * df);
        vec3 sheetNormal = normalize(normalMatrix * normalize(cross(fold, aDir)));
        vec3 viewDir = normalize(-mvPosition.xyz);
        float grazing = clamp(1.0 / max(abs(dot(sheetNormal, viewDir)), 0.2), 1.0, 2.4);

        // Each sheet fades at its two ends, so that the band reads as a set
        // of overlapping curtains rather than one continuous tube.
        float ends = smoothstep(0.0, 0.16, aCol) * (1.0 - smoothstep(0.84, 1.0, aCol));
        // A surge running along the arc, because an aurora brightens in
        // waves that travel rather than pulsing everywhere at once.
        float surge = 0.42 + 0.85 * pow(max(0.0, sin(s * 2.0 - uTime * 0.25)), 3.0);

        // Only the half of the oval that is *behind* the globe is drawn.
        //
        // This is a composition rule, not a physical one, and it was
        // decided by looking at the frame. The lit pole on this globe is
        // the southern one (§2-12 — the key light is fixed, so the
        // terminator never sweeps), the southern band therefore hangs off
        // the bottom of the sphere, and the bottom of the sphere is where
        // the brass collar and the walnut stand are. Curtains on the near
        // side of that band stand between the camera and the stand, and
        // being additive they painted green light straight across the
        // wood: the globe stopped being an object sitting on a base and
        // became a transparency laid over one. Behind the limb the same
        // curtains read the way an aurora is usually seen from the side —
        // rising off the edge of the planet, with the planet's own
        // silhouette cutting them off. The depth test does the cutting;
        // this fades what the depth test cannot help with.
        float centreZ = (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).z;
        float behind = smoothstep(0.05, -0.35, mvPosition.z - centreZ);

        // ...and it has to stop before it reaches the wood.
        //
        // The behind term hides the curtains in front of the globe. It
        // cannot help
        // with the ones behind it that are also *below* it, and until the
        // globe went up on its axis nothing had to: the sphere sat in a
        // brass collar, so there was no line of sight under it and the far
        // side of the southern band was occluded by solid geometry. Lifting
        // the globe 3cm opened 44px of daylight between the south pole and
        // the top of the pedestal, and the far curtains promptly showed
        // through it — additive, so they did not read as "an aurora seen
        // through a gap" but as a green ribbon lying on the walnut. Which
        // is the same failure §2-29 already fixed once from the other side.
        //
        // The depth test cannot do this one either, because the near half
        // of the pedestal's top face is in front of the curtains and the
        // far half is behind them, so the wood correctly occludes only
        // half of what is wrong. A world-height cutoff does it properly:
        // the fade runs out at -1.25, which is a tenth of a unit below the
        // sphere's own bottom edge at -1.14, so the band is already gone
        // by the time there is any gap for it to be seen through.
        float worldY = (modelMatrix * vec4(dir * (uRadius + height), 1.0)).y;
        float floorFade = smoothstep(uFloorY - uFloorFade, uFloorY, worldY);

        vAlpha = night * ends * surge * grazing * behind * floorFade
          * (0.55 + 0.55 * midnight) * 0.62;

        // Green low — the 557.7 nm oxygen line, the one everybody has
        // actually seen — going violet and then a little crimson high up
        // where the emission thins out.
        vColor = mix(vec3(0.18, 1.0, 0.46), vec3(0.42, 0.34, 1.0),
                     smoothstep(0.22, 0.95, aUp));
        vColor += vec3(1.0, 0.22, 0.30) * smoothstep(0.62, 1.0, aUp) * 0.35;

        vArc = s;
        vUp = aUp;
        vJag = aJag;
        vPhase = ph;
      }
    `,fragmentShader:`
      uniform float uTime;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vArc;
      varying float vUp;
      varying float vJag;
      varying float vPhase;

      void main() {
        // The vertical striations and the bottom-edge gradient are done
        // here rather than in the vertex shader. Both are fine compared
        // with the mesh: the rays repeat 55 times round a band about 690 px
        // in circumference, so 13 px apart against 23 px per curtain and
        // 2 px per column of geometry, and the gradient has only five rows
        // to interpolate over. Evaluated per vertex, the comb becomes a
        // sawtooth and the bright lower edge becomes a wash.
        float rays = 0.58 + 0.42 * sin(vArc * 55.0 + vPhase * 3.0 + uTime * 0.11);

        // Brightest along the bottom edge, with a crisp rim in the lowest
        // sixth. An aurora is lit from the bottom up, because that is where
        // the air is dense enough to be excited; a sheet that is uniform,
        // or brightest in the middle, reads as a decal.
        float bottom = pow(1.0 - vUp, 1.8) * 0.7 + smoothstep(0.16, 0.0, vUp) * 0.45;
        // and it dies out below its own ragged ceiling
        float ceiling = 1.0 - smoothstep(mix(0.30, 0.92, vJag), 1.05, vUp);

        float a = vAlpha * rays * bottom * ceiling;
        if (a <= 0.002) discard;
        gl_FragColor = vec4(vColor, a);
      }
    `}),A=new F(E,k);return A.frustumCulled=!1,A.renderOrder=3,{mesh:A,tick:e=>{D.uTime.value=e}}}var Eo=0,Do=1;function Oo(e,t){let n=new P(0,1,0).cross(e);if(n.lengthSq()<1e-8)return 0;n.normalize();let r=e.clone().cross(n).normalize(),i=new P,a=0,o=0;for(let t of[.03,.06])for(let s=0;s<8;s++){let c=s/8*Math.PI*2;i.copy(e).addScaledVector(n,Math.cos(c)*t).addScaledVector(r,Math.sin(c)*t).normalize(),a+=J(i).display,o++}return a/o-t}function ko(e){let t=new P(0,1,0).cross(e);if(t.lengthSq()<1e-8)return null;t.normalize();let n=e.clone().cross(t).normalize(),r=new P;for(let i of[.015,.03,.045,.06])for(let a=0;a<16;a++){let o=a/16*Math.PI*2;if(r.copy(e).addScaledVector(t,Math.cos(o)*i).addScaledVector(n,Math.sin(o)*i).normalize(),J(r).raw>=.072)return{toLand:r.clone().sub(e).normalize(),distance:i}}return null}function Ao(e,n,i,a){let o=be(4907),s=[],c=new P,l=new P,u=new P,d=new P(0,1,0);function f(t){let r=J(t);if(r.raw<.072||kn(t)>.52-.1||cn(t)===0)return null;let i=Zn(t,r.raw);if(i<.1||i>.62)return null;let a=Oo(t,r.display);if(a<.01)return null;let o=.5*(Un(t,1)+Un(t,-1));if(o<.22)return null;let s=I.smoothstep(a,.01,.045),c=I.smoothstep(o,.22,.55),l=I.smoothstep(i,.66,.3),u=.45+.55*(s*.5+c*.25+l*.25),d=Math.min(a*.45,.02)+.004;return{strength:u,height:e+(r.display+d)*n}}function p(t){if(J(t).raw>=.072)return null;let r=ko(t);if(!r)return null;let i=new P;for(let e of[.12,.24,.36])if(i.copy(t).addScaledVector(r.toLand,-e).normalize(),J(i).raw>=.072)return null;if(l.copy(d).cross(t),l.lengthSq()<1e-8)return null;l.normalize();let a=r.toLand.dot(l),o=Math.abs(Math.asin(I.clamp(t.y,-1,1)))*(180/Math.PI),s=kn(t.clone().addScaledVector(r.toLand,r.distance*1.15).normalize()),c=Zn(t,0),u;if(a>.4&&o>12&&o<42&&s>.5)u=.55+.45*I.smoothstep(s,.5,.72);else if(a<-.4&&o>40&&o<58&&c<.34)u=.5+.5*I.smoothstep(c,.34,.16);else return null;return u*=1-I.smoothstep(r.distance,.03,.075),u<.3?null:{strength:u,height:e+ir*n+.006}}function m(e,t){let n=Math.cos(t===Do?.13:.09);for(let t of s)if(t.dir.dot(e)>n)return!0;return!1}let h=0,g=0;for(;s.length<120&&h<16e4;){h++;let e=o()*2-1,t=o()*Math.PI*2,n=Math.sqrt(Math.max(0,1-e*e));c.set(n*Math.cos(t),e,n*Math.sin(t));let r=J(c).raw>=W,i=r?Eo:Do;if(i===Do&&g>=44)continue;let a=r?f(c):p(c);if(!a||m(c,i))continue;i===Do&&g++;let _=c.clone(),v=null;if(i===Do){let e=ko(_);e&&(v=e.toLand,_=_.clone().addScaledVector(e.toLand,e.distance*.55).normalize())}let y=.5*(Un(_,1)+Un(_,-1)),b=.5*(Un(_,1)-Un(_,-1)),x=Math.asin(I.clamp(_.y,-1,1));l.copy(d).cross(_),l.lengthSq()<1e-8&&l.set(1,0,0),l.normalize(),u.copy(_).cross(l).normalize();let S=v?new ue(v.dot(l),v.dot(u)).normalize():new ue(0,0);s.push({dir:_,kind:i,size:i===Do?.13+o()*.09:.1+o()*.06,strength:a.strength,height:a.height,wet:y,swing:b,lon:Math.atan2(_.z,-_.x)-Math.PI,omega:Qa(x)/Math.max(Math.cos(x),.22),onshore:S})}let _=Math.max(s.length,1),v=[],y=[];v.push(0,0,0);for(let t=1;t<=4;t++){let n=t/4;for(let t=0;t<40;t++){let r=t/40*Math.PI*2;v.push(Math.cos(r)*n,-(n*n)*(.15/(2*e)),Math.sin(r)*n)}}let b=(e,t)=>1+(e-1)*40+t%40;for(let e=0;e<40;e++)y.push(0,b(1,e+1),b(1,e));for(let e=1;e<4;e++)for(let t=0;t<40;t++)y.push(b(e,t),b(e,t+1),b(e+1,t)),y.push(b(e,t+1),b(e+1,t+1),b(e+1,t));let x=new R;x.setAttribute(`position`,new _e(v,3)),x.setIndex(y);let S=new Float32Array(_),C=new Float32Array(_),w=new Float32Array(_),T=new Float32Array(_),E=new Float32Array(_),D=new Float32Array(_),O=new Float32Array(_),k=new Float32Array(_*2),A=new Float32Array(_*16),j=new t;for(let e=0;e<s.length;e++){let t=s[e];l.copy(d).cross(t.dir),l.lengthSq()<1e-8&&l.set(1,0,0),l.normalize(),u.copy(t.dir).cross(l).normalize(),j.makeBasis(l.clone().multiplyScalar(t.size),t.dir.clone().multiplyScalar(t.size),u.clone().multiplyScalar(t.size)),j.setPosition(t.dir.x*t.height,t.dir.y*t.height,t.dir.z*t.height),j.toArray(A,e*16),S[e]=t.strength,C[e]=t.kind,w[e]=o()*100,T[e]=t.wet,E[e]=t.swing,D[e]=t.lon,O[e]=t.omega,k[e*2]=t.onshore.x,k[e*2+1]=t.onshore.y}x.setAttribute(`aStrength`,new r(S,1)),x.setAttribute(`aKind`,new r(C,1)),x.setAttribute(`aSeed`,new r(w,1)),x.setAttribute(`aWet`,new r(T,1)),x.setAttribute(`aSwing`,new r(E,1)),x.setAttribute(`aLon`,new r(D,1)),x.setAttribute(`aOmega`,new r(O,1)),x.setAttribute(`aOnshore`,new r(k,2));let ee={uTime:{value:0},uSeasonTilt:i.uSeasonTilt,uSunDir:{value:a}},te=new ce({uniforms:ee,transparent:!0,depthWrite:!1,side:2,vertexShader:`
      attribute float aStrength;
      attribute float aKind;
      attribute float aSeed;
      attribute float aWet;
      attribute float aSwing;
      attribute float aLon;
      attribute float aOmega;
      attribute vec2 aOnshore;
      uniform float uTime;
      uniform float uSeasonTilt;
      uniform vec3 uSunDir;
      varying vec2 vLocal;
      varying float vAlpha;
      varying float vKind;
      varying float vSeed;
      varying float vLight;

      void main() {
        vLocal = position.xz;
        vKind = aKind;
        vSeed = aSeed;

        // Motion lives here, as it does in every other system on this
        // globe. A sea fog bank does not sit still off its coast: it comes
        // in and it goes back out, and aOnshore is that direction already
        // resolved into this disc's own frame, so every bank on the planet
        // breathes towards its own land without one of them needing a
        // separate rule. 0.3 of a patch radius is about 0.05 units, near
        // enough 5 px of travel — small, but an edge crossing a headland is
        // legible where a whole patch sliding would just look like the mesh
        // moving.
        vec3 local = position;
        float roll = sin(uTime * 0.09 + aSeed) * 0.3;
        local.xz += aOnshore * roll * step(0.5, aKind);

        vec4 world = instanceMatrix * vec4(local, 1.0);
        vec3 worldNormal = normalize(mat3(modelMatrix) * normalize((instanceMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz));
        gl_Position = projectionMatrix * modelViewMatrix * world;

        float sun = dot(worldNormal, uSunDir);

        // Unlit, but not un-darkened. The night side of this globe is very
        // dark, and a fog bank glowing white on it would read as a hole in
        // the planet rather than as weather.
        vLight = 0.16 + 0.84 * smoothstep(-0.18, 0.30, sun);

        // Which side of the terminator this is on. The globe turns about
        // its own +Y under a fixed key light, so a point's velocity is
        // ŷ × p, and a point moving *towards* the sun is one where dawn has
        // just happened or is about to. Without this test the fog would be
        // symmetric about noon and would form at dusk, which is backwards:
        // radiation fog needs a whole night of cooling behind it, so it is
        // a dawn object and not an evening one.
        float morning = smoothstep(-0.25, 0.10, dot(normalize(cross(vec3(0.0, 1.0, 0.0), worldNormal)), uSunDir));

        // VALLEY. Thickens through the second half of the night, stands at
        // sunrise, and burns off within an hour or two of it — which is
        // exactly what anyone who has driven the Central Valley in January
        // has watched happen. The globe turns once in about 42 s, so the
        // whole life of a patch plays out over about 10 s and comes round
        // again.
        float dawn = (1.0 - smoothstep(0.04, 0.34, sun)) * morning;
        // And it is a cold-half-year object at these latitudes. Local
        // winter is where the season tilt and the latitude disagree in
        // sign, the same expression the falling snow uses.
        float winter = clamp(-uSeasonTilt * worldNormal.y, -1.0, 1.0);
        float valley = dawn * (0.55 + 0.45 * winter);

        // SEA. Not a dawn object at all: the Grand Banks and the Namib
        // coast are fogged in at any hour, because the cooling is done by
        // the water and not by the night. What makes it come and go is the
        // passage of air over that cold water, so it is gated on a wave in
        // longitude carried by the shared zonalWind — the same front
        // mechanism the snow uses. Three fronts round the planet, tilted
        // with latitude so they do not read as rings.
        float front = 0.5 + 0.5 * sin(3.0 * (aLon - aOmega * uTime) + 2.2 * worldNormal.y);
        // Rainfall at this instant of the year, finishing
        // precipitationAtSeason off the baked profile. An upwelling coast
        // is bone dry, so this must not be able to switch it off; all it
        // decides is how much of a front's passage the place is open for.
        float wetNow = clamp(aWet + aSwing * uSeasonTilt, 0.0, 1.0);
        float gate = 0.68 - 0.26 * smoothstep(0.05, 0.45, wetNow);
        // ...and the diurnal swing, which after measurement is the *main*
        // switch here rather than a trim on the front.
        //
        // Two measurements drove this. First, gating on the wind alone
        // leaves banks stuck on: zonalWind passes through zero at 0, 30 and
        // 60 degrees, so a bank sitting on one of those latitudes has
        // omega ~ 0, its front never advances, and it is switched on for
        // ever — 36 of 44 sea banks were alive at every instant. Second,
        // the obvious repair, gating it on night, is worse than useless
        // here: vLight below darkens everything on the unlit side to 0.16,
        // so a system that is only on at night is a system that is never
        // seen. This globe's fog has to be a morning object to exist at all.
        //
        // Which is also the true one. The bank lies offshore overnight, it
        // is over the coast at first light, and high sun burns it back to
        // the water — May gray and June gloom. Here lit is the daylight side,
        // burn takes it down under a high sun, and the morning term
        // weights the dawn half of the lit crescent over the dusk half.
        float lit = smoothstep(-0.20, 0.10, sun);
        float burn = 1.0 - 0.75 * smoothstep(0.30, 0.75, sun);
        float sea = (0.30 + 0.70 * smoothstep(gate, gate + 0.22, front))
                  * lit * burn * (0.55 + 0.45 * morning);

        float live = mix(valley, sea, step(0.5, aKind));
        // 0.90 in the middle. Fog hides the ground — that is the whole
        // difference between this and a low cloud — but never completely.
        vAlpha = aStrength * live * 0.90;
      }
    `,fragmentShader:`
      varying vec2 vLocal;
      varying float vAlpha;
      varying float vKind;
      varying float vSeed;
      varying float vLight;
      uniform float uTime;

      void main() {
        if (vAlpha <= 0.004) discard;
        float r = length(vLocal);
        float a = atan(vLocal.y, vLocal.x);
        // The rim, breathing. A circle is the one outline fog never has,
        // and the edge is also the part of a bank that moves most: three
        // low harmonics running at different rates give a boundary that is
        // never twice the same and never resolves into a polygon. Done per
        // fragment against the radius, so it costs no geometry and, more to
        // the point, no second layer — the lesson of the grey ring is that
        // a fringe must not be a separate object.
        float warp = 1.0
          + 0.16 * sin(3.0 * a + vSeed + uTime * 0.22)
          + 0.10 * sin(5.0 * a - vSeed * 1.7 - uTime * 0.15)
          + 0.06 * sin(8.0 * a + vSeed * 0.4 + uTime * 0.31);
        float rr = r / max(warp, 0.4);
        // Flat-topped: solid across the middle half, then out. A Gaussian
        // patch reads as a puff of smoke; fog has a body of definite extent
        // and a fraying edge.
        float body = 1.0 - smoothstep(0.5, 1.0, rr);
        if (body <= 0.003) discard;

        // Sea fog a touch bluer and valley fog a touch warmer — one is lit
        // by cold water under an overcast, the other by a low orange sun.
        // Both stay almost colourless: this is water in air, not paint.
        vec3 tint = mix(vec3(0.965, 0.955, 0.935), vec3(0.925, 0.945, 0.965), step(0.5, vKind));
        gl_FragColor = vec4(tint * vLight, vAlpha * body);
      }
    `}),M=new he(x,te,_);return M.instanceMatrix=new r(A,16),M.instanceMatrix.needsUpdate=!0,M.count=s.length,M.frustumCulled=!1,M.renderOrder=1,{mesh:M,tick:e=>{ee.uTime.value=e}}}function jo(e,t,r){let i=be(9911),a=2600,o=new Float32Array(a*3),s=new Float32Array(a),c=new Float32Array(a),l=new Float32Array(a),u=new Float32Array(a),d=new Float32Array(a),f=new Float32Array(a),p=new Float32Array(a),m=new Float32Array(a),h=new Float32Array(a),g=new P;function _(e){let t=J(e).raw,n=Tr(e,t);if(n>0)return n;let r=Math.abs(e.y);return r<=.84?0:Math.min(1,(r-.84)/.09)*.5}let v=0,y=0;for(;v<a&&y<52e4;){y++;let e=i()*2-1,t=i()*Math.PI*2,n=Math.sqrt(Math.max(0,1-e*e));g.set(n*Math.cos(t),e,n*Math.sin(t));let r=_(g);if(r<=.02||i()>r)continue;let a=v++;o[a*3]=g.x,o[a*3+1]=g.y,o[a*3+2]=g.z,u[a]=r,d[a]=1-Math.min(1,r);let b=Hn(g);f[a]=b.amount,p[a]=b.seasonality*b.summerBias*(g.y>=0?1:-1),m[a]=Math.atan2(g.z,-g.x)-Math.PI;let x=Math.asin(I.clamp(g.y,-1,1));h[a]=Qa(x)/Math.max(Math.cos(x),.22),s[a]=i(),c[a]=.05+i()*.05,l[a]=1+i()*1.5}for(let e=v;e<a;e++)o[e*3+1]=1,s[e]=i(),c[e]=.05,l[e]=1;let b=new R,x=new Float32Array(a*3);for(let t=0;t<a*3;t++)x[t]=o[t]*(e+.1);b.setAttribute(`position`,new O(x,3)),b.setAttribute(`aDir`,new O(o,3)),b.setAttribute(`aPhase`,new O(s,1)),b.setAttribute(`aSpeed`,new O(c,1)),b.setAttribute(`aSize`,new O(l,1)),b.setAttribute(`aSnow`,new O(u,1)),b.setAttribute(`aSeasonal`,new O(d,1)),b.setAttribute(`aWet`,new O(f,1)),b.setAttribute(`aSwing`,new O(p,1)),b.setAttribute(`aLon`,new O(m,1)),b.setAttribute(`aOmega`,new O(h,1));let S={uTime:{value:0},uSeasonTilt:t.uSeasonTilt,uRadius:{value:e},uPixelRatio:{value:r}},C=new ce({uniforms:S,transparent:!0,depthWrite:!1,vertexShader:`
      attribute vec3 aDir;
      attribute float aPhase;
      attribute float aSpeed;
      attribute float aSize;
      attribute float aSnow;
      attribute float aSeasonal;
      attribute float aWet;
      attribute float aSwing;
      attribute float aLon;
      attribute float aOmega;
      uniform float uTime;
      uniform float uSeasonTilt;
      uniform float uRadius;
      uniform float uPixelRatio;
      varying float vAlpha;

      void main() {
        float fall = fract(aPhase + uTime * aSpeed);
        // from just under the cloud deck down to the ground
        float height = mix(0.16, 0.005, fall);

        // Snow does not come straight down. A slow swirl about the axis,
        // plus a small sideways wobble at each flake's own phase, is the
        // difference between falling snow and a descending grid of dots.
        float swirl = uTime * 0.02 + aPhase * 6.2831;
        float wobble = sin(uTime * 1.7 + aPhase * 40.0) * 0.004;
        vec3 axis = vec3(0.0, 1.0, 0.0);
        vec3 tangent = normalize(cross(axis, aDir) + vec3(1e-5));
        vec3 dir = normalize(aDir + tangent * (wobble + sin(swirl) * 0.006));

        vec3 worldish = dir * (uRadius + height);
        vec4 mvPosition = modelViewMatrix * vec4(worldish, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = aSize * uPixelRatio * (60.0 / -mvPosition.z);

        // Where it snows is baked (aSnow, from the terrain's own field).
        // All that is left for the shader is *when*: local winter is where
        // the season tilt and this latitude disagree in sign. A site that
        // is reliably white all year ignores that almost entirely; a
        // marginal one waits for its winter and thaws out of the picture
        // afterwards.
        float winter = clamp(-uSeasonTilt * dir.y, 0.0, 1.0);
        float season = mix(1.0, winter, aSeasonal);
        // fade in as it leaves the cloud and out as it reaches the ground,
        // so flakes neither pop into existence nor pile up as a bright ring
        float ends = smoothstep(0.0, 0.12, fall) * (1.0 - smoothstep(0.82, 1.0, fall));

        // Is it snowing *here, now*. Rainfall at this instant of the year,
        // finishing precipitationAtSeason from the baked profile.
        float wetNow = clamp(aWet * (1.0 + aSwing * uSeasonTilt), 0.0, 1.0);
        // The front: one wave in longitude drifting at this latitude's own
        // wind. The tilt on aDir.y is what stops it reading as a set of
        // rings around the axis — the band crosses a coastline at an angle,
        // the way a front does.
        float front = 0.5 + 0.5 * sin(4.0 * (aLon - aOmega * uTime) + 2.6 * aDir.y);
        // How much of the front's passage this place is open for. Measured
        // over the snow sites the mean rainfall is 0.196 against a planet
        // mean of 0.393 — snow country is dry country — so the edges are
        // set low: at 0.42 a site snows through most of a front, at 0.06 it
        // only catches the crest, and the difference between the two is
        // what makes the snow arrive in one place while it stops in
        // another instead of the whole field pulsing together.
        float openness = smoothstep(0.10, 0.32, wetNow);
        float gate = 0.85 - 0.80 * openness;
        float live = smoothstep(gate, gate + 0.16, front);
        vAlpha = aSnow * season * ends * live * 0.42;
      }
    `,fragmentShader:`
      varying float vAlpha;
      void main() {
        // a round, soft flake rather than the hard square a point defaults to
        vec2 d = gl_PointCoord - vec2(0.5);
        float mask = 1.0 - smoothstep(0.2, 0.5, length(d));
        if (vAlpha <= 0.001 || mask <= 0.001) discard;
        gl_FragColor = vec4(vec3(0.97, 0.98, 1.0), vAlpha * mask);
      }
    `}),w=new n(b,C);return w.frustumCulled=!1,{points:w,tick:e=>{S.uTime.value=e}}}var Mo=260,No=28,Po=90,Fo=null;function Io(e){return Fo?Fo.uSeasonTilt.value:Math.sin(e*Math.PI*2/60)}function Lo(e,t,r,i){let a=be(90210),o=new P,s=[],c=Math.max(1e-6,Math.abs(i(Math.PI/4))),l=Math.cos(.15);for(let e=0;e<24e3&&s.length<No;e++){let e=a()*2-1,t=Math.sqrt(Math.max(0,1-e*e)),n=a()*Math.PI*2;if(o.set(t*Math.cos(n),e,t*Math.sin(n)),J(o).raw<.072)continue;let r=cn(o);if(r<4||r>7||kn(o)<=.52||s.some(e=>e.centre.dot(o)>l))continue;let u=Math.asin(I.clamp(o.y,-1,1));s.push({centre:o.clone(),wind:i(u)/c,schedule:{gap:14,spread:16,duration:9,nextAt:a()*40,startedAt:-1e9}})}let u=s.length*Po,d=new Float32Array(u*3),f=new Float32Array(u*3),p=new Float32Array(u),m=new Float32Array(u),h=new Float32Array(u),g=new Float32Array(u),_=new Float32Array(u),v=new Float32Array(u),y=new Float32Array(u*2),b=0;s.forEach(n=>{let r=J(n.centre).display*t;for(let t=0;t<Po;t++,b++){d[b*3]=n.centre.x*(e+r),d[b*3+1]=n.centre.y*(e+r),d[b*3+2]=n.centre.z*(e+r),f[b*3]=n.centre.x,f[b*3+1]=n.centre.y,f[b*3+2]=n.centre.z,p[b]=r,h[b]=n.wind,g[b]=a(),_[b]=.1+a()*.1,v[b]=(2.6+a()*3.4)*.45;let t=a()*Math.PI*2,i=Math.sqrt(a());y[b*2]=Math.cos(t)*i,y[b*2+1]=Math.sin(t)*i}});let x=new R;x.setAttribute(`position`,new O(d,3)),x.setAttribute(`aOrigin`,new O(f,3)),x.setAttribute(`aGround`,new O(p,1));let S=new O(m,1);S.setUsage(me),x.setAttribute(`aPower`,S),x.setAttribute(`aWind`,new O(h,1)),x.setAttribute(`aPhase`,new O(g,1)),x.setAttribute(`aSpeed`,new O(_,1)),x.setAttribute(`aSize`,new O(v,1)),x.setAttribute(`aJitter`,new O(y,2));let C={uTime:{value:0},uRadius:{value:e},uPixelRatio:{value:r}},w=new ce({uniforms:C,transparent:!0,depthWrite:!1,vertexShader:`
      attribute vec3 aOrigin;
      attribute float aGround;
      attribute float aPower;
      attribute float aWind;
      attribute float aPhase;
      attribute float aSpeed;
      attribute float aSize;
      attribute vec2 aJitter;
      uniform float uTime;
      uniform float uRadius;
      uniform float uPixelRatio;
      varying float vLife;
      varying float vAlpha;

      void main() {
        // There are far too many sites for the one-hot vec4 the eruptions
        // use, and indexing a uniform array by a per-vertex value is the
        // thing that comment warns about, so the storm's strength is an
        // attribute the tick writes — a couple of thousand floats a frame,
        // and only when a strength actually changed.
        float power = aPower;
        float life = fract(aPhase + uTime * aSpeed);
        vLife = life;

        vec3 up = normalize(aOrigin);
        // same handedness note as the ash column: +Z is *decreasing*
        // longitude under this project's convention, so east is -side
        vec3 side = normalize(cross(up, vec3(0.0, 1.0, 0.0)) + vec3(1e-4, 0.0, 0.0));
        vec3 other = cross(up, side);
        vec3 east = -side;

        // Low and quick, where the ash is tall and slow. Dust is lifted by
        // the gust front rather than thrown by a vent, so it reaches its
        // ceiling almost at once and then just spreads along it.
        // Cut to 1/5 scale on request, same as the ash column.
        float rise = (1.0 - pow(1.0 - life, 1.5)) * 0.02 * power;
        float spread = (0.002 + pow(life, 1.2) * 0.011) * power;

        // The whole wall travels downwind — this scales with age, not with
        // height. That is the difference from the ash column, where drift
        // scales with height because shear bends a standing column; a
        // haboob is not standing anywhere, it is the front itself moving.
        // Also cut by 1/5 (0.155 -> 0.031) to match.
        float drift = aWind * life * 0.031 * power;

        float along = spread * (1.0 + abs(aWind) * 1.8);
        float across = spread * (1.0 - abs(aWind) * 0.35);

        vec3 lateral = east * (aJitter.x * along + drift) + other * (aJitter.y * across);
        vec3 pos = normalize(aOrigin + lateral) * (uRadius + aGround + rise + 0.002);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = aSize * (0.6 + life * 1.5) * power * uPixelRatio * (60.0 / -mvPosition.z);
        // held translucent throughout: a dust wall this size on this globe
        // is a stain on the ground, and at full opacity it turns into a
        // second, tan cloud deck
        vAlpha = power * (1.0 - smoothstep(0.35, 1.0, life)) * smoothstep(0.0, 0.08, life) * 0.55;
      }
    `,fragmentShader:`
      varying float vLife;
      varying float vAlpha;
      void main() {
        vec2 d = gl_PointCoord - vec2(0.5);
        float mask = 1.0 - smoothstep(0.12, 0.5, length(d));
        if (vAlpha <= 0.002 || mask <= 0.002) discard;
        // The dense leading edge is the sand the desert is actually made
        // of; what stays behind is the fine pale fraction that hangs. Both
        // are sampled from the desert paint's own family so the storm reads
        // as the ground getting up rather than as a brown cloud arriving.
        vec3 near = vec3(0.62, 0.45, 0.27);
        vec3 haze = vec3(0.80, 0.69, 0.53);
        vec3 color = mix(near, haze, smoothstep(0.05, 0.6, vLife));
        gl_FragColor = vec4(color, vAlpha * mask * 0.7);
      }
    `}),T=new n(x,w);return T.frustumCulled=!1,{points:T,tick:e=>{let t=Io(e),n=!1;for(let r=0;r<s.length;r++){let i=s[r],o=i.schedule;if(e>=o.nextAt){let n=Un(i.centre,t),r=1-I.smoothstep(n,.1,.34),s=.35+.65*(.5+.5*(i.centre.y>=0?t:-t));a()<r*s&&(o.startedAt=e),o.nextAt=e+o.duration+o.gap+a()*o.spread}let c=(e-o.startedAt)/o.duration,l=c<0||c>1?0:Math.min(1,c*5)*(1-c)**.9,u=r*Po;m[u]!==l&&(m.fill(l,u,u+Po),n=!0)}n&&(S.needsUpdate=!0),C.uTime.value=e}}}function Ro(e,t,r,i,a,o){Fo=o??null;let s=new A,c=be(31337),l=St.length*Mo,u=new Float32Array(l*3),d=new Float32Array(l*3),f=new Float32Array(l*4),m=new Float32Array(l),h=new Float32Array(l),g=new Float32Array(l),_=new Float32Array(l*2),v=St.map(n=>{let r=e+J(n.center).display*t;return n.center.clone().multiplyScalar(r)}),y=0;St.forEach((e,t)=>{let n=Array.from({length:6},()=>{let e=c()*Math.PI*2,t=.2+c()*.3;return{x:Math.cos(e)*t,y:Math.sin(e)*t}});for(let r=0;r<Mo;r++,y++){let i=v[t];u[y*3]=i.x,u[y*3+1]=i.y,u[y*3+2]=i.z,d[y*3]=e.center.x,d[y*3+1]=e.center.y,d[y*3+2]=e.center.z,f[y*4+t]=1,m[y]=c(),h[y]=.16+c()*.14,g[y]=(3.2+c()*4.6)*.45;let a=n[r%6],o=c()*Math.PI*2,s=Math.sqrt(c())*.22;_[y*2]=I.clamp(a.x+Math.cos(o)*s,-1,1),_[y*2+1]=I.clamp(a.y+Math.sin(o)*s,-1,1)}});let b=new R;b.setAttribute(`position`,new O(u,3)),b.setAttribute(`aOrigin`,new O(d,3)),b.setAttribute(`aOwner`,new O(f,4)),b.setAttribute(`aPhase`,new O(m,1)),b.setAttribute(`aSpeed`,new O(h,1)),b.setAttribute(`aSize`,new O(g,1)),b.setAttribute(`aJitter`,new O(_,2));let x=new k(.45,.45,.45,.45);if(a){let e=Math.max(1e-6,Math.abs(a(Math.PI/4)));St.forEach((t,n)=>{let r=Math.asin(I.clamp(v[n].clone().normalize().y,-1,1));x.setComponent(n,a(r)/e)})}let C={uTime:{value:0},uIntensity:{value:new k},uRadius:{value:e},uPixelRatio:{value:r},uWind:{value:x}},w=new ce({uniforms:C,transparent:!0,depthWrite:!1,vertexShader:`
      attribute vec3 aOrigin;
      attribute vec4 aOwner;
      attribute float aPhase;
      attribute float aSpeed;
      attribute float aSize;
      attribute vec2 aJitter;
      uniform float uTime;
      uniform vec4 uIntensity;
      uniform vec4 uWind;
      uniform float uRadius;
      uniform float uPixelRatio;
      varying float vLife;
      varying float vAlpha;

      void main() {
        // one dot product instead of indexing a uniform array by a
        // per-vertex value, which not every driver is happy about
        float power = dot(aOwner, uIntensity);
        float life = fract(aPhase + uTime * aSpeed);
        vLife = life;

        vec3 up = normalize(aOrigin);
        // cross(up, +Y) points along the parallel. At up = +X it is +Z, and
        // +Z is *decreasing* longitude under this project's convention
        // (lon = atan2(z,-x)*180/PI - 180), so east is -side. Getting this
        // backwards is invisible on a still frame and obvious the moment
        // the plume is compared with the clouds passing over it.
        vec3 side = normalize(cross(up, vec3(0.0, 1.0, 0.0)) + vec3(1e-4, 0.0, 0.0));
        vec3 other = cross(up, side);
        vec3 east = -side;

        // Rise fast, then slow and spread: the column loses its momentum
        // and the ash flattens out against the top of the troposphere,
        // which is what gives a real eruption its anvil.
        //
        // Both cut hard on request, alongside the smaller sprites and
        // tighter clumps above: even the first cut here (0.012 base spread
        // -> 0.007, 0.42 max rise unchanged) still read from above — which
        // is mostly how this globe is seen — as a round grey dome sitting
        // on the vent, because a column's own *height* barely shows in a
        // near-overhead view. Cutting the footprint (both of these) rather
        // than only the height is what actually shrinks the dome as seen
        // from where it is actually seen.
        // Rise cut hard on request: "the smoke plume is unsatisfying, a
        // small cloud-like puff that streams sideways would read better."
        // A tall anvil column is a texture-book ash eruption, but from the
        // near-overhead angle this globe is mostly seen at, height barely
        // shows — what showed instead was a fat grey dome sitting on the
        // vent. Lowering the rise and leaning harder on downwind streaking
        // (below) turns that dome into something that reads as a small
        // cloud being blown off the summit, which is both more legible at
        // this scale and closer to what the user actually asked for.
        // Cut to 1/5 scale on request (0.12 -> 0.024, 0.005/0.026 ->
        // 0.001/0.0052): the whole plume as a feature on the globe, not
        // just its sprites or its lean.
        float rise = (1.0 - pow(1.0 - life, 2.2)) * 0.024 * power;
        float spread = (0.001 + pow(life, 1.8) * 0.0052) * power;

        // Downwind drift, with shear.
        //
        // This used to be a single hardcoded lean, in one fixed direction,
        // identical at every volcano on the planet — so a cone in the
        // trades leaned the same way as one in the westerlies while the
        // clouds directly above them drifted opposite ways. The wind now
        // comes from the same profile the clouds ride, per volcano.
        //
        // It scales with height rather than with age because that is what
        // shear means: air moves faster the higher you go, so the top of a
        // column is dragged much further than its base, and the column
        // ends up bent rather than tilted. Squaring the height ratio is
        // what turns a straight lean into the hockey-stick profile a real
        // ash column has.
        float wind = dot(aOwner, uWind);
        float heightFrac = rise / max(0.024 * power, 1e-4);
        // heightFrac is a 0..1 ratio, so this constant is itself a
        // world-space distance and gets the same 1/5 cut as rise/spread
        // (0.85 -> 0.17) — otherwise a five-times-smaller column would
        // have kept leaning just as far as the old full-size one and come
        // out looking like a wind-blown streak longer than the plume
        // itself is tall.
        float drift = wind * heightFrac * heightFrac * 0.17 * power;

        // The spread goes with the wind too: a plume in still air puffs out
        // as a circle, one in a wind is drawn out into a streak that is far
        // longer downwind than it is wide. Without this the anvil stayed a
        // round blob that had merely been moved sideways. Widened further
        // (2.6 -> 3.4) to match the flatter, more wind-drawn cloud shape.
        float along = spread * (1.0 + abs(wind) * 3.4);
        float across = spread * (1.0 - abs(wind) * 0.55);

        vec3 lateral = east * (aJitter.x * along + drift) + other * (aJitter.y * across);
        vec3 pos = normalize(aOrigin + lateral) * (uRadius + rise + 0.004);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // ash particles grow as the cloud dissipates. Trimmed on request
        // alongside the tighter spread above, but kept well short of the
        // cut that made the very first pass at this nearly disappear: this
        // system reads as solid smoke through the *overlap* of a few
        // hundred sprites, not through any one sprite's own opacity, so a
        // sprite shrunk too far stops contributing enough coverage for the
        // column to still look like a body of smoke rather than a haze.
        gl_PointSize = aSize * (0.5 + life * 1.0) * power * uPixelRatio * (60.0 / -mvPosition.z);
        vAlpha = power * (1.0 - smoothstep(0.45, 1.0, life)) * smoothstep(0.0, 0.05, life);
      }
    `,fragmentShader:`
      varying float vLife;
      varying float vAlpha;
      void main() {
        vec2 d = gl_PointCoord - vec2(0.5);
        // A tight core: the wide, gentle falloff the very first version of
        // this had was most of what made overlapping sprites melt into one
        // grey fog instead of reading as a body of smoke with an edge.
        float mask = 1.0 - smoothstep(0.24, 0.46, length(d));
        if (vAlpha <= 0.002 || mask <= 0.002) discard;
        // incandescent at the vent, cooling within the first fraction of
        // the climb to a pale grey — lightened from a dark sooty ash
        // (0.34/0.31/0.30) toward something that reads as a small cloud
        // being blown off the summit rather than a chimney's smoke, to
        // match the shape change above.
        vec3 hot = vec3(1.0, 0.55, 0.17);
        vec3 ash = vec3(0.62, 0.60, 0.58);
        vec3 color = mix(hot, ash, smoothstep(0.0, 0.16, vLife));
        // Raised from 0.75, alongside the trim above: the streak/flow shape
        // this is meant to read as needs its sprites to actually cover the
        // pixels they sit on rather than half-showing the ocean through
        // them — a plume that is mostly see-through does not look "too
        // big", it looks like it is not there at all, which is worse.
        gl_FragColor = vec4(color, vAlpha * mask * 0.9);
      }
    `}),E=new n(b,w);E.frustumCulled=!1,s.add(E);let D=[],j=[];St.forEach((e,t)=>{let n=new p({color:`#ff7a24`,transparent:!0,opacity:0,depthWrite:!1});D.push(n);let r=new F(new T(.05,10,8),n);r.position.copy(v[t]).multiplyScalar(1.001),r.frustumCulled=!1,j.push(r),s.add(r)});let ee=new P,te=new S,M=e=>{if(!i)return 0;s.getWorldQuaternion(te),ee.copy(v[e]).normalize().applyQuaternion(te);let t=ee.dot(i);return I.clamp((.16-t)/.28,0,1)},ne=St.map(e=>e.active?{gap:55,spread:40,duration:8,nextAt:8+c()*40,startedAt:-1e9}:{gap:70,spread:60,duration:8,nextAt:30+c()*60,startedAt:-1e9}),re=C.uIntensity.value,N=Lo(e,t,r,a??Qa);return s.add(N.points),{group:s,tick:e=>{N.tick(e);for(let t=0;t<ne.length;t++){let n=ne[t];e>=n.nextAt&&(n.startedAt=e,n.nextAt=e+n.duration+n.gap+c()*n.spread);let r=(e-n.startedAt)/n.duration,i=r<0||r>1?0:Math.min(1,r*6)*(1-r)**.7;re.setComponent(t,i);let a=M(t);D[t].opacity=Math.min(1,i*1.6*(.7+.75*a)),j[t].scale.setScalar(1+a*.55)}C.uTime.value=e}}}var zo=new P(0,1,0),Bo=5/3,Vo=1;function Ho(e,t){let n=e.clone().normalize(),r=t.clone().addScaledVector(n,-t.dot(n));return r.lengthSq()<1e-8&&r.copy(Math.abs(n.y)<.9?zo:new P(1,0,0)).addScaledVector(n,-n.y),[n,r.normalize()]}function Uo(e,t,n,r){return r.copy(e).multiplyScalar(Math.cos(n)).addScaledVector(t,Math.sin(n))}function Wo(e,t,n){let r=t.clone().normalize(),i=n.clone().addScaledVector(r,-n.dot(r)).normalize(),a=new P().crossVectors(r,i);e.matrix.makeBasis(a,r,i),e.quaternion.setFromRotationMatrix(e.matrix)}function Go(){let e=new A,t=new g({color:`#d8d2c4`,roughness:.45,metalness:.5,emissive:`#3a2a10`,emissiveIntensity:.4}),n=new F(new N(.032,.03,.045),t);e.add(n);let r=new g({color:`#1b2f6b`,roughness:.25,metalness:.7,emissive:`#0a1330`,emissiveIntensity:.6,side:2});[-1,1].forEach(t=>{let n=new F(new N(.07,.003,.036),r);n.position.x=t*.052,e.add(n)});let i=new F(new T(.014,10,6,0,Math.PI*2,0,Math.PI*.45),t);return i.rotation.x=Math.PI,i.position.y=-.022,e.add(i),e}function Ko(e){let t=new A,n=be(778),r=Go(),i=[];for(let e=0;e<5;e++){let e=r.clone();e.scale.setScalar(Vo),t.add(e);let a=new P(n()-.5,n()-.5,n()-.5).normalize(),o=Math.abs(a.y)<.9?zo:new P(1,0,0),s=new P().crossVectors(a,o).normalize(),c=new P().crossVectors(a,s).normalize(),l=.52+n()*.55;i.push({object:e,u:s,v:c,height:l,omega:(.16+n()*.05)/(1+l)**1.5*2.2*(n()<.5?1:-1),phase:n()*Math.PI*2})}let a=new P,o=new P;return{group:t,tick:t=>{i.forEach(n=>{let r=n.phase+t*n.omega;Uo(n.u,n.v,r,a),Uo(n.u,n.v,r+.01*Math.sign(n.omega),o),n.object.position.copy(a).multiplyScalar(e+n.height),Wo(n.object,a,o.sub(a))})}}}var qo=[[`羽田 → ホノルル`,[35.55,139.78],[21.32,-157.92]],[`ロンドン → ニューヨーク`,[51.47,-.45],[40.64,-73.78]],[`ドバイ → シンガポール`,[25.25,55.36],[1.36,103.99]],[`パリ → サンパウロ`,[49.01,2.55],[-23.43,-46.47]],[`シドニー → ロサンゼルス`,[-33.94,151.18],[33.94,-118.41]],[`北京 → モスクワ`,[40.08,116.58],[55.97,37.41]]];function Jo(){let e=new A,t=new g({color:`#eef1f4`,roughness:.35,metalness:.35,emissive:`#ffffff`,emissiveIntensity:.25,transparent:!0}),n=new F(new j(.006,.036,3,8),t);n.rotation.x=Math.PI/2,e.add(n);let r=new F(new N(.062,.0025,.012),t);r.rotation.y=-.22,e.add(r);let i=new F(new N(.026,.002,.008),t);i.position.z=-.021,e.add(i);let a=new F(new N(.002,.012,.01),t);return a.position.set(0,.006,-.021),e.add(a),e}function Yo(e){let t=new A,n=be(2024),r=.115,i=[];qo.forEach(([,e,r],o)=>{let s=K(e[0],e[1]),c=K(r[0],r[1]),[l,u]=Ho(s,c),d=s.angleTo(c),f=Jo();f.scale.setScalar(Bo),t.add(f);let p=new Float32Array(126),m=new Float32Array(42),h=new R;h.setAttribute(`position`,new O(p,3)),h.setAttribute(`aAlpha`,new O(m,1));let g=new ce({transparent:!0,depthWrite:!1,vertexShader:`
        attribute float aAlpha;
        varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(vec3(1.0), vAlpha * 0.5);
        }
      `}),_=new a(h,g);_.frustumCulled=!1,t.add(_),i.push({object:f,u:l,v:u,span:d,duration:26+n()*16,phase:n(),trail:_,trailPositions:p,trailAlpha:m,material:f.children[0].material})});let o=new P,s=new P,c=e=>e<0||e>1?0:Math.sin(Math.min(1,Math.max(0,e))*Math.PI)**.35*r;return{group:t,tick:t=>{i.forEach(n=>{let i=((t/n.duration+n.phase)%1+1)%1;Uo(n.u,n.v,i*n.span,o),Uo(n.u,n.v,(i+.004)*n.span,s);let a=c(i);n.object.position.copy(o).multiplyScalar(e+a),Wo(n.object,o,s.sub(o));let l=Math.min(1,i*14)*Math.min(1,(1-i)*14);n.object.scale.setScalar(Bo*(.6+l*.4)),n.material.opacity=l;for(let t=0;t<42;t++){let a=i-t/41*.16,s=Math.max(0,a);Uo(n.u,n.v,s*n.span,o),o.multiplyScalar(e+c(s)-.002),n.trailPositions[t*3]=o.x,n.trailPositions[t*3+1]=o.y,n.trailPositions[t*3+2]=o.z;let u=1-t/41;n.trailAlpha[t]=a<0?0:u*l*Math.min(1,c(s)/(r*.6))}n.trail.geometry.attributes.position.needsUpdate=!0,n.trail.geometry.attributes.aAlpha.needsUpdate=!0})}}}var Xo=[[`上海`,31.23,121.5],[`シンガポール`,1.26,103.83],[`ロッテルダム`,51.95,4.14],[`ハンブルク`,53.54,9.97],[`ロサンゼルス`,33.73,-118.26],[`ニューヨーク`,40.67,-74.04],[`サントス`,-23.98,-46.3],[`ダーバン`,-29.87,31.03],[`ケープタウン`,-33.91,18.42],[`シドニー`,-33.86,151.2],[`ジェベル・アリ`,25.01,55.06],[`ムンバイ`,18.94,72.84],[`コロン`,9.36,-79.9],[`ポートサイド`,31.25,32.3],[`バルパライソ`,-33.03,-71.63],[`横浜`,35.45,139.65],[`バンクーバー`,49.29,-123.11],[`ラゴス`,6.44,3.4]];function Zo(){let e=new A,t=new g({color:`#8a2f28`,roughness:.6,metalness:.15}),n=new F(new N(.018,.009,.05),t);e.add(n);let r=new F(new z(.009,.022,4),t);r.rotation.x=Math.PI/2,r.rotation.z=Math.PI/4,r.position.z=.033,e.add(r);let i=new g({color:`#e8e4dc`,roughness:.5,emissive:`#ffcf95`,emissiveIntensity:0}),a=new F(new N(.014,.012,.016),i);a.position.set(0,.01,-.014),e.add(a);let o=new g({color:`#3f6f8c`,roughness:.7}),s=new F(new N(.015,.009,.03),o);return s.position.set(0,.009,.008),e.add(s),{ship:e,runningLights:i}}function Qo(e,t,n){let r=new A,i=be(5150),o=fr(e,t),s=e=>J(e).raw<W,c=[],l=.02,u=new P,d=.05,f=[],p=Xo.map(([,e,t])=>K(e,t));for(let e=0;e<Xo.length;e++)for(let t=e+1;t<Xo.length;t++){let n=p[e].angleTo(p[t]);if(n<.35||n>2.7)continue;let[r,i]=Ho(p[e],p[t]),a=0;for(;a<d&&(Uo(r,i,a,u),!s(u));)a+=l;let o=n;for(;n-o<d&&(Uo(r,i,o,u),!s(u));)o-=l;if(o-a<.3)continue;let c=!0;for(let e=a;e<=o&&c;e+=l)Uo(r,i,e,u),(!s(u)||Math.abs(u.y)>.85)&&(c=!1);c&&f.push({u:r,v:i,start:a,span:o-a,a:e,b:t})}let m=Array(Xo.length).fill(0),h=f.map(e=>({c:e,k:i()+e.span*.35}));h.sort((e,t)=>t.k-e.k);for(let{c:e}of h){if(c.length>=7)break;if(m[e.a]>=3||m[e.b]>=3)continue;m[e.a]++,m[e.b]++;let{u:t,v:n,start:o,span:s}=e,{ship:l,runningLights:u}=Zo();l.scale.setScalar(Bo),r.add(l);let d=new Float32Array(78),f=new Float32Array(26),p=new R;p.setAttribute(`position`,new O(d,3)),p.setAttribute(`aAlpha`,new O(f,1));let h=new a(p,new ce({transparent:!0,depthWrite:!1,vertexShader:`
          attribute float aAlpha;
          varying float vAlpha;
          void main() {
            vAlpha = aAlpha;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          varying float vAlpha;
          void main() {
            gl_FragColor = vec4(vec3(0.92, 0.97, 1.0), vAlpha * 0.55);
          }
        `}));h.frustumCulled=!1,r.add(h),c.push({object:l,runningLights:u,u:t,v:n,start:o,span:s,duration:90+i()*60,phase:i(),wake:h,wakePositions:d,wakeAlpha:f})}let g=new P,_=new P,v=new S,y=new P;return{group:r,tick:e=>{n&&r.getWorldQuaternion(v),c.forEach(t=>{let r=((e/t.duration+t.phase)%1+1)%1,i=r<.5,a=i?r*2:(1-r)*2,s=i?1:-1;if(Uo(t.u,t.v,t.start+a*t.span,g),Uo(t.u,t.v,t.start+(a+.004*s)*t.span,_),t.object.position.copy(g).multiplyScalar(o+.006),Wo(t.object,g,_.sub(g)),n){y.copy(g).applyQuaternion(v);let e=y.dot(n),r=I.clamp((.16-e)/.28,0,1);t.runningLights.emissiveIntensity=r*1.1}for(let e=0;e<t.wakeAlpha.length;e++){let n=a-s*(e/(t.wakeAlpha.length-1))*.09,r=Math.min(1,Math.max(0,n));Uo(t.u,t.v,t.start+r*t.span,g),g.multiplyScalar(o+.0015),t.wakePositions[e*3]=g.x,t.wakePositions[e*3+1]=g.y,t.wakePositions[e*3+2]=g.z,t.wakeAlpha[e]=(1-e/(t.wakeAlpha.length-1))**1.5}t.wake.geometry.attributes.position.needsUpdate=!0,t.wake.geometry.attributes.aAlpha.needsUpdate=!0})}}}var $o=(e,t,n,r,i)=>({geometry:new N(e,t,n).translate(0,r+t/2,0),material:i}),es=(e,t,n,r,i,a)=>({geometry:new L(t,e,n,i).translate(0,r+n/2,0),material:a}),ts=(e,t,n,r,i)=>({geometry:new z(e,t,r).translate(0,n+t/2,0),material:i}),ns=(e,t,n)=>({geometry:new T(e,12,8,0,Math.PI*2,0,Math.PI/2).translate(0,t,0),material:n});function rs(e,t,n){let r=[es(.02,.009,e*.32,0,4,t),es(.009,.0045,e*.42,e*.32,4,t)];return r.push($o(.016,.005,.016,e*.42,t)),n?r.push(es(.0025,8e-4,e*.26,e*.74,4,t)):r.push(es(.004,.001,e*.26,e*.74,4,t)),r}var is=[{name:`東京タワー`,lat:35.6586,lon:139.7454,build:()=>rs(.1,`steel`,!0)},{name:`エッフェル塔`,lat:48.8584,lon:2.2945,build:()=>rs(.095,`roof`,!1)},{name:`ギザの大ピラミッド`,lat:29.9792,lon:31.1342,build:()=>[{geometry:new z(.034,.036,4).translate(0,.018,0),material:`stone`},{geometry:new z(.026,.028,4).translate(.05,.014,.03),material:`stone`},{geometry:new z(.016,.018,4).translate(.085,.009,.05),material:`stone`}]},{name:`自由の女神`,lat:40.6892,lon:-74.0445,build:()=>[$o(.03,.03,.03,0,`stone`),es(.014,.007,.05,.03,10,`copper`),{geometry:new T(.006,8,6).translate(0,.086,0),material:`copper`},{geometry:new N(.004,.03,.004).translate(.011,.092,0),material:`copper`},{geometry:new z(.006,.012,6).translate(.011,.112,0),material:`copper`}]},{name:`ビッグ・ベン`,lat:51.5007,lon:-.1246,build:()=>[es(.014,.011,.07,0,4,`stone`),$o(.017,.014,.017,.07,`stone`),ts(.013,.03,.084,4,`roof`)]},{name:`コロッセオ`,lat:41.8902,lon:12.4922,build:()=>[{geometry:new L(.03,.032,.026,24,1,!0).translate(0,.013,0),material:`stone`},{geometry:new L(.03,.032,.014,24,1,!0).translate(0,.033,0),material:`stone`},{geometry:new L(.024,.024,.004,20).translate(0,.002,0),material:`stone`}]},{name:`タージ・マハル`,lat:27.1751,lon:78.0421,build:()=>{let e=[$o(.05,.006,.05,0,`stone`),$o(.034,.022,.034,.006,`stone`),ns(.017,.028,`stone`),{geometry:new z(.003,.01,6).translate(0,.05,0),material:`roof`}];return[-1,1].forEach(t=>[-1,1].forEach(n=>{e.push({geometry:new L(.003,.004,.038,8).translate(t*.022,.025,n*.022),material:`stone`})})),e}},{name:`シドニー・オペラハウス`,lat:-33.8568,lon:151.2153,build:()=>{let e=[$o(.06,.006,.04,0,`stone`)];return[0,1,2].forEach(t=>{let n=.024-t*.005,r=new T(n,12,8,0,Math.PI,0,Math.PI/2);r.scale(1,1.5,.55),r.rotateY(-.5-t*.18),r.translate(-.016+t*.017,.006,t*.004),e.push({geometry:r,material:`stone`})}),e}},{name:`コルコバードのキリスト像`,lat:-22.9519,lon:-43.2105,build:()=>[$o(.018,.024,.018,0,`stone`),es(.006,.005,.036,.024,8,`stone`),{geometry:new N(.044,.004,.004).translate(0,.05,0),material:`stone`},{geometry:new T(.005,8,6).translate(0,.064,0),material:`stone`}]},{name:`モアイ`,lat:-27.1127,lon:-109.3497,build:()=>{let e=[];return[-.03,0,.03].forEach((t,n)=>{let r=.85+n*.12;e.push({geometry:new N(.016,.03,.012).scale(r,r,r).translate(t,.015*r,0),material:`stone`}),e.push({geometry:new N(.02,.024,.016).scale(r,r,r).translate(t,.042*r,.002),material:`stone`})}),e}},{name:`万里の長城`,lat:40.4319,lon:116.5704,build:()=>{let e=[];for(let t=0;t<9;t++){let n=(t-4)*.026,r=Math.sin(t*.9)*.02,i=new N(.028,.012,.008);i.rotateY(Math.cos(t*.9)*.6),i.translate(n,.006,r),e.push({geometry:i,material:`stone`}),t%3==1&&e.push({geometry:new N(.014,.022,.014).translate(n,.011,r),material:`stone`})}return e}}];is.push({name:`ピサの斜塔`,lat:43.723,lon:10.3966,build:()=>{let e=[];for(let t=0;t<7;t++){let n=new L(.011,.011,.008,14).translate(0,.006+t*.009,0);e.push({geometry:n,material:`stone`})}return e.forEach(e=>e.geometry.rotateZ(.11)),e}},{name:`ストーンヘンジ`,lat:51.1789,lon:-1.8262,build:()=>{let e=[],t=.026;for(let n=0;n<10;n++){let r=n/10*Math.PI*2,i=Math.cos(r)*t,a=Math.sin(r)*t;[-.005,.005].forEach(t=>{e.push({geometry:new N(.006,.024,.004).translate(i+Math.sin(r)*t,.012,a-Math.cos(r)*t),material:`stone`})});let o=new N(.006,.004,.016);o.rotateY(-r),o.translate(i,.026,a),e.push({geometry:o,material:`stone`})}return e}},{name:`アンコール・ワット`,lat:13.4125,lon:103.867,build:()=>{let e=[$o(.06,.008,.06,0,`stone`)];return[[0,0,1],[-.02,-.02,.68],[.02,-.02,.68],[-.02,.02,.68],[.02,.02,.68]].forEach(([t,n,r])=>{let i=new L(.002,.011,.05*r,8).translate(t,.008+.025*r,n);e.push({geometry:i,material:`stone`})}),e}},{name:`凱旋門`,lat:48.8738,lon:2.295,build:()=>[{geometry:new N(.008,.03,.016).translate(-.014,.015,0),material:`stone`},{geometry:new N(.008,.03,.016).translate(.014,.015,0),material:`stone`},$o(.036,.014,.016,.03,`stone`)]},{name:`ゴールデンゲートブリッジ`,lat:37.8199,lon:-122.4783,build:()=>{let e=[];[-.03,.03].forEach(t=>{e.push({geometry:new N(.005,.058,.005).translate(t,.029,0),material:`steel`}),e.push({geometry:new N(.008,.004,.008).translate(t,.05,0),material:`steel`})}),e.push({geometry:new N(.09,.003,.01).translate(0,.022,0),material:`steel`});for(let t=0;t<9;t++){let n=t/8,r=-.03+n*.06,i=.05-Math.sin(n*Math.PI)*.024;e.push({geometry:new N(.008,.0025,.0025).translate(r,i,0),material:`steel`})}return e}},{name:`マチュ・ピチュ`,lat:-13.1631,lon:-72.545,build:()=>{let e=[];for(let t=0;t<5;t++)e.push({geometry:new N(.05-t*.007,.006,.03-t*.004).translate(0,.003+t*.006,t*.004),material:`stone`});return[-.014,0,.013].forEach((t,n)=>{e.push({geometry:new N(.008,.008,.007).translate(t,.034,-.004+n*.003),material:`roof`})}),e}},{name:`ペトラ遺跡`,lat:30.3285,lon:35.4444,build:()=>[$o(.04,.05,.012,0,`stone`),{geometry:new L(.004,.004,.03,8).translate(-.012,.015,.009),material:`roof`},{geometry:new L(.004,.004,.03,8).translate(.012,.015,.009),material:`roof`},{geometry:new z(.016,.014,4).translate(0,.05,.004),material:`roof`}]},{name:`聖ワシリイ大聖堂`,lat:55.7525,lon:37.6231,build:()=>{let e=[$o(.034,.018,.034,0,`stone`)];return[[0,0,1],[-.012,-.012,.6],[.012,-.012,.6],[-.012,.012,.6],[.012,.012,.6]].forEach(([t,n,r])=>{e.push({geometry:new L(.005*r,.005*r,.02*r,8).translate(t,.018+.01*r,n),material:`stone`});let i=new T(.008*r,10,8);i.scale(1,1.35,1),i.translate(t,.018+.024*r,n),e.push({geometry:i,material:`copper`}),e.push({geometry:new z(.002*r,.008*r,5).translate(t,.018+.036*r,n),material:`copper`})}),e}},{name:`ブルジュ・ハリファ`,lat:25.1972,lon:55.2744,build:()=>{let e=[],t=0;for(let n=0;n<5;n++){let r=.026-n*.003,i=.013-n*.0022;e.push({geometry:new L(i*.85,i,r,6).translate(0,t+r/2,0),material:`glass`}),t+=r}return e.push({geometry:new L(3e-4,.0014,.016,5).translate(0,t+.008,0),material:`glass`}),e}},{name:`ウルル`,lat:-25.3444,lon:131.0369,build:()=>{let e=new T(.03,14,8,0,Math.PI*2,0,Math.PI/2);return e.scale(1.5,.42,.75),[{geometry:e,material:`roof`}]}},{name:`姫路城`,lat:34.8394,lon:134.6939,build:()=>{let e=[$o(.04,.014,.04,0,`stone`)];for(let t=0;t<4;t++){let n=.03-t*.005,r=.014+t*.012;e.push({geometry:new N(n,.009,n).translate(0,r+.0045,0),material:`stone`}),e.push({geometry:new z(n*.85,.006,4).translate(0,r+.012,0),material:`roof`})}return e}},{name:`ナスカの地上絵`,lat:-14.7392,lon:-75.1301,build:()=>{let e=[],t=(t,n,r,i)=>{let a=new N(r,.0012,.003);a.rotateY(i),a.translate(t,6e-4,n),e.push({geometry:a,material:`stone`})};for(let e=0;e<7;e++)t(0,0,.1,e/7*Math.PI);return t(.03,.02,.05,.6),t(-.035,-.02,.06,-.4),e}}),is.map(({name:e,lat:t,lon:n})=>({name:e,lat:t,lon:n}));var as={stone:new g({color:`#d6cdb8`,roughness:.85,metalness:.03}),steel:new g({color:`#c4472c`,roughness:.55,metalness:.3}),copper:new g({color:`#5fa08b`,roughness:.7,metalness:.25}),roof:new g({color:`#7a6249`,roughness:.7,metalness:.15}),glass:new g({color:`#aebfcc`,roughness:.25,metalness:.6}),tarmac:new g({color:`#4c4c50`,roughness:.9,metalness:.02}),crate:new g({color:`#3f6f8c`,roughness:.75,metalness:.05}),city:new g({vertexColors:!0,color:`#ffffff`,roughness:.72,metalness:.06})},os=3.8,ss=.222,cs=.0185,ls=.285,us=.055,ds=.16,fs=.02,ps=.05,X=1/os;function ms(e){let t=e.clone().normalize(),n=new P().crossVectors(new P(0,1,0),t);return n.lengthSq()<1e-8&&n.set(1,0,0),n.normalize(),{up:t,east:n,north:new P().crossVectors(t,n).normalize()}}function hs(e,t,n,r,i){return e.clone().addScaledVector(t,r).addScaledVector(n,i).normalize()}var gs=e=>J(e).raw>=W;function _s(e,t,n){let r=(e,t)=>{let r=K(e,t);if(!gs(r))return null;let{east:i,north:a}=ms(r);return n.find(e=>e.footprint.every(([e,t])=>gs(hs(r,i,a,e,t))))??null},i=r(e,t);if(i)return{lat:e,lon:t,moved:0,variant:i};let a=1/Math.max(.15,Math.cos(e*Math.PI/180));for(let n=.35;n<=7.01;n+=.35)for(let i=0;i<32;i++){let o=i/32*Math.PI*2,s=e+Math.sin(o)*n,c=t+Math.cos(o)*n*a;if(Math.abs(s)>84)continue;let l=r(s,c);if(l)return{lat:s,lon:c,moved:n,variant:l}}return null}function vs(e){let t=ss/2/e,n=us/2/e,r=[],i=new Set;return qo.forEach(([e,a,o])=>{let s=e.split(` → `);[[a,o],[o,a]].forEach(([a,o],c)=>{let l=`${a[0]},${a[1]}`;if(i.has(l))return;i.add(l);let u=K(a[0],a[1]),{east:d,north:f}=ms(u),p=K(o[0],o[1]),m=p.clone().addScaledVector(u,-p.dot(u));if(m.lengthSq()<1e-8)return;m.normalize();let h=[m.dot(d),m.dot(f)],g=[];[0,15,-15,30,-30,45,-45,60,-60,75,-75,90].forEach(e=>{let r=e*Math.PI/180,i=[h[0]*Math.cos(r)-h[1]*Math.sin(r),h[0]*Math.sin(r)+h[1]*Math.cos(r)],a=[];for(let e=-1;e<=1.001;e+=.25)a.push([i[0]*t*e,i[1]*t*e]);[-1,1].forEach(e=>[-1,1].forEach(r=>{a.push([i[0]*t*.9*e-i[1]*n*r,i[1]*t*.9*e+i[0]*n*r])})),g.push({bearing:i,footprint:a})});let _=_s(a[0],a[1],g);_&&r.push({name:s[c]??e,turned:Math.round(Math.acos(Math.min(1,Math.abs(_.variant.bearing[0]*h[0]+_.variant.bearing[1]*h[1])))*180/Math.PI),lat:_.lat,lon:_.lon,moved:_.moved,bearing:_.variant.bearing,footprint:_.variant.footprint})})}),r}function ys(e){let t=ds/2/e,n=ps/e,r=[];return Xo.forEach(([e,i,a])=>{let o=K(i,a),{east:s,north:c}=ms(o),l=new ue;for(let e=0;e<24;e++){let t=e/24*Math.PI*2,n=Math.cos(t)*.03,r=Math.sin(t)*.03;gs(hs(o,s,c,n,r))||l.add(new ue(n,r))}if(l.lengthSq()<1e-9)return;l.normalize();let u=[l.x,l.y],d=[];for(let e=-1;e<=1.001;e+=.5){let r=-l.y*t*e,i=l.x*t*e;[.25,.75].forEach(e=>{d.push([r-l.x*n*e,i-l.y*n*e])})}let f=_s(i,a,[{bearing:u,footprint:d}]);f&&r.push({name:e,turned:0,lat:f.lat,lon:f.lon,moved:f.moved,bearing:u,footprint:d})}),r}function bs(){return[{geometry:new N(ls*X,.0035*X,us*X).translate(0,.0017*X,0),material:`stone`},{geometry:new N(ss*X,.0035*X,cs*X).translate(0,.0032*X,0),material:`tarmac`}]}function xs(){let e=[{geometry:new N(fs*X,.008*X,ds*X).translate(0,.004*X,0),material:`stone`}];return[.016,.026,.02,.03,.018,.024].forEach((t,n)=>{let r=(n-2.5)*.026;e.push({geometry:new N(.026*X,t*X,.02*X).translate(-.03*X,t/2*X,r*X),material:`crate`})}),[-.03,.03].forEach(t=>{e.push({geometry:new N(.008*X,.05*X,.008*X).translate(0,.025*X,t*X),material:`steel`})}),e.push({geometry:new N(.01*X,.008*X,.075*X).translate(0,.052*X,0),material:`steel`}),e.push({geometry:new N(.075*X,.006*X,.01*X).translate(.03*X,.05*X,0),material:`steel`}),e}var Ss=4300,Cs=new M(`#b4b0a7`),ws=new M(`#dcd8cf`),Ts=new M(`#9db0be`),Es=new M(`#c6d1d9`),Ds=new M(`#57534c`);function Os(e,t){let n=e.getAttribute(`position`).count,r=new Float32Array(n*3);for(let e=0;e<n;e++)r[e*3]=t.r,r[e*3+1]=t.g,r[e*3+2]=t.b;return e.setAttribute(`color`,new O(r,3)),e}function ks(e,n,r){let i={cities:0,blocks:0,nudged:0,dropped:0,onWater:0,empty:0,cramped:0},a=new t;return wi().forEach(([t,o,s],c)=>{let l=be(Ss+c*7919),u=yi(s)*.62,d=e=>{let t=[];for(let n=0;n<8;n++){let r=n/8*Math.PI*2;t.push([Math.cos(r)*u*e*.6,Math.sin(r)*u*e*.6])}return t},f={bearing:[1,0],footprint:d(1)},p={bearing:[1,0],footprint:d(.78)},m=_s(t,o,[f,p]);if(!m){i.dropped++;return}m.moved>0&&i.nudged++,i.cities++;let h=m.variant===p?u*.78:u;m.variant===p&&i.cramped++;let g=K(m.lat,m.lon),{east:_,north:v}=ms(g),y=l()*Math.PI*.5,b=Math.cos(y),x=Math.sin(y),S=0,C=.0092+s*.0016,w=yi(s)*.95,T=Math.ceil(Math.max(h,w)/C);for(let t=-T;t<=T;t++)for(let o=-T;o<=T;o++){let c=(l()-.5)*C*.3,u=(l()-.5)*C*.3,d=t*C+c,f=o*C+u,p=Math.hypot(d,f);if(p>w)continue;let m=p<=h,T=1-p/h;if(m){if(l()>.35+T*.75)continue}else{let e=1-(p-h)/Math.max(1e-6,w-h);if(l()>.22*e)continue}let E=hs(g,_,v,d*b-f*x,d*x+f*b);if(!gs(E)){i.onWater++;continue}let D=ms(E),O=e+J(E).display*n-.003;a.makeBasis(D.east,D.up,D.north),a.setPosition(D.up.x*O,D.up.y*O,D.up.z*O);let k=m&&l()<.06+T*(.06+s*.16)?1:0,A=m?.62+l()*.22:.32+l()*.16,j=C*A*(.85+l()*.3),ee=C*A*(.85+l()*.3),te=m?.034+l()*.02+T*T*(.01+s*.016)+k*(.014+s*.03):.014+l()*.008,M=new N(j,te,ee);M.translate(0,te/2,0),M.rotateY(y),M.applyMatrix4(a),r(`city`,Os(M,k?Ts:Cs));let ne=new N(j*1.1,.005,ee*1.1);if(ne.translate(0,te+.0025,0),ne.rotateY(y),ne.applyMatrix4(a),r(`city`,Os(ne,k?Es:ws)),m){let e=new N(C*.96,.0025,C*.96);e.translate(0,.0012,0),e.rotateY(y),e.applyMatrix4(a),r(`city`,Os(e,Ds))}i.blocks++,S++}S===0&&i.empty++}),i}function As(e,n){let r=new A,i={stone:[],steel:[],copper:[],roof:[],glass:[],tarmac:[],crate:[],city:[]},a=new t,o=new P,s=new P,c=new P,l=new P(0,1,0);is.forEach(t=>{let r=K(t.lat,t.lon);o.copy(r).normalize(),s.crossVectors(l,o),s.lengthSq()<1e-8&&s.set(1,0,0),s.normalize(),c.crossVectors(o,s).normalize();let u=e+J(r).display*n-.004;a.makeBasis(s,o,c),a.setPosition(o.x*u,o.y*u,o.z*u),t.build().forEach(e=>{e.geometry.scale(os,os,os),e.geometry.applyMatrix4(a),i[e.material].push(e.geometry)})});let u=(t,r)=>{let o=K(t.lat,t.lon),{up:s,east:c,north:l}=ms(o),u=J(o).display;t.footprint.forEach(([e,t])=>{u=Math.min(u,J(hs(o,c,l,e,t)).display)});let d=Math.atan2(-t.bearing[1],t.bearing[0]),f=e+u*n-.004;a.makeBasis(c,s,l),a.setPosition(s.x*f,s.y*f,s.z*f),r.forEach(e=>{e.geometry.rotateY(d),e.geometry.scale(os,os,os),e.geometry.applyMatrix4(a),i[e.material].push(e.geometry)})};return vs(e).forEach(e=>u(e,bs())),ys(e).forEach(e=>u(e,xs())),ks(e,n,(e,t)=>{i[e].push(t)}),Object.keys(i).forEach(e=>{let t=i[e];if(t.length===0)return;let n=da(t,!1);t.forEach(e=>e.dispose());let a=new F(n,as[e]);a.receiveShadow=!0,r.add(a)}),r}var js=[{lat:70,lon:-60,spread:4,count:8},{lat:68,lon:-25,spread:3,count:6},{lat:52,lon:-52,spread:3,count:6},{lat:-75,lon:-170,spread:5,count:8},{lat:-70,lon:-45,spread:4,count:7},{lat:-73,lon:-105,spread:4,count:6}],Ms=new M(`#e4edf1`),Ns=new M(`#7f96a6`);function Ps(e,t){let n=new y(t,0),r=n.attributes.position,i=new Float32Array(r.count*3);for(let n=0;n<r.count;n++){let a=.72+e()*.56,o=r.getX(n)*a,s=r.getY(n)*a*.42-t*.32,c=r.getZ(n)*a;r.setXYZ(n,o,s,c);let l=I.clamp(s/(t*.4)*.5+.5,0,1),u=Ns.clone().lerp(Ms,l);i[n*3]=u.r,i[n*3+1]=u.g,i[n*3+2]=u.b}return n.setAttribute(`color`,new O(i,3)),n.computeVertexNormals(),n}function Fs(e,t){let n=new A,r=be(90210),i=fr(e,t),a=e=>J(e).raw<W-.01,o=new P,s=new P(0,1,0),c=new S,l=[];if(js.forEach(t=>{let n=0,u=0;for(;n<t.count&&u<t.count*25;){u++;let d=t.lat+(r()-.5)*2*t.spread,f=t.lon+(r()-.5)*2*t.spread;if(o.copy(K(d,f)),!a(o))continue;let p=(.014+r()*.024)*e*.5,m=Ps(r,p);c.setFromUnitVectors(s,o),m.applyQuaternion(c),m.translate(o.x*i,o.y*i,o.z*i),l.push(m),n++}}),l.length>0){let e=da(l,!1);l.forEach(e=>e.dispose());let t=new g({vertexColors:!0,roughness:.85,metalness:0,envMapIntensity:.2}),r=new F(e,t);r.castShadow=!0,r.receiveShadow=!0,n.add(r)}return n}var Is={uniforms:{tDiffuse:{value:null},tDepth:{value:null},uResolution:{value:new ue(1,1)},uNear:{value:.1},uFar:{value:100},uFocusDistance:{value:8},uFocusRange:{value:1.9},uFalloff:{value:4},uMaxBlur:{value:.011},uTime:{value:0},uBokehBoost:{value:5},uVignette:{value:.34},uGrain:{value:.05},uAberration:{value:.0016},uBloomStrength:{value:.18},uBloomRadius:{value:.011},uHaze:{value:.035},uSparkleStrength:{value:.75},uSparkleScale:{value:7},uSaturation:{value:1.3},uContrast:{value:.15},uFlareUV:{value:new ue(.68,.9)},uFlareStrength:{value:.5},uSplitTone:{value:.4},uGodRayStrength:{value:.22},uGodRayDensity:{value:.055},uGodRayDecay:{value:.92},uLightLeak:{value:.1}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform sampler2D tDepth;
    uniform vec2 uResolution;
    uniform float uNear;
    uniform float uFar;
    uniform float uFocusDistance;
    uniform float uFocusRange;
    uniform float uFalloff;
    uniform float uMaxBlur;
    uniform float uTime;
    uniform float uBokehBoost;
    uniform float uVignette;
    uniform float uGrain;
    uniform float uAberration;
    uniform float uBloomStrength;
    uniform float uBloomRadius;
    uniform float uHaze;
    uniform float uSparkleStrength;
    uniform float uSparkleScale;
    uniform float uSaturation;
    uniform float uContrast;
    uniform vec2 uFlareUV;
    uniform float uFlareStrength;
    uniform float uSplitTone;
    uniform float uGodRayStrength;
    uniform float uGodRayDensity;
    uniform float uGodRayDecay;
    uniform float uLightLeak;
    varying vec2 vUv;

    // RINGS is set per quality tier: two rings read as a round aperture at
    // large radii, one is cheaper and enough at small ones. Each tap costs a
    // colour fetch and a depth fetch, so this count is the single biggest
    // lever on the cost of the frame.
    #ifndef RINGS
    #define RINGS 2
    #endif
    #define RING_TAPS 8

    // depth buffer value -> distance from the camera in world units
    float linearDepth(vec2 uv) {
      float d = texture2D(tDepth, uv).x;
      // a perspective depth buffer is heavily non-linear; undo the
      // projection so "how far out of focus" can be measured in the same
      // units the focus distance is expressed in
      float viewZ = (uNear * uFar) / ((uFar - uNear) * d - uFar);
      return -viewZ;
    }

    float circleOfConfusion(vec2 uv) {
      float dist = linearDepth(uv);
      float defocus = max(abs(dist - uFocusDistance) - uFocusRange, 0.0);
      return clamp(defocus / uFalloff, 0.0, 1.0);
    }

    // Out of focus, a point of light does not smear — it opens into a disc
    // the shape of the aperture, and it stays bright while doing so. A plain
    // average of neighbours does the opposite: it dilutes every highlight
    // into the dark pixels around it, which is why blurred background
    // sparkle came out as grey mush rather than as bokeh. Weighting each
    // sample by its own brightness restores the effect that makes defocused
    // light read as light.
    float bokehWeight(vec3 c) {
      // (three's own shader prefix already defines a luminance helper, and
      // GLSL will not accept a second body for it, so this inlines the same
      // calculation instead)
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      return 1.0 + uBokehBoost * l * l;
    }

    // Real glass does not focus every wavelength at the same radius, and the
    // mismatch grows toward the corners. It is a tiny effect and a
    // surprisingly strong tell — its complete absence is part of what makes
    // a render look synthetic.
    vec3 sampleScene(vec2 uv, float edge) {
      vec2 shift = (uv - vec2(0.5)) * uAberration * edge;
      return vec3(
        texture2D(tDiffuse, uv + shift).r,
        texture2D(tDiffuse, uv).g,
        texture2D(tDiffuse, uv - shift).b
      );
    }

    vec3 blurred(vec2 uv, float radius, float edge) {
      vec2 aspect = vec2(1.0, uResolution.x / uResolution.y);
      vec3 centre = sampleScene(uv, edge);
      float w0 = bokehWeight(centre);
      vec3 sum = centre * w0;
      float weight = w0;

      for (int ring = 1; ring <= RINGS; ring++) {
        float ringRadius = radius * (float(ring) / float(RINGS));
        float ringOffset = float(ring) * 0.4;
        for (int i = 0; i < RING_TAPS; i++) {
          float angle = (float(i) + ringOffset) / float(RING_TAPS) * 6.28318530718;
          vec2 tapUv = uv + vec2(cos(angle), sin(angle)) * aspect * ringRadius;

          // A sharp foreground pixel must not be smeared by a blurred
          // background one behind it, or every silhouette grows a halo.
          // Weighting each tap by its own blur amount keeps the bleed going
          // the way it does through a real lens: outward from the
          // out-of-focus subject, never into the focused one.
          float tapCoc = circleOfConfusion(tapUv);
          vec3 tap = sampleScene(tapUv, edge);
          float w = max(tapCoc, 0.05) * bokehWeight(tap);
          sum += tap * w;
          weight += w;
        }
      }

      return sum / weight;
    }

    // A cheap, single-ring approximation of bloom: only pixels bright
    // enough to be a highlight (a sunlit cloud top, a city light, lava
    // glow) feed it, so an ordinary mid-toned frame does not gain a soft
    // double-exposed look — only its actual highlights bleed a little,
    // which is what turns "glow" into a lens/eye response rather than a
    // uniform blur laid over everything.
    vec3 bloomGlow(vec2 uv, float edge) {
      vec2 aspect = vec2(1.0, uResolution.x / uResolution.y);
      const int TAPS = 6;
      vec3 sum = vec3(0.0);
      for (int i = 0; i < TAPS; i++) {
        float angle = (float(i) + 0.5) / float(TAPS) * 6.28318530718;
        vec2 offset = vec2(cos(angle), sin(angle)) * aspect * uBloomRadius;
        vec3 s = texture2D(tDiffuse, uv + offset).rgb;
        float l = dot(s, vec3(0.2126, 0.7152, 0.0722));
        sum += s * smoothstep(0.55, 1.1, l);
      }
      return sum / float(TAPS);
    }

    // A diamond-dust glitter: fine specks that catch the light at random
    // moments and random positions, scattered across the whole frame.
    // Screen-space and grid-based — a scattered spatial hash per cell, the
    // same technique the grain noise below already uses — rather than real
    // particles, because the request was for an effect over the whole
    // picture (the room and the glass case as much as the globe), not a
    // feature of any one object in the scene.
    //
    // The previous version hashed only the cell, not time, so the same
    // ~9% of the screen blinked on a perfectly periodic sine loop forever
    // — a static, mechanical grid of dots rather than glitter, and exactly
    // what read as distracting rather than pretty. Time is quantized into
    // short cycles here, and which cells get a flash *this* cycle is
    // rehashed every cycle — so the sparkling positions themselves drift
    // and reshuffle instead of being fixed points that never move — and
    // each flash is a single short, randomly-timed pulse rather than a
    // continuous oscillation, so it reads as an occasional catch of light
    // instead of a blink you can predict.
    vec3 sparkleField(vec2 uv) {
      vec2 pixel = uv * uResolution;
      vec2 cell = floor(pixel / uSparkleScale);
      vec2 local = fract(pixel / uSparkleScale) - 0.5;

      const float cycleRate = 0.6; // cycles per second
      float cycle = floor(uTime * cycleRate);
      vec2 key = cell + vec2(cycle * 13.7, cycle * 71.3);
      float h = fract(sin(dot(key, vec2(41.3, 289.1))) * 43758.5453);
      // Sparse per cycle — most cells get no flash at all this round.
      if (h > 0.035) return vec3(0.0);

      vec2 jitter = vec2(fract(h * 97.13), fract(h * 53.71)) - 0.5;
      float d = length(local - jitter * 0.6);
      float core = smoothstep(0.2, 0.0, d);

      // A one-shot pulse timed to a random moment within this cycle
      // (startT), not a repeating wave — it rises, holds briefly, and
      // fades, once, then stays dark until (maybe) picked again next cycle.
      float cycleLen = 1.0 / cycleRate;
      float tInCycle = mod(uTime, cycleLen);
      float startT = fract(h * 613.7) * cycleLen * 0.7;
      float pulseLen = 0.12 + fract(h * 271.9) * 0.14;
      float p = (tInCycle - startT) / pulseLen;
      float pulse = smoothstep(0.0, 0.3, p) * smoothstep(1.0, 0.6, p);

      return vec3(0.85, 0.92, 1.0) * core * pulse;
    }

    // A stylised anamorphic lens flare anchored at uFlareUV: a bright
    // core halo, a horizontally-stretched anamorphic streak (the signature
    // "blue line across the frame" of a real anamorphic lens catching a
    // strong off-axis source), and a short string of faint ghost rings
    // along the line from the source through the frame centre — the same
    // three parts any live-action or anime key-light flare is built from.
    vec3 lensFlare(vec2 uv, vec2 aspect) {
      vec2 toSrc = (uv - uFlareUV) * aspect;
      float d = length(toSrc);

      // core: small, hot, warm-white
      float core = smoothstep(0.05, 0.0, d) ;
      // soft halo around the core
      float halo = smoothstep(0.5, 0.0, d) * 0.18;

      // anamorphic streak: compress the vertical axis hugely so only a
      // near-horizontal band survives, the classic squeezed-lens artifact
      float streakDist = length(toSrc * vec2(1.0, 14.0));
      float streak = smoothstep(0.4, 0.0, streakDist) * 0.5;

      vec3 col = vec3(1.0, 0.85, 0.65) * (core * 1.4 + halo);
      col += vec3(0.65, 0.8, 1.0) * streak;

      // ghost rings: a handful of faint echoes reflected through frame
      // centre (0.5, 0.5), the way internal lens-element reflections chain
      // out along that same axis in a real flare
      vec2 centre = vec2(0.5);
      vec2 axis = centre - uFlareUV;
      for (int i = 1; i <= 3; i++) {
        float t = float(i) * 0.45;
        vec2 ghostPos = uFlareUV + axis * t;
        float gd = length((uv - ghostPos) * aspect);
        float ghostSize = 0.05 + float(i) * 0.03;
        float ghost = smoothstep(ghostSize, 0.0, gd) * (0.05 / float(i));
        col += vec3(0.7, 0.85, 1.0) * ghost;
      }

      return col;
    }

    // Crepuscular rays: march from this pixel toward the flare anchor,
    // sampling the already-rendered frame and letting only its bright
    // spots (cloud tops, the sparkle field, the flare itself) survive,
    // decaying with each step. This is the standard cheap screen-space
    // god-ray trick — it has no notion of what is actually casting a
    // shadow, it just streaks whatever is already bright toward the
    // anchor, which is enough to read as light shafts without a second
    // scene render or any occlusion geometry.
    #define GOD_RAY_SAMPLES 10
    vec3 godRays(vec2 uv) {
      vec2 delta = (uv - uFlareUV) * uGodRayDensity;
      vec2 sampleUv = uv;
      float decay = 1.0;
      vec3 result = vec3(0.0);
      for (int i = 0; i < GOD_RAY_SAMPLES; i++) {
        sampleUv -= delta;
        vec3 s = texture2D(tDiffuse, sampleUv).rgb;
        float l = dot(s, vec3(0.2126, 0.7152, 0.0722));
        result += s * smoothstep(0.5, 1.0, l) * decay;
        decay *= uGodRayDecay;
      }
      return result * (1.0 / float(GOD_RAY_SAMPLES));
    }

    // Two soft diagonal colour bands drifting slowly across the frame —
    // the "light leak" a real lens gets from a stray bright source hitting
    // the barrel at an angle. One warm, one cool, so together they nudge
    // toward the same teal/orange split the colour grade below carries,
    // rather than adding a third unrelated hue.
    vec3 lightLeak(vec2 uv) {
      vec2 warmDir = normalize(vec2(1.0, 0.4));
      float warmCoord = dot(uv, warmDir) * 2.4 - uTime * 0.015;
      float warmBand = pow(max(sin(warmCoord) , 0.0), 6.0);

      vec2 coolDir = normalize(vec2(1.0, -0.55));
      float coolCoord = dot(uv, coolDir) * 2.1 + uTime * 0.011;
      float coolBand = pow(max(sin(coolCoord), 0.0), 8.0);

      return vec3(1.0, 0.55, 0.25) * warmBand * 0.5 + vec3(0.35, 0.65, 1.0) * coolBand * 0.4;
    }

    void main() {
      vec2 centred = (vUv - vec2(0.5)) * vec2(uResolution.x / uResolution.y, 1.0);
      float edge = clamp(dot(centred, centred) * 2.2, 0.0, 1.0);

      float radius = circleOfConfusion(vUv) * uMaxBlur;
      vec3 colour = radius < 0.0003 ? sampleScene(vUv, edge) : blurred(vUv, radius, edge);

      // A thin glow off the frame's own highlights, on request — kept
      // small (see the uniform defaults) so it reads as a lens/eye
      // response to bright spots, not as a haze laid over the whole
      // picture (that is the separate, even fainter term below).
      colour += bloomGlow(vUv, edge) * uBloomStrength;

      // The lamp flare, added right alongside the bloom it's standing in
      // for — both are screen-space light artefacts, so they belong in the
      // same additive stage, before the vignette/haze/grade that treat the
      // frame as a finished photograph.
      colour += lensFlare(vUv, vec2(uResolution.x / uResolution.y, 1.0)) * uFlareStrength;

      // God rays sample the frame that already has the flare/bloom baked
      // into it, so the shafts read as radiating *from* the flare rather
      // than from a second, separate source.
      colour += godRays(vUv) * uGodRayStrength;

      // Lens falloff. Every lens is dimmer at the corners than in the
      // middle, and the eye reads an evenly lit rectangle as artificial long
      // before it can say why.
      colour *= 1.0 - uVignette * edge * edge;

      // A very thin veiling haze, like dust suspended in the light — lifts
      // the blacks a touch and pulls the frame toward the key lamp's own
      // warmth, which is what a lens shows in a room with anything
      // floating in the air, instead of the "photograph in vacuum"
      // cleanliness a raw render has by default. Small on purpose: this is
      // meant to be felt rather than seen.
      colour = mix(colour, vec3(0.5, 0.44, 0.36), uHaze);

      // Diamond dust, on request — additive and placed after the haze/
      // vignette so the specks read as points of light catching the eye
      // rather than as part of the scene's own shading, and not scaled by
      // the vignette itself: real glitter in the air keeps catching the
      // light out to the edge of frame, it does not dim with the lens.
      colour += sparkleField(vUv) * uSparkleStrength;

      // Light leak streaks, additive alongside the sparkle/haze — both are
      // "things floating between the lens and the scene" rather than
      // properties of the scene itself, so they belong in the same stage.
      colour += lightLeak(vUv) * uLightLeak;

      // Colour grade: saturation lift, then a gentle S-curve. Both applied
      // after every other term above (haze, sparkle, bloom) so the grade
      // is over the whole finished picture, the way it would sit on a real
      // photograph rather than being baked into any one element's own
      // colours.
      float luma = dot(colour, vec3(0.2126, 0.7152, 0.0722));
      colour = mix(vec3(luma), colour, uSaturation);
      colour = mix(colour, smoothstep(0.0, 1.0, colour), uContrast);

      // Teal-shadow / orange-highlight split tone, on request ("新海誠的
      // な" -- a Shinkai-style grade). A single uSaturation/uContrast lift
      // pushes every colour that is already in the frame harder, but it
      // cannot introduce the specific hue split that look depends on:
      // shadows pulled toward blue-violet, highlights pulled toward warm
      // amber, with the mid-tones barely touched. Re-measures luma on the
      // graded colour (not the pre-grade one above) so the split follows
      // what the frame actually looks like at this point in the pipeline.
      float gradedLuma = dot(colour, vec3(0.2126, 0.7152, 0.0722));
      vec3 shadowTint = vec3(0.55, 0.62, 0.85);
      vec3 highlightTint = vec3(1.08, 0.88, 0.62);
      vec3 splitTint = mix(shadowTint, highlightTint, smoothstep(0.15, 0.85, gradedLuma));
      colour = mix(colour, colour * splitTint, uSplitTone);

      // Cel shading was tried here (quantizing the finished frame's
      // luminance into bands) and dropped on request — even faded out
      // over defocus, banding a lens-blurred bokeh background never reads
      // as "anime," it reads as compression noise. "アニメ調の美しい
      // フィルタ" turned out to mean glow and colour, not flat tones: see
      // uBloomStrength/uSaturation above, both raised for this instead.

      // Sensor grain, animated so it does not sit on the image like a
      // texture. Kept below the level where it is consciously visible: the
      // point is not to look grainy, it is to stop looking impossibly clean.
      float n = fract(sin(dot(vUv * uResolution + uTime * 137.0, vec2(12.9898, 78.233))) * 43758.5453);
      colour += (n - 0.5) * uGrain;

      // Highlight knee. The scene render already passed through three's own
      // ACES tonemap before it ever reached this pass (renderer.toneMapping
      // in main.ts), so it arrives here already compressed into 0..1 — but
      // everything this pass adds afterward (bloom, the lens flare, god
      // rays, the sparkle field, light leaks) is simple addition on top of
      // that already-tonemapped image, with nothing left to compress a
      // second time. Stack enough of those over something already bright
      // and the sum blows straight past 1.0 and hard-clips to flat white.
      //
      // A knee starting exactly at 1.0 (the first version of this fix)
      // turned out to do nothing visible: a pixel that was *already*
      // sitting at (1,1,1) before this pass even ran — the emissive rim-
      // glow terms on the globe/ocean/cloud materials had no headroom gate
      // of their own at the time, so bright ice/snow/cloud tops were
      // already clipped by ACES upstream of this shader entirely — has no
      // "excess above 1.0" for this formula to find; it was already fully
      // saturated before arriving here. That upstream saturation is now
      // fixed at the source (see the headroom-gated rim terms in
      // main.ts/clouds.ts), but this knee is still worth starting below
      // 1.0 rather than at it: it gives the *stack of this pass's own*
      // additive terms (bloom+flare+godray+sparkle can still sum to
      // several times full brightness on a merely bright, not-yet-clipped
      // pixel) real headroom to rolloff through instead of racing each
      // other to the same hard ceiling.
      // BUG FIXED here on first verification: this originally read
      // colour = knee + excess / (1.0 + excess), with no base term below
      // the knee, which unconditionally floors every pixel -- including
      // fully dark ones, where excess is exactly 0 -- up to knee itself
      // (0.85 + 0/(1+0) = 0.85). That washed the entire frame, background
      // included, out to a flat pale grey, which a screenshot caught
      // immediately.
      //
      // SECOND BUG, caught after the first fix still reported flat white:
      // min(colour, knee) + excess / (1.0 + excess) fixed the dark-pixel
      // floor, but its own asymptote as excess -> infinity is
      // knee + 1.0 = 1.85, not 1.0. A "soft" knee whose own ceiling still
      // sits above 1.0 is not actually soft where it matters: the GPU
      // hard-clamps whatever this shader outputs to [0,1] when it writes
      // the frame buffer, so any pixel with enough stacked bloom/flare/
      // god-ray/sparkle to push excess past roughly 0.18 was *still*
      // hitting that hard ceiling and clipping to flat white, no matter
      // how gently this curve approached 1.85 on paper. The missing piece
      // is scaling the excess term by the remaining headroom itself
      // (1.0 - knee), so the curve's own asymptote lands exactly at 1.0:
      // as excess grows without bound, excess / (1.0 + excess) approaches
      // 1, so the whole expression approaches knee + (1.0 - knee) * 1.0 =
      // 1.0 -- never reaching or exceeding it for any finite input, which
      // is what "soft knee" is supposed to mean in the first place.
      float knee = 0.85;
      vec3 excess = max(colour - knee, 0.0);
      colour = min(colour, knee) + (1.0 - knee) * excess / (1.0 + excess);

      gl_FragColor = vec4(colour, 1.0);
    }
  `},Ls=new P(5,4.4,3.2),Rs=.86;function zs(){let e=document.createElement(`canvas`);e.width=256,e.height=256;let t=e.getContext(`2d`),n=t.createRadialGradient(107.52,256/2,0,107.52,256/2,128);n.addColorStop(0,`rgba(18, 10, 6, 0.5)`),n.addColorStop(.45,`rgba(19, 11, 6, 0.33)`),n.addColorStop(.78,`rgba(20, 12, 7, 0.1)`),n.addColorStop(1,`rgba(20, 12, 7, 0)`),t.fillStyle=n,t.fillRect(0,0,256,256);let r=t.createRadialGradient(76.8,256/2,0,76.8,256/2,66.56);r.addColorStop(0,`rgba(14, 8, 4, 0.62)`),r.addColorStop(.55,`rgba(15, 9, 5, 0.34)`),r.addColorStop(1,`rgba(16, 9, 5, 0)`),t.fillStyle=r,t.fillRect(0,0,256,256);let i=new B(e);i.colorSpace=s;let a=2.94,o=new P(0,0,0).sub(Ls),c=-1/o.y,l=o.x*c*a,u=o.z*c*a,d=Math.hypot(l,u)+5.2,f=new F(new v(d,4.6),new p({map:i,transparent:!0,depthWrite:!1}));return f.rotation.set(-Math.PI/2,Math.atan2(-u,l),0,`YXZ`),f.position.set(l*.5,-2.076,u*.5),f.renderOrder=1,f}function Bs(){let e=document.createElement(`canvas`);e.width=512,e.height=512;let t=e.getContext(`2d`),n=be(90210),r=t.createLinearGradient(0,0,0,512);r.addColorStop(0,`#6b4a30`),r.addColorStop(.55,`#53341f`),r.addColorStop(1,`#3a2216`),t.fillStyle=r,t.fillRect(0,0,512,512);for(let e=0;e<5;e++){let r=(e+.5)*(512/5)+(n()-.5)*30;t.strokeStyle=`rgba(20, 11, 7, 0.55)`,t.lineWidth=3+n()*3,t.beginPath(),t.moveTo(0,r),t.lineTo(512,r),t.stroke()}for(let e=0;e<70;e++){let e=n()*512;t.strokeStyle=`rgba(${n()<.5?`18, 10, 6`:`92, 66, 44`}, ${.05+n()*.12})`,t.lineWidth=1+n()*3,t.beginPath();let r=0,i=e;for(t.moveTo(r,i);r<512;)r+=60+n()*120,i+=(n()-.5)*10,t.lineTo(r,i);t.stroke()}let i=new B(e);return i.colorSpace=s,i.wrapS=C,i.wrapT=C,i.repeat.set(2,2),i}var Vs={glass:[],plastic:[],paper:[],wood:[],foliage:[],cotton:[],cloth:[],ceramic:[]};function Hs(e,t,n){n(t),Vs[e].push(t)}function Us(e,t){let n=3+Math.floor(e()*4),r=0;for(let i=0;i<n;i++){let n=.1+e()*.11,i=.78+e()*.22,a=.56+e()*.16,o=(e()-.5)*.35;Hs(`cloth`,new N(i,n,a),i=>{i.rotateY(o),i.translate((e()-.5)*.1,r+n/2,(e()-.5)*.1),i.applyMatrix4(t)}),Hs(`paper`,new N(i*.94,n*.62,a*.93),i=>{i.rotateY(o),i.translate((e()-.5)*.1,r+n/2,(e()-.5)*.1),i.applyMatrix4(t)}),r+=n}}function Ws(e,t){let n=0,r=4+Math.floor(e()*4);for(let i=0;i<r;i++){let a=.11+e()*.1,o=.95+e()*.4,s=i>r-3?.16+e()*.3:(e()-.5)*.06;Hs(`cloth`,new N(a,o,.62),r=>{r.translate(0,o/2,0),r.rotateZ(s),r.translate(n,0,(e()-.5)*.06),r.applyMatrix4(t)}),n+=a+.015+e()*.02}}function Gs(e,t){let n=.5+e()*.16;Hs(`ceramic`,new L(.34,.26,n,16),e=>{e.translate(0,n/2,0),e.applyMatrix4(t)}),Hs(`ceramic`,new te(.34,.035,6,18),e=>{e.rotateX(Math.PI/2),e.translate(0,n,0),e.applyMatrix4(t)});let r=9+Math.floor(e()*5);for(let i=0;i<r;i++){let a=i/r*Math.PI*2+e()*.5,o=.55+e()*.5,s=.45+e()*.7,c=.3+e()*.45,l=(e()-.5)*1.4;Hs(`foliage`,new L(.016,.024,c,4),e=>{e.translate(0,c/2,0),e.rotateZ(s*.35),e.rotateY(a),e.translate(0,n,0),e.applyMatrix4(t)});let u=.14+e()*.07,d=[];for(let e=0;e<=6;e++){let t=e/6;d.push(new ue(Math.sin(t**.55*Math.PI)*u,t*o))}Hs(`foliage`,new b(d,5),e=>{e.scale(1,1,.28),e.rotateZ(Math.PI/2-s),e.rotateX(l),e.rotateY(a),e.translate(Math.cos(a)*c*.4,n+c*.85,-Math.sin(a)*c*.4),e.applyMatrix4(t)})}}function Ks(){let e=new A,n=be(777),r=new g({map:Bs(),roughness:.62,metalness:0}),i=new F(new v(60,60),r);i.rotation.x=-Math.PI/2,i.position.y=-2.08,i.receiveShadow=!0,e.add(i),e.add(zs());let a=new _().load(`/planet-canvas2/study-wall.jpg`);a.colorSpace=s;let o=new F(new v(44,24.7),new p({map:a,color:`#b3a795`}));o.position.set(0,6.2,-13),e.add(o);let c=(e,n,r,i,a=0)=>{let o=typeof i==`number`?new P(i,i,i):new P(...i);return new t().compose(new P(e,n,r),new S().setFromAxisAngle(new P(0,1,0),a),o)};[[-5.2,-6.2],[-3.6,-7.1],[-2,-6.4],[2.8,-6.8],[4.3,-6],[5.7,-7.2]].forEach(([e,t])=>{Us(n,c(e,-2.08,t,1.7,n()*Math.PI*2))}),[[-2.9,-5,3.4],[3.4,-5.4,3]].forEach(([e,t,r])=>{Ws(n,c(e,-2.08,t,[1.5,r*.55,1.5],n()*Math.PI*2))}),Gs(n,c(-5.1,-2.08,-4.2,1.5,n()*Math.PI*2)),Gs(n,c(5.3,-2.08,-3.9,1.25,n()*Math.PI*2)),Us(n,c(-6.4,-2.08,-2.6,1.9,n()*Math.PI*2));let l={glass:new g({color:`#9fb0ad`,roughness:.18,metalness:0,transparent:!0,opacity:.55}),plastic:new g({color:`#26262a`,roughness:.55}),paper:new g({color:`#d8d2c6`,roughness:.9,side:2}),wood:new g({color:`#6b4a33`,roughness:.8}),foliage:new g({color:new M().setHSL(.27,.38,.26,s),roughness:.95,flatShading:!0}),cotton:new g({color:`#e8e6e4`,roughness:.95}),cloth:new g({color:`#9c7256`,roughness:.88}),ceramic:new g({color:`#9c8e7c`,roughness:.6,metalness:0})};return Object.keys(Vs).forEach(t=>{let n=Vs[t];if(n.length===0)return;let r=da(n,!1);n.forEach(e=>e.dispose()),n.length=0;let i=new F(r,l[t]);i.castShadow=!0,e.add(i)}),e}document.querySelector(`#app`).innerHTML=`
  <div class="cyber-panel" id="cyber-panel">
    <div class="panel-corner panel-corner--tl"></div>
    <div class="panel-corner panel-corner--tr"></div>
    <div class="panel-header">
      <div class="title"><span class="title-glyph"></span>天青の晶玉</div>
      <button id="story-button" class="story-button" title="ストーリーを見る" aria-label="ストーリーを見る">STORY</button>
    </div>

    <div class="panel-controls">
      <div class="dial-cluster">
        <div class="dial-label">E - W</div>
        <div class="yaw-dial" id="yaw-dial" role="slider" aria-label="東西に回転" tabindex="0">
          <div class="yaw-dial-ring"></div>
          <div class="yaw-dial-tick" id="yaw-dial-tick"></div>
          <div class="yaw-dial-core"></div>
        </div>
      </div>
      <div class="dial-cluster">
        <div class="dial-label">N - S</div>
        <div class="pitch-dial" id="pitch-dial" role="slider" aria-label="南北に回転" tabindex="0">
          <div class="pitch-dial-ring"></div>
          <div class="pitch-dial-tick" id="pitch-dial-tick"></div>
          <div class="pitch-dial-core"></div>
        </div>
      </div>
      <button id="flag-button" class="cyber-button cyber-button--small" title="中心に旗を立てる" aria-label="中心に旗を立てる">
        <svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 3v18M5 4h13l-3 4 3 4H5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>
      </button>
      <button id="spin-toggle" class="cyber-button cyber-button--small" title="自転を止める" aria-label="自転を止める">
        <svg viewBox="0 0 24 24" width="16" height="16" id="spin-toggle-icon"><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor"/></svg>
      </button>
    </div>
  </div>

  <div class="loading-screen" id="loading-screen">
    <div class="loading-ring"></div>
    <div class="loading-title">天青の晶玉</div>
    <div class="loading" id="loading" role="status">組み立て中…</div>
  </div>

  <div class="flag-bubble" id="flag-bubble" hidden>
    <div class="flag-bubble-coord" id="flag-bubble-coord">N 00.0° E 000.0°</div>
    <div class="flag-bubble-tail"></div>
  </div>

  <div class="story-overlay" id="story-overlay" hidden>
    <div class="story-panel">
      <button id="story-close" class="story-close" aria-label="閉じる">✕</button>
      <div class="story-cover"></div>
      <h1 class="story-title">天青の晶玉（てんせいのしょうぎょく）</h1>
      <p class="story-lead">机の上に、青く光る球体がある。骨董品のジオラマのようにも見えるその装置には、説明書もなければ由来を記したプレートもない。ハルカがそれを手に入れたのは、偶然だった。誰も名前を知らないその球体を、彼女はなんとなく手に取り――そして、回した。</p>
      <section class="story-section">
        <h2>掌（てのひら）の上の星回り</h2>
        <p>指先で触れると、装置は静かに応える。東西に回せば大陸が流れていき、南北に傾ければ、見知らぬ土地の景色が現れる。緑の濃い密林、吹き荒れる局地的な嵐、氷に閉ざされた極域――回転させるたびに、球体の内側で世界が息をしているのがわかる。これはジオラマではない。ハルカはすぐにそう悟った。気になる場所には座標を刻める。旗のかわりに、デジタルな吹き出しがふわりと浮かび上がり、緯度と経度を静かに告げる。彼女は掌の上で回る星を観測しながら、未知の領域へ降り立つための転送座標を慎重に割り出していく。</p>
      </section>
      <section class="story-section">
        <h2>未知へのダイブ</h2>
        <p>座標が定まったとき、何かが変わる。装置の中心で、球体そのものが淡く発光しはじめる。まばゆい光とともに、彼女の輪郭がホログラムとして揺らぐ。次の瞬間、彼女は「晶玉」の内部空間へと直接転送されていた。もう戻るための道筋は、この球体の中にしかない。彼女の孤独で危険な探索の幕が、静かに上がる。</p>
      </section>
      <section class="story-section">
        <h2>現実となる箱庭</h2>
        <p>転送の果てにハルカを待っていたのは、見覚えのある景色だった。デバイスの上で緑が濃く光っていたあの原生林。厚い雲に覆われ、輪郭さえおぼろげだったあの未踏の荒野。掌の上でただ眺めていただけの、小さなジオラマの光景――それが今、圧倒的なスケールを持つ現実として、彼女の目の前に立ちはだかっている。風の匂いがする。木々のざわめきが耳に届く。数分前まで指先ひとつで回していた星が、今は彼女を呑み込むほど巨大な世界になっている。</p>
      </section>
    </div>
  </div>
`;var qs={globeSegments:[384,216],oceanSegments:[176,100],shadowMapSize:768,dofRings:1,maxPixelRatio:1.2,textureWidth:2048},Js=16,Ys=0,Xs=performance.now();function Zs(e){let t=document.querySelector(`#loading`);t&&(t.textContent=e)}var Z=e=>new Promise(t=>{if(e){Ys++;let t=((performance.now()-Xs)/1e3).toFixed(1);Zs(`組み立て中… ${e} (${Ys}/${Js}) ${t}s`)}let n=!1,r=()=>{n||(n=!0,t())};requestAnimationFrame(r),window.setTimeout(r,40)}),Qs=!1;window.addEventListener(`error`,e=>{Qs||Zs(`読み込みに失敗しました: ${e.message}`)}),window.addEventListener(`unhandledrejection`,e=>{Qs||Zs(`読み込みに失敗しました: ${String(e.reason)}`)});var Q=2,$s=.36,ec=Rs,tc=document.querySelector(`#app`),nc=new d,rc=new f(40,window.innerWidth/window.innerHeight,.1,100),ic=10.2,ac=.6;function oc(){let e=window.innerWidth/window.innerHeight;return e>=1?ic:ic*(1/Math.max(e,.45))**ac}var sc=Math.PI*.405,cc=.15;function lc(){return window.innerWidth/window.innerHeight>=1?cc:-.25}function uc(){let e=oc(),t=lc();return new P(0,t+e*Math.cos(sc),e*Math.sin(sc))}var dc=uc();rc.position.set(dc.x,dc.y,dc.z),rc.lookAt(0,lc(),0);function fc(){let e=[{antialias:!0,alpha:!0},{antialias:!1,alpha:!0},{antialias:!1,alpha:!1,powerPreference:`low-power`,failIfMajorPerformanceCaveat:!1}],t=null;for(let n of e)try{return new ae(n)}catch(e){t=e}throw t instanceof Error?t:Error(String(t))}var pc;try{pc=fc()}catch(e){throw Qs=!0,Zs(`この端末で 3D を開始できませんでした。ブラウザの他のタブを閉じてから再読み込みしてください。`),console.error(e),e}pc.setSize(window.innerWidth,window.innerHeight),pc.setPixelRatio(Math.min(window.devicePixelRatio,qs.maxPixelRatio)),pc.shadowMap.enabled=!1,pc.shadowMap.type=1,pc.toneMapping=4,pc.toneMappingExposure=1.9,tc.appendChild(pc.domElement);var mc=new ne(window.innerWidth,window.innerHeight);mc.type=oe;var hc=new se(window.innerWidth,window.innerHeight,{depthTexture:mc,depthBuffer:!0}),gc=new Ae(pc,hc);gc.renderTarget2.depthTexture=mc;var _c=new je(nc,rc);gc.addPass(_c);var vc=new De(Is);vc.renderToScreen=!0,vc.material.defines={...vc.material.defines,RINGS:qs.dofRings},gc.addPass(vc),vc.uniforms.tDepth.value=mc,vc.uniforms.uNear.value=rc.near,vc.uniforms.uFar.value=rc.far,vc.uniforms.uResolution.value.set(window.innerWidth,window.innerHeight);function yc(){let e=document.createElement(`canvas`);e.width=64,e.height=32;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,32);n.addColorStop(0,`#fdf6e8`),n.addColorStop(.42,`#b8ab98`),n.addColorStop(.62,`#4a3b2e`),n.addColorStop(1,`#1a120c`),t.fillStyle=n,t.fillRect(0,0,64,32);let r=t.createLinearGradient(0,18.56,0,27.52);r.addColorStop(0,`rgba(57, 200, 255, 0)`),r.addColorStop(.5,`rgba(57, 200, 255, 0.22)`),r.addColorStop(1,`rgba(57, 200, 255, 0)`),t.fillStyle=r,t.fillRect(0,0,64,32);let i=new B(e);return i.mapping=303,i.colorSpace=s,i.needsUpdate=!0,i}var bc=new de(pc),xc=yc();nc.environment=bc.fromEquirectangular(xc).texture,xc.dispose(),bc.dispose(),nc.environmentIntensity=1.4,pc.domElement.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),Zs(`WebGL が停止しました。他のタブを閉じて再読み込みしてください。`)},!1),nc.add(new le(16771522,.1));var Sc=new D(16773596,3.4);Sc.position.copy(Ls),Sc.castShadow=!0,Sc.shadow.mapSize.set(qs.shadowMapSize,qs.shadowMapSize),Sc.shadow.camera.left=-4,Sc.shadow.camera.right=4,Sc.shadow.camera.top=4,Sc.shadow.camera.bottom=-4,Sc.shadow.camera.near=1,Sc.shadow.camera.far=20,Sc.shadow.camera.updateProjectionMatrix(),Sc.shadow.bias=-25e-5,Sc.shadow.normalBias=.005,nc.add(Sc);var Cc=new D(13623538,.19);Cc.position.set(-3.5,-.8,2.5),nc.add(Cc);var wc=new D(10471656,.48);wc.position.set(-4,2,-3),nc.add(wc);var Tc=new ve(16764821,280,44,2);Tc.position.set(-3,7,4),nc.add(Tc),await Z(`作業台`),nc.add(Ks());var $=new A;$.position.set(0,ec,0),$.rotation.order=`XYZ`,nc.add($);function Ec(){let e=document.createElement(`canvas`);e.width=128,e.height=128;let t=e.getContext(`2d`),n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);n.addColorStop(0,`rgba(120, 190, 255, 0.55)`),n.addColorStop(.4,`rgba(80, 150, 220, 0.28)`),n.addColorStop(1,`rgba(40, 90, 160, 0)`),t.fillStyle=n,t.fillRect(0,0,128,128);let r=new B(e);r.colorSpace=s;let i=new E({map:r,transparent:!0,depthWrite:!1,blending:2}),a=new w(i);return a.scale.setScalar(Q*5.5),a.position.set(0,ec,-Q*1.4),a}nc.add(Ec());var Dc=new A;nc.add(Dc);function Oc(e=512,t=512){let n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`),i=r.createLinearGradient(0,0,e,0);i.addColorStop(0,`#0c0f14`),i.addColorStop(.5,`#171c24`),i.addColorStop(1,`#0c0f14`),r.fillStyle=i,r.fillRect(0,0,e,t);for(let n=0;n<140;n++){let n=Math.random()*e;r.strokeStyle=`rgba(120, 150, 180, ${.03+Math.random()*.06})`,r.lineWidth=1+Math.random(),r.beginPath(),r.moveTo(n,0),r.lineTo(n+(Math.random()-.5)*8,t),r.stroke()}let a=new B(n);return a.wrapS=C,a.wrapT=C,a.repeat.set(2,1),a.colorSpace=s,a}var kc=new m({map:Oc(),color:2765373,roughness:.32,metalness:.55,clearcoat:.7,clearcoatRoughness:.18,envMapIntensity:.5});function Ac(e,t,n,r=.035){let i=new L(t,e,n-r*2,48),a=new L(e,e-r,r,48);a.translate(0,-(n-r)/2,0);let o=new L(t-r,t,r,48);return o.translate(0,(n-r)/2,0),[i,a,o]}var jc=[],Mc=[];function Nc(e,t,n,r){Ac(e,t,n).forEach(e=>{e.translate(0,r,0),jc.push(e)})}Nc(1.85,1.65,.35,-1.9),Nc(1.65,1.45,.25,-1.65);function Pc(e=512,t=160){let n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`);return r.clearRect(0,0,e,t),r.font=`600 56px "Hiragino Maru Gothic ProN", "Yu Gothic", sans-serif`,r.textAlign=`center`,r.textBaseline=`middle`,r.fillStyle=`rgba(255, 236, 190, 0.5)`,r.fillText(`天青の晶玉`,e/2,t/2+4),r.fillStyle=`rgba(28, 16, 4, 0.95)`,r.fillText(`天青の晶玉`,e/2,t/2+1),new B(n)}var Fc=new g({color:12897494,metalness:.75,roughness:.24,envMapIntensity:1.4});Mc.push(new N(1.15,.32,.03).translate(0,-1.86,1.78));var Ic=new p({map:Pc(),transparent:!0}),Lc=new F(new v(1.05,.29),Ic);Lc.position.set(0,-1.86,1.797),Dc.add(Lc);var Rc=-1.75,zc=1.655,Bc=new F(new te(zc,.028,12,96),new p({color:6022399}));Bc.rotation.x=Math.PI/2,Bc.position.y=Rc,Dc.add(Bc);var Vc=new F(new te(zc,.1,12,96),new p({color:3787007,transparent:!0,opacity:.35,blending:2,depthWrite:!1}));Vc.rotation.x=Math.PI/2,Vc.position.y=Rc,Dc.add(Vc);var Hc=new F(new ie(1.5,48),new p({color:3127551,transparent:!0,opacity:.06,blending:2,depthWrite:!1,side:2}));Hc.rotation.x=-Math.PI/2,Hc.position.y=-1.635,Dc.add(Hc);var Uc=new F(new ie(.05,24),new p({color:9433087}));Uc.rotation.x=-Math.PI/2,Uc.position.y=-1.634,Dc.add(Uc),[[jc,kc],[Mc,Fc]].forEach(([e,t])=>{let n=e;if(n.length===0)return;let r=new F(da(n,!1),t);n.forEach(e=>e.dispose()),r.castShadow=!0,r.receiveShadow=!0,Dc.add(r)});var Wc=!0,Gc=document.querySelector(`#spin-toggle`);Gc.addEventListener(`click`,()=>{Wc=!Wc,Gc.classList.toggle(`is-off`,!Wc);let e=Wc?`自転を止める`:`自転を再開する`;Gc.title=e,Gc.setAttribute(`aria-label`,e)});var Kc=0,qc=0,Jc=3,Yc=0;function Xc(e,t,n,r){let i=0,a=!1,o=0,s=t=>{let n=e.getBoundingClientRect(),r=n.left+n.width/2,i=n.top+n.height/2;return Math.atan2(t.clientY-i,t.clientX-r)},c=e=>{i+=e,t.style.transform=`rotate(${i}rad)`};e.addEventListener(`pointerdown`,t=>{a=!0,e.setPointerCapture(t.pointerId),o=s(t)}),e.addEventListener(`pointermove`,e=>{if(!a)return;let t=s(e),r=t-o;r>Math.PI&&(r-=Math.PI*2),r<-Math.PI&&(r+=Math.PI*2),c(r),n(r/Jc),o=t});let l=t=>{a=!1,e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId)};e.addEventListener(`pointerup`,l),e.addEventListener(`pointercancel`,l),e.addEventListener(`keydown`,e=>{if(e.key!==r[0]&&e.key!==r[1])return;e.preventDefault();let t=(e.key===r[0]?-1:1)*.12;c(t),n(t/Jc)})}Xc(document.querySelector(`#yaw-dial`),document.querySelector(`#yaw-dial-tick`),e=>{qc+=e},[`ArrowLeft`,`ArrowRight`]),Xc(document.querySelector(`#pitch-dial`),document.querySelector(`#pitch-dial-tick`),e=>{Yc+=e},[`ArrowUp`,`ArrowDown`]);var Zc=new A;Zc.visible=!1;{let e=new F(new L(.05,.05,.006,20),new g({color:3123432,emissive:933724,roughness:.4}));e.position.y=.003,Zc.add(e)}$.add(Zc);var Qc=document.querySelector(`#flag-button`),$c=document.querySelector(`#flag-bubble`),el=document.querySelector(`#flag-bubble-coord`),tl=new P,nl=new P,rl=new S,il=new P,al=new x,ol=new P,sl=new P,cl=new P,ll=new P,ul=new ue(0,.18),dl=new P;Qc.addEventListener(`click`,()=>{al.setFromCamera(ul,rc),$.getWorldPosition(il);let e=new u(il,Q);al.ray.intersectSphere(e,dl)||dl.copy(rc.position).sub(il).setLength(Q).add(il),tl.copy(dl).sub(il).normalize(),$.getWorldQuaternion(rl),nl.copy(tl).applyQuaternion(rl.invert()).normalize();let t=Q+J(nl).display*$s;Zc.position.copy(nl).multiplyScalar(t),Zc.quaternion.setFromUnitVectors(new P(0,1,0),nl),Zc.visible=!0;let n=I.radToDeg(Math.asin(I.clamp(nl.y,-1,1))),r=I.radToDeg(Math.atan2(nl.z,-nl.x))+180;r>180&&(r-=360);let i=n>=0?`N`:`S`,a=r>=0?`E`:`W`;el.textContent=`${i} ${Math.abs(n).toFixed(1).padStart(4,`0`)}°  ${a} ${Math.abs(r).toFixed(1).padStart(5,`0`)}°`,$c.hidden=!1});var fl=document.querySelector(`#story-overlay`),pl=document.querySelector(`#story-button`),ml=document.querySelector(`#story-close`);pl.addEventListener(`click`,()=>{fl.hidden=!1}),ml.addEventListener(`click`,()=>{fl.hidden=!0}),fl.addEventListener(`click`,e=>{e.target===fl&&(fl.hidden=!0)});var hl=new ee,gl=!1,_l=null,vl=0;function yl(){gl||(gl=!0,bl())}function bl(){let e=hl.getElapsedTime();if(Wc){let t=Math.max(0,e-vl);Kc+=.15*t}if(vl=e,$.rotation.y=Kc+qc,$.rotation.x=Yc,$.rotation.z=0,_l?.(e),vc.uniforms.uTime.value=e,vc.uniforms.uFocusDistance.value=Math.max(rc.position.distanceTo($.position)-Q*.72,.5),gc.render(),Zc.visible)if(Zc.getWorldPosition(ol),$.getWorldPosition(sl),cl.copy(ol).sub(sl).normalize(),ll.copy(rc.position).sub(ol).normalize(),cl.dot(ll)>.08){let e=ol.clone().project(rc),t=(e.x*.5+.5)*window.innerWidth,n=(1-(e.y*.5+.5))*window.innerHeight;$c.style.display=``,$c.style.left=`${t}px`,$c.style.top=`${n}px`}else $c.style.display=`none`;requestAnimationFrame(bl)}yl(),await At(`/planet-canvas2/world-elevation.png`),await sn(`/planet-canvas2/world-climate.png`),await Z(`地形データ`);var xl=new T(Q,qs.globeSegments[0],qs.globeSegments[1]);ca(xl,Q,$s),await Z(`地形`);var Sl=qs.textureWidth,Cl=Sl/2;await Z(`地形`);var wl=hi(Sl/4,Cl/4);await Z(`起伏`);var Tl=sa(Sl/4,Cl/4);await Z(`海`);var El=Math.PI*2/60,Dl={uSeasonTilt:{value:0}},Ol={uSunDir:{value:Sc.position.clone().normalize()}},kl={uCloudShadow:{value:null},uCloudTime:{value:0},uOmegaScale:{value:1}};await Z(`街の灯り`);var Al=ia(Sl,Cl),jl=new m({map:wl,bumpMap:Tl,bumpScale:.005,roughness:.97,metalness:0,clearcoat:.16,clearcoatRoughness:.35,envMapIntensity:.18}),Ml=fr(Q,$s);jl.onBeforeCompile=e=>{e.uniforms.uSeasonTilt=Dl.uSeasonTilt,e.uniforms.uSeaRadius={value:Ml},e.uniforms.uSunDir=Ol.uSunDir,e.uniforms.uCityLights={value:Al},e.uniforms.uCloudShadow=kl.uCloudShadow,e.uniforms.uCloudTime=kl.uCloudTime,e.uniforms.uOmegaScale=kl.uOmegaScale,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying float vSeasonLat;
varying float vSeasonRadius;
varying vec3 vGlobeNormal;
varying vec3 vObjNormal;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
      vSeasonLat = normalize(position).y;
      vSeasonRadius = length(position);
      // the outward direction in world space, so the terminator follows the
      // globe as it turns under the fixed key light
      vGlobeNormal = mat3(modelMatrix) * normalize(position);
      // the *object*-space normal as well: the cloud deck is a child of the
      // globe, so its drift is described entirely in this frame
      vObjNormal = normalize(position);`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uSeasonTilt;
uniform float uSeaRadius;
uniform vec3 uSunDir;
uniform sampler2D uCityLights;
uniform sampler2D uCloudShadow;
uniform float uCloudTime;
uniform float uOmegaScale;
varying float vSeasonLat;
varying float vSeasonRadius;
varying vec3 vGlobeNormal;
varying vec3 vObjNormal;`+ho).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
      {
        float sun = dot(normalize(vGlobeNormal), uSunDir);
        // a soft terminator — a hard one reads as a stencil laid over the
        // globe rather than as the edge of the daylight
        // Narrowed from (0.16, -0.12) on request for more day/night
        // contrast — still soft enough not to read as a stencil, just a
        // tighter band so the transition itself is crisper.
        float night = smoothstep(0.12, -0.08, sun);
        // Raised from 2.4: with the night side darkened further below, the
        // lights need more headroom above that darker floor to still read
        // as distinct bright points instead of getting lost in a merely
        // dim rather than genuinely dark sky.
        totalEmissiveRadiance += texture2D(uCityLights, vMapUv).rgb * night * 3.6;

        // Dusk. Until now the only thing that happened at the terminator was
        // the city lights fading up out of nothing; the daylight itself just
        // ran out. On a real lit object the line carries two bands: a warm
        // one on the daylight side, where the light is grazing and reddened,
        // and a cold desaturated one just past it — the blue hour, ground
        // lit by sky rather than by sun. Both are windows on the same dot
        // product, feathered on both edges for the same reason the night
        // term above is: a hard edge reads as a stencil laid over the ball.
        // Added to emissive and multiplied by the surface's own colour, so
        // it tints the paint that is there instead of painting over it.
        // The strength and the width are both load-bearing, and the first
        // pass got both wrong in the same way. Multiplying purely by
        // diffuseColor makes the band proportional to albedo, so it showed
        // up on bright land and vanished on exactly the surface that most
        // needed it — the dark ocean, which is what the terminator crosses
        // for most of its length. And a window 0.08 wide in the dot product
        // is about four degrees of arc, roughly twenty pixels at this
        // framing, which tone mapping at exposure 1.9 then flattened away.
        // Measured on a hard zoom into the terminator: no visible band at
        // all. Widened, strengthened, and given a floor so the tint still
        // lands on dark water while still being the surface's own colour
        // that gets tinted.
        float warmBand = smoothstep(0.42, 0.06, sun) * smoothstep(-0.16, 0.04, sun);
        float coolBand = smoothstep(0.06, -0.12, sun) * smoothstep(-0.46, -0.22, sun);
        totalEmissiveRadiance +=
          mix(vec3(0.34), diffuseColor.rgb, 0.62) * vec3(1.0, 0.44, 0.14) * warmBand * 1.45;
        // Cut hard (0.95 -> 0.4) on request — "a strange vivid dark-blue
        // band". This "blue hour" cool band was already here and tuned
        // against the old, gentler colour grade; the saturation/contrast
        // lift added since (cameraPass.ts's uSaturation/uContrast, raised
        // when cel-shading was dropped for bloom+saturation instead) push
        // a saturated blue like this one much harder than the flatter grade
        // it was originally judged against, and it read as an odd painted
        // streak rather than a dusk tint once amplified that way.
        totalEmissiveRadiance +=
          mix(vec3(0.28), diffuseColor.rgb, 0.5) * vec3(0.26, 0.44, 0.95) * coolBand * 0.4;

        // G54: past the dusk bands, the rest of the night limb was simply
        // pure black — nothing at the silhouette edge at all. A grazing-
        // angle (Fresnel) term on the object's own normal and view
        // direction, gated to the night hemisphere so it never competes
        // with the sunlit side's own much stronger response, and kept
        // well under the dusk bands' strength so it reads as a whisper of
        // cool light tracing the curve of the ball rather than a halo —
        // not a revived atmosphere shell (gap-analysis §9 rules that back
        // out explicitly), just this object's own surface catching a rim
        // the way the resin ocean and every painted edge here already do.
        // Pushed a lot further on request: "brighten/light up the rim, the
        // way Earth actually reads from space." Exponent dropped again
        // (2.2 -> 1.5) so the band is wide enough to read as a halo hugging
        // the silhouette rather than a thin pencil line, and both gains
        // roughly doubled. Still no shell mesh — gap-analysis §9's ban on
        // reviving one stands — this is the same silhouette-only Fresnel
        // trick, just turned up until it actually looks like the reference
        // "glowing blue limb" instead of a whisper ACES quietly ate.
        float rimFresnel = pow(1.0 - clamp(dot(normalize(vViewPosition), normal), 0.0, 1.0), 1.5);
        // Headroom gate, on request after a reported white-blowout over
        // bright ice/snow: these two terms are a flat emissive *addition*,
        // with no notion of how much room the pixel underneath already has
        // before it hits white. Pushed to 0.85 without this, the day-rim
        // term in particular kept adding a bright sky-blue on top of
        // already near-white terrain (polar ice, snow-capped peaks) with
        // nothing to stop the sum sailing past what ACES can hold detail
        // for — a post-process knee downstream (cameraPass.ts) cannot
        // recover that once three's own tonemap has already clipped it to
        // flat (1,1,1) at *this* render, before cameraPass ever runs.
        // Scaling both rim terms by how much headroom the surface's own
        // albedo has left (1 - its luminance) means a dark ocean or forest
        // still gets the full glow, while already-bright snow gets little
        // to none, since it has nowhere left to go.
        float headroom = 1.0 - clamp(dot(diffuseColor.rgb, vec3(0.333)), 0.0, 1.0);
        // Pushed further again (0.55 -> 0.85, and the day term below the
        // same amount) alongside rimLight's own boost, on request for a
        // stronger silhouette edge overall.
        totalEmissiveRadiance += vec3(0.22, 0.42, 0.68) * rimFresnel * night * 0.85 * headroom;

        // A thin atmosphere, on request. Still not a revived shell mesh —
        // same constraint as the night rim just above, same technique (add
        // to this object's own emissive at its silhouette, no new geometry,
        // no new draw call) — just also gated to the *daylit* fraction
        // (1.0 - night) instead of only the night one, and given the
        // brighter, whiter sky-blue a sunlit limb actually has rather than
        // the night rim's cooler, dimmer tone.
        totalEmissiveRadiance += vec3(0.55, 0.75, 1.0) * rimFresnel * (1.0 - night) * 0.85 * headroom;

        // The far side's own colour, not just what lights it. Cutting the
        // ambient/fill/rim rig (see the note by their definitions) only goes
        // so far: three's tonemap pipeline recovers visibility from
        // whatever light survives however small, so a point that keeps its
        // full daylight albedo and is merely lit very dimly still reads as
        // an underexposed photo of daytime rather than as night. Darkening
        // the albedo itself, after the emissive terms above have already
        // read its true colour, is what actually sells "the sun isn't up
        // here" — city lights, the dusk bands and the rim above are all in
        // totalEmissiveRadiance, a separate accumulator, so none of them
        // are dimmed by this.
        // Deepened from 0.32: even with the fill/rim/ambient rig cut back
        // (see their own definitions), those lights are not gated by day/
        // night at all — they light the whole ball from fixed directions,
        // the way a photography rig would — so their contribution here was
        // only ever reduced in proportion to whatever this multiplier kept,
        // never zeroed. At 0.32 the far side still read as "dim daytime"
        // rather than night, which is also most of why the city lights
        // above struggled to read as bright points against it: they were
        // competing with a sky-and-ground base that was too bright to look
        // dark next to, not just under-lit lights.
        // Deepened again (0.14 -> 0.10) alongside the tighter terminator
        // above, for more day/night contrast.
        diffuseColor.rgb *= mix(1.0, 0.10, night);

        // Atmospheric perspective, on request ("新海誠的な" -- his wide
        // shots always cool and desaturate toward the horizon, standing in
        // for miles of haze between the viewer and the far ground). This
        // globe has no real distance for haze to travel across, so the
        // grazing-angle rimFresnel above is reused as the stand-in: it is
        // already exactly "how close to the silhouette is this point",
        // which is the one variable that would drive real atmospheric
        // perspective on an actual planet limb. Desaturating and cooling
        // the *albedo* here (not just adding an emissive glow, which the
        // rim terms above already do) is what actually reads as haze
        // sitting in front of the terrain rather than a light shining on
        // it. Strengthened again (0.22 -> 0.4) on request ("陸地の空気遠
        // 近法強くできない？海と同じように") -- land's higher-frequency
        // biome colour was eating the same 0.22 mix the more uniform blue
        // ocean read clearly, so land needed a stronger push to land in
        // the same visual place, not a smaller one.
        // Widened again on request ("空気遠近法弱くない？") -- pow'd down
        // to 0.5 rather than just raising the mix strength further:
        // rimFresnel's own 1.5 exponent (shared with the glow terms above,
        // which should stay narrow) only lights up right at the actual
        // silhouette, so a strength-only increase made the very edge hazier
        // without the haze reaching perceptibly further inward. A
        // sub-1 power on the 0..1 fresnel value pulls its whole curve up,
        // extending the visible haze band in from the edge instead of just
        // darkening/greying that thin edge line harder.
        float aerial = pow(rimFresnel, 0.5) * 0.55;
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.62, 0.7, 0.82), aerial);
      }`).replace(`#include <map_fragment>`,`#include <map_fragment>
      // G38: how much this point is "cold enough for a passing storm to
      // lay down snow, even if it is outside where snow survives for
      // good" — declared out here, rather than inside either block below,
      // because both the fresh-snow pass and the wet-ground pass need it:
      // a storm cell cold enough to snow should not also get the "rained
      // on" mud darkening a warm one does.
      float freshSnowGate = 0.0;
      {
        float landMask = smoothstep(uSeaRadius - 0.01, uSeaRadius + 0.01, vSeasonRadius);
        float seasonalFactor = uSeasonTilt * vSeasonLat;
        float winterAmount = clamp(-seasonalFactor, 0.0, 1.0);
        float snowLine = mix(0.82, 0.5, winterAmount);
        float seasonalSnow = smoothstep(snowLine, snowLine + 0.14, abs(vSeasonLat)) * winterAmount * landMask;
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.799, 0.855, 0.888), seasonalSnow * 0.8);

        // Fresh snow, riding on top of the settled line rather than
        // replacing it. seasonalSnow above is the climatological floor —
        // where winter has settled in for good — but a cloud passing
        // slightly outside that band can still lay snow down, and it does
        // not survive there the way the permanent line does.
        //
        // rainWet (the wet-ground pass below) is the wrong signal to
        // reuse here even though it looks tailor-made: its "raining now"
        // flag is only ever stamped by storm/typhoon bands (clouds.ts's
        // rainingAtBake), and storm is a type this deck only assigns in
        // the tropics — it never occurs at a latitude cold enough for
        // this gate to be nonzero. Reusing it would have shipped a term
        // that could never actually fire. Coverage — cloudCoverAt, any
        // band type, the same red channel cloudShade already reads —
        // does exist this far out, so that is the signal snow rides on:
        // ground under a cold, sufficiently thick cloud gets fresh white
        // laid on top. It fades as the deck drifts off again, which is
        // this project's usual proxy for melt (§2-22's wet ground is the
        // same idea for rain).
        freshSnowGate = smoothstep(snowLine - 0.4, snowLine, abs(vSeasonLat)) * winterAmount * landMask;
        float freshSnow = smoothstep(0.12, 0.4, cloudCoverAt(vObjNormal)) * freshSnowGate;
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.86, 0.9, 0.93), freshSnow * 0.55);
      }
      // Cloud shade. Applied to the albedo rather than to the light so it
      // costs nothing extra and darkens the ground the way an overcast
      // does — the land keeps its own colour, it just receives less.
      diffuseColor.rgb *= cloudShade(vObjNormal, 0.38);
      // Wet ground. Rock and soil that has just been rained on is darker,
      // and that is the whole of it here: the paint keeps its hue and
      // loses a fifth of its value. Multiplied, never subtracted — a
      // constant taken off a linear colour clamps the dark parts to black
      // and draws a hard key line round everything (§2-15) — and left out
      // of the gloss entirely, because "only the sea is shiny" is a
      // standing decision about this object, not an oversight (§2-18).
      {
        // Land only. The sea does not get wet, and the painted ocean under
        // the glass shell is part of this same map — darkening it here
        // would have put a "rained on" patch on the one surface in the
        // scene that cannot be. Cold ground is excluded too (1 -
        // freshSnowGate) — that precipitation already went white above,
        // not dark.
        float wetLand = smoothstep(uSeaRadius - 0.01, uSeaRadius + 0.01, vSeasonRadius);
        diffuseColor.rgb *= 1.0 - rainWet(vObjNormal) * wetLand * (1.0 - freshSnowGate) * 0.2;
      }`)};var Nl=new F(xl,jl);Nl.castShadow=!0,Nl.receiveShadow=!0,$.add(Nl),await Z(`地形（精細化）`);var Pl=hi(Sl,Cl),Fl=sa(Sl,Cl);jl.map=Pl,jl.bumpMap=Fl,jl.needsUpdate=!0,wl.dispose(),Tl.dispose();var Il=new T(fr(Q,$s),qs.oceanSegments[0],qs.oceanSegments[1]);la(Il,fr(Q,$s),.004),ua(Il,.004);var Ll=aa(Sl,Cl);await Z(`水面`);var Rl=oa();await Z(`植生`);function zl(e,t,n){let r=new P(e,t,n).normalize(),i=new P().crossVectors(r,new P(0,1,0)).normalize();return{axis:r,right:i,up:new P().crossVectors(i,r).normalize()}}var Bl=zl(-3,6.4,4),Vl=zl(5,1.5,-1.6),Hl=`
  vec3 sourceLobe(
    vec3 mirrorDir, vec3 axis, vec3 right, vec3 up,
    vec2 halfSize, float corner, float feather
  ) {
    vec2 q = vec2(dot(mirrorDir, right), dot(mirrorDir, up));
    vec2 d = abs(q) - halfSize + corner;
    float sd = min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - corner;
    // the emitter is in front of the surface, not behind it
    float front = step(0.0, dot(mirrorDir, axis));
    // the shorter half-axis is the only length scale the interior has
    float depth = min(halfSize.x, halfSize.y);
    return front * vec3(
      smoothstep(0.0, -depth * 0.9, sd),
      smoothstep(feather * 0.34, -feather * 0.12, sd),
      smoothstep(feather * 1.2, -feather * 0.05, sd));
  }
`,Ul=null,Wl=new m({map:Ll,bumpMap:Rl,bumpScale:.012,transparent:!0,opacity:.92,roughness:.3,metalness:0,clearcoat:.85,clearcoatRoughness:.16,ior:1.5,envMapIntensity:.35});Wl.onBeforeCompile=e=>{e.uniforms.uTime={value:0},e.uniforms.uSeasonTilt=Dl.uSeasonTilt,e.uniforms.uSunDir=Ol.uSunDir,e.uniforms.uCloudShadow=kl.uCloudShadow,e.uniforms.uCloudTime=kl.uCloudTime,e.uniforms.uOmegaScale=kl.uOmegaScale,e.uniforms.uLampAxis={value:Bl.axis},e.uniforms.uLampRight={value:Bl.right},e.uniforms.uLampUp={value:Bl.up},e.uniforms.uCardAxis={value:Vl.axis},e.uniforms.uCardRight={value:Vl.right},e.uniforms.uCardUp={value:Vl.up},e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform float uTime;
uniform sampler2D uCloudShadow;
uniform float uOmegaScale;
varying vec3 vOceanNormal;
varying vec3 vObjNormal;`).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
      // The swell, and — the part that was missing — its slope.
      //
      // There has been a vertex swell on this sphere for a long time and it
      // could not be seen, for a reason worth writing down: it moved the
      // vertices and left the normal alone. A displacement that does not
      // change the shading normal can only be seen in the silhouette, and
      // this one stood 0.002 units tall on a globe carrying about 108
      // pixels per unit — a fifth of a pixel. It was a wave the light knew
      // nothing about.
      //
      // Both waves are plain sinusoids in object space, so their gradient
      // is closed form: d/dp of A*sin(k·p + wt) is A*k*cos(k·p + wt). The
      // surface is p + n*s(p), so tilting the normal against the part of
      // that gradient which lies along the surface is the whole of it —
      // exact, four cosines, no finite differences and no extra passes.
      // What the eye reads is the *slope* A*|k|, not the height, and this
      // surface is far more sensitive to it than open water would be —
      // the clearcoat is sharp (roughness 0.16) and the sea is nearly the
      // darkest thing on the sphere, so a tilt that reflects the room
      // instead of the lamp goes almost black. The first pass ran at four
      // degrees and laid visible dark diagonal streaks across both oceans:
      // a corduroy of swell rather than a sheet of poured resin with a
      // slow movement in it. Half that is where it stops announcing the
      // wave vector and starts reading as water.
      vec3 oceanUp = normalize(position);
      // The swell travels with the wind belt it is in, which is the last
      // thing on this planet that was still turning as one rigid piece.
      //
      // The wind profile itself is not repeated here. clouds.ts bakes each
      // latitude's drift rate into the green channel of the cloud-shade map
      // — row-constant, decoded exactly as cloudShade does it in the
      // fragment stage — and this shader already has that texture bound for
      // the shade. So the sea reads the same trades and westerlies the sky
      // does, off a texture fetch that costs nothing, instead of carrying a
      // second copy of zonalWind() in GLSL that would drift out of step the
      // first time anyone tuned one of them.
      float oceanLat = asin(clamp(oceanUp.y, -1.0, 1.0));
      float oceanOmega =
        (texture2D(uCloudShadow, vec2(0.5, oceanLat / 3.14159265 + 0.5)).g - 0.5) * uOmegaScale;
      // Turning the sample point back by omega*t is the same as sliding the
      // whole wave field forward along the parallel: east in the
      // westerlies, west in the trades, and stalled at the doldrums and the
      // horse latitudes where the profile crosses zero.
      float oceanDrift = -oceanOmega * uTime * 12.0;
      float driftCos = cos(oceanDrift);
      float driftSin = sin(oceanDrift);
      vec2 oceanXZ = vec2(
        position.x * driftCos - position.z * driftSin,
        position.x * driftSin + position.z * driftCos
      );
      float wavePhaseA = oceanXZ.x * 9.0 + oceanXZ.y * 5.5 + uTime * 1.1;
      float wavePhaseB = oceanXZ.x * 4.5 - oceanXZ.y * 6.5 - uTime * 0.7;
      float oceanSwell = sin(wavePhaseA) * 0.0034 + sin(wavePhaseB) * 0.0024;
      // Gradients in the drifted frame, rotated back into object space —
      // the wave vectors turn with the sample point, so the crests keep
      // running the way the wind put them however far the field has slid.
      vec2 kA = vec2(9.0, 5.5);
      vec2 kB = vec2(4.5, -6.5);
      vec2 gradXZ = kA * (cos(wavePhaseA) * 0.0034) + kB * (cos(wavePhaseB) * 0.0024);
      vec3 oceanGrad = vec3(
        gradXZ.x * driftCos + gradXZ.y * driftSin,
        0.0,
        -gradXZ.x * driftSin + gradXZ.y * driftCos
      );
      // only the component along the surface tilts it; the radial part is
      // just the height change, which the displacement below already does
      oceanGrad -= oceanUp * dot(oceanUp, oceanGrad);
      objectNormal = normalize(oceanUp - oceanGrad);`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
      // Wavelength, set against the mesh rather than by eye. At a
      // wavenumber of 9 the swell runs about 0.7 radians from crest to
      // crest, and the ocean shell (SETTINGS.oceanSegments) puts eight or
      // nine vertices across that — the old pair ran at 14 and 6 on a
      // 76-segment shell, which is two or three vertices per wavelength,
      // i.e. below the point where a sine can exist at all in the
      // geometry. Anything finer than this belongs in the bump map, which
      // is not tessellation-limited.
      transformed += oceanUp * oceanSwell;
      // same world-space outward direction the globe material carries, for
      // the same reason: the terminator has to travel with the sphere as it
      // turns under the fixed key light. Deliberately the *undisturbed*
      // radial, not the swell-tilted normal above: day and night are a
      // property of where this point is on the planet, and letting a wave
      // tilt it would make the terminator crawl with the swell.
      vOceanNormal = mat3(modelMatrix) * oceanUp;
      // and the object-space one, which is the frame the cloud deck drifts in
      vObjNormal = oceanUp;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uSeasonTilt;
uniform vec3 uSunDir;
varying vec3 vOceanNormal;
uniform sampler2D uCloudShadow;
uniform float uCloudTime;
uniform float uOmegaScale;
varying vec3 vObjNormal;
uniform vec3 uLampAxis;
uniform vec3 uLampRight;
uniform vec3 uLampUp;
uniform vec3 uCardAxis;
uniform vec3 uCardRight;
uniform vec3 uCardUp;`+ho+Hl).replace(`#include <lights_fragment_begin>`,`#ifdef USE_CLEARCOAT
        float oceanSharpClearcoat = material.clearcoatRoughness;
        material.clearcoatRoughness = 0.52;
      #endif
      #include <lights_fragment_begin>
      #ifdef USE_CLEARCOAT
        material.clearcoatRoughness = oceanSharpClearcoat;
      #endif`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
      {
        vec3 worldNormal = transformDirectionByInverseViewMatrix(geometryNormal, viewMatrix);
        vec3 worldView = transformDirectionByInverseViewMatrix(geometryViewDir, viewMatrix);
        vec3 mirrorDir = reflect(-worldView, worldNormal);

        vec3 lamp = sourceLobe(
          mirrorDir, uLampAxis, uLampRight, uLampUp, vec2(0.26, 0.15), 0.07, 0.20);
        vec3 card = sourceLobe(
          mirrorDir, uCardAxis, uCardRight, uCardUp, vec2(0.55, 0.30), 0.15, 0.45);

        // A reflection gets stronger toward the limb, and on a sphere that
        // is most of what stops a highlight looking pasted on. Deliberately
        // a gentle version of Schlick rather than the real thing: the full
        // fifth power makes the shade invisible over the middle of the disc,
        // where this one has to live.
        float grazing = pow(1.0 - saturate(dot(worldNormal, worldView)), 4.0);
        float sheen = mix(0.85, 1.5, grazing);

        // Peak about 0.64 linear once the 0.85 clearcoat weighting further
        // down has taken its cut, which at exposure 1.9 through ACES comes
        // out just short of clipping: bright enough to be the brightest
        // thing on the sphere, graded enough that it is still a surface.
        // The face on its own at 0.78 (the first attempt) clipped flat
        // across its whole width and read as a hole cut in the ocean.
        vec3 shaped =
          vec3(1.0, 0.94, 0.84) * (lamp.y * 0.40 + lamp.x * 0.34 + lamp.z * 0.14) * sheen
          + vec3(0.92, 0.78, 0.58) * (card.y * 0.030 + card.z * 0.018) * sheen;

        // G16: sun glint. The lamp reflection above is built from
        // geometryNormal — the smooth macro swell — which is exactly what
        // makes it read as one coherent softbox. Real glitter on choppy
        // water is the opposite: hundreds of wave facets each catching the
        // light at a slightly different tilt, breaking one highlight into a
        // scattered field of sparkle. normal at this point already
        // carries the bump map's per-texel wave tilt (normal_fragment_maps
        // runs before this chunk) — reused here rather than adding a
        // second noise source, the same rule this project keeps following.
        // A narrow lobe is what turns that per-texel tilt into visible
        // sparkle: wide enough to miss it, this would just be a slightly
        // softer version of the same blob.
        vec3 glintNormal = transformDirectionByInverseViewMatrix(normal, viewMatrix);
        vec3 glintMirror = reflect(-worldView, glintNormal);
        vec3 glintLamp = sourceLobe(
          glintMirror, uLampAxis, uLampRight, uLampUp, vec2(0.05, 0.03), 0.01, 0.05);
        // Confined to the lamp's own spill (lamp.z) so the sparkle reads as
        // texture *inside* that reflection, not noise scattered over the
        // whole sea.
        vec3 glint = vec3(1.0, 0.97, 0.9) * glintLamp.y * lamp.z * 2.2;

        #ifdef USE_CLEARCOAT
          clearcoatSpecularDirect += shaped + glint;
        #else
          reflectedLight.directSpecular += shaped + glint;
        #endif
      }`).replace(`#include <map_fragment>`,`#include <map_fragment>
      // Sea ice, and the one part of this planet whose *shape* has a season.
      //
      // Everything seasonal so far changes a colour in place: the foliage
      // turns, the snow line slides, the rain belt moves. The pack is the
      // thing a viewer already knows moves — it is the picture everyone has
      // of a warming planet — and it is the only place on this globe where
      // the outline of the water itself changes through the year.
      //
      // Same construction as the land's snow line above and deliberately
      // so: local winter is uSeasonTilt and this fragment's own latitude
      // carrying opposite signs, and it drives the edge equatorward. The
      // limits are the real ones in sin(latitude), which is the honest
      // parameter here because it is also the one the eye reads as area:
      // 0.93 is about 68 degrees, roughly September's Arctic minimum, and
      // 0.82 is about 55, roughly March's maximum down the Labrador and
      // Bering coasts. Antarctica gets the same band for free, half a year
      // out of step, which is correct.
      //
      // Costs nothing: no re-bake, no texture, no draw call, a dozen
      // instructions on a pass the shell already runs.
      float iceLat = vObjNormal.y;
      float iceWinter = clamp(-uSeasonTilt * iceLat, 0.0, 1.0);
      // A pack edge is not a circle of latitude. Two harmonics in longitude
      // is enough to say so at this size — it wanders about three degrees,
      // which is a couple of pixels of raggedness on the limb.
      float iceLon = atan(vObjNormal.z, vObjNormal.x);
      float iceWobble = sin(iceLon * 7.0) * 0.012 + sin(iceLon * 13.0 + 1.7) * 0.008;
      float iceEdge = mix(0.93, 0.82, iceWinter) + iceWobble;
      float seaIceAmount = smoothstep(iceEdge, iceEdge + 0.05, abs(iceLat));
      // G30: floes and leads. iceWobble above shapes where the pack
      // *starts*; this shapes what it looks like once you're in it — real
      // pack ice is broken into floes with narrow leads of open water
      // between them, not a solid plate. A second, much faster sin pair
      // (frequencies unrelated to the edge wobble's 7/13, so the two
      // patterns don't beat against each other) punches gaps well inside
      // the ice, tapering to nothing right at the edge so that wobble
      // stays clean and legible.
      float floeNoise = sin(iceLon * 41.0 + iceLat * 53.0) + sin(iceLon * 97.0 - iceLat * 31.0 + 2.1);
      float floeDepth = smoothstep(iceEdge + 0.1, iceEdge + 0.22, abs(iceLat));
      float leadGap = smoothstep(0.7, 1.35, floeNoise) * floeDepth;
      seaIceAmount *= 1.0 - leadGap * 0.45;

      // The sea takes the shade harder than the land does. Open water has
      // almost no texture of its own to carry the eye, so cloud shadows
      // crossing it end up being most of what says the sea is a surface
      // under a sky rather than a painted blue field — which is where the
      // absence of shadows was doing the most damage.
      diffuseColor.rgb *= cloudShade(vObjNormal, 0.62);

      // Matched to the land's snow so the pack and the shore agree where
      // they meet, a shade darker because it is ice over water rather than
      // snow over ground. Opaque, too: the shell's alpha is a depth ramp
      // and the sea under the pack is deep, so without this the ice would
      // be a pale film with the abyss showing through it.
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.74, 0.80, 0.85), seaIceAmount * 0.92);
      diffuseColor.a = max(diffuseColor.a, seaIceAmount * 0.97);`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
      // Rain stipples the water.
      //
      // The one place this project can show rain landing. On the ground it
      // would be a change of paint value under a canopy that hides the
      // ground (§2-16); on the sea it is a change of *finish*, and the sea
      // here is a sheet of poured resin whose whole character is its
      // gloss. Water under a shower is not glassy — the drops break the
      // surface into a matte, scattering skin — so the same wet channel
      // that darkens soil roughens this instead. Nothing else about the
      // sea changes: it is still the only shiny thing in the scene, just
      // not shiny under a storm.
      roughnessFactor = mix(roughnessFactor, 0.78, rainWet(vObjNormal) * 0.85);
      // Pack ice is the one part of this sea that is not poured resin. Left
      // glassy it reads as a white *reflection* sliding over the water
      // rather than as something floating on it.
      roughnessFactor = mix(roughnessFactor, 0.88, seaIceAmount);`).replace(`#include <lights_physical_fragment>`,`#include <lights_physical_fragment>
      // and the clearcoat with it — the resin's gloss lives almost
      // entirely in this term (clearcoat 0.85 at roughness 0.16), so
      // roughening the base alone would have changed a number without
      // changing the picture.
      material.clearcoatRoughness = mix(material.clearcoatRoughness, 0.55, rainWet(vObjNormal) * 0.85);
      material.clearcoat = mix(material.clearcoat, 0.06, seaIceAmount);
      material.clearcoatRoughness = mix(material.clearcoatRoughness, 0.7, seaIceAmount);`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
      {
        vec3 oceanN = normalize(vOceanNormal);
        float sun = dot(oceanN, uSunDir);
        // Narrowed to match the globe material's tighter terminator.
        float night = smoothstep(0.06, -0.12, sun);
        // broad, then a tighter core: a wide sheen over the whole night sea
        // with a brighter patch where the moon would stand overhead
        float moon = max(-sun, 0.0);
        // G25: this highlight has always stood in for a moon rather than
        // showing one — there is no open sky in this scene to hang a disc
        // in, only the fixed study-wall backdrop, and a floating moon
        // pasted over that photo is exactly the "two photos composited"
        // failure mode this project has turned down before (see the
        // rejected support-wire idea in the gap analysis). A moon that
        // never phases isn't finishing the job, though, so the sheen
        // itself waxes and wanes: a slow cycle, deliberately not locked to
        // the day (42s) or the year (60s) so it doesn't read as tied to
        // either, between a dim near-new sea and the full brightness
        // tuned below.
        float moonPhase = 0.55 + 0.45 * cos(uCloudTime * 0.257);
        float sheen = (moon * 0.10 + pow(moon, 6.0) * 0.16) * moonPhase;
        totalEmissiveRadiance += vec3(0.34, 0.46, 0.72) * sheen * night;

        // Same two bands as the globe material, at the same widths, so the
        // sea does not leave dusk at a different moment than the coast it
        // touches. The warm one is deliberately much weaker here than on
        // land, and that is not timidity: orange light added to dark blue
        // water does not read as sunset, it reads as dirt. Measured at the
        // land strength the whole ocean side of the terminator went a muddy
        // brown-mauve. On water the cool band carries the moment instead,
        // which is also what water actually does — it holds the sky's blue
        // long after the land beside it has gone dark.
        float warmBand = smoothstep(0.42, 0.06, sun) * smoothstep(-0.16, 0.04, sun);
        float coolBand = smoothstep(0.06, -0.12, sun) * smoothstep(-0.46, -0.22, sun);
        totalEmissiveRadiance += diffuseColor.rgb * vec3(1.0, 0.5, 0.2) * warmBand * 0.5;
        // Cut alongside the matching term in the globe material — see its
        // note. The ocean is where this read worst: a saturated blue band
        // on already-dark water, further amplified by the later colour
        // grade, looked like a stripe painted across the sea rather than a
        // dusk tint on it.
        totalEmissiveRadiance +=
          mix(vec3(0.26), diffuseColor.rgb, 0.5) * vec3(0.26, 0.46, 0.98) * coolBand * 0.35;

        // Same silhouette rim the globe material carries (main.ts's other
        // onBeforeCompile), added here too rather than left to the land
        // alone: the ocean shell is the outer surface at a good third of
        // the limb on any given view (open water is most of the planet),
        // so a glow that only ever appeared over land read as a broken
        // ring — bright over continents, gapped over the Pacific.
        float oceanRim = pow(1.0 - clamp(dot(normalize(vViewPosition), normal), 0.0, 1.0), 1.5);
        // Matching the globe material's own rim boost, so the silhouette
        // doesn't get brighter over land and stay dim wherever the limb
        // happens to be open water. Same headroom gate as the globe
        // material's matching terms too -- sea ice can read as bright as
        // snow, so this isn't purely a land-only concern.
        float oceanHeadroom = 1.0 - clamp(dot(diffuseColor.rgb, vec3(0.333)), 0.0, 1.0);
        totalEmissiveRadiance += vec3(0.22, 0.42, 0.68) * oceanRim * night * 0.85 * oceanHeadroom;
        totalEmissiveRadiance += vec3(0.55, 0.75, 1.0) * oceanRim * (1.0 - night) * 0.85 * oceanHeadroom;

        // Same atmospheric-perspective desaturation the globe material
        // carries toward its own limb (see its note, including the
        // pow(...,0.5) widening) -- applied here too so the sea doesn't
        // stay saturated blue right up to the edge while the coastline
        // beside it fades to haze.
        float oceanAerial = pow(oceanRim, 0.5) * 0.55;
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.62, 0.7, 0.82), oceanAerial);
      }`),Ul=e.uniforms};var Gl=new F(Il,Wl);Gl.receiveShadow=!0,$.add(Gl),await Z(`生物相`);var Kl=La(Q,$s,Dl);Kl.traverse(e=>{e.isMesh&&(e.receiveShadow=!0)}),$.add(Kl),await Z(`雲`);var ql=_o(Q,Dl,Ol.uSunDir.value,$s);kl.uCloudShadow.value=ql.shadowTexture,kl.uOmegaScale.value=ql.omegaScale,$.add(ql.group),await Z(`降雪`);var Jl=jo(Q,Dl,pc.getPixelRatio());$.add(Jl.points),await Z(`霧`);var Yl=Ao(Q,$s,Dl,Ol.uSunDir.value);$.add(Yl.mesh),await Z(`オーロラ`);var Xl=To(Q,Ol);$.add(Xl.mesh),await Z(`火山`);var Zl=Ro(Q,$s,pc.getPixelRatio(),Ol.uSunDir.value,Qa,Dl);$.add(Zl.group),await Z(`名所`),$.add(As(Q,$s)),await Z(`氷山`),$.add(Fs(Q,$s)),await Z(`航路`);var Ql=Qo(Q,$s,Ol.uSunDir.value);$.add(Ql.group);var $l=Yo(Q);$.add($l.group);var eu=new A;eu.position.copy($.position),eu.rotation.z=0,nc.add(eu);var tu=Ko(Q);eu.add(tu.group),window.addEventListener(`resize`,()=>{rc.aspect=window.innerWidth/window.innerHeight,rc.updateProjectionMatrix(),pc.setSize(window.innerWidth,window.innerHeight),gc.setSize(window.innerWidth,window.innerHeight),mc.image.width=window.innerWidth,mc.image.height=window.innerHeight,mc.needsUpdate=!0,vc.uniforms.uResolution.value.set(window.innerWidth,window.innerHeight);let e=uc();rc.position.set(e.x,e.y,e.z),rc.lookAt(0,lc(),0)}),_l=e=>{Rl.offset.x=e*.006,Rl.offset.y=Math.sin(e*.15)*.01,Ul&&(Ul.uTime.value=e),ql.tick(e),Jl.tick(e),Yl.tick(e),Xl.tick(e),Zl.tick(e),Ql.tick(e),$l.tick(e),tu.tick(e),Dl.uSeasonTilt.value=Math.sin(e*El)};var nu=document.querySelector(`#loading-screen`);nu&&(nu.classList.add(`is-done`),nu.addEventListener(`transitionend`,()=>nu.remove(),{once:!0}),window.setTimeout(()=>nu.remove(),1200));