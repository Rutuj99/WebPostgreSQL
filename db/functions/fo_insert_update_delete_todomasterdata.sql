CREATE OR REPLACE FUNCTION public.fo_insert_update_delete_todomasterdata(
    action text,
    todoid integer DEFAULT NULL,
    todotitle text DEFAULT NULL,
    tododescription text DEFAULT NULL,
    priority integer DEFAULT NULL,
    createdby text DEFAULT NULL,
    updatedby text DEFAULT NULL)
RETURNS text
LANGUAGE 'plpgsql'
COST 100
VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    result_message TEXT;
BEGIN
    IF action = 'INSERT' THEN
        INSERT INTO public."TODO_Master" ("TodoTitle", "TodoDescription", "Priority", "CreatedBy", "CreatedDate")
        VALUES (todotitle, tododescription, priority, createdby, now());
        result_message := 'TODO_Master_Insert_Success';
        
    ELSIF action = 'UPDATE' THEN
        UPDATE public."TODO_Master" 
        SET "TodoTitle" = todotitle,
            "TodoDescription" = tododescription,
            "Priority" = priority,
            "UpdatedBy" = updatedby,
            "UpdatedDate" = now()
        WHERE "TodoId" = todoid;
        result_message := 'TODO_Master_Update_Success';
        
    ELSIF action = 'DELETE' THEN
        UPDATE public."TODO_Master" 
        SET "Status" = B'0',
            "UpdatedBy" = updatedby,
            "UpdatedDate" = now()
        WHERE "TodoId" = todoid;
        result_message := 'TODO_Master_Delete_Success';
        
    ELSE
        result_message := 'Invalid_Action';
    END IF;
    
    RETURN result_message;
END;
$BODY$;