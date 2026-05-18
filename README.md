<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>UniTracker</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --primary:#6366f1;--primary-dark:#4f46e5;--secondary:#10b981;
  --warning:#f59e0b;--danger:#ef4444;--dark:#1e1b4b;
  --gray:#64748b;--light:#f8fafc;--card-bg:#fff;
  --shadow:0 4px 6px -1px rgba(0,0,0,.1);
}
body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);min-height:100vh;padding:20px;}
.container{max-width:1400px;margin:0 auto;}

header{background:var(--card-bg);border-radius:20px;padding:22px 32px;margin-bottom:22px;box-shadow:var(--shadow);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;}
.logo{display:flex;align-items:center;gap:14px;}
.logo-icon{width:48px;height:48px;background:linear-gradient(135deg,var(--primary),#8b5cf6);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;}
.logo h1{color:var(--dark);font-size:1.7rem;}
.logo p{color:var(--gray);font-size:.85rem;}
.user-info{display:flex;gap:12px;flex-wrap:wrap;}
.user-info input{padding:10px 14px;border:2px solid #e2e8f0;border-radius:10px;font-size:.95rem;width:190px;}
.user-info input:focus{outline:none;border-color:var(--primary);}

nav{background:var(--card-bg);border-radius:14px;padding:8px;margin-bottom:22px;box-shadow:var(--shadow);display:flex;gap:8px;flex-wrap:wrap;}
.nav-btn{padding:11px 22px;border:none;border-radius:10px;background:transparent;color:var(--gray);font-size:.95rem;cursor:pointer;transition:all .3s;white-space:nowrap;}
.nav-btn:hover{background:#f1f5f9;}
.nav-btn.active{background:var(--primary);color:#fff;}
.tab-content{display:none;}
.tab-content.active{display:block;}

.card{background:var(--card-bg);border-radius:15px;padding:24px;box-shadow:var(--shadow);margin-bottom:20px;}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;}
.card-header h2{color:var(--dark);font-size:1.35rem;}

.btn{padding:10px 20px;border:none;border-radius:8px;cursor:pointer;font-size:.92rem;transition:all .3s;display:inline-flex;align-items:center;gap:7px;}
.btn-primary{background:var(--primary);color:#fff;}
.btn-primary:hover{background:var(--primary-dark);}
.btn-secondary{background:#e2e8f0;color:var(--dark);}
.btn-secondary:hover{background:#cbd5e1;}
.btn-danger{background:var(--danger);color:#fff;}
.btn-success{background:var(--secondary);color:#fff;}
.btn-warning{background:var(--warning);color:#fff;}
.btn-sm{padding:6px 12px;font-size:.82rem;}

.form-group{margin-bottom:14px;}
.form-group label{display:block;margin-bottom:5px;color:var(--dark);font-weight:500;font-size:.9rem;}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:11px;border:2px solid #e2e8f0;border-radius:8px;font-size:.95rem;font-family:inherit;}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--primary);}
.form-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;}

.modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;align-items:center;justify-content:center;padding:20px;}
.modal.active{display:flex;}
.modal-content{background:var(--card-bg);border-radius:20px;padding:28px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;}
.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;}
.modal-header h2{color:var(--dark);font-size:1.3rem;}
.close-btn{background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--gray);}

.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px;margin-bottom:22px;}
.stat-card{background:var(--card-bg);border-radius:14px;padding:22px;box-shadow:var(--shadow);}
.stat-card h3{color:var(--gray);font-size:.85rem;margin-bottom:8px;}
.stat-card .val{font-size:2.2rem;font-weight:700;}
.stat-card .sub{color:var(--gray);font-size:.82rem;margin-top:4px;}
.s-gpa .val{color:var(--primary);}
.s-courses .val{color:var(--secondary);}
.s-tasks .val{color:var(--warning);}
.s-study .val{color:#8b5cf6;}

.charts-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:20px;margin-bottom:22px;}
.bar-chart{display:flex;align-items:flex-end;gap:7px;height:170px;padding:0 6px;border-bottom:2px solid #e2e8f0;margin-bottom:8px;}
.bar-group{flex:1;display:flex;flex-direction:column;align-items:center;height:100%;justify-content:flex-end;}
.bar{width:100%;max-width:48px;border-radius:6px 6px 0 0;transition:height .5s;min-height:2px;position:relative;}
.bar .bv{position:absolute;top:-19px;left:50%;transform:translateX(-50%);font-size:.7rem;font-weight:600;color:var(--dark);white-space:nowrap;}
.bar-label{font-size:.68rem;color:var(--gray);margin-top:6px;text-align:center;}

.productivity-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;margin-bottom:22px;}
.prod-card{background:var(--card-bg);border-radius:15px;padding:22px;box-shadow:var(--shadow);}
.prod-card h3{color:var(--dark);font-size:1.1rem;margin-bottom:16px;}
.day-heatmap{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:10px;}
.heat-cell{border-radius:6px;padding:10px 4px;text-align:center;transition:all .3s;}
.heat-cell .day-name{font-size:.65rem;opacity:.8;margin-bottom:4px;}
.heat-cell .day-hrs{font-size:.85rem;font-weight:700;}
.heat-0{background:#f1f5f9;color:#94a3b8;}
.heat-1{background:#e0e7ff;color:#6366f1;}
.heat-2{background:#c7d2fe;color:#4f46e5;}
.heat-3{background:#a5b4fc;color:#3730a3;}
.heat-4{background:#818cf8;color:#fff;}
.heat-5{background:#6366f1;color:#fff;}
.prod-insight{display:flex;align-items:center;gap:12px;padding:12px;background:#f8fafc;border-radius:10px;margin-bottom:10px;}
.prod-insight .pi-icon{font-size:1.6rem;}
.prod-insight .pi-info .pi-label{font-size:.78rem;color:var(--gray);font-weight:500;}
.prod-insight .pi-info .pi-value{font-size:1rem;font-weight:700;color:var(--dark);}
.prod-score{text-align:center;padding:20px;background:linear-gradient(135deg,var(--primary),#8b5cf6);border-radius:14px;color:#fff;margin-bottom:14px;}
.prod-score .score-val{font-size:3.5rem;font-weight:700;}
.prod-score .score-label{opacity:.85;font-size:.9rem;}
.score-bar-wrap{background:rgba(255,255,255,.2);border-radius:20px;height:10px;margin-top:12px;}
.score-bar-fill{background:#fff;border-radius:20px;height:100%;transition:width .8s;}
.streak-badge{display:inline-flex;align-items:center;gap:5px;background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff;padding:5px 13px;border-radius:20px;font-weight:600;font-size:.85rem;}

.course-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px;}
.course-card{border-radius:15px;padding:20px;color:#fff;position:relative;overflow:hidden;}
.course-card::before{content:'';position:absolute;top:-40%;right:-40%;width:80%;height:80%;background:rgba(255,255,255,.08);border-radius:50%;}
.course-card h3{font-size:1.2rem;margin-bottom:3px;padding-right:60px;}
.course-card .code{opacity:.8;font-size:.85rem;margin-bottom:12px;}
.course-card .grade-badge{position:absolute;top:18px;right:18px;font-size:1.6rem;font-weight:700;}
.course-card .details{display:flex;justify-content:space-between;font-size:.83rem;opacity:.9;}
.course-card .cc-btn{background:rgba(255,255,255,.2);border:none;color:#fff;padding:6px 12px;border-radius:7px;cursor:pointer;font-size:.8rem;transition:all .3s;}
.course-card .cc-btn:hover{background:rgba(255,255,255,.35);}
.course-card .actions{margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;}
.week-notes-section{margin-top:14px;border-top:1px solid rgba(255,255,255,.2);padding-top:12px;}
.week-notes-section h4{font-size:.82rem;opacity:.9;margin-bottom:8px;}
.week-selector{display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap;}
.week-selector select{padding:7px 10px;border-radius:7px;border:none;font-size:.82rem;background:rgba(255,255,255,.2);color:#fff;cursor:pointer;}
.week-selector select option{color:var(--dark);background:#fff;}
.note-file{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.15);border-radius:6px;padding:5px 9px;margin-bottom:4px;font-size:.78rem;}
.note-file a{color:#fff;text-decoration:none;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.note-file a:hover{text-decoration:underline;}
.note-file .del-note{background:rgba(255,255,255,.2);border:none;color:#fff;cursor:pointer;border-radius:4px;padding:2px 6px;font-size:.72rem;}
.week-upload-input{display:none;}
.course-assignments{margin-top:12px;border-top:1px solid rgba(255,255,255,.2);padding-top:10px;}
.course-assignments h4{font-size:.82rem;opacity:.9;margin-bottom:8px;}
.mini-assignment{display:flex;align-items:center;gap:7px;padding:6px 8px;background:rgba(255,255,255,.12);border-radius:6px;margin-bottom:5px;font-size:.78rem;cursor:pointer;transition:all .3s;}
.mini-assignment:hover{background:rgba(255,255,255,.22);}
.mini-assignment .ma-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.mini-assignment .ma-title{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.mini-assignment .ma-due{opacity:.8;font-size:.72rem;}

.assign-item{display:flex;align-items:center;padding:14px;border-radius:10px;margin-bottom:10px;background:#f8fafc;gap:13px;flex-wrap:wrap;}
.assign-item.done{opacity:.55;}
.checkbox{width:23px;height:23px;min-width:23px;border:2px solid var(--primary);border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;}
.assign-item.done .checkbox{background:var(--secondary);border-color:var(--secondary);}
.assign-info{flex:1;min-width:130px;}
.assign-title{font-weight:600;color:var(--dark);}
.assign-item.done .assign-title{text-decoration:line-through;}
.assign-meta{font-size:.8rem;color:var(--gray);margin-top:3px;}
.due-badge{padding:4px 10px;border-radius:20px;font-size:.75rem;font-weight:500;white-space:nowrap;}
.due-urgent{background:#fef2f2;color:var(--danger);}
.due-soon{background:#fffbeb;color:var(--warning);}
.due-later{background:#f0fdf4;color:var(--secondary);}
.due-done{background:#f0fdf4;color:var(--secondary);}
.pri{padding:3px 8px;border-radius:5px;font-size:.7rem;font-weight:600;text-transform:uppercase;}
.pri-high{background:#fef2f2;color:var(--danger);}
.pri-medium{background:#fffbeb;color:var(--warning);}
.pri-low{background:#f0fdf4;color:var(--secondary);}
.filter-group{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;}
.filter-btn{padding:7px 14px;border:1px solid #e2e8f0;border-radius:20px;background:#fff;cursor:pointer;transition:all .3s;font-size:.88rem;}
.filter-btn.active{background:var(--primary);color:#fff;border-color:var(--primary);}

.inner-tabs{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;}
.inner-tab{padding:9px 18px;border:2px solid #e2e8f0;border-radius:10px;background:#fff;cursor:pointer;font-size:.9rem;transition:all .3s;color:var(--gray);}
.inner-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);}
.inner-panel{display:none;}
.inner-panel.active{display:block;}

/* ── PROJECT CARD ── */
.project-card{background:#fff;border-radius:14px;padding:22px;margin-bottom:16px;box-shadow:var(--shadow);border-left:5px solid #94a3b8;transition:border-color .3s;}
.project-card.status-planning{border-left-color:#94a3b8;}
.project-card.status-in-progress{border-left-color:var(--warning);}
.project-card.status-completed{border-left-color:var(--secondary);}
.project-card.status-on-hold{border-left-color:var(--danger);}
.project-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:14px;}
.project-top h3{color:var(--dark);font-size:1.1rem;font-weight:700;line-height:1.3;}
.project-top-right{display:flex;gap:8px;align-items:center;flex-wrap:wrap;flex-shrink:0;}
.proj-badge{padding:4px 10px;border-radius:20px;font-size:.75rem;font-weight:600;display:inline-block;}
.proj-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;}
.proj-planning{background:#f1f5f9;color:var(--gray);}
.proj-in-progress{background:#fffbeb;color:var(--warning);}
.proj-completed{background:#f0fdf4;color:var(--secondary);}
.proj-on-hold{background:#fef2f2;color:var(--danger);}
.project-desc{color:var(--gray);font-size:.87rem;margin-bottom:14px;line-height:1.5;}
.prog-bar-wrap{background:#e2e8f0;border-radius:10px;height:8px;overflow:hidden;margin-bottom:6px;}
.prog-bar-fill{height:100%;border-radius:10px;background:linear-gradient(90deg,var(--primary),#8b5cf6);transition:width .5s;}
.prog-text{font-size:.75rem;color:var(--gray);margin-bottom:14px;}

/* ── SUBTASKS ── */
.subtasks-section{margin-bottom:14px;}
.subtasks-section h4{font-size:.85rem;color:var(--gray);font-weight:600;margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em;}
.subtask-item{display:flex;align-items:center;gap:10px;padding:9px 12px;background:#f8fafc;border-radius:8px;margin-bottom:6px;transition:background .2s;}
.subtask-item:hover{background:#f1f5f9;}
.subtask-item.st-done{opacity:.7;}
.st-check{width:20px;height:20px;min-width:20px;border:2px solid var(--primary);border-radius:5px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:11px;transition:all .2s;}
.subtask-item.st-done .st-check{background:var(--secondary);border-color:var(--secondary);}
.st-title{flex:1;font-size:.88rem;color:var(--dark);}
.subtask-item.st-done .st-title{text-decoration:line-through;color:var(--gray);}
.st-del{background:none;border:none;cursor:pointer;color:#cbd5e1;font-size:.85rem;padding:2px 4px;border-radius:4px;transition:color .2s;}
.st-del:hover{color:var(--danger);}
.add-subtask-row{display:flex;gap:8px;margin-top:8px;}
.add-subtask-row input{flex:1;padding:8px 12px;border:2px solid #e2e8f0;border-radius:8px;font-size:.87rem;}
.add-subtask-row input:focus{outline:none;border-color:var(--primary);}

/* ── GROUP MEMBERS ── */
.members-section{margin-top:14px;padding-top:14px;border-top:1px solid #f1f5f9;}
.members-section h4{font-size:.85rem;color:var(--gray);font-weight:600;margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em;}
.member-list{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px;}
.member-chip{display:flex;align-items:center;gap:7px;padding:7px 12px;border-radius:30px;font-size:.82rem;font-weight:500;background:#f1f5f9;color:var(--dark);}
.member-chip .member-avatar{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:700;color:#fff;flex-shrink:0;}
.member-chip .member-info{display:flex;flex-direction:column;line-height:1.2;}
.member-chip .member-name{font-weight:600;font-size:.82rem;}
.member-chip .member-role{font-size:.7rem;color:var(--gray);}
.member-chip .member-del{background:none;border:none;cursor:pointer;color:#cbd5e1;font-size:.78rem;margin-left:4px;transition:color .2s;}
.member-chip .member-del:hover{color:var(--danger);}
.add-member-row{display:grid;grid-template-columns:1fr 1fr auto;gap:8px;margin-top:8px;align-items:end;}
.add-member-row input,.add-member-row select{padding:8px 10px;border:2px solid #e2e8f0;border-radius:8px;font-size:.85rem;}
.add-member-row input:focus,.add-member-row select:focus{outline:none;border-color:var(--primary);}

/* ── PROJECT LOG ── */
.project-log-section{margin-top:14px;padding-top:14px;border-top:1px solid #f1f5f9;}
.project-log-section h4{font-size:.85rem;color:var(--gray);font-weight:600;margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em;}
.log-entries{max-height:200px;overflow-y:auto;margin-bottom:10px;}
.log-entry{display:flex;gap:10px;margin-bottom:10px;align-items:flex-start;}
.log-entry-meta{display:flex;flex-direction:column;align-items:flex-end;min-width:80px;}
.log-date{font-size:.7rem;color:var(--gray);white-space:nowrap;}
.log-author{font-size:.68rem;color:var(--primary);font-weight:600;}
.log-content{flex:1;background:#f8fafc;padding:9px 13px;border-radius:8px;font-size:.85rem;color:var(--dark);line-height:1.5;border:1px solid #e2e8f0;}
.log-del{background:none;border:none;cursor:pointer;color:#cbd5e1;font-size:.75rem;transition:color .2s;align-self:flex-start;margin-top:2px;}
.log-del:hover{color:var(--danger);}
.log-input-row{display:flex;gap:8px;}
.log-input-row textarea{flex:1;padding:9px 12px;border:2px solid #e2e8f0;border-radius:8px;font-size:.85rem;resize:none;height:60px;font-family:inherit;}
.log-input-row textarea:focus{outline:none;border-color:var(--primary);}
.log-post-btn{padding:8px 16px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:.85rem;align-self:flex-end;transition:background .2s;}
.log-post-btn:hover{background:var(--primary-dark);}

/* ── PROJECT STATUS SELECT ── */
.status-select{padding:7px 12px;border:2px solid #e2e8f0;border-radius:8px;font-size:.85rem;background:#fff;color:var(--dark);cursor:pointer;}
.status-select:focus{outline:none;border-color:var(--primary);}

.schedule-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:9px;}
.day-col{background:#f8fafc;border-radius:10px;padding:13px;min-height:300px;}
.day-col h4{text-align:center;margin-bottom:11px;color:var(--dark);padding-bottom:8px;border-bottom:2px solid #e2e8f0;font-size:.88rem;}
.sched-item{background:linear-gradient(135deg,var(--primary),#8b5cf6);color:#fff;border-radius:7px;padding:9px;margin-bottom:8px;font-size:.78rem;position:relative;}
.sched-item .si-time{opacity:.8;font-size:.7rem;}
.sched-item .si-name{font-weight:600;margin:3px 0;}
.sched-item .si-loc{opacity:.8;font-size:.7rem;}
.sched-item .si-del{position:absolute;top:4px;right:4px;background:rgba(255,255,255,.25);border:none;color:#fff;cursor:pointer;border-radius:4px;font-size:.67rem;padding:2px 5px;}

.gpa-hero{text-align:center;padding:26px;background:linear-gradient(135deg,var(--primary),#8b5cf6);border-radius:14px;color:#fff;margin-bottom:22px;}
.gpa-hero .gpa-val{font-size:3.5rem;font-weight:700;}
.gpa-hero p{opacity:.8;margin-top:7px;}
table{width:100%;border-collapse:collapse;}
th,td{padding:13px;text-align:left;border-bottom:1px solid #e2e8f0;font-size:.9rem;}
th{background:#f8fafc;color:var(--dark);font-weight:600;}
tr:hover{background:#f8fafc;}

.timer-wrap{text-align:center;padding:32px;}
.timer-display{font-size:4.5rem;font-weight:700;color:var(--dark);margin:22px 0;font-family:'Courier New',monospace;}
.timer-presets{display:flex;justify-content:center;gap:9px;margin-bottom:16px;flex-wrap:wrap;}
.preset-btn{padding:9px 17px;border:2px solid var(--primary);border-radius:25px;background:transparent;color:var(--primary);cursor:pointer;transition:all .3s;font-size:.88rem;}
.preset-btn:hover,.preset-btn.active{background:var(--primary);color:#fff;}
.custom-row{display:flex;align-items:center;justify-content:center;gap:9px;margin-bottom:22px;flex-wrap:wrap;}
.custom-row input{width:72px;padding:9px;text-align:center;border:2px solid #e2e8f0;border-radius:10px;font-size:1.1rem;font-weight:600;}
.custom-row input:focus{outline:none;border-color:var(--primary);}
.timer-btns{display:flex;justify-content:center;gap:13px;margin-bottom:22px;flex-wrap:wrap;}
.timer-btns .btn{padding:13px 34px;font-size:1rem;}
.log-item{display:flex;justify-content:space-between;padding:11px 14px;background:#f8fafc;border-radius:8px;margin-bottom:7px;align-items:center;font-size:.88rem;}

.budget-top{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:16px;margin-bottom:22px;}
.bc{border-radius:14px;padding:18px;text-align:center;color:#fff;}
.bc h4{opacity:.85;font-size:.85rem;margin-bottom:8px;}
.bc .amt{font-size:1.8rem;font-weight:700;}
.bc-income{background:linear-gradient(135deg,#10b981,#059669);}
.bc-exp{background:linear-gradient(135deg,var(--danger),#dc2626);}
.bc-rem{background:linear-gradient(135deg,var(--primary),#4f46e5);}
.bc-bud{background:linear-gradient(135deg,var(--warning),#d97706);}
.exp-item{display:flex;justify-content:space-between;align-items:center;padding:13px;background:#f8fafc;border-radius:10px;margin-bottom:9px;}
.exp-cat{display:flex;align-items:center;gap:10px;}
.exp-icon{width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;}
.pc-record{display:flex;justify-content:space-between;align-items:center;padding:14px;background:#f8fafc;border-radius:11px;margin-bottom:9px;border-left:4px solid var(--secondary);}
.pc-record .pr-info h4{color:var(--dark);font-weight:600;font-size:.95rem;}
.pc-record .pr-info span{font-size:.8rem;color:var(--gray);}
.pc-record .pr-amt{font-size:1.3rem;font-weight:700;color:var(--secondary);}

.empty{text-align:center;padding:40px;color:var(--gray);}
.empty .ei{font-size:3rem;margin-bottom:14px;}

#fileNameModal .modal-content{max-width:400px;}

@media(max-width:768px){
  .schedule-grid{grid-template-columns:1fr;}
  .timer-display{font-size:3rem;}
  header{flex-direction:column;text-align:center;}
  .charts-grid,.productivity-grid{grid-template-columns:1fr;}
  .add-member-row{grid-template-columns:1fr;gap:6px;}
}
</style>
</head>
<body>
<div class="container">

<header>
  <div class="logo">
    <div class="logo-icon">🎓</div>
    <div><h1>UniTracker</h1><p>Your University Life Companion</p></div>
  </div>
  <div class="user-info">
    <input type="text" id="studentName" placeholder="Your Name">
    <input type="text" id="semester" placeholder="e.g. Semester 2, 2025">
  </div>
</header>

<nav>
  <button class="nav-btn active" data-tab="dashboard">📊 Dashboard</button>
  <button class="nav-btn" data-tab="courses">📚 Courses</button>
  <button class="nav-btn" data-tab="assignments">📝 Assignments</button>
  <button class="nav-btn" data-tab="schedule">📅 Schedule</button>
  <button class="nav-btn" data-tab="gpa">🎯 GPA</button>
  <button class="nav-btn" data-tab="timer">⏱️ Study Timer</button>
  <button class="nav-btn" data-tab="budget">💰 Budget</button>
</nav>

<!-- DASHBOARD -->
<div id="dashboard" class="tab-content active">
  <div class="stat-grid">
    <div class="stat-card s-gpa"><h3>Current GPA</h3><div class="val" id="dashGPA">0.00</div><div class="sub">Out of 4.0</div></div>
    <div class="stat-card s-courses"><h3>Active Courses</h3><div class="val" id="dashCourses">0</div><div class="sub" id="dashCredits">0 Credits</div></div>
    <div class="stat-card s-tasks"><h3>Pending Tasks</h3><div class="val" id="dashTasks">0</div><div class="sub" id="dashUrgent">0 Due Soon</div></div>
    <div class="stat-card s-study"><h3>Study This Week</h3><div class="val" id="dashStudy">0h</div><div class="sub" id="dashSessions">0 sessions</div></div>
  </div>
  <div class="productivity-grid">
    <div class="prod-card">
      <h3>🧠 Productivity Score</h3>
      <div class="prod-score">
        <div class="score-val" id="prodScore">0</div>
        <div class="score-label" id="prodScoreLabel">Start studying to build your score</div>
        <div class="score-bar-wrap"><div class="score-bar-fill" id="prodScoreBar" style="width:0%"></div></div>
      </div>
      <div id="prodInsights"></div>
    </div>
    <div class="prod-card">
      <h3>🗓️ Study Heatmap <span class="streak-badge" id="streakBadge">🔥 0 days</span></h3>
      <div class="day-heatmap" id="dayHeatmap"></div>
      <div style="margin-top:15px">
        <div class="bar-chart" id="heatmapGraph" style="height:100px;border:none;"></div>
      </div>
      <p style="font-size:.75rem;color:var(--gray);text-align:center;margin-top:6px">Average minutes per day of week (all time)</p>
    </div>
  </div>
  <div class="charts-grid">
    <div class="card"><div class="card-header"><h2>📈 Weekly Study Hours</h2></div><div id="weeklyChart"></div></div>
    <div class="card"><div class="card-header"><h2>🎯 Grade Overview</h2></div><div id="gradeChart"></div></div>
  </div>
  <div class="card"><div class="card-header"><h2>📅 Upcoming Deadlines</h2></div><div id="upcomingDeadlines"></div></div>
</div>

<!-- COURSES -->
<div id="courses" class="tab-content">
  <div class="card">
    <div class="card-header"><h2>📚 My Courses</h2><button class="btn btn-primary" onclick="openCourseModal()">+ Add Course</button></div>
    <div class="course-grid" id="courseList"><div class="empty"><div class="ei">📚</div><p>No courses yet</p></div></div>
  </div>
</div>

<!-- ASSIGNMENTS -->
<div id="assignments" class="tab-content">
  <div class="card">
    <div class="card-header"><h2>📝 Assignments & Projects</h2>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="openModal('assignModal')">+ Assignment</button>
        <button class="btn btn-warning" onclick="openProjectModal()">+ Project</button>
      </div>
    </div>
    <div class="inner-tabs">
      <button class="inner-tab active" data-panel="panel-assignments">📋 Assignments</button>
      <button class="inner-tab" data-panel="panel-projects">🗂️ Projects</button>
    </div>
    <div class="inner-panel active" id="panel-assignments">
      <div class="filter-group">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="pending">Pending</button>
        <button class="filter-btn" data-filter="completed">Completed</button>
        <button class="filter-btn" data-filter="high">High Priority</button>
      </div>
      <div id="assignmentList"></div>
    </div>
    <div class="inner-panel" id="panel-projects">
      <div id="projectList"></div>
    </div>
  </div>
</div>

<!-- SCHEDULE -->
<div id="schedule" class="tab-content">
  <div class="card">
    <div class="card-header"><h2>📅 Weekly Schedule</h2><button class="btn btn-primary" onclick="openModal('schedModal')">+ Add Class</button></div>
    <div class="schedule-grid">
      <div class="day-col"><h4>Mon</h4><div class="dc" data-day="monday"></div></div>
      <div class="day-col"><h4>Tue</h4><div class="dc" data-day="tuesday"></div></div>
      <div class="day-col"><h4>Wed</h4><div class="dc" data-day="wednesday"></div></div>
      <div class="day-col"><h4>Thu</h4><div class="dc" data-day="thursday"></div></div>
      <div class="day-col"><h4>Fri</h4><div class="dc" data-day="friday"></div></div>
      <div class="day-col"><h4>Sat</h4><div class="dc" data-day="saturday"></div></div>
      <div class="day-col"><h4>Sun</h4><div class="dc" data-day="sunday"></div></div>
    </div>
  </div>
</div>

<!-- GPA -->
<div id="gpa" class="tab-content">
  <div class="gpa-hero"><h3 style="opacity:.8;margin-bottom:8px">Cumulative GPA</h3><div class="gpa-val" id="calcGPA">0.00</div><p>Based on <span id="totalCr">0</span> credits</p></div>
  <div class="card"><div class="card-header"><h2>📊 Grade Breakdown</h2></div>
    <div style="overflow-x:auto"><table id="gpaTable"><thead><tr><th>Course</th><th>Credits</th><th>Grade</th><th>Grade Points</th></tr></thead><tbody></tbody></table></div>
  </div>
</div>

<!-- TIMER -->
<div id="timer" class="tab-content">
  <div class="card">
    <div class="timer-wrap">
      <h2>⏱️ Study Timer</h2>
      <div class="timer-presets">
        <button class="preset-btn active" data-min="25">Pomodoro 25m</button>
        <button class="preset-btn" data-min="45">Study 45m</button>
        <button class="preset-btn" data-min="60">Focus 60m</button>
        <button class="preset-btn" data-min="5">Break 5m</button>
        <button class="preset-btn" data-min="custom">⚙️ Custom</button>
      </div>
      <div class="custom-row" id="customRow" style="display:none">
        <input type="number" id="cHours" min="0" max="23" value="0"><span>h</span>
        <input type="number" id="cMins" min="0" max="59" value="25"><span>m</span>
        <input type="number" id="cSecs" min="0" max="59" value="0"><span>s</span>
        <button class="btn btn-primary btn-sm" id="setCustom">Set</button>
      </div>
      <div class="timer-display" id="timerDisplay">25:00</div>
      <div class="timer-btns">
        <button class="btn btn-success" id="btnStart">▶ Start</button>
        <button class="btn btn-secondary" id="btnPause">⏸ Pause</button>
        <button class="btn btn-danger" id="btnReset">🔄 Reset</button>
      </div>
      <div class="form-row" style="max-width:480px;margin:0 auto">
        <div class="form-group"><label>Studying:</label><input type="text" id="studySubject" placeholder="Topic…"></div>
        <div class="form-group"><label>Course:</label><select id="timerCourse"><option value="">General</option></select></div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header"><h2>📋 Study Log</h2><button class="btn btn-secondary btn-sm" onclick="clearLog()">Clear</button></div>
    <div id="studyLog"><div class="empty"><div class="ei">📖</div><p>No sessions yet</p></div></div>
  </div>
</div>

<!-- BUDGET -->
<div id="budget" class="tab-content">
  <div class="budget-top">
    <div class="bc bc-income"><h4>💵 Total Income</h4><div class="amt" id="budIncome">$0.00</div></div>
    <div class="bc bc-exp"><h4>💸 Expenses</h4><div class="amt" id="budExp">$0.00</div></div>
    <div class="bc bc-rem"><h4>💰 Net Balance</h4><div class="amt" id="budRem">$0.00</div></div>
    <div class="bc bc-bud"><h4>📋 Monthly Budget</h4><div class="amt" id="budSet">$0.00</div></div>
  </div>
  <div class="card">
    <div class="card-header"><h2>💵 Paychecks</h2><button class="btn btn-success" onclick="openModal('paycheckModal')">+ Add Paycheck</button></div>
    <div id="paycheckList"><div class="empty"><div class="ei">💵</div><p>No paychecks yet</p></div></div>
  </div>
  <div class="card">
    <div class="card-header"><h2>📝 Expenses</h2>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <input type="number" id="budgetInput" placeholder="Set monthly budget $" style="padding:9px;border:2px solid #e2e8f0;border-radius:8px;font-size:.88rem;width:190px;" onchange="setBudget()">
        <button class="btn btn-primary" onclick="openModal('expenseModal')">+ Expense</button>
      </div>
    </div>
    <div id="expenseList"><div class="empty"><div class="ei">💸</div><p>No expenses yet</p></div></div>
  </div>
</div>

</div><!-- /container -->

<!-- ═══ MODALS ═══ -->

<!-- Course Modal -->
<div class="modal" id="courseModal">
  <div class="modal-content">
    <div class="modal-header"><h2 id="courseModalTitle">Add Course</h2><button class="close-btn" onclick="closeCourseModal()">&times;</button></div>
    <form id="courseForm">
      <input type="hidden" id="cEditId">
      <div class="form-group"><label>Course Name</label><input type="text" id="cName" required placeholder="e.g. Data Structures"></div>
      <div class="form-row">
        <div class="form-group"><label>Course Code</label><input type="text" id="cCode" required placeholder="CS201"></div>
        <div class="form-group"><label>Credits</label><input type="number" id="cCredits" required min="1" max="12" placeholder="3"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Instructor</label><input type="text" id="cInstructor" placeholder="Dr. Smith"></div>
        <div class="form-group"><label>Current Grade</label>
          <select id="cGrade">
            <option value="">Not graded</option>
            <option value="4.0">A (4.0)</option><option value="3.7">A- (3.7)</option>
            <option value="3.3">B+ (3.3)</option><option value="3.0">B (3.0)</option><option value="2.7">B- (2.7)</option>
            <option value="2.3">C+ (2.3)</option><option value="2.0">C (2.0)</option><option value="1.7">C- (1.7)</option>
            <option value="1.3">D+ (1.3)</option><option value="1.0">D (1.0)</option><option value="0.0">F (0.0)</option>
          </select>
        </div>
      </div>
      <button type="submit" class="btn btn-primary" style="width:100%">Save Course</button>
    </form>
  </div>
</div>

<!-- Assignment Modal -->
<div class="modal" id="assignModal">
  <div class="modal-content">
    <div class="modal-header"><h2>Add Assignment</h2><button class="close-btn" onclick="closeModal('assignModal')">&times;</button></div>
    <form id="assignForm">
      <div class="form-group"><label>Title</label><input type="text" id="aTitle" required placeholder="e.g. Research Paper"></div>
      <div class="form-group"><label>Course</label><select id="aCourse" required><option value="">Select course</option></select></div>
      <div class="form-row">
        <div class="form-group"><label>Due Date</label><input type="date" id="aDue" required></div>
        <div class="form-group"><label>Priority</label>
          <select id="aPriority"><option value="low">Low</option><option value="medium" selected>Medium</option><option value="high">High</option></select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Type</label>
          <select id="aType">
            <option value="assignment">📋 Assignment</option><option value="quiz">📝 Quiz</option>
            <option value="exam">📚 Exam</option><option value="project">🗂️ Project</option><option value="other">📌 Other</option>
          </select>
        </div>
        <div class="form-group"><label>Weight (%)</label><input type="number" id="aWeight" min="0" max="100" placeholder="e.g. 20"></div>
      </div>
      <div class="form-group"><label>Notes</label><textarea id="aNotes" rows="3" placeholder="Additional details…"></textarea></div>
      <button type="submit" class="btn btn-primary" style="width:100%">Add Assignment</button>
    </form>
  </div>
</div>

<!-- Project Modal -->
<div class="modal" id="projectModal">
  <div class="modal-content">
    <div class="modal-header"><h2>Create Project</h2><button class="close-btn" onclick="closeModal('projectModal')">&times;</button></div>
    <form id="projectForm">
      <div class="form-group"><label>Project Title</label><input type="text" id="pTitle" required placeholder="e.g. Group Research Project"></div>
      <div class="form-group"><label>Course</label><select id="pCourse"><option value="">Not linked</option></select></div>
      <div class="form-row">
        <div class="form-group"><label>Due Date</label><input type="date" id="pDue" required></div>
        <div class="form-group"><label>Status</label>
          <select id="pStatus">
            <option value="planning">📋 Planning</option>
            <option value="in-progress">🚧 In Progress</option>
            <option value="on-hold">⏸ On Hold</option>
            <option value="completed">✅ Completed</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Priority</label>
          <select id="pPriority"><option value="low">Low</option><option value="medium" selected>Medium</option><option value="high">High</option></select>
        </div>
        <div class="form-group"><label>Weight (%)</label><input type="number" id="pWeight" min="0" max="100" placeholder="e.g. 30"></div>
      </div>
      <div class="form-group"><label>Description</label><textarea id="pDesc" rows="3" placeholder="What is this project about?"></textarea></div>
      <div class="form-group"><label>Initial Subtasks — one per line</label><textarea id="pSubtasks" rows="4" placeholder="Research topic&#10;Write outline&#10;Create slides"></textarea></div>
      <button type="submit" class="btn btn-warning" style="width:100%">Create Project</button>
    </form>
  </div>
</div>

<!-- Schedule Modal -->
<div class="modal" id="schedModal">
  <div class="modal-content">
    <div class="modal-header"><h2>Add Class to Schedule</h2><button class="close-btn" onclick="closeModal('schedModal')">&times;</button></div>
    <form id="schedForm">
      <div class="form-group"><label>Course</label><select id="sCourse" required><option value="">Select</option></select></div>
      <div class="form-group"><label>Day</label>
        <select id="sDay" required>
          <option value="monday">Monday</option><option value="tuesday">Tuesday</option><option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option><option value="friday">Friday</option><option value="saturday">Saturday</option><option value="sunday">Sunday</option>
        </select>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Start</label><input type="time" id="sStart" required></div>
        <div class="form-group"><label>End</label><input type="time" id="sEnd" required></div>
      </div>
      <div class="form-group"><label>Location / Room</label><input type="text" id="sLoc" placeholder="Room 204, Building B"></div>
      <button type="submit" class="btn btn-primary" style="width:100%">Add to Schedule</button>
    </form>
  </div>
</div>

<!-- Paycheck Modal -->
<div class="modal" id="paycheckModal">
  <div class="modal-content">
    <div class="modal-header"><h2>Add Paycheck</h2><button class="close-btn" onclick="closeModal('paycheckModal')">&times;</button></div>
    <form id="paycheckForm">
      <div class="form-group"><label>Employer / Source</label><input type="text" id="pcEmp" required placeholder="Part-time job…"></div>
      <div class="form-row">
        <div class="form-group"><label>Gross Pay ($)</label><input type="number" id="pcGross" step="0.01" min="0" placeholder="0.00"></div>
        <div class="form-group"><label>Net Pay ($)</label><input type="number" id="pcNet" required step="0.01" min="0" placeholder="0.00"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Federal Tax ($)</label><input type="number" id="pcFed" step="0.01" min="0" placeholder="0.00"></div>
        <div class="form-group"><label>State Tax ($)</label><input type="number" id="pcState" step="0.01" min="0" placeholder="0.00"></div>
      </div>
      <div class="form-group"><label>Pay Date</label><input type="date" id="pcDate" required></div>
      <div class="form-group"><label>Hours Worked</label><input type="number" id="pcHours" step="0.5" min="0" placeholder="e.g. 40"></div>
      <button type="submit" class="btn btn-success" style="width:100%">Save Paycheck</button>
    </form>
  </div>
</div>

<!-- Expense Modal -->
<div class="modal" id="expenseModal">
  <div class="modal-content">
    <div class="modal-header"><h2>Add Expense</h2><button class="close-btn" onclick="closeModal('expenseModal')">&times;</button></div>
    <form id="expenseForm">
      <div class="form-group"><label>Description</label><input type="text" id="eDesc" required placeholder="e.g. Textbooks"></div>
      <div class="form-row">
        <div class="form-group"><label>Amount ($)</label><input type="number" id="eAmount" required min="0" step="0.01" placeholder="0.00"></div>
        <div class="form-group"><label>Category</label>
          <select id="eCat" required>
            <option value="food">🍔 Food</option><option value="books">📚 Books</option><option value="transport">🚗 Transport</option>
            <option value="entertainment">🎮 Entertainment</option><option value="supplies">✏️ Supplies</option>
            <option value="rent">🏠 Rent</option><option value="other">📦 Other</option>
          </select>
        </div>
      </div>
      <div class="form-group"><label>Date</label><input type="date" id="eDate" required></div>
      <button type="submit" class="btn btn-primary" style="width:100%">Add Expense</button>
    </form>
  </div>
</div>

<!-- File Name Modal -->
<div class="modal" id="fileNameModal">
  <div class="modal-content" style="max-width:400px">
    <div class="modal-header"><h2>Name Your File</h2><button class="close-btn" onclick="closeModal('fileNameModal')">&times;</button></div>
    <form id="fileNameForm">
      <div class="form-group"><label>Custom Name / Summary</label><input type="text" id="customFileName" required placeholder="e.g. Chapter 3 Notes"></div>
      <p style="font-size:.85rem;color:var(--gray);margin-bottom:15px">This label will be shown in your notes list.</p>
      <button type="submit" class="btn btn-primary" style="width:100%">Save File</button>
    </form>
  </div>
</div>

<script>
// ═══════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════
let D = {
  student:{name:'',semester:''},
  courses:[],assignments:[],projects:[],schedule:[],
  expenses:[],paychecks:[],studyLog:[],
  weekNotes:{},
  budget:0
};

const COLORS=['linear-gradient(135deg,#6366f1,#8b5cf6)','linear-gradient(135deg,#10b981,#059669)',
  'linear-gradient(135deg,#f59e0b,#d97706)','linear-gradient(135deg,#ef4444,#dc2626)',
  'linear-gradient(135deg,#3b82f6,#2563eb)','linear-gradient(135deg,#ec4899,#db2777)',
  'linear-gradient(135deg,#14b8a6,#0d9488)','linear-gradient(135deg,#f97316,#ea580c)'];
const SOLID=['#6366f1','#10b981','#f59e0b','#ef4444','#3b82f6','#ec4899','#14b8a6','#f97316'];
const MEMBER_COLORS=['#6366f1','#10b981','#f59e0b','#ef4444','#3b82f6','#ec4899','#14b8a6','#f97316','#8b5cf6','#06b6d4'];
const ROLES=['Member','Leader','Developer','Designer','Researcher','Writer','Editor','Presenter','Tester','Other'];

// Temp upload state
let tempFile=null,uploadCourseId=null,uploadWeek=null;

// ── Migrate old project data so nothing crashes ──
function migrateProjects(projects){
  return (projects||[]).map(p=>({
    ...p,
    subtasks : Array.isArray(p.subtasks) ? p.subtasks : [],
    members  : Array.isArray(p.members)  ? p.members  : [],
    log      : Array.isArray(p.log)      ? p.log      : [],
  }));
}

function save(){
  D.student.name=el('studentName').value;
  D.student.semester=el('semester').value;
  localStorage.setItem('UT4',JSON.stringify(D));
}

function load(){
  const s=localStorage.getItem('UT4');
  if(s){
    const parsed=JSON.parse(s);
    D={...D,...parsed};
    D.projects=migrateProjects(D.projects);
    if(!D.weekNotes)D.weekNotes={};
    if(!D.paychecks)D.paychecks=[];
    el('studentName').value=D.student.name||'';
    el('semester').value=D.student.semester||'';
    el('budgetInput').value=D.budget||'';
  }
}

function el(id){return document.getElementById(id);}
function uid(){return Date.now()+Math.floor(Math.random()*10000);}
function pad(n){return String(n).padStart(2,'0');}

// ═══════════════════════════════════════════════════════════
//  NAV
// ═══════════════════════════════════════════════════════════
document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.nav-btn').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  el(b.dataset.tab).classList.add('active');
  if(b.dataset.tab==='dashboard')renderDashboard();
  if(b.dataset.tab==='timer')refreshTimerCourses();
}));
document.querySelectorAll('.inner-tab').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.inner-tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.inner-panel').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  el(b.dataset.panel).classList.add('active');
}));

// ═══════════════════════════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════════════════════════
function openModal(id){
  el(id).classList.add('active');
  if(id==='assignModal'||id==='schedModal'||id==='projectModal')fillCourseSelects();
}
function closeModal(id){el(id).classList.remove('active');}
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('active');}));

function fillCourseSelects(){
  ['aCourse','sCourse','pCourse'].forEach(id=>{
    const s=el(id);if(!s)return;
    const v=s.value;
    const blank=id==='pCourse'?'<option value="">Not linked</option>':'<option value="">Select course</option>';
    s.innerHTML=blank+D.courses.map(c=>`<option value="${c.id}">${c.name} (${c.code})</option>`).join('');
    if(v)s.value=v;
  });
}

// ═══════════════════════════════════════════════════════════
//  COURSES
// ═══════════════════════════════════════════════════════════
function openCourseModal(){
  el('courseModalTitle').textContent='Add Course';
  el('cEditId').value='';
  el('courseForm').reset();
  el('courseModal').classList.add('active');
}
function closeCourseModal(){
  el('courseModal').classList.remove('active');
  el('cEditId').value='';
  el('courseForm').reset();
}

el('courseForm').addEventListener('submit',e=>{
  e.preventDefault();
  const editId=el('cEditId').value;
  const data={
    name:el('cName').value.trim(),
    code:el('cCode').value.trim(),
    credits:parseInt(el('cCredits').value),
    instructor:el('cInstructor').value.trim(),
    grade:el('cGrade').value
  };
  if(editId){
    const idx=D.courses.findIndex(c=>String(c.id)===editId);
    if(idx>-1)D.courses[idx]={...D.courses[idx],...data};
  } else {
    const id=uid();
    D.courses.push({id,...data});
    D.weekNotes[id]={};
  }
  save();renderCourses();updateGPA();renderDashboard();closeCourseModal();
});

function editCourse(id){
  const c=D.courses.find(x=>x.id===id);if(!c)return;
  el('courseModalTitle').textContent='Edit Course';
  el('cEditId').value=String(c.id);
  el('cName').value=c.name;
  el('cCode').value=c.code;
  el('cCredits').value=c.credits;
  el('cInstructor').value=c.instructor||'';
  el('cGrade').value=c.grade||'';
  el('courseModal').classList.add('active');
}

function deleteCourse(id){
  if(!confirm('Delete this course and all linked data?'))return;
  D.courses=D.courses.filter(c=>c.id!==id);
  D.assignments=D.assignments.filter(a=>a.courseId!==id);
  D.schedule=D.schedule.filter(s=>s.courseId!==id);
  D.projects=D.projects.filter(p=>p.courseId!=id);
  delete D.weekNotes[id];
  save();renderCourses();renderAssignments();renderSchedule();renderProjects();updateGPA();renderDashboard();
}

function renderCourses(){
  const container=el('courseList');
  if(!D.courses.length){container.innerHTML='<div class="empty"><div class="ei">📚</div><p>No courses yet</p></div>';return;}
  container.innerHTML=D.courses.map((c,i)=>{
    const gl=c.grade?gradeLetter(parseFloat(c.grade)):'-';
    const linked=D.assignments.filter(a=>a.courseId==c.id);
    const assignHTML=linked.length
      ?linked.map(a=>{
          const dc=getDueClass(a.dueDate,a.completed);
          const dot=a.completed?'#10b981':dc==='urgent'?'#ef4444':dc==='soon'?'#f59e0b':'#a5b4fc';
          return`<div class="mini-assignment" onclick="jumpToAssignment(${a.id})">
            <div class="ma-dot" style="background:${dot}"></div>
            <span class="ma-title">${a.title}</span>
            <span class="ma-due">${a.completed?'✅ Done':getDaysUntil(a.dueDate)}</span>
          </div>`;
        }).join('')
      :'<p style="opacity:.7;font-size:.78rem">No assignments linked yet</p>';
    return`<div class="course-card" style="background:${COLORS[i%COLORS.length]}">
      <h3>${c.name}</h3><div class="code">${c.code}</div>
      <div class="grade-badge">${gl}</div>
      <div class="details"><span>👤 ${c.instructor||'TBA'}</span><span>📊 ${c.credits} Credits</span></div>
      <div class="week-notes-section">
        <h4>📂 Weekly Notes</h4>
        <div class="week-selector">
          <select id="wkSel_${c.id}" onchange="renderWeekFiles(${c.id})">
            ${Array.from({length:12},(_,k)=>`<option value="week${k+1}">Week ${k+1}</option>`).join('')}
          </select>
          <button class="cc-btn" onclick="initiateUpload(${c.id})">📤 Upload</button>
          <input type="file" id="wf_${c.id}" class="week-upload-input" onchange="onFileSelected(this)">
        </div>
        <div id="wkFiles_${c.id}">${renderWeekFilesHTML(c.id,'week1')}</div>
      </div>
      <div class="course-assignments">
        <h4>📝 Assignments (${linked.length})</h4>
        ${assignHTML}
        <button class="cc-btn" style="margin-top:8px;width:100%" onclick="quickAddAssign(${c.id})">+ Quick Add</button>
      </div>
      <div class="actions">
        <button class="cc-btn" onclick="editCourse(${c.id})">✏️ Edit</button>
        <button class="cc-btn" onclick="deleteCourse(${c.id})">🗑️ Delete</button>
      </div>
    </div>`;
  }).join('');
}

// ── Week Notes ──
function renderWeekFilesHTML(courseId,week){
  const notes=(D.weekNotes[courseId]||{})[week]||[];
  if(!notes.length)return`<p style="opacity:.7;font-size:.75rem;padding:4px 0">No files for ${week.replace('week','Week ')}</p>`;
  return notes.map((n,i)=>`<div class="note-file">
    <span>📄</span>
    <a href="${n.dataUrl}" download="${n.name}">${n.name}</a>
    <button class="del-note" onclick="deleteWeekFile(${courseId},'${week}',${i})">✕</button>
  </div>`).join('');
}
function renderWeekFiles(courseId){
  const s=el(`wkSel_${courseId}`);const week=s?s.value:'week1';
  const c=el(`wkFiles_${courseId}`);if(c)c.innerHTML=renderWeekFilesHTML(courseId,week);
}
function initiateUpload(courseId){
  const s=el(`wkSel_${courseId}`);
  uploadCourseId=courseId;uploadWeek=s?s.value:'week1';
  el(`wf_${courseId}`).click();
}
function onFileSelected(input){
  if(!input.files.length)return;
  tempFile=input.files[0];
  el('customFileName').value=tempFile.name.replace(/\.[^.]+$/,'');
  openModal('fileNameModal');
  input.value='';
}
el('fileNameForm').addEventListener('submit',e=>{
  e.preventDefault();
  if(!tempFile||!uploadCourseId)return;
  const name=el('customFileName').value.trim()||tempFile.name;
  const reader=new FileReader();
  reader.onload=ev=>{
    if(!D.weekNotes[uploadCourseId])D.weekNotes[uploadCourseId]={};
    if(!D.weekNotes[uploadCourseId][uploadWeek])D.weekNotes[uploadCourseId][uploadWeek]=[];
    D.weekNotes[uploadCourseId][uploadWeek].push({name,type:tempFile.type,dataUrl:ev.target.result,uploadedAt:new Date().toISOString()});
    save();renderWeekFiles(uploadCourseId);
    closeModal('fileNameModal');tempFile=null;uploadCourseId=null;uploadWeek=null;
  };
  reader.readAsDataURL(tempFile);
});
function deleteWeekFile(courseId,week,idx){
  if(!confirm('Delete this file?'))return;
  D.weekNotes[courseId][week].splice(idx,1);save();renderWeekFiles(courseId);
}

function gradeLetter(p){
  if(p>=4.0)return'A';if(p>=3.7)return'A-';if(p>=3.3)return'B+';if(p>=3.0)return'B';
  if(p>=2.7)return'B-';if(p>=2.3)return'C+';if(p>=2.0)return'C';if(p>=1.7)return'C-';
  if(p>=1.3)return'D+';if(p>=1.0)return'D';return'F';
}
function quickAddAssign(courseId){fillCourseSelects();el('aCourse').value=courseId;openModal('assignModal');}
function jumpToAssignment(id){
  document.querySelectorAll('.nav-btn').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));
  document.querySelector('[data-tab="assignments"]').classList.add('active');
  el('assignments').classList.add('active');
  document.querySelectorAll('.inner-tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.inner-panel').forEach(x=>x.classList.remove('active'));
  document.querySelector('[data-panel="panel-assignments"]').classList.add('active');
  el('panel-assignments').classList.add('active');
  renderAssignments();
  setTimeout(()=>{const e=el(`assign_${id}`);if(e){e.scrollIntoView({behavior:'smooth',block:'center'});e.style.outline='3px solid var(--primary)';setTimeout(()=>e.style.outline='',2000);}},100);
}

// ═══════════════════════════════════════════════════════════
//  ASSIGNMENTS
// ═══════════════════════════════════════════════════════════
el('assignForm').addEventListener('submit',e=>{
  e.preventDefault();
  const cid=el('aCourse').value;
  D.assignments.push({
    id:uid(),title:el('aTitle').value.trim(),
    courseId:cid?parseInt(cid):null,
    dueDate:el('aDue').value,priority:el('aPriority').value,
    type:el('aType').value,weight:parseFloat(el('aWeight').value)||0,
    notes:el('aNotes').value,completed:false
  });
  save();renderAssignments();renderCourses();renderDashboard();
  closeModal('assignModal');e.target.reset();
});

function renderAssignments(filter='all'){
  const container=el('assignmentList');
  let list=[...D.assignments];
  if(filter==='pending')list=list.filter(a=>!a.completed);
  else if(filter==='completed')list=list.filter(a=>a.completed);
  else if(filter==='high')list=list.filter(a=>a.priority==='high');
  list.sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate));
  if(!list.length){container.innerHTML='<div class="empty"><div class="ei">📝</div><p>No assignments found</p></div>';return;}
  const icons={assignment:'📋',quiz:'📝',exam:'📚',project:'🗂️',other:'📌'};
  container.innerHTML=list.map(a=>{
    const course=D.courses.find(c=>c.id==a.courseId);
    const dc=getDueClass(a.dueDate,a.completed);
    const dLabel=a.completed?'✅ Done':getDaysUntil(a.dueDate);
    const dClass=a.completed?'due-done':dc==='urgent'?'due-urgent':dc==='soon'?'due-soon':'due-later';
    const ci=course?D.courses.indexOf(course)%SOLID.length:0;
    return`<div class="assign-item ${a.completed?'done':''}" id="assign_${a.id}">
      <div class="checkbox" onclick="toggleAssign(${a.id})">${a.completed?'✓':''}</div>
      <div class="assign-info">
        <div class="assign-title">${icons[a.type]||'📋'} ${a.title}</div>
        <div class="assign-meta">
          ${course?`<span style="background:${SOLID[ci]}20;color:${SOLID[ci]};padding:2px 7px;border-radius:10px;font-size:.72rem;font-weight:600">${course.code}</span>`:''}
          ${a.weight?` • ${a.weight}% weight`:''}${a.notes?` • ${a.notes}`:''}
        </div>
      </div>
      <span class="pri pri-${a.priority}">${a.priority}</span>
      <span class="due-badge ${dClass}">${dLabel}</span>
      <button class="btn btn-danger btn-sm" onclick="deleteAssign(${a.id})">🗑️</button>
    </div>`;
  }).join('');
}
document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');renderAssignments(b.dataset.filter);
}));
function toggleAssign(id){const a=D.assignments.find(x=>x.id===id);if(a){a.completed=!a.completed;save();renderAssignments();renderCourses();renderDashboard();}}
function deleteAssign(id){D.assignments=D.assignments.filter(a=>a.id!==id);save();renderAssignments();renderCourses();renderDashboard();}
function getDueClass(d,done){if(done)return'done';const diff=Math.ceil((new Date(d)-new Date())/864e5);return diff<=2?'urgent':diff<=7?'soon':'later';}
function getDaysUntil(d){const diff=Math.ceil((new Date(d)-new Date())/864e5);return diff<0?'Overdue':diff===0?'Today':diff===1?'Tomorrow':`${diff} days`;}

// ═══════════════════════════════════════════════════════════
//  PROJECTS  (fully rewritten, no inline event handlers for
//             complex actions — uses data-* driven handlers)
// ═══════════════════════════════════════════════════════════
function openProjectModal(){fillCourseSelects();openModal('projectModal');}

el('projectForm').addEventListener('submit',e=>{
  e.preventDefault();
  const lines=el('pSubtasks').value.split('\n').filter(l=>l.trim());
  const proj={
    id:uid(),
    title:el('pTitle').value.trim(),
    courseId:el('pCourse').value||null,
    dueDate:el('pDue').value,
    status:el('pStatus').value,
    priority:el('pPriority').value,
    weight:parseFloat(el('pWeight').value)||0,
    desc:el('pDesc').value.trim(),
    subtasks:lines.map(t=>({id:uid(),title:t.trim(),done:false})),
    members:[],
    log:[],
    createdAt:new Date().toISOString()
  };
  D.projects.push(proj);
  save();renderProjects();renderDashboard();
  closeModal('projectModal');e.target.reset();
});

function getProject(id){return D.projects.find(p=>p.id===id);}

/* ── Single place that re-renders ALL projects ── */
function renderProjects(){
  const container=el('projectList');
  if(!D.projects.length){container.innerHTML='<div class="empty"><div class="ei">🗂️</div><p>No projects yet. Add one above!</p></div>';return;}
  const sorted=[...D.projects].sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate));
  container.innerHTML=sorted.map(p=>buildProjectHTML(p)).join('');
}

function buildProjectHTML(p){
  // Safety
  const subtasks=Array.isArray(p.subtasks)?p.subtasks:[];
  const members =Array.isArray(p.members) ?p.members :[];
  const log     =Array.isArray(p.log)     ?p.log     :[];

  const course=D.courses.find(c=>c.id==p.courseId);
  const done=subtasks.filter(s=>s.done).length;
  const total=subtasks.length;
  const pct=total>0?Math.round(done/total*100):0;

  const STATUS_LABEL={planning:'📋 Planning','in-progress':'🚧 In Progress',completed:'✅ Completed','on-hold':'⏸ On Hold'};
  const STATUS_CLASS={planning:'proj-planning','in-progress':'proj-in-progress',completed:'proj-completed','on-hold':'proj-on-hold'};

  // Subtasks HTML
  const subtasksHTML=subtasks.map(s=>`
    <div class="subtask-item ${s.done?'st-done':''}" id="st_${p.id}_${s.id}">
      <div class="st-check" data-proj="${p.id}" data-st="${s.id}" onclick="toggleSubtask(this)">${s.done?'✓':''}</div>
      <span class="st-title">${escHtml(s.title)}</span>
      <button class="st-del" data-proj="${p.id}" data-st="${s.id}" onclick="deleteSubtask(this)" title="Remove">✕</button>
    </div>`).join('');

  // Members HTML
  const membersHTML=members.map((m,mi)=>{
    const initials=(m.name||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
    const col=MEMBER_COLORS[mi%MEMBER_COLORS.length];
    return`<div class="member-chip">
      <div class="member-avatar" style="background:${col}">${initials}</div>
      <div class="member-info">
        <span class="member-name">${escHtml(m.name)}</span>
        <span class="member-role">${escHtml(m.role||'Member')}</span>
      </div>
      ${m.email?`<a href="mailto:${m.email}" title="${m.email}" style="color:var(--primary);font-size:.75rem">✉</a>`:''}
      <button class="member-del" data-proj="${p.id}" data-mi="${mi}" onclick="deleteMember(this)" title="Remove">✕</button>
    </div>`;
  }).join('');

  // Log HTML
  const logHTML=log.map((l,li)=>`
    <div class="log-entry">
      <div class="log-content">${escHtml(l.text)}</div>
      <div class="log-entry-meta">
        <span class="log-date">${new Date(l.date).toLocaleDateString()}</span>
        <span class="log-date">${new Date(l.date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span>
      </div>
      <button class="log-del" data-proj="${p.id}" data-li="${li}" onclick="deleteLogEntry(this)" title="Delete">🗑</button>
    </div>`).join('');

  return`<div class="project-card status-${p.status}" id="proj_${p.id}">

    <div class="project-top">
      <h3>🗂️ ${escHtml(p.title)}</h3>
      <div class="project-top-right">
        <select class="status-select" data-proj="${p.id}" onchange="changeStatus(this)">
          <option value="planning"      ${p.status==='planning'?'selected':''}>📋 Planning</option>
          <option value="in-progress"   ${p.status==='in-progress'?'selected':''}>🚧 In Progress</option>
          <option value="on-hold"       ${p.status==='on-hold'?'selected':''}>⏸ On Hold</option>
          <option value="completed"     ${p.status==='completed'?'selected':''}>✅ Completed</option>
        </select>
        <button class="btn btn-danger btn-sm" onclick="deleteProject(${p.id})">🗑️</button>
      </div>
    </div>

    <div class="proj-meta">
      <span class="proj-badge ${STATUS_CLASS[p.status]}">${STATUS_LABEL[p.status]}</span>
      <span class="proj-badge" style="background:#f1f5f9;color:var(--gray)">⏰ ${getDaysUntil(p.dueDate)}</span>
      ${course?`<span class="proj-badge" style="background:${SOLID[D.courses.indexOf(course)%SOLID.length]}20;color:${SOLID[D.courses.indexOf(course)%SOLID.length]}">${course.code}</span>`:''}
      ${p.weight?`<span class="proj-badge proj-completed">${p.weight}% of grade</span>`:''}
      <span class="pri pri-${p.priority}">${p.priority}</span>
    </div>

    ${p.desc?`<p class="project-desc">${escHtml(p.desc)}</p>`:''}

    <div class="prog-bar-wrap"><div class="prog-bar-fill" style="width:${pct}%"></div></div>
    <p class="prog-text">${done}/${total} subtasks complete — ${pct}%</p>

    <!-- SUBTASKS -->
    <div class="subtasks-section">
      <h4>✅ Subtasks</h4>
      <div id="sts_${p.id}">${subtasksHTML}</div>
      <div class="add-subtask-row">
        <input type="text" id="newST_${p.id}" placeholder="Add subtask…" onkeydown="if(event.key==='Enter'){event.preventDefault();addSubtask(${p.id});}">
        <button class="btn btn-primary btn-sm" onclick="addSubtask(${p.id})">+ Add</button>
      </div>
    </div>

    <!-- GROUP MEMBERS -->
    <div class="members-section">
      <h4>👥 Group Members (${members.length})</h4>
      <div class="member-list" id="members_${p.id}">${membersHTML||'<p style="color:var(--gray);font-size:.83rem">No members added yet</p>'}</div>
      <div class="add-member-row">
        <input type="text" id="mName_${p.id}" placeholder="Full name *">
        <select id="mRole_${p.id}">${ROLES.map(r=>`<option>${r}</option>`).join('')}</select>
        <button class="btn btn-primary btn-sm" onclick="addMember(${p.id})">+ Add</button>
      </div>
      <div style="margin-top:6px">
        <input type="email" id="mEmail_${p.id}" placeholder="Email (optional)" style="width:100%;padding:8px 10px;border:2px solid #e2e8f0;border-radius:8px;font-size:.85rem;">
      </div>
    </div>

    <!-- PROJECT LOG -->
    <div class="project-log-section">
      <h4>📝 Project Log (${log.length})</h4>
      <div class="log-entries" id="log_${p.id}">${logHTML||'<p style="color:var(--gray);font-size:.83rem">No entries yet</p>'}</div>
      <div class="log-input-row">
        <textarea id="logTxt_${p.id}" placeholder="Write an update, note or decision…"></textarea>
        <button class="log-post-btn" onclick="addLogEntry(${p.id})">Post</button>
      </div>
    </div>

  </div>`;
}

function escHtml(s){
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Status change via select ── */
function changeStatus(selectEl){
  const id=parseInt(selectEl.dataset.proj);
  const p=getProject(id);if(!p)return;
  p.status=selectEl.value;
  // Update card border without full re-render
  const card=el(`proj_${id}`);
  if(card){
    card.className=`project-card status-${p.status}`;
  }
  save();
}

/* ── Subtasks ── */
function toggleSubtask(btnEl){
  const projId=parseInt(btnEl.dataset.proj),stId=parseInt(btnEl.dataset.st);
  const p=getProject(projId);if(!p)return;
  const s=p.subtasks.find(x=>x.id===stId);if(!s)return;
  s.done=!s.done;
  if(p.subtasks.every(s=>s.done)&&p.subtasks.length>0)p.status='completed';
  else if(p.subtasks.some(s=>s.done)&&p.status==='planning')p.status='in-progress';
  save();
  // Patch DOM instead of full re-render
  const item=el(`st_${projId}_${stId}`);
  if(item){
    item.classList.toggle('st-done',s.done);
    item.querySelector('.st-check').textContent=s.done?'✓':'';
  }
  // Update progress bar
  const done=p.subtasks.filter(x=>x.done).length,total=p.subtasks.length;
  const pct=total>0?Math.round(done/total*100):0;
  const card=el(`proj_${projId}`);
  if(card){
    const bar=card.querySelector('.prog-bar-fill');if(bar)bar.style.width=pct+'%';
    const txt=card.querySelector('.prog-text');if(txt)txt.textContent=`${done}/${total} subtasks complete — ${pct}%`;
    card.className=`project-card status-${p.status}`;
    const sel=card.querySelector('.status-select');if(sel)sel.value=p.status;
  }
}

function deleteSubtask(btnEl){
  const projId=parseInt(btnEl.dataset.proj),stId=parseInt(btnEl.dataset.st);
  const p=getProject(projId);if(!p)return;
  p.subtasks=p.subtasks.filter(s=>s.id!==stId);
  save();
  const item=el(`st_${projId}_${stId}`);if(item)item.remove();
  // Refresh progress
  const done=p.subtasks.filter(s=>s.done).length,total=p.subtasks.length;
  const pct=total>0?Math.round(done/total*100):0;
  const card=el(`proj_${projId}`);
  if(card){
    const bar=card.querySelector('.prog-bar-fill');if(bar)bar.style.width=pct+'%';
    const txt=card.querySelector('.prog-text');if(txt)txt.textContent=`${done}/${total} subtasks complete — ${pct}%`;
  }
}

function addSubtask(projId){
  const input=el(`newST_${projId}`);if(!input||!input.value.trim())return;
  const p=getProject(projId);if(!p)return;
  const st={id:uid(),title:input.value.trim(),done:false};
  p.subtasks.push(st);
  input.value='';save();
  // Inject new subtask into DOM
  const container=el(`sts_${projId}`);
  if(container){
    const div=document.createElement('div');
    div.className='subtask-item';
    div.id=`st_${projId}_${st.id}`;
    div.innerHTML=`<div class="st-check" data-proj="${projId}" data-st="${st.id}" onclick="toggleSubtask(this)"></div>
      <span class="st-title">${escHtml(st.title)}</span>
      <button class="st-del" data-proj="${projId}" data-st="${st.id}" onclick="deleteSubtask(this)" title="Remove">✕</button>`;
    container.appendChild(div);
  }
  // Update progress
  const done=p.subtasks.filter(s=>s.done).length,total=p.subtasks.length;
  const pct=total>0?Math.round(done/total*100):0;
  const card=el(`proj_${projId}`);
  if(card){
    const bar=card.querySelector('.prog-bar-fill');if(bar)bar.style.width=pct+'%';
    const txt=card.querySelector('.prog-text');if(txt)txt.textContent=`${done}/${total} subtasks complete — ${pct}%`;
  }
}

/* ── Group Members ── */
function addMember(projId){
  const nameEl=el(`mName_${projId}`);
  const name=(nameEl?nameEl.value.trim():'');
  if(!name){alert('Please enter a member name.');return;}
  const role=el(`mRole_${projId}`)?.value||'Member';
  const email=el(`mEmail_${projId}`)?.value.trim()||'';
  const p=getProject(projId);if(!p)return;
  p.members.push({id:uid(),name,role,email});
  nameEl.value='';
  if(el(`mEmail_${projId}`))el(`mEmail_${projId}`).value='';
  save();
  // Refresh member list
  const container=el(`members_${projId}`);
  if(container){
    const mi=p.members.length-1;
    const m=p.members[mi];
    const initials=(m.name||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
    const col=MEMBER_COLORS[mi%MEMBER_COLORS.length];
    if(container.querySelector('p'))container.innerHTML='';
    const chip=document.createElement('div');chip.className='member-chip';
    chip.innerHTML=`<div class="member-avatar" style="background:${col}">${initials}</div>
      <div class="member-info"><span class="member-name">${escHtml(m.name)}</span><span class="member-role">${escHtml(m.role)}</span></div>
      ${m.email?`<a href="mailto:${m.email}" title="${m.email}" style="color:var(--primary);font-size:.75rem">✉</a>`:''}
      <button class="member-del" data-proj="${projId}" data-mi="${mi}" onclick="deleteMember(this)" title="Remove">✕</button>`;
    container.appendChild(chip);
    // Update header count
    const ms=el(`proj_${projId}`)?.querySelector('.members-section h4');
    if(ms)ms.textContent=`👥 Group Members (${p.members.length})`;
  }
}

function deleteMember(btnEl){
  const projId=parseInt(btnEl.dataset.proj),mi=parseInt(btnEl.dataset.mi);
  const p=getProject(projId);if(!p)return;
  p.members.splice(mi,1);
  save();
  // Full member section re-render (indices change)
  const container=el(`members_${projId}`);
  if(!container)return;
  if(!p.members.length){container.innerHTML='<p style="color:var(--gray);font-size:.83rem">No members added yet</p>';}
  else{
    container.innerHTML=p.members.map((m,i)=>{
      const initials=(m.name||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
      const col=MEMBER_COLORS[i%MEMBER_COLORS.length];
      return`<div class="member-chip">
        <div class="member-avatar" style="background:${col}">${initials}</div>
        <div class="member-info"><span class="member-name">${escHtml(m.name)}</span><span class="member-role">${escHtml(m.role)}</span></div>
        ${m.email?`<a href="mailto:${m.email}" title="${m.email}" style="color:var(--primary);font-size:.75rem">✉</a>`:''}
        <button class="member-del" data-proj="${projId}" data-mi="${i}" onclick="deleteMember(this)" title="Remove">✕</button>
      </div>`;
    }).join('');
  }
  const ms=el(`proj_${projId}`)?.querySelector('.members-section h4');
  if(ms)ms.textContent=`👥 Group Members (${p.members.length})`;
}

/* ── Project Log ── */
function addLogEntry(projId){
  const txtEl=el(`logTxt_${projId}`);
  if(!txtEl||!txtEl.value.trim())return;
  const p=getProject(projId);if(!p)return;
  const entry={id:uid(),text:txtEl.value.trim(),date:new Date().toISOString()};
  p.log.push(entry);
  txtEl.value='';save();
  const container=el(`log_${projId}`);
  if(container){
    const li=p.log.length-1;
    if(container.querySelector('p'))container.innerHTML='';
    const div=document.createElement('div');div.className='log-entry';
    div.innerHTML=`<div class="log-content">${escHtml(entry.text)}</div>
      <div class="log-entry-meta">
        <span class="log-date">${new Date(entry.date).toLocaleDateString()}</span>
        <span class="log-date">${new Date(entry.date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span>
      </div>
      <button class="log-del" data-proj="${projId}" data-li="${li}" onclick="deleteLogEntry(this)" title="Delete">🗑</button>`;
    container.appendChild(div);
    container.scrollTop=container.scrollHeight;
    // Update header
    const lh=el(`proj_${projId}`)?.querySelector('.project-log-section h4');
    if(lh)lh.textContent=`📝 Project Log (${p.log.length})`;
  }
}

function deleteLogEntry(btnEl){
  const projId=parseInt(btnEl.dataset.proj),li=parseInt(btnEl.dataset.li);
  const p=getProject(projId);if(!p)return;
  p.log.splice(li,1);save();
  const container=el(`log_${projId}`);if(!container)return;
  if(!p.log.length){container.innerHTML='<p style="color:var(--gray);font-size:.83rem">No entries yet</p>';}
  else{
    container.innerHTML=p.log.map((l,i)=>`
      <div class="log-entry">
        <div class="log-content">${escHtml(l.text)}</div>
        <div class="log-entry-meta">
          <span class="log-date">${new Date(l.date).toLocaleDateString()}</span>
          <span class="log-date">${new Date(l.date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span>
        </div>
        <button class="log-del" data-proj="${projId}" data-li="${i}" onclick="deleteLogEntry(this)" title="Delete">🗑</button>
      </div>`).join('');
  }
  const lh=el(`proj_${projId}`)?.querySelector('.project-log-section h4');
  if(lh)lh.textContent=`📝 Project Log (${p.log.length})`;
}

function deleteProject(id){
  if(!confirm('Delete this project and all its data?'))return;
  D.projects=D.projects.filter(p=>p.id!==id);
  save();renderProjects();
}

// ═══════════════════════════════════════════════════════════
//  SCHEDULE
// ═══════════════════════════════════════════════════════════
el('schedForm').addEventListener('submit',e=>{
  e.preventDefault();
  D.schedule.push({id:uid(),courseId:parseInt(el('sCourse').value),day:el('sDay').value,startTime:el('sStart').value,endTime:el('sEnd').value,location:el('sLoc').value});
  save();renderSchedule();closeModal('schedModal');e.target.reset();
});
function renderSchedule(){
  ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].forEach(day=>{
    const container=document.querySelector(`.dc[data-day="${day}"]`);
    const items=D.schedule.filter(s=>s.day===day).sort((a,b)=>a.startTime.localeCompare(b.startTime));
    container.innerHTML=items.map(item=>{
      const c=D.courses.find(x=>x.id===item.courseId);
      return`<div class="sched-item"><button class="si-del" onclick="delSched(${item.id})">✕</button>
        <div class="si-time">${fmtTime(item.startTime)}–${fmtTime(item.endTime)}</div>
        <div class="si-name">${c?c.name:'Unknown'}</div>
        <div class="si-loc">📍 ${item.location||'TBA'}</div></div>`;
    }).join('');
  });
}
function delSched(id){D.schedule=D.schedule.filter(s=>s.id!==id);save();renderSchedule();}
function fmtTime(t){const[h,m]=t.split(':');const hr=parseInt(h);return`${hr%12||12}:${m} ${hr>=12?'PM':'AM'}`;}

// ═══════════════════════════════════════════════════════════
//  GPA
// ═══════════════════════════════════════════════════════════
function updateGPA(){
  const tbody=document.querySelector('#gpaTable tbody');
  const graded=D.courses.filter(c=>c.grade);
  if(!graded.length){tbody.innerHTML='<tr><td colspan="4" style="text-align:center;color:var(--gray)">No graded courses yet</td></tr>';el('calcGPA').textContent='0.00';el('totalCr').textContent='0';return;}
  let tp=0,tc=0;
  tbody.innerHTML=graded.map(c=>{const p=parseFloat(c.grade);tp+=p*c.credits;tc+=c.credits;return`<tr><td>${c.name}</td><td>${c.credits}</td><td>${gradeLetter(p)}</td><td>${p.toFixed(1)}</td></tr>`;}).join('');
  const gpa=tc>0?(tp/tc).toFixed(2):'0.00';
  el('calcGPA').textContent=gpa;el('totalCr').textContent=tc;el('dashGPA').textContent=gpa;
}

// ═══════════════════════════════════════════════════════════
//  TIMER
// ═══════════════════════════════════════════════════════════
let tSecs=25*60,tInit=25*60,tRunning=false,tInterval=null;
function showTimer(){const h=Math.floor(tSecs/3600),m=Math.floor((tSecs%3600)/60),s=tSecs%60;el('timerDisplay').textContent=h>0?`${h}:${pad(m)}:${pad(s)}`:`${pad(m)}:${pad(s)}`;}
document.querySelectorAll('.preset-btn').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.preset-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');
  if(b.dataset.min==='custom'){el('customRow').style.display='flex';}
  else{el('customRow').style.display='none';tSecs=parseInt(b.dataset.min)*60;tInit=tSecs;showTimer();if(tRunning){clearInterval(tInterval);tRunning=false;}}
}));
el('setCustom').addEventListener('click',()=>{
  const h=parseInt(el('cHours').value)||0,m=parseInt(el('cMins').value)||0,s=parseInt(el('cSecs').value)||0;
  tSecs=h*3600+m*60+s;tInit=tSecs;if(tSecs<=0){alert('Enter a valid time');return;}
  showTimer();if(tRunning){clearInterval(tInterval);tRunning=false;}
});
el('btnStart').addEventListener('click',()=>{
  if(!tRunning&&tSecs>0){tRunning=true;tInterval=setInterval(()=>{if(tSecs>0){tSecs--;showTimer();}else{clearInterval(tInterval);tRunning=false;saveSession();beep();alert('⏰ Session complete!');}},1000);}
});
el('btnPause').addEventListener('click',()=>{if(tRunning){clearInterval(tInterval);tRunning=false;}});
el('btnReset').addEventListener('click',()=>{clearInterval(tInterval);tRunning=false;tSecs=tInit;showTimer();});
function beep(){try{const a=new(window.AudioContext||window.webkitAudioContext)();[0,.3,.6].forEach(d=>{const o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=880;g.gain.setValueAtTime(.3,a.currentTime+d);g.gain.exponentialRampToValueAtTime(.01,a.currentTime+d+.3);o.start(a.currentTime+d);o.stop(a.currentTime+d+.3);});}catch(e){}}
function saveSession(){
  D.studyLog.push({id:uid(),subject:el('studySubject').value||'General Study',duration:Math.round(tInit/60),courseId:el('timerCourse').value?parseInt(el('timerCourse').value):null,date:new Date().toISOString()});
  save();renderLog();tSecs=tInit;showTimer();
}
function renderLog(){
  const container=el('studyLog');
  if(!D.studyLog.length){container.innerHTML='<div class="empty"><div class="ei">📖</div><p>No sessions yet</p></div>';return;}
  container.innerHTML=D.studyLog.slice(-20).reverse().map(l=>{const c=l.courseId?D.courses.find(x=>x.id===l.courseId):null;return`<div class="log-item"><span>📚 ${l.subject}${c?' ('+c.code+')':''}</span><span style="color:var(--gray)">${l.duration}m • ${new Date(l.date).toLocaleDateString()}</span></div>`;}).join('');
}
function clearLog(){if(confirm('Clear all study logs?')){D.studyLog=[];save();renderLog();renderDashboard();}}
function refreshTimerCourses(){const s=el('timerCourse');const v=s.value;s.innerHTML='<option value="">General</option>'+D.courses.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');if(v)s.value=v;}

// ═══════════════════════════════════════════════════════════
//  BUDGET
// ═══════════════════════════════════════════════════════════
el('paycheckForm').addEventListener('submit',e=>{
  e.preventDefault();
  D.paychecks.push({id:uid(),employer:el('pcEmp').value,gross:parseFloat(el('pcGross').value)||0,net:parseFloat(el('pcNet').value)||0,fedTax:parseFloat(el('pcFed').value)||0,stateTax:parseFloat(el('pcState').value)||0,hours:parseFloat(el('pcHours').value)||0,payDate:el('pcDate').value});
  save();renderPaychecks();updateBudget();renderDashboard();closeModal('paycheckModal');e.target.reset();
});
el('expenseForm').addEventListener('submit',e=>{
  e.preventDefault();
  D.expenses.push({id:uid(),desc:el('eDesc').value,amount:parseFloat(el('eAmount').value),category:el('eCat').value,date:el('eDate').value});
  save();renderExpenses();updateBudget();closeModal('expenseModal');e.target.reset();
});
function setBudget(){D.budget=parseFloat(el('budgetInput').value)||0;save();updateBudget();}
function updateBudget(){
  const inc=D.paychecks.reduce((s,p)=>s+(p.net||0),0);
  const exp=D.expenses.reduce((s,e)=>s+e.amount,0);
  el('budIncome').textContent=`$${inc.toFixed(2)}`;el('budExp').textContent=`$${exp.toFixed(2)}`;
  el('budRem').textContent=`$${(inc-exp).toFixed(2)}`;el('budSet').textContent=`$${D.budget.toFixed(2)}`;
}
function renderPaychecks(){
  const container=el('paycheckList');
  if(!D.paychecks.length){container.innerHTML='<div class="empty"><div class="ei">💵</div><p>No paychecks yet</p></div>';return;}
  container.innerHTML=D.paychecks.slice().reverse().map(p=>`<div class="pc-record"><div class="pr-info"><h4>${p.employer}</h4><span>${p.payDate?new Date(p.payDate).toLocaleDateString():''}${p.hours?' • '+p.hours+'hrs':''}${p.fedTax?' • Tax: $'+p.fedTax.toFixed(2):''}</span></div><div class="pr-amt">$${(p.net||0).toFixed(2)}</div><button class="btn btn-danger btn-sm" onclick="delPC(${p.id})">🗑️</button></div>`).join('');
}
function delPC(id){D.paychecks=D.paychecks.filter(p=>p.id!==id);save();renderPaychecks();updateBudget();}
function renderExpenses(){
  const container=el('expenseList');
  if(!D.expenses.length){container.innerHTML='<div class="empty"><div class="ei">💸</div><p>No expenses yet</p></div>';return;}
  const icons={food:'🍔',books:'📚',transport:'🚗',entertainment:'🎮',supplies:'✏️',rent:'🏠',other:'📦'};
  const clrs={food:'#f59e0b',books:'#8b5cf6',transport:'#3b82f6',entertainment:'#ec4899',supplies:'#10b981',rent:'#ef4444',other:'#6b7280'};
  container.innerHTML=D.expenses.slice().reverse().map(e=>`<div class="exp-item"><div class="exp-cat"><div class="exp-icon" style="background:${clrs[e.category]}20;color:${clrs[e.category]}">${icons[e.category]}</div><div><div style="font-weight:600">${e.desc}</div><div style="font-size:.78rem;color:var(--gray)">${new Date(e.date).toLocaleDateString()} • ${e.category}</div></div></div><div style="display:flex;align-items:center;gap:10px"><span style="font-weight:600;color:var(--danger)">-$${e.amount.toFixed(2)}</span><button class="btn btn-danger btn-sm" onclick="delExp(${e.id})">🗑️</button></div></div>`).join('');
}
function delExp(id){D.expenses=D.expenses.filter(e=>e.id!==id);save();renderExpenses();updateBudget();}

// ═══════════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════════
function renderDashboard(){
  const graded=D.courses.filter(c=>c.grade);
  let tp=0,tc=0;graded.forEach(c=>{tp+=parseFloat(c.grade)*c.credits;tc+=c.credits;});
  const gpa=tc>0?(tp/tc).toFixed(2):'0.00';
  el('dashGPA').textContent=gpa;
  el('dashCourses').textContent=D.courses.length;
  el('dashCredits').textContent=D.courses.reduce((s,c)=>s+c.credits,0)+' Credits';
  const pending=D.assignments.filter(a=>!a.completed);
  el('dashTasks').textContent=pending.length;
  el('dashUrgent').textContent=pending.filter(a=>getDueClass(a.dueDate,false)==='urgent').length+' Due Soon';
  const now=new Date(),wa=new Date(now);wa.setDate(wa.getDate()-7);
  const wm=D.studyLog.filter(l=>new Date(l.date)>=wa).reduce((s,l)=>s+l.duration,0);
  const ws=D.studyLog.filter(l=>new Date(l.date)>=wa).length;
  el('dashStudy').textContent=`${Math.floor(wm/60)}h ${wm%60}m`;
  el('dashSessions').textContent=ws+' sessions';
  renderUpcoming();renderWeeklyChart();renderGradeChart();renderProductivity();
}

function renderUpcoming(){
  const container=el('upcomingDeadlines');
  const ua=D.assignments.filter(a=>!a.completed).sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate)).slice(0,5);
  const up=D.projects.filter(p=>p.status!=='completed').sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate)).slice(0,3);
  if(!ua.length&&!up.length){container.innerHTML='<div class="empty"><div class="ei">🎉</div><p>Nothing due soon!</p></div>';return;}
  container.innerHTML=[
    ...ua.map(a=>{const c=D.courses.find(x=>x.id==a.courseId);const dc=getDueClass(a.dueDate,false);return`<div class="assign-item"><div class="assign-info"><div class="assign-title">${a.title}</div><div class="assign-meta">${c?c.code:''}</div></div><span class="due-badge ${dc==='urgent'?'due-urgent':dc==='soon'?'due-soon':'due-later'}">${getDaysUntil(a.dueDate)}</span></div>`;}).join(''),
    ...up.map(p=>{const d=p.subtasks.filter(s=>s.done).length,t=p.subtasks.length;return`<div class="assign-item" style="border-left:4px solid var(--warning)"><div class="assign-info"><div class="assign-title">🗂️ ${p.title}</div><div class="assign-meta">${d}/${t} subtasks • ${p.status}${p.members.length?' • 👥 '+p.members.length+' members':''}</div></div><span class="due-badge due-soon">${getDaysUntil(p.dueDate)}</span></div>`;}).join('')
  ].join('');
}

function renderWeeklyChart(){
  const container=el('weeklyChart');
  const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today=new Date();
  const wd=[];
  for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(d.getDate()-i);const ds=d.toISOString().split('T')[0];const mins=D.studyLog.filter(l=>l.date.split('T')[0]===ds).reduce((s,l)=>s+l.duration,0);wd.push({label:days[d.getDay()],val:Math.round(mins/60*10)/10,isToday:i===0});}
  const max=Math.max(...wd.map(d=>d.val),1);
  container.innerHTML=`<div class="bar-chart">${wd.map(d=>`<div class="bar-group"><div class="bar" style="height:${d.val/max*100}%;background:${d.isToday?'linear-gradient(180deg,#10b981,#059669)':'linear-gradient(180deg,#6366f1,#8b5cf6)'}"><span class="bv">${d.val}h</span></div><div class="bar-label">${d.label}</div></div>`).join('')}</div><p style="text-align:center;color:var(--gray);font-size:.8rem;margin-top:6px">This week: <strong>${wd.reduce((s,d)=>s+d.val,0).toFixed(1)}h</strong></p>`;
}

function renderGradeChart(){
  const container=el('gradeChart');
  const graded=D.courses.filter(c=>c.grade);
  if(!graded.length){container.innerHTML='<div class="empty" style="padding:20px"><p>No graded courses yet</p></div>';return;}
  container.innerHTML=`<div class="bar-chart">${graded.map((c,i)=>{const gp=parseFloat(c.grade);return`<div class="bar-group"><div class="bar" style="height:${gp/4*100}%;background:${COLORS[i%COLORS.length]}"><span class="bv">${gradeLetter(gp)}</span></div><div class="bar-label">${c.code}</div></div>`;}).join('')}</div>`;
}

function renderProductivity(){
  if(!D.studyLog.length){
    el('prodScore').textContent='0';el('prodScoreLabel').textContent='Start studying to build your score';el('prodScoreBar').style.width='0%';
    el('prodInsights').innerHTML='<p style="color:var(--gray);font-size:.88rem;text-align:center">Log study sessions with the timer to see insights.</p>';
    renderHeatmap([]);renderStreak();return;
  }
  const dayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const dayTotals=Array(7).fill(0),dayCounts=Array(7).fill(0);
  D.studyLog.forEach(l=>{const d=new Date(l.date).getDay();dayTotals[d]+=l.duration;dayCounts[d]++;});
  const dayAvg=dayTotals.map((t,i)=>dayCounts[i]>0?Math.round(t/dayCounts[i]):0);
  const totalMins=D.studyLog.reduce((s,l)=>s+l.duration,0);
  const avgLen=Math.round(totalMins/D.studyLog.length);
  const bestDayIdx=dayAvg.indexOf(Math.max(...dayAvg));
  const now=new Date();
  const last30=[];for(let i=29;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);last30.push(d.toISOString().split('T')[0]);}
  const studied=new Set(D.studyLog.map(l=>l.date.split('T')[0]));
  const cons=Math.round(last30.filter(d=>studied.has(d)).length/30*100);
  const wh=[];
  for(let w=3;w>=0;w--){const from=new Date(now);from.setDate(from.getDate()-w*7-6);const to=new Date(now);to.setDate(to.getDate()-w*7);wh.push(Math.round(D.studyLog.filter(l=>{const d=new Date(l.date);return d>=from&&d<=to;}).reduce((s,l)=>s+l.duration,0)/60*10)/10);}
  const up=wh[3]>=wh[2];
  let score=0;
  score+=Math.min(cons*.4,40);score+=Math.min(avgLen/60*20,20);score+=Math.min((totalMins/60)/10*10,20);score+=up?10:0;score+=D.studyLog.length>=20?10:D.studyLog.length/2;score=Math.min(Math.round(score),100);
  const label=score>=85?'🏆 Elite Scholar':score>=70?'⭐ High Achiever':score>=50?'📈 Making Progress':score>=25?'🌱 Building Habits':'🚀 Just Getting Started';
  el('prodScore').textContent=score;el('prodScoreLabel').textContent=label;el('prodScoreBar').style.width=score+'%';
  const gap=dayAvg.map((v,i)=>({v,i})).filter(x=>x.v===0).map(x=>dayNames[x.i]).slice(0,3);
  el('prodInsights').innerHTML=[
    {icon:'🏆',label:'Most Productive Day',value:`${dayNames[bestDayIdx]} (avg ${dayAvg[bestDayIdx]}m)`},
    {icon:'📊',label:'Avg Session Length',value:`${avgLen} minutes`},
    {icon:'📅',label:'Consistency (30 days)',value:`${cons}% of days`},
    {icon:up?'📈':'📉',label:'Weekly Trend',value:up?`↑ ${wh[2]}h → ${wh[3]}h`:`↓ ${wh[2]}h → ${wh[3]}h`},
    ...(gap.length?[{icon:'💡',label:'Study Gap Days',value:gap.join(', ')}]:[]),
    {icon:'⏱️',label:'Total Study Time',value:`${Math.floor(totalMins/60)}h ${totalMins%60}m`}
  ].map(ins=>`<div class="prod-insight"><div class="pi-icon">${ins.icon}</div><div class="pi-info"><div class="pi-label">${ins.label}</div><div class="pi-value">${ins.value}</div></div></div>`).join('');
  renderHeatmap(dayAvg);renderStreak();
}

function renderHeatmap(dayAvg){
  const heatEl=el('dayHeatmap'),graphEl=el('heatmapGraph');
  const names=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  if(!dayAvg.length)dayAvg=Array(7).fill(0);
  const max=Math.max(...dayAvg,1);
  heatEl.innerHTML=names.map((name,i)=>{
    const v=dayAvg[i]||0,pct=v/max;
    const cls=pct===0?'heat-0':pct<.2?'heat-1':pct<.4?'heat-2':pct<.6?'heat-3':pct<.8?'heat-4':'heat-5';
    return`<div class="heat-cell ${cls}"><div class="day-name">${name}</div><div class="day-hrs">${v>0?v+'m':'–'}</div></div>`;
  }).join('');
  graphEl.innerHTML=dayAvg.map((v,i)=>`<div class="bar-group" style="flex:1"><div class="bar" style="height:${(v/max)*100}%;background:${SOLID[i%SOLID.length]}"><span class="bv" style="top:-15px">${v}m</span></div><div class="bar-label">${names[i][0]}</div></div>`).join('');
}

function renderStreak(){
  let streak=0;const today=new Date();
  for(let i=0;i<365;i++){const d=new Date(today);d.setDate(d.getDate()-i);const ds=d.toISOString().split('T')[0];if(D.studyLog.some(l=>l.date.split('T')[0]===ds))streak++;else if(i>0)break;}
  el('streakBadge').textContent=`🔥 ${streak} day${streak!==1?'s':''}`;
}

// ═══════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════
el('studentName').addEventListener('change',save);
el('semester').addEventListener('change',save);
el('eDate').valueAsDate=new Date();
el('pcDate').valueAsDate=new Date();

load();
renderCourses();
renderAssignments();
renderProjects();
renderSchedule();
renderLog();
renderExpenses();
renderPaychecks();
updateBudget();
updateGPA();
renderDashboard();
showTimer();
</script>
</body>
</html>
