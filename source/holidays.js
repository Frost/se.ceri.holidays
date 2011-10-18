enyo.kind({
  name: "Cerise.Holidays",
  kind: enyo.VFlexBox,
  components: [
    {kind: "PageHeader", content: "Swedish Holidays"},
    {kind: "RowGroup", caption: "Year", components: [
        {kind: "InputBox", components: [
            {name: "yearInput", kind: "Input", flex: 1, onfocus: "numberMode"},
            {kind: "Button", caption: "Get holidays", onclick: "btnClick"}
        ]}
    ]},
    {kind: "Scroller", flex: 1, components: [
      {kind: enyo.VirtualRepeater, name: "holidayList", onSetupRow: "loadHolidays", components: [
        {kind: "Item", layoutKind: "HFlexLayout", components: [
          {name: "holidayListTitle", flex: 1},
          {name: "holidayListDate", flex: 1}
        ]}
      ]}
    ]}
  ],

  numberMode: function () {
    // set numeric keyboard mode
    enyo.keyboard.setManualMode(5);
  },

  loadHolidays: function (inSender, inIndex) {
    var year = this.$.yearInput.getValue();
    if (!year) {
      year = new Date().getFullYear();
    }
    Cerise.DateCalculations.selectedYear = year;

    var datefmt = new enyo.g11n.DateFmt({"format": "EEEE dd MMMM"});
    var data = this.swedish[inIndex];

    if (data) {
      this.$.holidayListTitle.setContent(data.name);
      this.$.holidayListDate.setContent(datefmt.format(data.date()));
      return true;
    }
  },

  btnClick: function () {
    var year = this.$.yearInput.getValue();
    if (! year) {
      year = new Date().getFullYear();
    }
    Cerise.DateCalculations.selectedYear = year;

    for (var index in Cerise.Holidays.swedish) {
      this.loadHolidays("enyo.VirtualRepeater", index);
    }
    this.$.holidayList.render();
  },

  swedish: [
    {
      name: "New year's day (nyårsdagen)", 
      date: function () {
        return new Date(Cerise.DateCalculations.selectedYear, 0, 1);
      }
    },
    {
      name: "Twelfth Night (trettondsafton)", 
      date: function () {
        return new Date(Cerise.DateCalculations.selectedYear, 0, 5);
      }
    },
    {
      name: "Epiphany (trettondedag jul)", 
      date: function () {
        return new Date(Cerise.DateCalculations.selectedYear, 0, 6);
      }
    },
    {
      name: "Good Friday (långfredagen)", 
      date: function () {
        var e = Cerise.DateCalculations.easter(Cerise.DateCalculations.selectedYear); 
        e.setDate(e.getDate() - 2); 
        return e;
      }
    },
    {
      name: "Holy Saturday (påskafton)", 
      date: function () {
        var e = Cerise.DateCalculations.easter(Cerise.DateCalculations.selectedYear); 
        e.setDate(e.getDate() - 1); 
        return e;
      }
    },
    {
      name: "Easter Sunday (påskdagen)", 
      date: function () {
        return Cerise.DateCalculations.easter(Cerise.DateCalculations.selectedYear);
      }
    },
    {
      name: "Easter Monday (annandag påsk)", 
      date: function () {
        var e = Cerise.DateCalculations.easter(Cerise.DateCalculations.selectedYear); 
        e.setDate(e.getDate() + 1); 
        return e;
      }
    },
    {
      name: "Walpurgis Night (valborgsmässoafton)", 
      date: function () {
        return new Date(Cerise.DateCalculations.selectedYear, 3, 30);
      }
    },
    {
      name: "International Workers Day (första maj)", 
      date: function () {
        return new Date(Cerise.DateCalculations.selectedYear, 4,1);
      }
    },
    {
      name: "Ascension Day (Kristi himmelsfäd)", 
      date: function () {
        var e = Cerise.DateCalculations.easter(Cerise.DateCalculations.selectedYear); 
        e.setDate(e.getDate() + 39); 
        return e;
      }
    },
    {
      name: "National Day of Sweden (nationaldagen)", 
      date: function () {
        return new Date(Cerise.DateCalculations.selectedYear, 5,6);
      }
    },
    {
      name: "Whitsun Eve (pingstafton)", 
      date: function () {
        var e = Cerise.DateCalculations.easter(Cerise.DateCalculations.selectedYear); 
        e.setDate(e.getDate() + 48); 
        return e;
      }
    },
    {
      name: "Pentecost (pingstdagen)", 
      date: function () {
        var e = Cerise.DateCalculations.easter(Cerise.DateCalculations.selectedYear); 
        e.setDate(e.getDate() + 49); 
        return e;
      }
    },
    {
      name: "Midsummer's Day (midsommardagen)", 
      date: function () { 
        var d = new Date(Cerise.DateCalculations.selectedYear, 5, 20); 
        d.setDate(d.getDate() + 6 - d.getDay()); 
        return d;
      }
    },
    {
      name: "All Saints' Eve (alla helgons afton)", 
      date: function () { 
        var d = new Date(Cerise.DateCalculations.selectedYear, 9, 31); 
        d.setDate(d.getDate() + 5 - d.getDay()); 
        return d;
      }
    },
    {
      name: "All Saints' Day (alla helgons dag)", 
      date: function () { 
        var d = new Date(Cerise.DateCalculations.selectedYear, 9, 31); 
        d.setDate(d.getDate() + 6 - d.getDay()); 
        return d;
      }
    },
    {
      name: "Christmas Eve (julafton)", 
      date: function () {
        return new Date(Cerise.DateCalculations.selectedYear, 11,24);
      }
    },
    {
      name: "Christmas Day (juldagen)", 
      date: function () {
        return new Date(Cerise.DateCalculations.selectedYear, 11,25);
      }
    },
    {
      name: "Boxing Day (annandag jul)", 
      date: function () {
        return new Date(Cerise.DateCalculations.selectedYear, 11,26);
      }
    },
    {
      name: "New year's eve (nyårsafton)", 
      date: function () {
        return new Date(Cerise.DateCalculations.selectedYear, 11, 31);
      }
    }
  ],


});
