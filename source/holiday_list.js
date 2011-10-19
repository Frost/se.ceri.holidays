enyo.kind({
  name: "Cerise.Holidays.HolidayListView",
  kind: enyo.VFlexBox,
  published: {
    headerContent: "",
    year: null,
    holidays: [],
    listItems: []
  },
  components: [
    {kind: "PageHeader", name: "pageHeader", content: "Swedish Holidays"},
    {kind: "Scroller", flex: 1, components: [
      {kind: enyo.VirtualRepeater, name: "holidayList", onSetupRow: "loadHolidays", components: [
        {kind: "Item", layoutKind: "HFlexLayout", components: [
          {name: "holidayName", flex: 1},
          {name: "holidayDate", flex: 1}
        ]}
      ]}
    ]},
    {kind: "Toolbar", components: [
      {kind: "ToolInput", name: "filterInput", hint: "filter...", oninput: "filterChangeTrigger"}
    ]}
  ],

  filterChangeTrigger: function () {
    console.log("filtertrigger");
    enyo.job("filterList", enyo.bind(this, "filterList", 400));
  },

  yearChanged: function () {
    this.$.pageHeader.setContent(this.headerContent + " " + this.year);
  },

  holidaysChanged: function () {
    this.listItems = this.holidays;

    for (var index in this.holidays) {
      this.loadHolidays(enyo.VirtualRepeater, index);
    }
    this.$.holidayList.render();
  },

  listItemsChanged: function () {
    for (var index in this.listItems) {
      this.loadHolidays(enyo.VirtualRepeater, index);
    }
    this.$.holidayList.render();
  },

  loadHolidays: function (inSender, inIndex) {
    var data = this.listItems[inIndex];
    var datefmt = new enyo.g11n.DateFmt({"format": "EEEE dd MMMM"});
    if (data) {
      this.$.holidayName.setContent(data.name);
      this.$.holidayDate.setContent(datefmt.format(data.date));
      return true;
    }
  },

  filterList: function () {
    var filter = this.$.filterInput.getValue();
    console.log("filter: " + filter);

    var selectedValues = [];
    for (index in this.holidays) {
      var data = this.holidays[index];
      if (data && (data.name.indexOf(filter) !== -1 )) {
        selectedValues.push(data);
      }
    }
    this.setListItems(selectedValues);
  }
});
