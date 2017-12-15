class Skill {
  constructor(width, height, container, percent) {
    this.s = Snap(container);
    const radius = width / 3;
    const cx = width / 2;
    const cy = height / 2;
    this.length = 2 * radius * Math.PI;
    this.percent = percent;

    this.s.attr({
      width,
      height
    });

    this.bgCircle = this.createCircle(cx, cy, radius, {
      fill: 'none',
      stroke: '#ccc',
      strokeWidth: 15
    });

    this.baseCircle = this.createCircle(cx, cy, radius, {
      fill: 'none',
      stroke: '#1bb696',
      strokeWidth: 15,
      strokeDasharray: this.length,
      strokeDashoffset: this.length
    });

    this.baseCircle.transform(`r-90, ${cx} ${cy}`);
  }

  createCircle(cx, cy, radius, attr) {
    const circle = this.s.circle(cx, cy, radius);
    circle.attr(attr);
    return circle;
  }

  draw() {
    Snap.animate(
      this.length,
      (1 - this.percent) * this.length,
      val => {
        this.baseCircle.attr({
          strokeDashoffset: val
        });
      },
      700,
      mina.easeinout
    );
  }
}

const html = new Skill(150, 150, '#html', 0.65);
const css = new Skill(150, 150, '#css', 0.45);

anim.onclick = function() {
  html.draw();
  css.draw();
};
