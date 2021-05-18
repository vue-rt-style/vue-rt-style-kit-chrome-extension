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
                // if (this.lastVersion[key]) {
                //     versions += " <span style='font-style: italic; color:#70f'>last: " + this.lastVersion[key] + '</span>';
                // }
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
            const response = await fetch('https://raw.githubusercontent.com/vue-rt-style/vue-rt-style-kit-' + type + '/master/package.json');
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
                        wrapper.innerHTML ='<div class="rt-extension-col-12"><div class="extension-row"><div class="rt-extension-col-1 rt-extension-col-td-1 rt-extension-col-md-1 demo-col test"></div><div class="rt-extension-col-1 rt-extension-col-td-1 rt-extension-col-md-1 demo-col"></div><div class="rt-extension-col-1 rt-extension-col-td-1 rt-extension-col-md-1 demo-col"></div><div class="rt-extension-col-1 rt-extension-col-td-1 demo-col md-d-none"></div><div class="rt-extension-col-1 rt-extension-col-td-1 demo-col md-d-none"></div><div class="rt-extension-col-1 rt-extension-col-td-1 demo-col md-d-none"></div><div class="rt-extension-col-1 demo-col md-d-none td-d-none"></div><div class="rt-extension-col-1 demo-col md-d-none td-d-none"></div><div class="rt-extension-col-1 demo-col md-d-none td-d-none"></div><div class="rt-extension-col-1 demo-col md-d-none td-d-none"></div><div class="rt-extension-col-1 demo-col md-d-none td-d-none"></div><div class="rt-extension-col-1 demo-col md-d-none td-d-none"></div></div></div>';
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
            // console.info('event',event);
            if (event.data && event.data.from === 'vue-rt-style-kit') {
                // console.info('___===+__+_+_+_+')
                this.setUIKitContent(event.data)
            }
        }.bind(this))
    }
};
extension.init();
