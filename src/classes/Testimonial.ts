class Testimonial {
  testimonial: string;
  name: string;
  position?: string;

  constructor(testimonial?: Testimonial) {
    if (testimonial) {
      this.testimonial = testimonial.testimonial;
      this.name = testimonial.name;
      this.position = testimonial.position;
    } else {
      this.testimonial = "";
      this.name = "";
      this.position = "";
    }
  }
}

export default Testimonial;
