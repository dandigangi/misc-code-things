// Invoking functions are typically fx() (aka function name followed by parens) but there is a way to run themselves without explicitly calling
// It's known as an IFEE (https://developer.mozilla.org/en-US/docs/Glossary/IIFE)

// IFEEs can be executed by wrapping the function declaration with parens followed by another set like so
(function doMagic() {
   // magical code
})()

// Why use IFEEs?
// Personal favorite is the closure it creates when passing args. There could be a global that needs to be scoped and protected within.
const $ = jquery

(function doMagicApp() {
  const $ = jquery
  // magical code
})()

// Oh yeah - I put jQuery in for funzies.
// jQuery has been assigned and bound to our magic application's function scope!

// Watch out for this! If you are running say a build where many files are concantenated, you run the risk of the code being put together w/ improper syntax.f
// File 1:
(function doMagic1() {})()

// File 2:
(function doMagic2() {})()

// Concantenated
(function doMagic1() {})()(function doMagic2() {})()

// This _could_ execute with one acting as arguments to the other! An easy way around this is to prefix the IFEE w/ a semicolon
;(function doMagic1() {})();(function doMagic2() {})()
