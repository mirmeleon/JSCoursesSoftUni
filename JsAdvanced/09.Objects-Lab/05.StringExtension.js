(function extend() {
    String.prototype.ensureStart = function (str) {
        if (!this.startsWith(str)) {
            return str + this;
        }
        return this.toString();
    };

    String.prototype.ensureEnd = function (str) {
        if (!this.endsWith(str)) {
            return this + str;
        }
        return this.toString();
    };

    String.prototype.isEmpty = function () {
        return this.length === 0;
    };
    String.prototype.truncate = function (n) {
        let whiteSpaceIndex = this.indexOf(' ');
        if (this.length <= n) {
            return this.toString();
        } else {

            if (n === 1)
                return '.';
            if (n === 2)
                return '..';
            if (n === 3)
                return '...';
            if (whiteSpaceIndex < 0) {

                return this.substring(0, n - 3) + '...';
            }

            while (whiteSpaceIndex < n - 3) {
                if (this.indexOf(' ', whiteSpaceIndex + 1) > 0 && this.indexOf(' ', whiteSpaceIndex + 1) <= n - 3) {
                    whiteSpaceIndex = this.indexOf(' ', whiteSpaceIndex + 1);
                } else {
                    break;
                }
            }
            return this.substring(0, whiteSpaceIndex) + '...';

        }
    };


    String.format = function (str, ...params) {
        for (let i = 0; i < params.length; i++) {
            str = str.replace(`{${i}}`, params[i]);
        }
        return str;
    };
})();