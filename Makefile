scroll-to.zip: src/manifest.json src/scroll-to.js
	rm -f $@
	zip $@ $^
