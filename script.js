window.onload = async () => {
    const video = document.getElementById("video");
    const loading = document.getElementById("loading");
    const data = document.getElementById("data");

    const error = (message) => {
        loading.innerText = message;
        throw message;
    };

    const pick = (array) => array[Math.floor(Math.random() * array.length)];
    const hacked_statements = ["Yes", "Maybe", "Most Likely", "Highly Probable", "Potentially", "Unlikely But Still Possible", "Almost Certainly", "Definitely", "Absolutely"];

    try {
        const memes = [];
        const push = (tit, con, add) => memes.push(`${tit}: ${con}${add || ""}`);

        let step = 0;

        let fontSize = Math.min(window.innerHeight / 10, window.innerWidth / 10);
        data.style.fontSize = `${fontSize}px`;

        let my_ip = await (await fetch("https://wtfismyip.com/json").catch()).json().catch();
        let ip_data = await (await fetch(`https://uncors.vercel.app/?url=http://ip-api.com/json/${my_ip.YourFuckingIPAddress}`).catch()).json().catch();

        const videoData = await fetch("./assets/video.mp4").catch(error);
        video.src = URL.createObjectURL(await videoData.blob());
        video.load();

        video.oncanplaythrough = async () => {
            loading.style.display = "none";
            start.style.display = "flex";

            if (my_ip && ip_data) {
                push("IP Address", ip_data.query);
                push("Hostname", my_ip.YourFuckingHostname);
                push("Country", `${ip_data.country} (${ip_data.countryCode})`);
                push("Region", `${ip_data.regionName} (${ip_data.region})`);
                push("City", ip_data.city);
                push("Latitude", ip_data.lat);
                push("Longitude", ip_data.lon);
                push("ISP", my_ip.YourFuckingISP);
                push("Autonomous System", ip_data.as);
            } else {
                push("IP Address", "::ffff:172.70.126.134");
            }
            push("User Agent", navigator.userAgent);
            push("Connection Method", "GET");
            push("Request URL", "/");
            push("Request Path", "/");
            push("Request Protocol", "http");
            push("Secure Connection", (location.protocol === 'https:') ? "Yes" : "No");
            push("Proxy IPs", "[]");
            push("Window Properies", Object.keys(window).length);
            push("Window Width", window.innerWidth, "px");
            push("Window Height", window.innerHeight, "px");
            push("Window Ratio", `${window.innerWidth / window.innerHeight}/1`);
            push("Screen Width", window.screen.availWidth, "px");
            push("Screen Height", window.screen.availHeight, "px");
            push("Screen Ratio", `${window.screen.availWidth / window.screen.availHeight}/1`);
            push("Screen Pixel Ratio", window.devicePixelRatio, "/1");
            push("Screen DPI", window.devicePixelRatio);
            push("Screen Color Depth", window.screen.colorDepth);
            push("Screen Orientation", `${window.screen.orientation.type} (${window.screen.orientation.angle}°)`);
            push("Screen Rotation", window.screen.orientation.angle);
            push("OS", `${navigator.platform}`);
            push("Available Browser Memory", typeof window.performance.memory != "undefined" ? Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024) : null, "MB");
            push("CPU Threads", `${navigator.hardwareConcurrency}`);
            const canvas = document.createElement("canvas");
            let gl;
            let debugInfo;
            try {
                gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
                debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
            } catch (e) {}
            if (gl && debugInfo) {
                push("GPU Vendor", gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL));
                push("GPU Info", gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
            }
            push("Device Memory", `${navigator.deviceMemory}`);
            push("System Languages", navigator.languages.join(", "));
            push("Language", `${navigator.language}`);
            let date = new Date();
            push("Current Time", `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
            if (ip_data) push("Timezone", ip_data.timezone);
            push("Timezone Offset", date.getTimezoneOffset() / 60, " hours");
            push("Hacked", pick(hacked_statements));
            push("Hacked By", "Yash Chaurasiya");
            push("Current Status", "🟢");
        };

        start.onclick = async () => {
            start.style.display = "none";
            video.style.display = "flex";
            video.play();

            const interval = setInterval(() => {
                const time = video.currentTime - 2.1 - (step * 60) / 132; // 132 bpm moment
                if (step >= memes.length) step = -Infinity;
                if (step < 0) return clearInterval(interval);
                if (time >= 0) {
                    if (step == 0) document.title = `Hacked by Yash Chaurasiya[${my_ip ? my_ip.YourFuckingIPAddress : "::ffff:172.70.126.134"}]`;
                    const el = document.createElement("span");
                    el.textContent = `${memes[step]}`;
                    step++;
                    data.appendChild(el);
                    const height = data.getBoundingClientRect().height;
                    if (height >= window.innerHeight) {
                        fontSize *= 0.88;
                        data.style.fontSize = `${fontSize}px`;
                    }
                }
            }, 5);
        };

        video.onended = () => {
            video.style.display = "none";
            step = -Infinity;
        };
    } catch (e) {
        error(`${e.message}`);
    }
};
