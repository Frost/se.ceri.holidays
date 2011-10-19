enyo.kind({
  name: "Cerise.Holidays",
  kind: enyo.VFlexBox,
  components: [
    {
      name: "carousel", 
      kind: "VirtualCarousel", 
      flex: 1, 
      onSetupView: "setupView", 
      onSnapFinish: "snapFinish",
      viewControl: {kind: "Cerise.Holidays.HolidayListView"}
    },
    {kind: "Toolbar", components: [
      {kind: "ToolInput", name: "filterInput", hint: "filter...", oninput: "filterChangeTrigger"}
    ]}
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
  },

  snapFinish: function() {
    this.filterList();
  },

  filterChangeTrigger: function () {
    enyo.job("filterList", enyo.bind(this, "filterList", 400));
  },

  filterList: function () {
    var filter = this.$.filterInput.getValue();
    var view = this.$.carousel.fetchCurrentView();

    var selectedValues = [];
    for (index in view.holidays) {
      var data = view.holidays[index];
      if (data && (data.name.indexOf(filter) !== -1 )) {
        selectedValues.push(data);
      }
    }
    view.setListItems(selectedValues);
  }
});
