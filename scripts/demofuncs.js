var legatus_SignedInAs = null;
var lgt_custom_random = new CustomRandom("rand_seed");

function arriv(){
	let storageItem = localStorage.getItem("legatusdemowallet");
	console.log(storageItem);
	//If there is no key already
	if(storageItem){

	}
	//There is no key
	else{

	}
}
function complexTransaction(){
	let ct = document.getElementById("transactionType");

	if(ct.checked){
		document.getElementById("panel_ComplexTransaction").classList.add("openPanel");
		document.getElementById("panel_ComplexTransaction").classList.remove("closePanel");
		document.getElementById("panel_SimpleTransaction").classList.add("closePanel");
		document.getElementById("panel_SimpleTransaction").classList.remove("openPanel");
	}
	else{
		document.getElementById("panel_ComplexTransaction").classList.add("closePanel");
		document.getElementById("panel_ComplexTransaction").classList.remove("openPanel");
		document.getElementById("panel_SimpleTransaction").classList.add("openPanel");
		document.getElementById("panel_SimpleTransaction").classList.remove("closePanel");
	}
}
function switchComplexTransactionType(ss){//0=standard	1=custom
	document.getElementById("opttDropdownEntryPointAndStatus").innerHTML = "Standard";//"" + (ss === 0 ? "Standard" : "Complex");
}
function lgts_toHexString(byteArray) {
	return Array.prototype.map.call(byteArray, function(byte) {
		return ('0' + (byte & 0xFF).toString(16)).slice(-2);
	}).join('');
}

function opttChangerActivationFunc() {
	document.getElementById("opttComplexTypeOfDropdown").classList.toggle("opttd-show");
	
}

function opttFuncDescInputFieldChange(){
	let inn = document.getElementById("opttFuncDescInputField");
	let ccount = document.getElementById("opttFuncDescCharCount");
	ccount.innerHTML = 256 - (""+inn.value).length;
}

function opttFuncInsTrainingDimension(){
	console.log("inn");
}
function opttFuncHiddenTrainingDimension(){
	console.log("hid");
}
function opttFuncOutputTrainingDimension(){
	console.log("out");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.opttd-dropbtn')) {
		var dropdowns = document.getElementsByClassName("opttd-dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('opttd-show')) {
				openDropdown.classList.remove('opttd-show');
			}
		}
	}
}