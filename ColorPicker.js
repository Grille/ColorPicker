"use strict";
class ColorPicker{
  //--buildColorPicker---------------------------------------------------------------------------------------------------------------------------------
    constructor() {
      //logik
      this.posX=0;
      this.posY=0;
      this.colorHSV = [0,0,0];
      this.colorRGB = [0,0,0];
      this.mouseDown = false;
      this.aktiveElementObj = null;
      this.aktiveElement = 0;

      //html
      this.htmlDiv;
      this.htmlFrame;
      this.htmlObj = [];
      this.htmlCanvas;
      this.htmlLeverY;
      this.htmlLeverX = [];
      this.htmlTxtX = [];
      this.htmlLabelX = [];
      this.htmlButOk;
      this.htmlButClose;
      this.htmlOldColorLabel;
      this.htmlCurColorLabel;
      this.htmlOldColor;
      this.htmlCurColor;
      this.htmlPalette = [];

      //window style
      this.fontColor
      this.inputColor
      this.leverColor
      this.backColor
      this.frameColor
      this.border
      this.font

      //color ref
      this.ColorRef

      //start colorPicker
      this.buildHTML();
      this.addEvents();
    }
    buildHTML(){
      this.htmlDiv = document.createElement('div');
      this.htmlDiv.style.position = "absolute";
      this.htmlDiv.style.display = "none";
      this.htmlDiv.style.width = "470px";
      this.htmlDiv.style.height = "300px";
      document.body.appendChild(this.htmlDiv);

      this.htmlFrame = document.createElement('div');
      this.htmlFrame.style.position = "absolute";
      this.htmlFrame.style.left = "0px";this.htmlFrame.style.top = "0px";
      this.htmlFrame.style.width = "470px";this.htmlFrame.style.height = "20px";
      this.htmlDiv.appendChild(this.htmlFrame);

      this.htmlCurColor = document.createElement('canvas');
      this.htmlCurColor.style.position = "absolute";
      this.htmlCurColor.style.left = "50px";this.htmlCurColor.style.top = "230px";
      this.htmlCurColor.width = 160;this.htmlCurColor.height = 20;
      this.htmlDiv.appendChild(this.htmlCurColor);
      this.htmlOldColor = document.createElement('canvas');
      this.htmlOldColor.style.position = "absolute";
      this.htmlOldColor.style.left = "50px";this.htmlOldColor.style.top = "210px";
      this.htmlOldColor.width = 160;this.htmlOldColor.height = 20;
      this.htmlDiv.appendChild(this.htmlOldColor);

      this.htmlCurColorLabel = document.createElement('label');
      this.htmlCurColorLabel.style.position = "absolute";
      this.htmlCurColorLabel.innerHTML  = "cur:";
      this.htmlCurColorLabel.style.left = "10px";this.htmlCurColorLabel.style.top = "230px";
      this.htmlCurColorLabel.style.height = "20px";
      this.htmlDiv.appendChild(this.htmlCurColorLabel);
      this.htmlOldColorLabel = document.createElement('label');
      this.htmlOldColorLabel.style.position = "absolute";
      this.htmlOldColorLabel.innerHTML  = "old:";
      this.htmlOldColorLabel.style.left = "10px";this.htmlOldColorLabel.style.top = "210px";
      this.htmlOldColorLabel.style.height = "20px";
      this.htmlDiv.appendChild(this.htmlOldColorLabel);




      this.htmlButOk = document.createElement('button');
      this.htmlButOk.style.position = "absolute";
      this.htmlButOk.style.left = "10px";this.htmlButOk.style.top = "260px";
      this.htmlButOk.style.width = "95px";this.htmlButOk.style.height = "30px";
      this.htmlButOk.innerHTML = "OK";
      this.htmlDiv.appendChild(this.htmlButOk);

      this.htmlButClose = document.createElement('button');
      this.htmlButClose.style.position = "absolute";
      this.htmlButClose.style.left = "115px";this.htmlButClose.style.top = "260px";
      this.htmlButClose.style.width = "95px";this.htmlButClose.style.height = "30px";
      this.htmlButClose.innerHTML = "Close";
      this.htmlDiv.appendChild(this.htmlButClose);

      this.htmlCanvas = document.createElement('canvas');
      this.htmlCanvas.style.position = "absolute";
      this.htmlCanvas.style.left = "10px";this.htmlCanvas.style.top = "30px";
      this.htmlCanvas.width = 170;this.htmlCanvas.height = 170;
      this.htmlDiv.appendChild(this.htmlCanvas);

      this.htmlLeverY = document.createElement('canvas');
      this.htmlLeverY.style.position = "absolute";
      this.htmlLeverY.style.left = "190px";this.htmlLeverY.style.top = "30px";
      this.htmlLeverY.width = 20;this.htmlLeverY.height = 170;
      this.htmlDiv.appendChild(this.htmlLeverY);

      let identifier = ["H","S","V","R","G","B"];
      for(let i=0;i<6;i++){

        this.htmlLabelX[i] = document.createElement('label');
        this.htmlLabelX[i].style.position = "absolute";
        this.htmlLabelX[i].innerHTML  = identifier[i]+":";
        this.htmlLabelX[i].style.left = "240px";this.htmlLabelX[i].style.top = (30*(i+1))+"px";
        this.htmlLabelX[i].style.width = "20px";this.htmlLabelX[i].style.height = "20px";
        this.htmlDiv.appendChild(this.htmlLabelX[i]);

        this.htmlLeverX[i] = document.createElement('canvas');
        this.htmlLeverX[i].style.position = "absolute";
        this.htmlLeverX[i].style.left = "270px";this.htmlLeverX[i].style.top = 30*(i+1)+"px";
        this.htmlLeverX[i].width = 140;this.htmlLeverX[i].height = 20;
        this.htmlDiv.appendChild(this.htmlLeverX[i]);


        this.htmlTxtX[i] = document.createElement('input');
        this.htmlTxtX[i].style.position = "absolute";
        this.htmlTxtX[i].style.left = "420px";this.htmlTxtX[i].style.top = (30*(i+1))+"px";
        this.htmlTxtX[i].style.width = "40px";this.htmlTxtX[i].style.height = "20px";
        this.htmlDiv.appendChild(this.htmlTxtX[i]);
      }
      for(let i=0;i<7;i++){
        this.htmlPalette[i] = document.createElement('canvas');
        this.htmlPalette[i].style.position = "absolute";
        this.htmlPalette[i].style.left = (290+25*i)+"px";this.htmlPalette[i].style.top = "240px";
        this.htmlPalette[i].width = 22;this.htmlPalette[i].height = 22;
        this.htmlDiv.appendChild(this.htmlPalette[i]);
      }
      for(let i=7;i<14;i++){
        this.htmlPalette[i] = document.createElement('canvas');
        this.htmlPalette[i].style.position = "absolute";
        this.htmlPalette[i].style.left = (290+25*(i-7))+"px";this.htmlPalette[i].style.top = "265px";
        this.htmlPalette[i].width = 22;this.htmlPalette[i].height = 22;
        this.htmlDiv.appendChild(this.htmlPalette[i]);
      }
    }
    setStyle(fontColor,inputColor,leverColor,backColor,frameColor,border,font){
      this.fontColor = fontColor;
      this.inputColor = inputColor;
      this.leverColor = leverColor;
      this.backColor = backColor;
      this.frameColor = frameColor;
      this.border = border
      this.font = font

      this.applyStyle(this.htmlDiv,2)
      this.applyStyle(this.htmlFrame,3)
      this.applyStyle(this.htmlOldColor,1)
      this.applyStyle(this.htmlCurColor,1)
      this.applyStyle(this.htmlOldColorLabel,0)
      this.applyStyle(this.htmlCurColorLabel,0)
      this.applyStyle(this.htmlButOk,1)
      this.applyStyle(this.htmlButClose,1)
      this.applyStyle(this.htmlCanvas,1)
      this.applyStyle(this.htmlLeverY,1)

      for(let i=0;i<6;i++){
        this.applyStyle(this.htmlLabelX[i],0)
        this.applyStyle(this.htmlLeverX[i],1)
        this.applyStyle(this.htmlTxtX[i],1)
      }
      for(let i=0;i<7*2;i++){
        this.applyStyle(this.htmlPalette[i],1)
      }
    }
    applyStyle(obj,style){
      obj.style.position = "absolute";
      obj.style.color = this.fontColor;
      obj.style.font = this.font;
      obj.style.textAlign = "center";
      obj.style.outline = "none";
      obj.style.msUserSelect = obj.style.webkitUserSelect = obj.style.mozUserSelect = obj.style.userSelect = "none";
      if(style!==0) obj.style.border = this.border;
      switch(style)
      {
        case 1:obj.style.background = this.inputColor;obj.style.msUserSelect = obj.style.webkitUserSelect = obj.style.mozUserSelect = obj.style.userSelect = null;break;
        case 2:obj.style.background = this.backColor;break;
        case 3:obj.style.background = this.frameColor;break;
      }

    }
    addEvents(){
      document.addEventListener('mousedown', (e) => {this.mouseDown=true;});
      document.addEventListener('mouseup', (e) => {this.mouseDown=false;this.aktiveElementObj=null;this.aktiveElement=0;});

      let obj;
      this.htmlFrame.addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=1;});

      //this.htmlButOk.addEventListener('mousedown', (e) => {this.ColorRef()});
      this.htmlButClose.addEventListener('mousedown', (e) => {this.hide()});

      this.htmlCanvas.addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=2;});
      this.htmlLeverY.addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=3;});

      this.htmlLeverX[0].addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=4;});
      this.htmlLeverX[1].addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=5;});
      this.htmlLeverX[2].addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=6;});
      this.htmlLeverX[3].addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=7;});
      this.htmlLeverX[4].addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=8;});
      this.htmlLeverX[5].addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=9;});

      this.htmlTxtX[0].addEventListener('change', (e) => {
        if(this.htmlTxtX[0].value<0)this.htmlTxtX[0].value=0;
        else if(this.htmlTxtX[0].value>360)this.htmlTxtX[0].value=360;
        this.colorHSV[0] = this.htmlTxtX[0].value/360
        this.render();
      })
      this.htmlTxtX[1].addEventListener('change', (e) => {
        if(this.htmlTxtX[1].value<0)this.htmlTxtX[1].value=0;
        else if(this.htmlTxtX[1].value>100)this.htmlTxtX[1].value=100;
        this.colorHSV[1] = this.htmlTxtX[1].value/100
        this.render();
      })
      this.htmlTxtX[2].addEventListener('change', (e) => {
        if(this.htmlTxtX[2].value<0)this.htmlTxtX[2].value=0;
        else if(this.htmlTxtX[2].value>100)this.htmlTxtX[2].value=100;
        this.colorHSV[2] = this.htmlTxtX[2].value/100
        this.render();
      })
      this.htmlTxtX[3].addEventListener('change', (e) => {
        if(this.htmlTxtX[3].value<0)this.htmlTxtX[3].value=0;
        else if(this.htmlTxtX[3].value>255)this.htmlTxtX[3].value=255;
        this.colorRGB[0] = this.htmlTxtX[3].value; 
        this.colorHSV = this.createHSVfromRGB(this.colorRGB);
        this.render();
      })
      this.htmlTxtX[4].addEventListener('change', (e) => {
        if(this.htmlTxtX[4].value<0)this.htmlTxtX[4].value=0;
        else if(this.htmlTxtX[4].value>255)this.htmlTxtX[4].value=255;
        this.colorRGB[1] = this.htmlTxtX[4].value; 
        this.colorHSV = this.createHSVfromRGB(this.colorRGB);
        this.render();
      })
      this.htmlTxtX[5].addEventListener('change', (e) => {
        if(this.htmlTxtX[5].value<0)this.htmlTxtX[5].value=0;
        else if(this.htmlTxtX[5].value>255)this.htmlTxtX[5].value=255;
        this.colorRGB[2] = this.htmlTxtX[5].value; 
        this.colorHSV = this.createHSVfromRGB(this.colorRGB);
        this.render();
      })


      document.addEventListener('mousemove', (e) => {
        if (this.mouseDown===true){
          //let oldColorRGB = colorRGB;
          let click = null;
          switch(this.aktiveElement)
          {
            case 1:
            this.posX += e.movementX
            this.posY += e.movementY
            this.htmlDiv.style.left = this.posX+"px";
            this.htmlDiv.style.top = this.posY+"px";
            break;
            case 2:
              click = this.click(this.htmlCanvas,e,-5,-5,160,160);
              this.colorHSV[2] = click[0];this.colorHSV[1] = 1-click[1];
			        this.colorRGB = this.createRGBfromHSV(this.colorHSV);
            break;
            case 3:
              click = this.click(this.htmlLeverY,e,0,0,1,170);
              this.colorHSV[0] = 1-click[1];
			        this.colorRGB = this.createRGBfromHSV(this.colorHSV);
            break;
            case 4:
              click = this.click(this.htmlLeverX[0],e,0,0,140,1);
              this.colorHSV[0] = click[0];
			        this.colorRGB = this.createRGBfromHSV(this.colorHSV);
            break;
            case 5:
              click = this.click(this.htmlLeverX[1],e,0,0,140,1);
              this.colorHSV[1] = click[0];
			        this.colorRGB = this.createRGBfromHSV(this.colorHSV);
            break;
            case 6:
              click = this.click(this.htmlLeverX[2],e,0,0,140,1);
              this.colorHSV[2] = click[0];
			        this.colorRGB = this.createRGBfromHSV(this.colorHSV);
            break;
            case 7:
              click = this.click(this.htmlLeverX[3],e,0,0,140,1);
              this.colorRGB[0] = click[0]*255;
			        this.colorHSV = this.createHSVfromRGB(this.colorRGB);
            break;
            case 8:
              click = this.click(this.htmlLeverX[4],e,0,0,140,1);
              this.colorRGB[1] = click[0]*255;
			        this.colorHSV = this.createHSVfromRGB(this.colorRGB);
            break;
            case 9:
              click = this.click(this.htmlLeverX[5],e,0,0,140,1);
              this.colorRGB[2] = click[0]*255;
			        this.colorHSV = this.createHSVfromRGB(this.colorRGB);
            break;
          }
          if (this.aktiveElement!==0){this.render();}
        }
      });
    //FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUNNNNNNNNNNNNNNNNNNNNNNNNN
    }
  //--Logik---------------------------------------------------------------------------------------------------------------------------------
    show(posX,posY){
      this.posX=posX;this.posY=posY;
      this.htmlDiv.style.display = "inline";
      this.htmlDiv.style.left = this.posX+"px";
      this.htmlDiv.style.top = this.posY+"px";
      this.render();
    }
    hide(){
      this.htmlDiv.style.display = "none";
    }
    click(htmlObj,e,posX,posY,width,height){
      let rect = htmlObj.getBoundingClientRect();
      posX+=e.clientX-rect.left;
      posY+=e.clientY-rect.top;
      posX/=width;posY/=height
      if (posX<0)posX=0;if (posY<0)posY=0;
      if (posX>1)posX=1;if (posY>1)posY=1;
      return [posX,posY];
    }
    setRefToColor(func){
      this.htmlButOk.addEventListener('mousedown', func);
    }
    returnColor(mode){
      switch(mode)
      {
        case "RGB":    return this.colorRGB;
        case "HSV":    return this.colorHSV;
        case "cssRGB": return "rgb("+(this.colorRGB[0]|0)+','+(this.colorRGB[1]|0)+','+(this.colorRGB[2]|0)+')';
      }
    }
  //--ColorOperators---------------------------------------------------------------------------------------------------------------------------------
    createRGBfromH(value,max) {
      let pos = (value / max*6)|0;
      if(pos>5)pos-=6;
      let x = value / max * (256*6);
      let r = 0,g = 0,b = 0;
      while (x > 255)x-=255;
      switch (pos)
      {
        case 0:r += 255;   g += x;     b += 0;     break;
        case 1:r += 255-x; g += 255;   b+= 0;      break;
        case 2:r += 0;     g += 255;   b += x;     break;
        case 3:r += 0;     g += 255-x; b += 255;   break;
        case 4:r += x;     g += 0;     b += 255;   break;
        case 5:r += 255;   g += 0;     b+= 255-x;  break;
      }
      return [r,g,b]
    }
    addRGBandS(value,max,oldvalue) {
      let colorRGB = oldvalue
      let pro = (((value)/max));
      colorRGB[0] = colorRGB[0]*(pro)+((255)*(1-pro));//r
      colorRGB[1] = colorRGB[1]*(pro)+((255)*(1-pro));//g
      colorRGB[2] = colorRGB[2]*(pro)+((255)*(1-pro));//b
      return colorRGB;
    }
    addRGBandV(value,max,oldvalue) {
      let colorRGB = oldvalue
      let pro = value/max;
      colorRGB[0] *= pro;//r
      colorRGB[1] *= pro;//g
      colorRGB[2] *= pro;//b
      return colorRGB;
    }
    createRGBfromHSV(colorHSV){
      let colorRGB = this.createRGBfromH(this.colorHSV[0],1);
      colorRGB = this.addRGBandS(colorHSV[1],1,colorRGB)
      colorRGB = this.addRGBandV(colorHSV[2],1,colorRGB);
      return colorRGB;
    }
    createHSVfromRGB(colorRGB){

      let r = colorRGB[0]/255,g = colorRGB[1]/255,b = colorRGB[2]/255
      let min,max
      min = r;if(min > g)min=g;if(min > b)min=b;
      max = r;if(max < g)max=g;if(max < b)max=b;
      let delta = max - min;
      let h,s,v;
      v = max;   
      if (delta < 0.00001)
      {
          s = 0;
          h = 0; // undefined, maybe nan?
          return [h/360,s,v];
      }
      
      if( max > 0.0 ) { // NOTE: if Max is == 0, this divide would cause a crash
          s = (delta / max);                  // s
      }else{
        // if max is 0, then r = g = b = 0              
        // s = 0, v is undefined
        s = 0.0;
        h = null;   
	    // its now undefined
        return [h/360,s,v];
      }
	  // > is bogus, just keeps compilor happy
	    if( r >= max ) h = ( g - b ) / delta;        // between yellow & magenta
      else if( g >= max ) h = 2.0 + ( b - r ) / delta;  // between cyan & yellow
      else h = 4.0 + ( r - g ) / delta;  // between magenta & cyan
	    h *= 60.0;                              // degrees
      if( h < 0.0 ) h += 360.0;

      return [h/360,s,v];

    }
    createRGBfromRGB(colorRGB){
      return [colorRGB[0],colorRGB[1],colorRGB[2]];//pass by value
    }
  //--Render---------------------------------------------------------------------------------------------------------------------------------
    drawColorPick(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = resolution;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          for (let iy = 0; iy < canvas.height; iy++) {
            let offset = (imgData.width * iy + ix) * 4;
            mod.data[offset + 3] = 255;//a
            let color = this.createRGBfromH(this.colorHSV[0],1);
            color = this.addRGBandS((resolution-1)-iy,canvas.height,color);
            color = this.addRGBandV(ix,canvas.width,color);
            mod.data[offset]     = color[0];
            mod.data[offset + 1] = color[1];
            mod.data[offset + 2] = color[2];
          }
        }
      context.putImageData(mod, 0, 0);

      return (canvas);
    };
    drawColorLeverY(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = 1;
      canvas.height = resolution;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
          for (let iy = 0; iy < canvas.height; iy++) {
            let offset = (imgData.width * iy) * 4;
            mod.data[offset + 3] = 255;//a
            let color = this.createRGBfromH((resolution-1)-iy,canvas.height);
            mod.data[offset]     = color[0];
            mod.data[offset + 1] = color[1];
            mod.data[offset + 2] = color[2];
          }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX0(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = 1;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          let offset = ix * 4;
          mod.data[offset + 3] = 255;//a
          let color = this.createRGBfromH(ix,canvas.width);
          color = this.addRGBandS(this.colorHSV[1],1,color);
          color = this.addRGBandV(this.colorHSV[2],1,color);
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX1(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = 1;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          let offset = ix * 4;
          mod.data[offset + 3] = 255;//a
          let color = this.createRGBfromH(this.colorHSV[0],1);
          color = this.addRGBandS(ix,canvas.width,color);
          color = this.addRGBandV(this.colorHSV[2],1,color);
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX2(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = 1;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          let offset = ix * 4;
          mod.data[offset + 3] = 255;//a
          let color = this.createRGBfromH(this.colorHSV[0],1);
          color = this.addRGBandS(this.colorHSV[1],1,color);
          color = this.addRGBandV(ix,canvas.width,color);
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX3(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = 1;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          let offset = ix * 4;
          mod.data[offset + 3] = 255;//a
          let color = this.createRGBfromRGB(this.colorRGB);
          color[0] = 255/canvas.width*ix;
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX4(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = 1;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          let offset = ix * 4;
          mod.data[offset + 3] = 255;//a
          let color = this.createRGBfromRGB(this.colorRGB);
          color[1] = 255/canvas.width*ix;
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX5(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = 1;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          let offset = ix * 4;
          mod.data[offset + 3] = 255;//a
          let color = this.createRGBfromRGB(this.colorRGB);
          color[2] = 255/canvas.width*ix;
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    clearCanvas(htmlObj,SmoothingEnabled,fillStyle){
      let context = htmlObj.getContext("2d");
      context.imageSmoothingEnabled = SmoothingEnabled;context.mozImageSmoothingEnabled = SmoothingEnabled;context.fillStyle = fillStyle; 
      context.clearRect(0, 0, htmlObj.width, htmlObj.height);
      return context;
    }
    render(){
      this.htmlCurColor.style.background = this.returnColor("cssRGB")
      let context;let SmoothingEnabled = true;
      let resolution = 10;
      let fillStyle = this.leverColor; 
	

      context = this.clearCanvas(this.htmlCanvas,SmoothingEnabled,fillStyle)
      context.fillRect(0, (1-this.colorHSV[1])*160, 5, 10);
      context.fillRect(165, (1-this.colorHSV[1])*160, 5, 10);
      context.fillRect((this.colorHSV[2])*160, 0, 10, 5);
      context.fillRect((this.colorHSV[2])*160, 165, 10, 5);
      context.drawImage(this.drawColorPick(resolution), 5, 5, 160, 160);

      context = this.clearCanvas(this.htmlLeverY,SmoothingEnabled,fillStyle)
      context.fillRect(0, (1-this.colorHSV[0])*170-5, 20, 10);
      context.drawImage(this.drawColorLeverY(resolution), 5, 0, 10, 170);

      context = this.clearCanvas(this.htmlLeverX[0],SmoothingEnabled,fillStyle)
      context.fillRect((this.colorHSV[0])*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX0(resolution), 0, 5, 140, 10);

      context = this.clearCanvas(this.htmlLeverX[1],SmoothingEnabled,fillStyle)
      context.fillRect((this.colorHSV[1])*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX1(resolution), 0, 5, 140, 10);

      context = this.clearCanvas(this.htmlLeverX[2],SmoothingEnabled,fillStyle)
      context.fillRect((this.colorHSV[2])*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX2(resolution), 0, 5, 140, 10);

      context = this.clearCanvas(this.htmlLeverX[3],SmoothingEnabled,fillStyle)
      context.fillRect((this.colorRGB[0]/255)*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX3(resolution), 0, 5, 140, 10);

      context = this.clearCanvas(this.htmlLeverX[4],SmoothingEnabled,fillStyle)
      context.fillRect((this.colorRGB[1]/255)*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX4(resolution), 0, 5, 140, 10);
      
      context = this.clearCanvas(this.htmlLeverX[5],SmoothingEnabled,fillStyle)
      context.fillRect((this.colorRGB[2]/255)*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX5(resolution), 0, 5, 140, 10);

      this.htmlTxtX[0].value = (this.colorHSV[0]*360)|0;
      this.htmlTxtX[1].value = (this.colorHSV[1]*100)|0;
      this.htmlTxtX[2].value = (this.colorHSV[2]*100)|0;
      this.htmlTxtX[3].value = this.colorRGB[0]|0;
      this.htmlTxtX[4].value = this.colorRGB[1]|0;
      this.htmlTxtX[5].value = this.colorRGB[2]|0;
    }
}