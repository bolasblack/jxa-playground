#!/usr/bin/env osascript -l JavaScript

// Timing Document: http://timingapp.com/faq.php#export

var Timing = Application('Timing'),
    exporter = Timing.Export().make(),
    firstDay = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastDay = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)

Timing.includeStandardAdditions = true

firstDay.setHours(0)
firstDay.setMinutes(0)
firstDay.setSeconds(0)
firstDay.setMilliseconds(0)

lastDay.setHours(0)
lastDay.setMinutes(0)
lastDay.setSeconds(0)
lastDay.setMilliseconds(0)

var firstDate = formatDate(firstDay), lastDate = formatDate(lastDay)

exporter.exportFormat = 'json'
exporter.exportMode = 'raw'
exporter.durationFormat = 'seconds'
exporter.prettyPrintJson = true
exporter.firstDay = firstDay
exporter.lastDay = lastDay

Timing.displayAlert('Starting export last week data')

Timing.saveExport(
  exporter,
  {to: Path("/Users/c4605/Dropbox/Timing/" + firstDate + '~' + lastDate + ".json")}
)

exporter.delete()

function shimZero(number) {
  return ('' + number).length < 2 ? '0' + number : '' + number
}

function formatDate(day) {
  return day.getFullYear() + '-' + shimZero(day.getMonth() + 1) + '-' + shimZero(day.getDate())
}
