import regular_0 from "../resources/yelp_stars/web_and_ios/regular/regular_0.png"
import regular_1 from "../resources/yelp_stars/web_and_ios/regular/regular_1.png"
import regular_1_half from "../resources/yelp_stars/web_and_ios/regular/regular_1_half.png"
import regular_2 from "../resources/yelp_stars/web_and_ios/regular/regular_2.png"
import regular_2_half from "../resources/yelp_stars/web_and_ios/regular/regular_2_half.png"
import regular_3 from "../resources/yelp_stars/web_and_ios/regular/regular_3.png"
import regular_3_half from "../resources/yelp_stars/web_and_ios/regular/regular_3_half.png"
import regular_4 from "../resources/yelp_stars/web_and_ios/regular/regular_4.png"
import regular_4_half from "../resources/yelp_stars/web_and_ios/regular/regular_4_half.png"
import regular_5 from "../resources/yelp_stars/web_and_ios/regular/regular_5.png"

export default {
  regular_0,
  regular_1,
  regular_1_half,
  regular_2,
  regular_2_half,
  regular_3,
  regular_3_half,
  regular_4,
  regular_4_half,
  regular_5
}

export function toYelpRatingString(rating) {
  switch (rating) {
    case 0:
      return "regular_0";
    case 0.5:
      return "regular_1";
    case 1:
      return "regular_1";
    case 1.5:
      return "regular_1_half";
    case 2:
      return "regular_2";
    case 2.5:
      return "regular_2_half";
    case 3:
      return "regular_3";
    case 3.5:
      return "regular_3_half";
    case 4:
      return "regular_4";
    case 4.5:
      return "regular_4_half";
    case 5:
      return "regular_5";
    default:
      return
  }
}
