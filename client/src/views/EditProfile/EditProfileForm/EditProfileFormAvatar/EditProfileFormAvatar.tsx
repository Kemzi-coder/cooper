import Avatar from "@components/Avatar/Avatar";
import Button from "@components/Button/Button";
import {EditProfileFormValues, FormPromiseAction} from "@customTypes/forms";
import useTypedDispatch from "@hooks/useTypedDispatch";
import useTypedSelector from "@hooks/useTypedSelector";
import useWindowSize from "@hooks/useWindowSize";
import FilesService from "@services/files/files.service";
import {getAuthUserAvatar} from "@store/auth/auth.selectors";
import ScreenSizes from "@utils/constants/screenSizes";
import {useFormikContext} from "formik";
import React, {ChangeEvent, FC, useRef, useState} from "react";
import StyledEditProfileFormAvatar from "./EditProfileFormAvatar.styled";

interface EditProfileFormAvatarProps {
	addAction: (action: FormPromiseAction<EditProfileFormValues>) => void;
}

const EditProfileFormAvatar: FC<EditProfileFormAvatarProps> = ({addAction}) => {
	const dispatch = useTypedDispatch();
	const {width} = useWindowSize();

	// Avatar preview url
	const [preview, setPreview] = useState("");

	const {values, setFieldValue} = useFormikContext<EditProfileFormValues>();
	const hiddenFileInput = useRef<HTMLInputElement>(null);
	const avatar = useTypedSelector(getAuthUserAvatar);

	// Actions with avatar
	const uploadAvatar: FormPromiseAction<EditProfileFormValues> = async v =>
		dispatch(FilesService.uploadAvatar(v.avatar));

	const deleteAvatar: FormPromiseAction<EditProfileFormValues> = async () =>
		dispatch(FilesService.deleteAvatar());

	// Handle file choice
	const handleChange = (e: ChangeEvent) => {
		const target = e.target as HTMLInputElement;

		const file = target.files[0];
		const objectUrl = URL.createObjectURL(file);
		setPreview(objectUrl);

		setFieldValue("avatar", target.files[0]);
		addAction(uploadAvatar);
	};

	const handleClick = () => hiddenFileInput.current.click();

	const handleAvatarDelete = () => {
		if (avatar) {
			addAction(deleteAvatar);
		}

		if (preview) {
			setPreview("");
		}

		if (values.avatar) {
			setFieldValue("avatar", "");
		}
	};

	return (
		<StyledEditProfileFormAvatar>
			<Avatar
				marginRight={width <= ScreenSizes.TabletWidth ? "0" : "24px"}
				marginBottom={width <= ScreenSizes.TabletWidth ? "12px" : "0"}
				width="100px"
				height="100px"
				imagePath={preview || values.avatar}
			/>
			<div>
				<Button onClick={handleClick} marginRight="16px" variant="outline">
					upload
				</Button>
				<input
					onChange={handleChange}
					ref={hiddenFileInput}
					type="file"
					hidden
				/>
				<Button onClick={handleAvatarDelete} variant="outline">
					delete
				</Button>
			</div>
		</StyledEditProfileFormAvatar>
	);
};

export default EditProfileFormAvatar;
