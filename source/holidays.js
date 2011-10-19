enyo.kind({
  name: "Cerise.Holidays",
  kind: enyo.VFlexBox,
  components: [
    {
      name: "carousel", 
      kind: "VirtualCarousel", 
      flex: 1, 
      onSetupView: "setupView", 
      viewControl: {kind: "Cerise.Holidays.HolidayListView"}
    }
  ],

  create: function () {
    this.inherited(arguments);
    this.country = new Cerise.Holidays.Swedish();
    this.selectedYear = 2011;
    this.$.carousel.renderViews(this.selectedYear);
  },

  setupView: function (inSender, inView, year) {
    inView.setHeaderContent("Swedish Holidays");
    
    if (inView.getYear() === null || year != inView.getYear()) {
      inView.setYear(year);
      inView.setHolidays(this.country.calculateDates(year));
    }

    return true;
  }
});
