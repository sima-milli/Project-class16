function pageFunction(context) {
  var $ = context.jQuery;
  if (context.request.label === "property") {
    context.skipLinks();
    var property = {};
    var location = {
      country: "Portugal",
      city: "Lisboa",
      address: $(".item-location .details-name").text(),
      coordinates: {
        lat: $("#locationMapDialog").attr("data-lat"),
        lng: $("#locationMapDialog").attr("data-lng")
      }
    };
    property.location = location;

    var gross_m2 = $(".details-component")
      .eq(1)
      .text()
      .replace(/[^\d]/g, "");
    var rooms = $(".details-component")
      .eq(2)
      .text()
      .replace(/[^\d]/g, "");

    var size = {
      parcel_m2: "",
      gross_m2: gross_m2,
      net_m2: "",
      rooms: rooms
    };

    property.size = size;
    var price = {
      value: $(".item-content-part .price").text(),
      currency: "EUR"
    };
    property.price = price;
    var description = $("#DescriptionDiv")
      .text()
      .trim();
    var title = $("#mainInfoAdvertPage .item-title")
      .text()
      .trim();
    var images = $("#links")
      .children()
      .find("img");
    var imgArray = [];

    for (var i in images) {
      var image = $(images[i]);
      var src = image.attr("src");
      if (src) {
        imgArray.push(src);
      }
    }
    property.description = description;
    property.title = title;
    property.images = imgArray;

    return property;
  } else {
    context.skipOutput();
  }
}
