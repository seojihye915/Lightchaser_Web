document.addEventListener("DOMContentLoaded", () => {
  const projectId = new URLSearchParams(window.location.search).get("id");
  if (!projectId) return;

  fetch("projects.json")
    .then((res) => res.json())
    .then((data) => {
      const p = data[projectId];
      if (!p) return;

      // 텍스트 매칭
      const textData = {
        "proj-title": p.title,
        "proj-category": p.category,
        "proj-desc": p.description,
        "info-client": p.client,
        "info-location": p.location,
        "info-year": p.year,
        "info-role": p.role,
        "creative-title": p.creativeTitle,
        "creative-caption": p.creativeCaption,
        "tech-title": p.techTitle,
      };
      Object.keys(textData).forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.innerText = textData[id];
      });

      // 미디어 업데이트 (영상은 load() 호출 필수)
      const updateMedia = (id, src, isVideo = false) => {
        const el = document.getElementById(id);
        if (!el || !src) return;
        if (isVideo) {
          el.querySelector("source").src = src;
          el.load();
        } else {
          el.src = src;
        }
      };

      updateMedia("main-video", p.mainVideo, true);
      updateMedia("final-v1", p.finalVideo1, true);
      updateMedia("final-v2", p.finalVideo2, true);
      updateMedia("final-img", p.finalImage);
      updateMedia("creative-img", p.creativeImg);
      updateMedia("tech-img", p.techImg);

      // Creative Steps 반복 생성
      const stepHTML = p.creativeSteps
        .map(
          (s) => `
          <div class="step"><span class="num">${s.num}</span><h4>${s.title}</h4><p>${s.desc}</p></div>
      `
        )
        .join("");
      document.getElementById("creative-steps").innerHTML = stepHTML;

      // Technical List 반복 생성
      const techHTML = p.techList
        .map((t) => `<li><strong>${t.label}:</strong> ${t.val}</li>`)
        .join("");
      document.getElementById("tech-list").innerHTML = techHTML;

      document.title = `${p.title} - Lightchaser`;
    });
});
