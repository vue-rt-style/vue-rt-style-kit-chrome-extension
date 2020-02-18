var popup = {
    init() {
        this.bind();
        window.onload = function () {
            chrome.tabs.getSelected(null, function (tab) {
                chrome.tabs.sendMessage(tab.id, {type: "getHtmlVersions"});
            })
        };
    },
    setVersionHtml(data) {
        document.querySelector('#ui-version').innerHTML = data.html
    },
    bind() {
        chrome.extension.onMessage.addListener(function (message) {
            if (this[message.type]) {
                this[message.type](message.data)
            }
        }.bind(this));

        document.querySelector('#clear').addEventListener('click', function () {
            chrome.tabs.getSelected(null, function (tab) {
                chrome.tabs.sendMessage(tab.id, {type: "clearCookies"});
            })
        }.bind(this));
        var showGridButton = document.querySelector('#showGrid');
        showGridButton.addEventListener('click', function () {
            chrome.tabs.getSelected(null, function (tab) {
                chrome.tabs.sendMessage(tab.id, {type: "toggleGrid"});
            });
            if (showGridButton.classList.contains('button--is-active')) {
                showGridButton.classList.remove('button--is-active');
            } else {
                showGridButton.classList.add('button--is-active');
            }
        })
    }
};
popup.init();