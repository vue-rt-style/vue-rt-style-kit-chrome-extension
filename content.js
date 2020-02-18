const extension = {
    init() {
        this.bind();
        this.gridIsActive = false;
        this.version = {
            atoms: 0,
            molecules: 0,
            icons: 0
        };
        this.lastVersion = {
            atoms: 0,
            molecules: 0,
            icons: 0
        }
    },
    html: {
        versions: ''
    },
    setVersionCode(type) {
        chrome.extension.sendMessage({
            type: "setVersionHtml",
            data: {
                html: this.html.versions
            }
        });
    },
    render() {
        var versions = "";
        Object.keys(this.version).map(function(key){
            if (this.version[key]) {
                versions += '<p><span style="width:150px; display: inline-block"><span style="font-weight: bold">' + key + ': </span>' + this.version[key] + '</span>'
                if (this.lastVersion[key]) {
                    versions += " <span style='font-style: italic; color:#70f'>last: " + this.lastVersion[key] + '</span>';
                }
                versions += '</p>';
            }
        }.bind(this));

        if (versions) {
            versions = '<div class="version">' + versions + '</div>';
            this.html.versions = versions;
            this.setVersionCode();
        }
    },
    async getLastVersion(type) {
        if (!this.lastVersion[type]) {
            const response = await fetch('https://raw.githubusercontent.com/vue-rt-extension-style/vue-rt-extension-style-kit-' + type + '/master/package.json');
            const myJson = await response.json();
            this.lastVersion[type] = myJson.version;
            this.render();
        }
    },
    setVersion(data) {
        this.version[data.label] = data.version
        this.getLastVersion([data.label]);
        this.render()
    },
    setUIKitContent(data) {
        if (data && data.type === 'setVersion') {
            this.setVersion(data);
        }
    },
    toggleGrid(){
      if(this.gridIsActive){
        this.removeGrid()
      }else{
        this.insertGrid()
      }
      this.gridIsActive = !this.gridIsActive;
    },
    eventSwitcher(massage) {
        const type = massage.type;
        switch (type) {
            case 'initExtension':
                this.callVersionsRtStyle();
                break;
            case 'clearCookies':
                this.clearCookies();
                break;
            case 'getHtmlVersions':
                this.callVersionsRtStyle();
                break;
            case 'toggleGrid':
                this.toggleGrid()
                break;
        }
    },
    insertGrid(){
      var actualCode = `var wrapper = document.createElement('div');
                        wrapper.classList.add('extension-grid', 'grid', 'app-container', 'rt-extension-container');
                        wrapper.innerHTML ='<div class="rt-extension-col-12"><div class="extension-row"><div class="rt-extension-col-1 rt-extension-col-td-1 rt-extension-col-md-1 demo-col test"></div><div class="rt-extension-col-1 rt-extension-col-td-1 rt-extension-col-md-1 demo-col"></div><div class="rt-extension-col-1 rt-extension-col-td-1 rt-extension-col-md-1 demo-col"></div><div class="rt-extension-col-1 rt-extension-col-td-1 demo-col md-d-none"></div><div class="rt-extension-col-1 rt-extension-col-td-1 demo-col md-d-none"></div><div class="rt-extension-col-1 rt-extension-col-td-1 demo-col md-d-none"></div><div class="rt-extension-col-1 demo-col md-d-none td-d-none"></div><div class="rt-extension-col-1 demo-col md-d-none td-d-none"></div><div class="rt-extension-col-1 demo-col md-d-none td-d-none"></div><div class="rt-extension-col-1 demo-col md-d-none td-d-none"></div><div class="rt-extension-col-1 demo-col md-d-none td-d-none"></div><div class="rt-extension-col-1 demo-col md-d-none td-d-none"></div></div><style>.grid{pointer-events:none;height:0;opacity:0;margin-left:auto;margin-right:auto;position:fixed;top:0;bottom:100vh;left:0;right:0;z-index:200;transition-timing-function:ease-in-out;transition-duration:0.3s;transition-property:height,bottom,opacity,left}.grid--active{bottom:0;opacity:1;height:100vh}@media (max-width:1024px){.grid{left:0;right:0;position:fixed}}.grid .row{height:100vh}.grid .demo-col:before{content:"";box-sizing:border-box;background-color:rgba(119,0,255,.039);border-left:1px solid rgba(255,79,18,.302);border-right:1px solid rgba(255,79,18,.302);position:absolute;top:0;bottom:0;left:10px;right:10px}.rt-extension-dark-theme .grid .demo-col:before{background-color:rgba(255,255,255,.03)}.grid .demo-col:after{content:"";box-sizing:border-box;border-left:1px solid rgba(188,16,75,.349);border-right:1px solid rgba(188,16,75,.349);position:absolute;top:0;bottom:0;left:30px;right:30px}.rt-extension-col{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1;-webkit-flex:0 0 1;-ms-flex:0 0 1;flex:0 0 1}.rt-extension-col-1,.rt-extension-col-12{width:100%;padding-left:10px;padding-right:10px;position:relative}.rt-extension-col-1{-webkit-flex:0 0 8.333333%;-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.rt-extension-col-1{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1}.rt-extension-col-12{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1}.rt-extension-col-12{-webkit-flex:0 0 99.999996%;-ms-flex:0 0 99.999996%;flex:0 0 99.999996%;max-width:99.999996%}@media (max-width:767px){.rt-extension-col-md-1{-webkit-flex:0 0 33.333333%;-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}}@media (max-width:767px){.rt-extension-col-md-1{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1}}@media (max-width:1024px){.rt-extension-col-td-1{-webkit-flex:0 0 16.66666%;-ms-flex:0 0 16.66666%;flex:0 0 16.66666%;max-width:16.66666%}}@media (max-width:1024px){.rt-extension-col-td-1{-webkit-box-flex:1;-moz-box-flex:1;-o-box-flex:1;box-flex:1}}.extension-row{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:box;display:flex;-webkit-box-lines:multiple;-moz-box-lines:multiple;-o-box-lines:multiple;-webkit-flex-wrap:wrap;flex-wrap:wrap;min-width:100%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin-left:-10px;margin-right:-10px;-ms-flex-wrap:wrap}.rt-extension-container{width:100%;max-width:1480px;margin-left:auto;margin-right:auto;padding-left:70px;padding-right:70px;-webkit-transition-timing-function:ease-in-out;-moz-transition-timing-function:ease-in-out;-o-transition-timing-function:ease-in-out;-ms-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-duration:3s;-moz-transition-duration:3s;-o-transition-duration:3s;-ms-transition-duration:3s;transition-duration:3s;-webkit-transition-property:opacity,visibility;-moz-transition-property:opacity,visibility;-o-transition-property:opacity,visibility;-ms-transition-property:opacity,visibility;transition-property:opacity,visibility}@media (max-width:1279px){.rt-extension-container{padding-left:30px;padding-right:30px}}@media (max-width:767px){.rt-extension-container{padding-left:10px;padding-right:10px}}@media (max-width:1024px){.td-d-none{display:none!important}}@media (max-width:767px){.md-d-none{display:none!important}}.demo-col{min-height: 100vh} </style></div>';
                        document.body.appendChild(wrapper);
                        setTimeout(function(){
                          document.querySelector('.extension-grid').classList.add('grid--active')
                        },100)`;
      this.insertScript(actualCode);

    },
    removeGrid(){
      var actualCode = `document.querySelector('.extension-grid').classList.remove('grid--active');
                        setTimeout(function(){
                          var grid = document.querySelector('.extension-grid');
                          grid.parentNode.removeChild(grid);
                        },500)`;
      this.insertScript(actualCode);

    },
    insertScript(scriptCode){
      var script = document.createElement('script');
      script.textContent = scriptCode;
      (document.head || document.documentElement).appendChild(script);
      script.remove();
    },
    clearCookies() {
        var actualCode = `host = location.host.split('.');
                          host[0] = '';
                          host = host.join('.');
                          var res = document.cookie;
                          var multiple = res.split(";");
                          for(var i = 0; i < multiple.length; i++) {
                            var key = multiple[i].split("=");
                            document.cookie = key[0]+"=; domain="+host+';expires=' + (new Date()).toGMTString();
                          }`;

        this.insertScript(actualCode);
    },
    callVersionsRtStyle() {
        var actualCode = `window.dispatchEvent(new Event("getVueRtStyleVersion"));`;
        this.insertScript(actualCode);
    },
    bind() {

        chrome.extension.onMessage.addListener(this.eventSwitcher.bind(this));
        window.addEventListener("message", function (event) {
            if (event.data && event.data.from === 'vue-rt-extension-style-kit') {
                this.setUIKitContent(event.data)
            }
        }.bind(this))
    }
};
extension.init();
