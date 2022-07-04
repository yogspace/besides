function updateContent() {
  //every second the html Content will be updated
  setInterval(async () => {
    const response = await fetch("/data", { method: "GET" });

    //if express delivers no training
    const isContentEmpty = response.headers.get("Content-Length") === "0";
    if (isContentEmpty) {
      console.log("no content");
      return;
    }

    const data = await response.json();
    console.log(data);
    //overwrite training
  }, 1000);
}

updateContent();
