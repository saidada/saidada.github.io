// The MIT License (MIT)
// 
// Copyright (c) 2017 oov
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*
キー入力管理オブジェクト KeyboardInput

使い方:

// オブジェクトを新規作成
var ki = new KeyboardInput();

setInterval(function(){
	// 前回のフレームから今回のフレームまでの間に発生したキー入力を反映
	ki.update();

	var KEY_ESC = 27;
	var KEY_SPACE = 32;

	// isDown はキーが押された瞬間のフレームだけ true を返す
	if (ki.isDown(KEY_SPACE)) { console.log('DOWN'); }

	// isDownRepeated はキーが押された瞬間と押しっぱなしによる連打によって true を返す
	// 1回目のtrue、400ミリ秒の間、2回目のtrue、100ミリ秒の間、3回目のtrue、100ミリ秒の間……と続く
	if (ki.isDownRepeated(KEY_SPACE, 100, 400)) { console.log('DOWN REPEATED'); }

	// isDownRepeatedAccel はキーが押された瞬間と押しっぱなしによる連打によって true を返す
	// isDownRepeated とほぼ同じだが、連打の速度が徐々に上がっていく
	// 1回目のtrue、400ミリ秒の間、2回目のtrue、100ミリ秒の間、3回目のtrue、100ミリ秒の間……と続く
	if (ki.isDownRepeatedAccel(KEY_SPACE, 100, 400)) { console.log('DOWN REPEATED'); }

	// isHolding はキーが前回と今回の両方のフレームで押されている時に true を返す
	if (ki.isHolding(KEY_SPACE)) { console.log('HOLDING'); }

	// isUp はキーが離された瞬間のフレームだけ true を返す
	if (ki.isUp(KEY_SPACE)) { console.log('UP'); }

	if (ki.isDown(KEY_ESC)) {
		// キー入力が必要なくなったら dispose で入力の監視を停止
		ki.dispose();
		console.log('== END ==');
	}

}, 16);
*/
function KeyboardInput(){
	this.reset();
	document.addEventListener('keydown', this, false);
	document.addEventListener('keyup', this, false);
}
KeyboardInput.prototype.handleEvent = function(e) {
	var code = e.which || e.keyCode || e.charCode;
	if (e.type === 'keydown') {
		if (!e.repeat) {
			this.next[code] = Date.now();
		}
	} else {
		delete this.next[code];
	}
};
KeyboardInput.prototype.update = function(){
	this.prev = this.current;
	this.current = {};
	var keys = Object.keys(this.next);
	for (var i = 0, len = keys.length; i < len; ++i) {
		this.current[keys[i]] = this.next[keys[i]];
	}
};
KeyboardInput.prototype.reset = function(){
	this.prev = {};
	this.current = {};
	this.next = {};
};
KeyboardInput.prototype.isDown = function(code){
	return !!(this.current[code] && !this.prev[code]);
};
KeyboardInput.prototype.isUp = function(code){
	return !!(!this.current[code] && this.prev[code]);
};
KeyboardInput.prototype.isHolding = function(code){
	return !!(this.current[code] && this.prev[code]);
};
KeyboardInput.prototype.isDownRepeated = function(code, interval, delay){
	if (!this.current[code]) {
		return false;
	}
	var n = 1;
	var pressedAt = this.prev[code];
	if (pressedAt) {
		var delta = Date.now() - pressedAt;
		if (delta > delay) {
			n = (delta - delay + interval * 2) / interval | 0;
		}
	}
	this.current["r"+code] = n;
	return this.prev["r"+code] != n;
};
KeyboardInput.prototype.isDownRepeatedAccel = function(code, accel, delay){
	if (!this.current[code]) {
		return false;
	}
	var n = 1;
	var pressedAt = this.prev[code];
	if (pressedAt) {
		var delta = Date.now() - pressedAt;
		if (delta > delay) {
			delta += -delay;
			n = (0.5 * accel * delta * delta * 0.000001 + 2) | 0;
		}
	}
	this.current["ra"+code] = n;
	return this.prev["ra"+code] != n;
};
KeyboardInput.prototype.dispose = function(){
	document.removeEventListener('keydown', this);
	document.removeEventListener('keyup', this);
	this.reset();
};
