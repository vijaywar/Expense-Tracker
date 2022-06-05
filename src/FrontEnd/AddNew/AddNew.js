import React from 'react'

export default function AddNew() {
    return (
        <div class="card m-1 mt-2 rounded">
            <div class="form-group">
                <label>Add Custom</label>
                <div class="form-group">
                    <input type="text"
                        class="form-control" name="" id="ExcerciseName" aria-describedby="helpId" placeholder="Excercise Name" />
                    <small id="helpId" class="form-text text-muted">Excercise Name</small>
                </div>
                <input type="file" class="form-control-file" name="" id="gymImage" placeholder="" aria-describedby="fileHelpId" />
                <small id="fileHelpId" class="form-text text-muted">Select your custom excercise reference image</small>
            </div>
        </div>
    )
}
