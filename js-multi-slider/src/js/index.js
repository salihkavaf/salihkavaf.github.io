document.addEventListener("DOMContentLoaded", init);

function init()
{
    const slider = new MultiSlider(
        document.getElementById("slider"),
        { height: "100%" }
    );

    let otherDir = "rtl";
    const dirSwitch = document.querySelector(".dir-switch span");

    dirSwitch.onclick = () => {
        const curDir = document.body.classList[0];

        document.body.classList.remove(curDir);
        document.body.classList.add(otherDir);

        slider.reset();
        slider._dir = otherDir === "rtl" ? "right" : "left";
        otherDir = curDir;
    };
};