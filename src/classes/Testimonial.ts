import i18next from "i18next";

class Testimonial {
  _id: string;
  testimonial: string;
  name: string;
  position?: string;

  constructor(testimonial?: Testimonial) {
    if (testimonial) {
      this._id = testimonial._id;
      this.testimonial = testimonial.testimonial;
      this.name = testimonial.name;
      this.position = testimonial.position;
    } else {
      this._id = "";
      this.testimonial = "";
      this.name = "";
      this.position = "";
    }
  }

  public static getAll = async (): Promise<Testimonial[]> => {
    const locale = i18next.language;
    const response = await fetch(
      import.meta.env.PUBLIC_CMS_API_ROUTE +
        "/content/items/testimonials?locale=" +
        locale,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": import.meta.env.PUBLIC_CMS_API_KEY,
        },
      }
    );
    const data = await response.json();
    return data.map((testimonial: Testimonial) => new Testimonial(testimonial));
  };
}

export default Testimonial;
