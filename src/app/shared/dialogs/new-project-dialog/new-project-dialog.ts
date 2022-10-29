import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Component, Inject} from "@angular/core";
import {BaseDialog} from "../../basics/baseDialogs/BaseDialog";

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'new-project-dialog.html',
})
export class NewProjectDialog extends BaseDialog<NewProjectDialog> {
  constructor(
    dialogRef: MatDialogRef<NewProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {},
  ) {
    super(dialogRef);
  }
}
