/**
 * Europa Pool Quiz — Google Apps Script Web App
 *
 * Empfängt Kontaktdaten und Quiz-Antworten vom Configurator
 * und schreibt sie in das Tabellenblatt "Configurator".
 *
 * Einrichtung:
 * 1. Neue Google-Tabelle erstellen (oder bestehende öffnen)
 * 2. Erweiterungen → Apps Script → diesen Code einfügen
 * 3. Tabellenblatt "Configurator" anlegen (Name exakt so!)
 * 4. Bereitstellen → Neue Bereitstellung → Web-App
 *    - Ausführen als: Ich
 *    - Zugriff: Jeder (WICHTIG — nicht „Nur ich“ oder „Nur Organisation“!)
 * 5. Web-App-URL in index.html als GOOGLE_SCRIPT_URL eintragen
 *
 * Test: URL im Browser öffnen. Korrekt = JSON:
 *   {"success":true,"message":"Europa Pool Configurator API ist aktiv","sheet":"Configurator"}
 * Fehler = Seite „Zugriff verweigert“ / „Need access“ → Bereitstellung neu erstellen.
 */

var SHEET_NAME = 'Configurator';

var HEADERS = [
  'Zeitstempel',
  'Name',
  'Telefon',
  'E-Mail',
  'Budget',
  'Form',
  'Größe',
  'Stufen',
  'Filtration',
  'Farbe',
  'Zubehör'
];

function getConfiguratorSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('Tabellenblatt "' + SHEET_NAME + '" nicht gefunden. Bitte anlegen.');
  }

  return sheet;
}

function ensureHeaders_(sheet) {
  var firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  var isEmpty = firstRow.every(function (cell) {
    return cell === '' || cell === null;
  });

  if (isEmpty) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#e8f0fe');
    sheet.setFrozenRows(1);
  }
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Keine Daten empfangen');
  }

  var data = JSON.parse(e.postData.contents);

  return {
    timestamp: data.timestamp || new Date().toISOString(),
    name: String(data.name || '').trim(),
    phone: String(data.phone || '').trim(),
    email: String(data.email || '').trim(),
    budget: String(data.budget || ''),
    shape: String(data.shape || ''),
    size: String(data.size || ''),
    steps: String(data.steps || ''),
    filtration: String(data.filtration || ''),
    color: String(data.color || ''),
    addons: String(data.addons || '')
  };
}

function appendRow_(payload) {
  var sheet = getConfiguratorSheet_();
  ensureHeaders_(sheet);

  sheet.appendRow([
    payload.timestamp,
    payload.name,
    payload.phone,
    payload.email,
    payload.budget,
    payload.shape,
    payload.size,
    payload.steps,
    payload.filtration,
    payload.color,
    payload.addons
  ]);
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var payload = parsePayload_(e);

    if (!payload.name) {
      return jsonResponse_({ success: false, error: 'Name fehlt' });
    }

    if (!payload.phone) {
      return jsonResponse_({ success: false, error: 'Telefonnummer fehlt' });
    }

    if (!payload.email) {
      return jsonResponse_({ success: false, error: 'E-Mail fehlt' });
    }

    if (payload.email.indexOf('@') === -1) {
      return jsonResponse_({ success: false, error: 'Ungültige E-Mail-Adresse' });
    }

    appendRow_(payload);

    return jsonResponse_({ success: true });
  } catch (err) {
    return jsonResponse_({
      success: false,
      error: err.message || String(err)
    });
  }
}

function doGet() {
  return jsonResponse_({
    success: true,
    message: 'Europa Pool Configurator API ist aktiv',
    sheet: SHEET_NAME
  });
}

/**
 * Optional: Header-Zeile manuell anlegen (einmal ausführen).
 */
function setupConfiguratorSheet() {
  var sheet = getConfiguratorSheet_();
  sheet.clearContents();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight('bold')
    .setBackground('#e8f0fe');
  sheet.setFrozenRows(1);
}
