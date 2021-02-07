// import React, {useEffect} from "react";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import { Create } from "@material-ui/icons";

// export default function UpdateWindow() {
//   const [isOpen, setOpen] = React.useState(false);

// //   useEffect(() => {
// //     setOpen(isOpen);

// //   },[])
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogTitle id="form-dialog-title">Update the Todo</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="title"
//             label="Title"
//             type="text"
//             fullWidth
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="description"
//             label="Description"
//             type="text"
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleClose} color="primary">
//             Update Todo
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
