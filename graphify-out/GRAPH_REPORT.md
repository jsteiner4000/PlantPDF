# Graph Report - PlantPDF  (2026-11-06)

## Corpus Check
- 140 files · ~299,187 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 32 file(s) not represented in the graph (top: .ttf 20, (none) 5, .css 3)

## Summary
- 2337 nodes · 7591 edges · 100 communities (77 shown, 23 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 236 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `108fda56`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- escapeHtml
- ui/recovery.js
- Site Plan Geometry
- EditMode
- PDF Form Fields
- render.js
- desktop-bridge.js
- model.js
- Release Workflow
- toast
- cff.js
- Manual Builder
- package.json
- T
- icon
- app.js
- Playwright Test Setup
- Page Organize & Numbering
- Inline Text Editor
- svg.js
- Electron Main Window
- font-manager.js
- htmlToElement
- PdfFont
- Desktop Security & Menu
- Regression Test Helpers
- Desktop Tests & Node APIs
- idb.js
- studio.js
- Auto-Updater
- inspector.js
- Auto-Release Workflow
- $$
- signature-extract.js
- showDialog
- pdf-lib
- .onDown
- Stream Limits & Ligatures
- edit-mode.js
- Page View
- NSIS Installer Config
- .save
- $$
- Interaction Tests
- File Access Grants
- signature-panel.js
- scripts
- build.mjs
- studio-vorgaben.spec.js
- SignatureTool
- High-Zoom Detail Renderer
- Security Tests
- .renderRibbon
- SignaturePad
- wiring.js
- Brand & Rendering Docs
- PathEditor
- session.js
- SnapGuides
- Text Layout Analysis
- Electron Builder Base
- PDF Renderer & Print
- Feature Docs
- FontFamily
- pdf-font.js
- Legacy 1.0 Editor
- export.js
- .offerAutosave
- .pagesEntry
- Zoom Tests
- .constructor
- Electron Fuses
- Security & Update Docs
- interpretContent
- Redesign Skill
- Font Licenses
- Windows Build Target
- Storage & Migration Docs
- cff.js
- EXIF Photo Dates
- Linux Build Target
- upgradeProject
- Prettier Config
- Studio
- Extra Resources
- Session Start Hook
- Images & Snap Lines Docs
- Form Filling Docs
- Browser-like Navigation Docs
- numberedGroups
- showPresetsDialog
- newProject
- desktop.spec.js
- graphify-standalone.py
- preload.cjs
- PdfSession
- mergeSitePresets
- studio-speichern.spec.js
- PlantPDF

## God Nodes (most connected - your core abstractions)
1. `htmlToElement()` - 150 edges
2. `Studio` - 131 edges
3. `escapeHtml()` - 107 edges
4. `$$` - 99 edges
5. `icon()` - 96 edges
6. `EditMode` - 89 edges
7. `App` - 88 edges
8. `toast()` - 78 edges
9. `PdfSession` - 73 edges
10. `T()` - 62 edges

## Surprising Connections (you probably didn't know these)
- `Legacy app shell (top bar, left panel, ctx bar, pages, nav, thumbs rail)` --semantically_similar_to--> `src/index.html HTML shell template`  [INFERRED] [semantically similar]
  legacy/PDF-Editor-1.0.html → src/index.html
- `PDF-Editor 1.0 (legacy single-file build)` --semantically_similar_to--> `dist/PDF-Editor.html (single-file build)`  [INFERRED] [semantically similar]
  legacy/PDF-Editor-1.0.html → README.md
- `Seiten organisieren / Seitenzahlen anpassen` --semantically_similar_to--> `Legacy organize-pages UI (insert, rotate, duplicate, delete, export)`  [INFERRED] [semantically similar]
  LIESMICH.txt → legacy/PDF-Editor-1.0.html
- `Text bearbeiten` --semantically_similar_to--> `Legacy inline text editor (te-frame)`  [INFERRED] [semantically similar]
  LIESMICH.txt → legacy/PDF-Editor-1.0.html
- `plantpdf-document.svg Document icon` --conceptually_related_to--> `LIESMICH user manual (PlantPDF)`  [INFERRED]
  assets/icon/marke/README.txt → LIESMICH.txt

## Import Cycles
- 2-file cycle: `src/studio/manual-edit.js -> src/studio/studio.js -> src/studio/manual-edit.js`
- 2-file cycle: `src/studio/overlay-edit.js -> src/studio/studio.js -> src/studio/overlay-edit.js`

## Hyperedges (group relationships)
- **Bundled OFL-licensed fonts** — assets_fonts_full_lizenz_barlow_barlow, assets_fonts_full_lizenz_ibm_plex_ibm_plex, assets_fonts_full_lizenz_barlow_sil_open_font_license, liesmich_fonts [EXTRACTED 1.00]
- **Single-file build compared against legacy in regression tests** — readme_build_pipeline, src_index, readme_dist_pdf_editor_html, readme_regression_tests, legacy_pdf_editor_1_0 [EXTRACTED 1.00]
- **Dokumentation workspace parts sharing device data** — liesmich_lageplan, liesmich_zugangsdaten, liesmich_fotodokumentation, liesmich_qr_codes, readme_studio [INFERRED 0.85]

## Communities (100 total, 23 thin omitted)

### Community 0 - "escapeHtml"
Cohesion: 0.18
Nodes (28): accessForm(), blockForm(), chaptersForm(), detailsGroup(), deviceForm(), Inspector, itemActions(), linkForm() (+20 more)

### Community 1 - "ui/recovery.js"
Cohesion: 0.26
Nodes (11): db(), deleteCopy(), liveWindows(), loadCopy(), orphanCopies(), putCopy(), req(), run() (+3 more)

### Community 2 - "Site Plan Geometry"
Cohesion: 0.07
Nodes (72): centroid(), dist(), fmt(), formatArea(), formatLength(), inPolygon(), LEGEND_H, LEGEND_ROWS (+64 more)

### Community 3 - "EditMode"
Cohesion: 0.10
Nodes (3): isLineLike(), EditMode, isTranslationMatrix()

### Community 4 - "PDF Form Fields"
Cohesion: 0.06
Nodes (52): appearanceColors(), appearanceFits(), applyFieldValue(), checkboxAppearances(), composeDA(), createField(), deleteField(), describeWidget() (+44 more)

### Community 5 - "render.js"
Cohesion: 0.09
Nodes (54): atomsPush(), chapterPages(), drawLines(), figureAtom(), resolveCell(), tableAtoms(), BODY, COVER_FIELDS (+46 more)

### Community 6 - "desktop-bridge.js"
Cohesion: 0.10
Nodes (17): abortError(), COMMANDS, DesktopFileHandle, fileError(), installDesktopBridge(), isDesktop, notifyDocumentState(), reviveFileHandle() (+9 more)

### Community 7 - "model.js"
Cohesion: 0.09
Nodes (49): BUS_KINDS, clamp(), cleanCategories(), cleanChapters(), cleanColumns(), cleanCustom(), cleanFields(), cleanFieldValues() (+41 more)

### Community 8 - "Release Workflow"
Cohesion: 0.05
Nodes (48): concurrency, cancel-in-progress, group, run, CSC_IDENTITY_AUTO_DISCOVERY, REF_NAME, skip_regression, jobs (+40 more)

### Community 9 - "toast"
Cohesion: 0.16
Nodes (6): manualEdit, overlayEdit, readImage(), pickFiles(), toast(), withBusy()

### Community 10 - "cff.js"
Cohesion: 0.45
Nodes (6): wrapCffAsOpenType(), addMissingTables(), buildCmapTable(), buildSfnt(), ByteWriter, mergeFontSubsets()

### Community 11 - "Manual Builder"
Cohesion: 0.16
Nodes (44): atomsCallout(), atomsCards(), atomsFigsteps(), atomsFigure(), atomsOf(), atomsSigns(), atomsTable(), base() (+36 more)

### Community 12 - "package.json"
Cohesion: 0.07
Nodes (34): author, name, dependencies, pako@1.0.11, pdf-lib@1.17.1, @pdf-lib/fontkit@1.1.1, pdfjs-dist@4.10.38, qrcode-generator@2.0.4 (+26 more)

### Community 13 - "T"
Cohesion: 0.12
Nodes (37): cleanAccess(), copy(), DEFAULT_CATEGORIES(), DEFAULT_MARKS(), DEFAULT_SITE_STYLES(), deviceHasData(), newAccess(), newBlock() (+29 more)

### Community 14 - "icon"
Cohesion: 0.19
Nodes (8): installTabStrip(), render(), startDrag(), tableGrid(), icon(), ICON_PATHS, openSheet(), showUpdate()

### Community 15 - "app.js"
Cohesion: 0.12
Nodes (14): MODE_TOOLS, objectIds, ZOOM_LEVELS, ZOOM_PRESETS, getPdfWorker(), PREVIEW_MAX_PX, warmUpRenderer(), STUDIO_TEMPLATES (+6 more)

### Community 16 - "Playwright Test Setup"
Cohesion: 0.08
Nodes (7): @playwright/test, launch(), openPdf(), setup(), expectUnreadable(), labels(), openManual()

### Community 17 - "Page Organize & Numbering"
Cohesion: 0.14
Nodes (10): approxEqual(), copyRunningElements(), detectPageStructure(), formatPageNumber(), updatePageNumbers(), blockToEditLines(), closeMenu(), showMenu() (+2 more)

### Community 18 - "Inline Text Editor"
Cohesion: 0.10
Nodes (8): LIGATURES, cssRgb(), isLetter(), isLowercase(), parseCssColor(), roundTo(), TextEditor, trackPointer()

### Community 19 - "svg.js"
Cohesion: 0.19
Nodes (18): accessPages(), blockHasData(), cellLines(), hasSecrets(), valueText(), cache, context(), ctxs (+10 more)

### Community 20 - "Electron Main Window"
Cohesion: 0.16
Nodes (39): frameColors(), start(), activateNear(), activateTab(), applyFrameColors(), broadcastTabs(), closeTab(), command() (+31 more)

### Community 21 - "font-manager.js"
Cohesion: 0.11
Nodes (13): FontManager, hex4(), isBlankChar(), localFontSources(), nextFontFaceName(), parseFontName(), randomSubsetTag(), STANDARD_FAMILIES (+5 more)

### Community 22 - "htmlToElement"
Cohesion: 0.11
Nodes (53): check(), companyEditor(), contactsEditor(), coverFieldsEditor(), docNoEditor(), FIELD_HINT, fieldLabel(), HOUSE_COLORS (+45 more)

### Community 23 - "PdfFont"
Cohesion: 0.18
Nodes (5): isSpaceCodePoint(), glyphNameToUnicode(), PdfFont, numberOf(), readStreamBytes()

### Community 24 - "Desktop Security & Menu"
Cohesion: 0.11
Nodes (28): contentSecurityPolicy(), EDITOR_HTML, ICON, printErrorText(), ROOT, splitEditor(), hardenSession(), lastDirectory() (+20 more)

### Community 25 - "Regression Test Helpers"
Cohesion: 0.12
Nodes (19): waitForDocument(), canvasHashes(), clientPoint(), findBlock(), FIXTURE, idle(), inkHash(), LAYOUT (+11 more)

### Community 26 - "Desktop Tests & Node APIs"
Cohesion: 0.07
Nodes (22): serve, DIST, PORT, TYPES, DOKUMENT_PDF_B64, e2e@0.22.0, @e2e-dev/web@0.15.4, e2e (+14 more)

### Community 27 - "idb.js"
Cohesion: 0.17
Nodes (24): addSignature(), deleteSignature(), emit(), getDefaultSignature(), getSignature(), listeners, listSignatures(), newId() (+16 more)

### Community 28 - "studio.js"
Cohesion: 0.12
Nodes (33): ACCESS_BLOCKS, BLOCK_TYPES, DOC_PARTS, PHOTO_LAYOUTS, SYMBOLS, withoutSecrets(), AUTO, autoMeta() (+25 more)

### Community 29 - "Auto-Updater"
Cohesion: 0.17
Nodes (20): autoCheck(), manualCheck(), allowedUrl(), DOWNLOAD_HOSTS, isNewer(), LATEST_URL, pickUpdate(), REPO (+12 more)

### Community 30 - "inspector.js"
Cohesion: 0.10
Nodes (29): accessBlocksEditor(), accessColsEditor(), accessTablesEditor(), listEditor(), chapterLabels(), referenceTargets(), blockPreview(), catOf() (+21 more)

### Community 31 - "Auto-Release Workflow"
Cohesion: 0.09
Nodes (22): concurrency, cancel-in-progress, group, GH_TOKEN, jobs, tag, name, on (+14 more)

### Community 32 - "$$"
Cohesion: 0.10
Nodes (3): App, formatZoom(), objectId()

### Community 33 - "signature-extract.js"
Cohesion: 0.16
Nodes (19): clamp01(), cropToAlpha(), dilate(), estimateBackground(), extractSignature(), histPercentile(), INK_COLORS, luminanceOf() (+11 more)

### Community 35 - "pdf-lib"
Cohesion: 0.10
Nodes (6): pdf-lib, formPdf(), N(), file(), PNG, openExample()

### Community 37 - "Stream Limits & Ligatures"
Cohesion: 0.20
Nodes (16): assertDecodedSize(), checkDecodedSize(), checkFlate(), earlyChange(), filterNames(), lzwDecodedLength(), MAX_CONTENT_BYTES, MAX_CONTENT_GLYPHS (+8 more)

### Community 38 - "edit-mode.js"
Cohesion: 0.14
Nodes (22): bezier(), flattenSeg(), fromPage(), insideFill(), nearestNode(), nearestSegment(), pointSegment(), stillRect() (+14 more)

### Community 40 - "NSIS Installer Config"
Cohesion: 0.11
Nodes (19): nsis, allowElevation, allowToChangeInstallationDirectory, artifactName, createDesktopShortcut, createStartMenuShortcut, deleteAppDataOnUninstall, differentialPackage (+11 more)

### Community 41 - ".save"
Cohesion: 0.10
Nodes (20): DANGEROUS_ACTIONS, describeRemoved(), hasRemoved(), N(), REMOVED_ANNOTATIONS, withoutActiveContent(), fileErrorReason(), downloadBytes() (+12 more)

### Community 43 - "Interaction Tests"
Cohesion: 0.15
Nodes (9): settled(), clickAt(), DIR, drag(), escape(), GRAFIK, pt(), pts() (+1 more)

### Community 44 - "File Access Grants"
Cohesion: 0.20
Nodes (8): FileAccess, FileAccessError, isPdfPath(), MESSAGES, pdfPathsFromArgv(), printRequestFromArgv(), renameWithRetry(), RETRY_CODES

### Community 45 - "signature-panel.js"
Cohesion: 0.15
Nodes (17): CAPTURE_DPI, decodeImageFile(), downscaleImage(), encodePng(), imageToCanvas(), MAX_PROCESS_PX, pickPageRegion(), renderPdfRegion() (+9 more)

### Community 46 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, app, build, build:desktop, dev, dist:linux, dist:win, fixtures (+5 more)

### Community 47 - "build.mjs"
Cohesion: 0.23
Nodes (12): build(), buildWorkerSource(), fill(), FONT_DIR, ICON_DIR, loadBundledFonts(), loadLogos(), OUT_FILE (+4 more)

### Community 50 - "High-Zoom Detail Renderer"
Cohesion: 0.23
Nodes (6): area(), DETAIL_MAX_PX, DetailRenderer, grow(), intersect(), OVERSCAN

### Community 51 - "Security Tests"
Cohesion: 0.17
Nodes (12): pdfjs-dist, extractText(), activePdf(), badWindowBomb(), bombPdf(), entries(), inspect(), modelAfterOpen() (+4 more)

### Community 54 - "wiring.js"
Cohesion: 0.12
Nodes (30): LEGACY_COLUMNS, TERMINAL_COLUMNS, boxText(), busLabel(), catColor(), categoryOf(), catStroke(), cellValue() (+22 more)

### Community 55 - "Brand & Rendering Docs"
Cohesion: 0.18
Nodes (12): plantpdf-app.svg App icon (graphite tile), Brand colors (Petrol, Orange, Flansch), PlantPDF Markenpaket (brand package), plantpdf-document.svg Document icon, Bundled pdf.js (GlobalWorkerOptions, worker blob), Zoomen bis 3200 % und Hand-Werkzeug, Build (scripts/build.mjs, esbuild IIFE), pdf.js (+4 more)

### Community 56 - "PathEditor"
Cohesion: 0.14
Nodes (14): cloneSubpaths(), deleteNodes(), deleteSegment(), detachSegment(), moveNodes(), piece(), segEnds(), svgPath() (+6 more)

### Community 57 - "session.js"
Cohesion: 0.11
Nodes (24): bytesToHexString(), bytesToLatin1(), ContentOp, DELIMITERS, DictToken, formatNumber(), latin1ToBytes(), NameToken (+16 more)

### Community 59 - "Text Layout Analysis"
Cohesion: 0.29
Nodes (9): buildTextBlocks(), buildTextLines(), finalizeBlock(), findNear(), hasJustifiedRightEdge(), isSpaceChar(), isUpright(), onSameBaseline() (+1 more)

### Community 60 - "Electron Builder Base"
Cohesion: 0.17
Nodes (11): appId, artifactName, asar, copyright, directories, output, electronLanguages, files (+3 more)

### Community 62 - "Feature Docs"
Cohesion: 0.18
Nodes (10): Bundled pdf-lib + fontkit (PDFDocument, xref writer), ToUnicode CMap generation (Adobe-Identity-UCS), Fotodokumentation linked to Lageplan, Lageplan (site plan with devices, Richtfunk, Maßstab), Bild / QR-Code placement, Two workspaces: PDF and Dokumentation, Zugangsdaten (device credentials), PdfSession (session.js) (+2 more)

### Community 63 - "FontFamily"
Cohesion: 0.13
Nodes (3): FontFamily, fontKey(), FontLibrary

### Community 64 - "pdf-font.js"
Cohesion: 0.24
Nodes (14): glyphIdSetCache, mappedGlyphIds(), parseSfnt(), readAdvanceWidths(), readCmaps(), readFontInfo(), readGlyphData(), readLeftSideBearings() (+6 more)

### Community 65 - "Legacy 1.0 Editor"
Cohesion: 0.24
Nodes (10): PDF-Editor 1.0 (legacy single-file build), Legacy app shell (top bar, left panel, ctx bar, pages, nav, thumbs rail), Legacy CSS design tokens (:root --ink/--acc ...), Legacy start page (drop zone, features, recent), Legacy organize-pages UI (insert, rotate, duplicate, delete, export), Legacy inline text editor (te-frame), Seiten organisieren / Seitenzahlen anpassen, Text bearbeiten (+2 more)

### Community 66 - "export.js"
Cohesion: 0.09
Nodes (24): assertPrintable(), canMakePdf(), contentFingerprint(), embedProject(), hasProject(), makePdf(), maker(), printHtml() (+16 more)

### Community 69 - "Zoom Tests"
Cohesion: 0.11
Nodes (4): BUILDS, objectsOf(), zoomIdle(), zoomOnto()

### Community 70 - ".constructor"
Cohesion: 0.21
Nodes (3): readStripSetting(), readWorkspace(), FontsPanel

### Community 71 - "Electron Fuses"
Cohesion: 0.25
Nodes (8): electronFuses, enableCookieEncryption, enableEmbeddedAsarIntegrityValidation, enableNodeCliInspectArguments, enableNodeOptionsEnvironmentVariable, grantFileProtocolExtraPrivileges, onlyLoadAppFromAsar, runAsNode

### Community 72 - "Security & Update Docs"
Cohesion: 0.25
Nodes (4): Update-Suche über GitHub, Desktop-App (Electron), Release / Auto-Release GitHub workflows, Updater (GitHub releases, SHA-256 check)

### Community 73 - "interpretContent"
Cohesion: 0.15
Nodes (9): interpretContent(), resolveColorSpace(), toRgb(), toNumber(), PathRecorder, PdfFontCache, nameText(), pdfName() (+1 more)

### Community 75 - "Font Licenses"
Cohesion: 0.38
Nodes (7): Barlow font (The Barlow Project Authors), Barlow Font License (SIL OFL 1.1), SIL Open Font License 1.1, IBM Plex font (Reserved Font Name Plex), IBM Plex Font License (SIL OFL 1.1), Bedienungsanleitung template (bilingual), Schriften (built-in Barlow, IBM Plex Mono, custom font loading)

### Community 76 - "Windows Build Target"
Cohesion: 0.29
Nodes (7): arch, target, win, icon, legalTrademarks, requestedExecutionLevel, target

### Community 77 - "Storage & Migration Docs"
Cohesion: 0.29
Nodes (6): IndexedDB pdf-editor v1, Automatische Wiederherstellung, Umstieg von Version 1.0 (storage migration), Unterschrift hinterlegen und einsetzen, IndexedDB stores (pdf-editor v2, pdfix-studio), Signature module (extract, capture, draw, store)

### Community 78 - "cff.js"
Cohesion: 0.36
Nodes (9): buildCffDisplayFont(), glyphNameCandidates(), readCffCharset(), readCffDict(), readCffIndex(), readUint16(), readUintN(), GLYPH_TABLES (+1 more)

### Community 79 - "EXIF Photo Dates"
Cohesion: 0.60
Nodes (5): ascii(), entries(), exifDate(), photoDate(), toIso()

### Community 80 - "Linux Build Target"
Cohesion: 0.50
Nodes (4): linux, category, icon, target

### Community 81 - "upgradeProject"
Cohesion: 0.28
Nodes (9): ACCESS_TABLES(), cleanAccessCols(), cleanAccessPresets(), cleanList(), defaultAccessCols(), defaultAccessPresets(), defaultShow(), saveAccessPresets() (+1 more)

### Community 82 - "Prettier Config"
Cohesion: 0.50
Nodes (3): printWidth, singleQuote, trailingComma

### Community 84 - "Extra Resources"
Cohesion: 0.67
Nodes (3): extraResources, from, to

### Community 89 - "numberedGroups"
Cohesion: 0.39
Nodes (8): appendToGroup(), codeOffsets(), codeSep(), numberedGroups(), renumberByPosition(), setSymbolNumber(), symbolCode(), symbolNumber()

### Community 90 - "showPresetsDialog"
Cohesion: 0.15
Nodes (36): cleanPageLook(), defaultLook(), formatDocNo(), loadAccessPresets(), loadSitePresets(), resetAccessPresets(), resetSitePresets(), resetWiringPresets() (+28 more)

### Community 91 - "newProject"
Cohesion: 0.25
Nodes (8): cleanCoverFields(), defaultCoverFields(), newGuard(), newManualMeta(), newProject(), pickParts(), templatePreview(), templateProject()

### Community 92 - "desktop.spec.js"
Cohesion: 0.10
Nodes (7): ELECTRON, hasXdotool, ROOT, DIR, dokument(), makePng(), ROOT

### Community 97 - "mergeSitePresets"
Cohesion: 0.67
Nodes (4): copyJson(), mergeSitePresets(), newSite(), newSiteFromPresets()

### Community 103 - "PlantPDF"
Cohesion: 0.67
Nodes (4): Former name PDFix (until 2.13), LIESMICH user manual (PlantPDF), Julius Steiner (Developer), PlantPDF

## Ambiguous Edges - Review These
- `Automatische Wiederherstellung` → `IndexedDB stores (pdf-editor v2, pdfix-studio)`  [AMBIGUOUS]
  LIESMICH.txt · relation: shares_data_with

## Knowledge Gaps
- **18 isolated node(s):** `plantpdf-app.svg App icon (graphite tile)`, `Zoomen bis 3200 % und Hand-Werkzeug`, `Schnelldruck (silent print via ProgID verbs)`, `ToUnicode CMap generation (Adobe-Identity-UCS)`, `Fotodokumentation linked to Lageplan` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 445 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `pdf-lib` connect `pdf-lib` to `pdf-font.js`, `export.js`, `PDF Form Fields`, `Stream Limits & Ligatures`, `Zoom Tests`, `interpretContent`, `.save`, `Interaction Tests`, `package.json`, `app.js`, `desktop.spec.js`, `Page Organize & Numbering`, `Security Tests`, `font-manager.js`, `session.js`, `studio.js`, `Regression Test Helpers`?**
  _High betweenness centrality (0.207) - this node is a cross-community bridge._
- **What connects `plantpdf-app.svg App icon (graphite tile)`, `Zoomen bis 3200 % und Hand-Werkzeug`, `Schnelldruck (silent print via ProgID verbs)` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Site Plan Geometry` be split into smaller, more focused modules?**
  _Cohesion score 0.06815968841285297 - nodes in this community are weakly interconnected._
- **Why does `$$` connect `$$` to `escapeHtml`, `ui/recovery.js`, `Site Plan Geometry`, `EditMode`, `PDF Form Fields`, `desktop-bridge.js`, `toast`, `icon`, `app.js`, `Page Organize & Numbering`, `htmlToElement`, `studio.js`, `inspector.js`, `$$`, `showDialog`, `.onDown`, `edit-mode.js`, `.save`, `signature-panel.js`, `.renderRibbon`, `export.js`, `.offerAutosave`, `Studio`, `showPresetsDialog`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Should `EditMode` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `htmlToElement()` connect `htmlToElement` to `escapeHtml`, `Site Plan Geometry`, `EditMode`, `PDF Form Fields`, `desktop-bridge.js`, `toast`, `icon`, `app.js`, `Page Organize & Numbering`, `idb.js`, `studio.js`, `inspector.js`, `$$`, `showDialog`, `edit-mode.js`, `.save`, `$$`, `signature-panel.js`, `SignatureTool`, `.renderRibbon`, `SignaturePad`, `export.js`, `.constructor`, `Studio`, `showPresetsDialog`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Automatische Wiederherstellung` and `IndexedDB stores (pdf-editor v2, pdfix-studio)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._