// apps-script/Code.gs
// Logic Theorist: Call Center Madness
// Saves scores to Google Sheet ID: 1N9sTpYuszpMmlHQWm7uxWVnoYxuwhziEyjFaTh2z8Vs
// Required tab name: Logic

const SPREADSHEET_ID = '1N9sTpYuszpMmlHQWm7uxWVnoYxuwhziEyjFaTh2z8Vs';
const SHEET_NAME = 'Logic';

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'getLeaderboard';
  if (action === 'getLeaderboard') return jsonResponse(getLeaderboard_());
  return jsonResponse({ ok: true, message: 'Logic Theorist API is live', sheet: SHEET_NAME });
}

function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    const action = body.action;

    if (action === 'saveScore') {
      return jsonResponse(saveScore_(body.entry || {}));
    }

    if (action === 'getLeaderboard') {
      return jsonResponse(getLeaderboard_());
    }

    return jsonResponse({ ok: false, error: 'Unknown action: ' + action });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const headers = [
    'Created At',
    'Score ID',
    'Player Name',
    'Score',
    'Level',
    'Satisfaction',
    'Rage',
    'Language',
    'Correct',
    'Wrong',
    'Achievements'
  ];

  if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() !== 'Created At') {
    sheet.clear();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#111827')
      .setFontColor('#FCD34D')
      .setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }

  return sheet;
}

function saveScore_(entry) {
  const sheet = getSheet_();
  const row = [
    entry.createdAt || new Date().toISOString(),
    entry.id || Utilities.getUuid(),
    entry.playerName || 'Anonymous Operator',
    Number(entry.score || 0),
    Number(entry.level || 1),
    Number(entry.satisfaction || 0),
    Number(entry.rage || 0),
    entry.language || 'en',
    Number(entry.correct || 0),
    Number(entry.wrong || 0),
    entry.achievements || ''
  ];

  sheet.appendRow(row);
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1, 1, row.length).setWrap(true);
  sheet.autoResizeColumns(1, row.length);

  return { ok: true, saved: true, row: lastRow, sheet: SHEET_NAME };
}

function getLeaderboard_() {
  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return { ok: true, leaderboard: [] };
  }

  const values = sheet.getRange(2, 1, lastRow - 1, 11).getValues();
  const leaderboard = values
    .filter(row => row[1] || row[2])
    .map(row => ({
      createdAt: row[0] instanceof Date ? row[0].toISOString() : row[0],
      id: row[1],
      playerName: row[2],
      score: Number(row[3] || 0),
      level: Number(row[4] || 0),
      satisfaction: Number(row[5] || 0),
      rage: Number(row[6] || 0),
      language: row[7],
      correct: Number(row[8] || 0),
      wrong: Number(row[9] || 0),
      achievements: row[10]
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 50);

  return { ok: true, leaderboard };
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
