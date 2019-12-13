export class DomUtil {
    // selector: class name(.class-name) or tag name (mc-componentname)
    findParent(dom : any, selector : string, depth : number = 10) {
        let cls = "";
        let resultDom : any;
        if (!dom || !dom.nodeName) {
            return null;
        }
        if (selector[0] === ".") {
            cls = selector.split(".")[1];
        }

        while (depth--) {
            if (!dom || !dom.classList || dom.nodeName === "BODY") {
                resultDom = null;
                break;
            }
            if (cls) {
                if (dom.classList.contains(cls)) {
                    resultDom = dom;
                    break;
                }
            } else {
                if (dom.nodeName.toLowerCase() === selector.toLowerCase()) {
                    resultDom = dom;
                    break;
                }
            }
            dom = dom.parentNode;
        }
        return resultDom;
    }

    getWindowSize() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return {width, height};
    }

    getSize(dom : HTMLElement) {
        let size = dom.getBoundingClientRect();
        const style = dom.style;
        if (style.display === "none") {
            style.visibility = "hidden";
            style.display = "";
            size = dom.getBoundingClientRect();
            style.visibility = "";
            style.display = "none";
        } else if (style.height === "0" || style.height === "0px") {
            style.visibility = "hidden";
            const position = style.position || "";
            style.position = "absolute";
            style.height = "";
            size = dom.getBoundingClientRect();
            style.visibility = "";
            style.height = "0px";
            style.position = position;
        }
        return size;
    }

    removeDom(dom : HTMLElement) {
        if (dom && dom.parentElement) {
            dom
                .parentElement
                .removeChild(dom);
        }
        dom = null;
    }

    openUrl(url, target = "", fileName = "") {
        let a = document.createElement("a");
        a.href = url;
        if (fileName) 
            a.download = fileName;
        if (target) 
            a.target = target;
        document
            .body
            .append(a);
        a.click();
        a.remove();
        a = null;
    }

    exportFile(fileName, content, mimeType = "text/csv", charset = "utf-8") {
        const blob = new Blob([content], {type: `type:${mimeType};charset=${charset};`});
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, fileName);
        } else {
            this.openUrl(URL.createObjectURL(blob), "", fileName);
        }
    }

    getClassName(componentName, theme : string | string[], classNames : string[] = []) {
        const cls = [];
        cls.push("mc-" + componentName.toLowerCase());
        if (theme) {
            if (!Array.isArray(theme)) {
                cls.push(theme);
            } else {
                cls.push(...theme);
            }
        }
        cls.push(...classNames);
        return cls.join(' ');
    }
}